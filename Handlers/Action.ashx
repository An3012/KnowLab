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
            else
            {
                context.Response.Write(js.Serialize(new { success = true, message = "KnowLab ASP.NET Action Handler ready." }));
            }
        }

        public bool IsReusable => false;
    }
}
