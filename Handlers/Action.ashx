<%@ WebHandler Language="C#" Class="KnowLab.Handlers.ActionHandler" %>

using System;
using System.Web;
using System.Web.Script.Serialization;
using KnowLab.Engines;

namespace KnowLab.Handlers
{
    public class ActionHandler : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentEncoding = System.Text.Encoding.UTF8;
            context.Response.Charset = "utf-8";
            context.Response.ContentType = "application/json; charset=utf-8";
            string action = context.Request["action"] ?? "";

            JavaScriptSerializer js = new JavaScriptSerializer();

            if (action == "mortgage")
            {
                double price = Convert.ToDouble(context.Request["price"] ?? "2500000000");
                double down = Convert.ToDouble(context.Request["down"] ?? "30");
                double rate = Convert.ToDouble(context.Request["rate"] ?? "9.5");
                int term = Convert.ToInt32(context.Request["term"] ?? "20");
                double income = Convert.ToDouble(context.Request["income"] ?? "35000000");

                var result = CalculatorEngine.CalculateMortgage(new MortgageInput
                {
                    Price = price,
                    DownPaymentPercent = down,
                    InterestRatePercent = rate,
                    TermYears = term,
                    MonthlyIncome = income
                });

                context.Response.Write(js.Serialize(new { success = true, data = result }));
            }
            else if (action == "pc_compat")
            {
                try
                {
                    string jsonBody = "";
                    using (var reader = new System.IO.StreamReader(context.Request.InputStream))
                    {
                        jsonBody = reader.ReadToEnd();
                    }

                    PCBuildConfiguration config = null;
                    if (!string.IsNullOrEmpty(jsonBody))
                    {
                        config = js.Deserialize<PCBuildConfiguration>(jsonBody);
                    }

                    if (config == null)
                    {
                        config = new PCBuildConfiguration();
                    }

                    var report = CompatibilityEngine.Check(config);
                    context.Response.Write(js.Serialize(new { success = true, data = report }));
                }
                catch (Exception ex)
                {
                    context.Response.Write(js.Serialize(new { success = false, error = ex.Message }));
                }
            }
            else if (action == "sql_test")
            {
                string msg;
                bool ok = SqlDatabaseHelper.TestConnection(out msg);
                context.Response.Write(js.Serialize(new { success = ok, message = msg }));
            }
            else if (action == "save_scenario_sql")
            {
                try
                {
                    string domainId = context.Request["domainId"] ?? "pc-building";
                    string title = context.Request["title"] ?? "Kịch bản mẫu";
                    string goal = context.Request["goal"] ?? "";
                    string payload = context.Request["payload"] ?? "{}";

                    int id = SqlDatabaseHelper.SaveScenario(domainId, title, goal, payload);
                    context.Response.Write(js.Serialize(new { success = true, id = id, message = "Lưu kịch bản vào SQL Server thành công." }));
                }
                catch (Exception ex)
                {
                    context.Response.Write(js.Serialize(new { success = false, error = ex.Message }));
                }
            }
            else if (action == "get_scenarios_sql")
            {
                try
                {
                    string domainId = context.Request["domainId"];
                    var list = SqlDatabaseHelper.GetScenarios(domainId);
                    context.Response.Write(js.Serialize(new { success = true, data = list }));
                }
                catch (Exception ex)
                {
                    context.Response.Write(js.Serialize(new { success = false, error = ex.Message }));
                }
            }
            else if (action == "save_journal_sql")
            {
                try
                {
                    string goal = context.Request["goal"] ?? "";
                    string assumptions = context.Request["assumptions"] ?? "";
                    string decision = context.Request["decision"] ?? "";

                    int id = SqlDatabaseHelper.SaveDecisionJournal(goal, assumptions, decision);
                    context.Response.Write(js.Serialize(new { success = true, id = id, message = "Lưu Decision Journal vào SQL Server thành công." }));
                }
                catch (Exception ex)
                {
                    context.Response.Write(js.Serialize(new { success = false, error = ex.Message }));
                }
            }
            else if (action == "get_journals_sql")
            {
                try
                {
                    var list = SqlDatabaseHelper.GetDecisionJournals();
                    context.Response.Write(js.Serialize(new { success = true, data = list }));
                }
                catch (Exception ex)
                {
                    context.Response.Write(js.Serialize(new { success = false, error = ex.Message }));
                }
            }
            else
            {
                context.Response.Write(js.Serialize(new { success = true, message = "KnowLab ASP.NET Action Handler ready." }));
            }
        }

        public bool IsReusable => false;
    }
}
