﻿using System;
using System.Collections.Generic;
using System.Linq;

namespace KnowLab.Engines
{
    public class ComparisonItemModel
    {
        public string Id { get; set; }
        public string DomainId { get; set; }
        public string Name { get; set; }
        public Dictionary<string, string> Attributes { get; set; }
        public string TradeOffSummary { get; set; }

        public ComparisonItemModel()
        {
            Attributes = new Dictionary<string, string>();
        }
    }

    public class ComparisonCriteriaModel
    {
        public string Key { get; set; }
        public string Label { get; set; }
        public string Unit { get; set; }
    }

    public class ComparisonResultModel
    {
        public string DomainId { get; set; }
        public List<ComparisonItemModel> Items { get; set; }
        public List<ComparisonCriteriaModel> Criteria { get; set; }
        public List<string> TradeOffs { get; set; }
        public List<string> Assumptions { get; set; }

        public ComparisonResultModel()
        {
            Items = new List<ComparisonItemModel>();
            Criteria = new List<ComparisonCriteriaModel>();
            TradeOffs = new List<string>();
            Assumptions = new List<string>();
        }
    }

    public static class ComparisonEngine
    {
        private static readonly List<ComparisonItemModel> _items;

        static ComparisonEngine()
        {
            _items = new List<ComparisonItemModel>
            {
                // PC CPU
                new ComparisonItemModel {
                    Id = "cpu-i5-13600k", DomainId = "pc-building", Name = "Intel Core i5-13600K",
                    Attributes = new Dictionary<string, string> {
                        { "cores", "14 (6P + 8E)" }, { "tdp", "125W (Peak 181W)" }, { "price", "7,500,000 VNĐ" }, { "suitability", "Chơi game + Đa nhiệm vừa" }
                    },
                    TradeOffSummary = "Hiệu năng đơn nhân chơi game cực tốt, nhưng ngốn điện và tỏa nhiệt cao hơn."
                },
                new ComparisonItemModel {
                    Id = "cpu-ryzen-7600x", DomainId = "pc-building", Name = "AMD Ryzen 5 7600X",
                    Attributes = new Dictionary<string, string> {
                        { "cores", "6 Cores 12 Threads" }, { "tdp", "105W (Peak 142W)" }, { "price", "6,200,000 VNĐ" }, { "suitability", "Thuần chơi game 1080p/2K" }
                    },
                    TradeOffSummary = "Tiết kiệm điện hơn, nền tảng socket AM5 dùng dài lâu, ít nhân đa nhiệm hơn."
                },

                // Cars: EV vs Petrol
                new ComparisonItemModel {
                    Id = "car-ev-hatchback", DomainId = "cars", Name = "Xe Điện Đô Thị (EV)",
                    Attributes = new Dictionary<string, string> {
                        { "fuel_cost", "400,000 VNĐ / 1,000 km" }, { "maintenance", "Rất thấp (không nhớt máy)" }, { "price", "550,000,000 VNĐ" }, { "convenience", "Phụ thuộc trạm sạc" }
                    },
                    TradeOffSummary = "Chi phí nhiên liệu siêu rẻ, tăng tốc êm ái nhưng mất thời gian chờ sạc khi đi xa."
                },
                new ComparisonItemModel {
                    Id = "car-ice-hatchback", DomainId = "cars", Name = "Xe Xăng Đô Thị (ICE)",
                    Attributes = new Dictionary<string, string> {
                        { "fuel_cost", "1,800,000 VNĐ / 1,000 km" }, { "maintenance", "Định kỳ (nhớt, lọc, động cơ)" }, { "price", "520,000,000 VNĐ" }, { "convenience", "Đổ xăng 3 phút xong" }
                    },
                    TradeOffSummary = "Tiện lợi đi xa bất kỳ đâu, nhưng chi phí xăng và bảo dưỡng lâu dài cao hơn nhiều."
                },

                // Real Estate Loans
                new ComparisonItemModel {
                    Id = "re-loan-annuity", DomainId = "real-estate", Name = "Dư Nợ Giảm Dần (Annuity)",
                    Attributes = new Dictionary<string, string> {
                        { "monthly_trend", "Giảm dần hàng tháng" }, { "total_interest", "Thấp hơn" }, { "initial_pressure", "Cao hơn ở năm đầu" }, { "flexibility", "Thích hợp thu nhập ổn định" }
                    },
                    TradeOffSummary = "Giảm dần tổng lãi phải trả, nhưng áp lực tiền trả gốc ở những tháng đầu cao."
                },
                new ComparisonItemModel {
                    Id = "re-loan-fixed", DomainId = "real-estate", Name = "Trả Gốc Lãi Cố Định",
                    Attributes = new Dictionary<string, string> {
                        { "monthly_trend", "Bằng nhau mỗi tháng" }, { "total_interest", "Cao hơn một chút" }, { "initial_pressure", "Vừa phải, dễ quản lý" }, { "flexibility", "Dễ lập ngân sách sinh hoạt" }
                    },
                    TradeOffSummary = "Dễ chủ động quản lý thu chi cố định, nhưng tổng tiền lãi tính ra nhỉnh hơn."
                }
            };
        }

        public static List<ComparisonItemModel> GetItemsByDomain(string domainId)
        {
            return _items.Where(i => i.DomainId.Equals(domainId, StringComparison.OrdinalIgnoreCase)).ToList();
        }

        public static ComparisonResultModel CompareDomainItems(string domainId)
        {
            var items = GetItemsByDomain(domainId);
            ComparisonResultModel result = new ComparisonResultModel();
            result.DomainId = domainId;
            result.Items = items;

            if (domainId.Equals("pc-building", StringComparison.OrdinalIgnoreCase))
            {
                result.Criteria.Add(new ComparisonCriteriaModel { Key = "cores", Label = "Số Nhân / Luồng" });
                result.Criteria.Add(new ComparisonCriteriaModel { Key = "tdp", Label = "Công Suất TDP (Watt)" });
                result.Criteria.Add(new ComparisonCriteriaModel { Key = "price", Label = "Giá Tham Khảo" });
                result.Criteria.Add(new ComparisonCriteriaModel { Key = "suitability", Label = "Nhu Cầu Phù Hợp" });
                result.TradeOffs.Add("Intel mạnh về đa nhiệm render video; AMD tiết kiệm điện và dễ nâng cấp CPU sau này.");
                result.Assumptions.Add("Giá tham khảo tại thị trường Việt Nam thời điểm 2026.");
            }
            else if (domainId.Equals("cars", StringComparison.OrdinalIgnoreCase))
            {
                result.Criteria.Add(new ComparisonCriteriaModel { Key = "fuel_cost", Label = "Nhiên Liệu / 1000km" });
                result.Criteria.Add(new ComparisonCriteriaModel { Key = "maintenance", Label = "Chi Phí Bảo Dưỡng" });
                result.Criteria.Add(new ComparisonCriteriaModel { Key = "price", Label = "Giá Mua Xe Ban Đầu" });
                result.Criteria.Add(new ComparisonCriteriaModel { Key = "convenience", Label = "Mức Độ Tiện Lợi" });
                result.TradeOffs.Add("Xe điện tiết kiệm 70% chi phí nhiên liệu hàng tháng nhưng đòi hỏi hạ tầng trạm sạc.");
                result.Assumptions.Add("Giá xăng ước tính 23.000đ/lít; Giá điện 3.200đ/kWh.");
            }
            else
            {
                result.Criteria.Add(new ComparisonCriteriaModel { Key = "monthly_trend", Label = "Xu Hướng Trả Hàng Tháng" });
                result.Criteria.Add(new ComparisonCriteriaModel { Key = "total_interest", Label = "Tổng Tiền Lãi" });
                result.Criteria.Add(new ComparisonCriteriaModel { Key = "initial_pressure", Label = "Áp Lực Tháng Đầu" });
                result.Criteria.Add(new ComparisonCriteriaModel { Key = "flexibility", Label = "Tính Linh Hoạt" });
                result.TradeOffs.Add("Chọn phương án phù hợp với dòng thu nhập cá nhân trong 3 năm đầu.");
                result.Assumptions.Add("Giả định lãi suất ngân hàng thả nổi ổn định trong biên độ 2%.");
            }

            return result;
        }
    }
}
