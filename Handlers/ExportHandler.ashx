﻿<%@ WebHandler Language="C#" Class="KnowLab.Handlers.ExportHandler" %>

using System;
using System.Web;
using KnowLab.Engines;

namespace KnowLab.Handlers
{
    public class ExportHandler : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentEncoding = System.Text.Encoding.UTF8;
            context.Response.Charset = "utf-8";
            string type = (context.Request["type"] ?? "json").ToLower();
            string id = context.Request["id"] ?? "";

            ScenarioModel scenario = ScenarioEngine.GetScenarioById(id);
            if (scenario == null && !string.IsNullOrEmpty(id))
            {
                scenario = new ScenarioModel { Id = id, Name = "Cross-Domain Life Setup Scenario", DomainId = "life-simulator" };
            }

            ScenarioExportModel exportModel = ScenarioExportEngine.BuildExportModel(scenario);

            if (type == "json")
            {
                string json = ScenarioExportEngine.ExportToJson(exportModel);
                context.Response.Clear();
                context.Response.ContentType = "application/json; charset=utf-8";
                context.Response.AddHeader("Content-Disposition", $"attachment; filename=KnowLab_Scenario_{exportModel.Metadata.ExportId}.json");
                context.Response.Write(json);
                context.Response.End();
            }
            else if (type == "pdf")
            {
                byte[] pdfBytes = ScenarioExportEngine.ExportToPdfBytes(exportModel);
                context.Response.Clear();
                context.Response.ContentType = "application/pdf";
                context.Response.AddHeader("Content-Disposition", $"attachment; filename=KnowLab_Scenario_{exportModel.Metadata.ExportId}.pdf");
                context.Response.BinaryWrite(pdfBytes);
                context.Response.End();
            }
            else if (type == "print")
            {
                string html = ScenarioExportEngine.ExportToPrintableHtml(exportModel);
                context.Response.Clear();
                context.Response.ContentType = "text/html; charset=utf-8";
                context.Response.Write(html);
                context.Response.End();
            }
            else
            {
                context.Response.ContentType = "text/plain";
                context.Response.Write("Invalid export type specified.");
            }
        }

        public bool IsReusable => false;
    }
}
