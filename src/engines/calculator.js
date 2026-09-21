/**
 * KnowLab — Pure Calculation & Simulation Engine
 * Follows Explain Result Pattern: formula, variables, assumptions,
 * limitations, what-if, and deterministic outputs.
 */

export const CalculatorEngine = {
  /**
   * REAL ESTATE: Mortgage & Affordability Simulation
   */
  calculateMortgage(input) {
    const price = Number(input.price) || 0;
    const downPaymentPercent = Number(input.downPaymentPercent) || 30;
    const interestRatePercent = Number(input.interestRatePercent) || 9.5;
    const termYears = Number(input.termYears) || 20;
    const monthlyIncome = Number(input.monthlyIncome) || 0;
    const monthlyRentIncome = Number(input.monthlyRentIncome) || 0;
    const vacancyRatePercent = Number(input.vacancyRatePercent) || 10;

    const downPaymentAmount = price * (downPaymentPercent / 100);
    const loanAmount = Math.max(0, price - downPaymentAmount);
    const monthlyInterestRate = (interestRatePercent / 100) / 12;
    const totalMonths = termYears * 12;

    let monthlyPayment = 0;
    if (loanAmount > 0 && monthlyInterestRate > 0) {
      monthlyPayment = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) /
                       (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);
    } else if (loanAmount > 0) {
      monthlyPayment = loanAmount / totalMonths;
    }

    const totalPayment = monthlyPayment * totalMonths;
    const totalInterest = Math.max(0, totalPayment - loanAmount);
    const netMonthlyRent = monthlyRentIncome * (1 - vacancyRatePercent / 100);
    const netCashFlow = netMonthlyRent - monthlyPayment;

    const debtToIncomeRatio = monthlyIncome > 0 ? ((monthlyPayment / monthlyIncome) * 100) : 0;
    const rentalYieldPercent = price > 0 ? ((monthlyRentIncome * 12) / price) * 100 : 0;

    // What-if: Interest rate +1% and +2%
    const rPlus1 = ((interestRatePercent + 1) / 100) / 12;
    const monthlyPaymentPlus1 = loanAmount > 0 ? (loanAmount * rPlus1 * Math.pow(1 + rPlus1, totalMonths)) / (Math.pow(1 + rPlus1, totalMonths) - 1) : 0;
    const rPlus2 = ((interestRatePercent + 2) / 100) / 12;
    const monthlyPaymentPlus2 = loanAmount > 0 ? (loanAmount * rPlus2 * Math.pow(1 + rPlus2, totalMonths)) / (Math.pow(1 + rPlus2, totalMonths) - 1) : 0;

    return {
      inputs: { price, downPaymentPercent, interestRatePercent, termYears, monthlyIncome, monthlyRentIncome, vacancyRatePercent },
      units: { price: 'VNĐ', monthlyPayment: 'VNĐ/tháng', totalInterest: 'VNĐ', debtToIncomeRatio: '%', rentalYieldPercent: '%' },
      results: {
        downPaymentAmount: Math.round(downPaymentAmount),
        loanAmount: Math.round(loanAmount),
        monthlyPayment: Math.round(monthlyPayment),
        totalPayment: Math.round(totalPayment),
        totalInterest: Math.round(totalInterest),
        netMonthlyRent: Math.round(netMonthlyRent),
        netCashFlow: Math.round(netCashFlow),
        debtToIncomeRatio: Number(debtToIncomeRatio.toFixed(1)),
        rentalYieldPercent: Number(rentalYieldPercent.toFixed(2)),
        isDtiSafe: debtToIncomeRatio <= 40,
        dtiStatus: debtToIncomeRatio <= 35 ? 'An toàn (DTI <= 35%)' : (debtToIncomeRatio <= 45 ? 'Cảnh báo rủi ro (DTI 35-45%)' : 'Rủi ro tài chính cao (DTI > 45%)')
      },
      whatIf: [
        { scenario: 'Lãi suất tăng +1% (thả nổi)', monthlyPayment: Math.round(monthlyPaymentPlus1), diff: Math.round(monthlyPaymentPlus1 - monthlyPayment) },
        { scenario: 'Lãi suất tăng +2% (thả nổi)', monthlyPayment: Math.round(monthlyPaymentPlus2), diff: Math.round(monthlyPaymentPlus2 - monthlyPayment) }
      ],
      assumptions: [
        'Mô phỏng áp dụng phương thức dư nợ giảm dần theo công thức niên kim cố định (Annuity).',
        'Lãi suất được tính là hằng số suốt thời hạn vay trong kịch bản cơ sở.',
        'Tỷ lệ trống (vacancy rate) tính trung bình 10% thời gian trong năm nếu cho thuê.'
      ],
      limitations: [
        'Chưa tính các khoản phí công chứng, thuế thu nhập cá nhân 2%, lệ phí trước bạ 0.5%.',
        'Lãi suất ngân hàng thực tế thường thả nổi sau thời gian ưu đãi (12-24 tháng).'
      ],
      formulas: [
        'Số tiền vay = Giá BĐS * (1 - % Trả trước)',
        'Tiền trả tháng = [Gốc * r * (1+r)^n] / [(1+r)^n - 1]',
        'DTI = (Tiền trả tháng / Thu nhập hàng tháng) * 100%'
      ]
    };
  },

  /**
   * BUILD PC: Power & Headroom Calculator
   */
  calculatePCPower(input) {
    const cpuTdp = Number(input.cpuTdp) || 65;
    const gpuTdp = Number(input.gpuTdp) || 200;
    const ramCount = Number(input.ramCount) || 2;
    const storageCount = Number(input.storageCount) || 2;
    const psuWattage = Number(input.psuWattage) || 650;

    const baseSystemWatts = 50; // Motherboard, fans, RGB
    const ramWatts = ramCount * 5;
    const storageWatts = storageCount * 7;

    const estimatedPeakWatts = cpuTdp + gpuTdp + baseSystemWatts + ramWatts + storageWatts;
    const minPsuWatts = Math.round(estimatedPeakWatts * 1.15);
    const recommendedPsuWatts = Math.ceil((estimatedPeakWatts * 1.30) / 50) * 50;
    const psuHeadroomPercent = psuWattage > 0 ? Math.round(((psuWattage - estimatedPeakWatts) / psuWattage) * 100) : 0;
    const isPsuSafe = psuWattage >= minPsuWatts;

    return {
      inputs: { cpuTdp, gpuTdp, ramCount, storageCount, psuWattage },
      units: { watts: 'W', psuHeadroomPercent: '%' },
      results: {
        estimatedPeakWatts,
        minPsuWatts,
        recommendedPsuWatts,
        psuHeadroomPercent,
        isPsuSafe,
        statusMessage: isPsuSafe 
          ? (psuHeadroomPercent >= 20 ? 'Nguồn đủ công suất và có headroom an toàn (>=20%).' : 'Nguồn đủ tải nhưng headroom thấp (<20%). Khuyên dùng nguồn lớn hơn.')
          : 'CẢNH BÁO: Công suất nguồn không đủ tải peak tối đa! Nguy cơ sập nguồn.'
      },
      assumptions: [
        'TDP đại diện cho công suất tỏa nhiệt thiết kế, phụ tải ngắn hạn (Transient Spikes) có thể nhỉnh hơn.',
        'Hệ thống gồm bo mạch chủ, quạt case và thiết bị ngoại vi tính trung bình 60-75W.'
      ],
      limitations: [
        'Chưa tính trường hợp ép xung (overclocking) quá mức điện áp của CPU và GPU.'
      ]
    };
  },

  /**
   * CARS: 5-Year Total Cost of Ownership (TCO)
   */
  calculateCarTCO(input) {
    const carPrice = Number(input.carPrice) || 600000000;
    const annualKm = Number(input.annualKm) || 15000;
    const fuelCons = Number(input.fuelConsumptionPer100Km) || 6.5;
    const fuelPrice = Number(input.fuelPricePerLiter) || 24000;
    const annualInsurance = Number(input.annualInsurance) || 8000000;
    const annualMaintenance = Number(input.annualMaintenance) || 8000000;
    const engineType = input.engineType || 'Petrol';
    const years = 5;

    let annualEnergyCost = 0;
    if (engineType === 'Electric') {
      // EV: kWh per 100km ~ 15.2, price 3,850đ/kWh
      annualEnergyCost = (annualKm / 100) * 15.2 * 3850;
    } else {
      const annualFuelLiters = (annualKm / 100) * fuelCons;
      annualEnergyCost = annualFuelLiters * fuelPrice;
    }

    const annualFixedCost = annualInsurance + annualMaintenance + 2160000; // Phí đường bộ & đăng kiểm
    const totalAnnualCost = annualEnergyCost + annualFixedCost;

    // 5-year depreciation: ICE ~ 40%, EV ~ 45%
    const depRate = engineType === 'Electric' ? 0.45 : 0.40;
    const totalDepreciation = carPrice * depRate;
    const remainingValue = carPrice - totalDepreciation;
    const totalRunningCost5Years = totalAnnualCost * years;
    const totalTCO = totalDepreciation + totalRunningCost5Years;
    const costPerKm = totalTCO / (annualKm * years);

    return {
      inputs: { carPrice, annualKm, fuelCons, fuelPrice, engineType, years },
      units: { totalTCO: 'VNĐ', monthlyCost: 'VNĐ/tháng', costPerKm: 'VNĐ/km' },
      results: {
        annualEnergyCost: Math.round(annualEnergyCost),
        totalAnnualCost: Math.round(totalAnnualCost),
        monthlyCost: Math.round(totalAnnualCost / 12),
        totalDepreciation: Math.round(totalDepreciation),
        remainingValue: Math.round(remainingValue),
        totalRunningCost5Years: Math.round(totalRunningCost5Years),
        totalTCO: Math.round(totalTCO),
        costPerKm: Math.round(costPerKm)
      },
      assumptions: [
        `Tỷ lệ khấu hao ước tính sau 5 năm: ${depRate * 100}%.`,
        'Chưa tính chi phí gửi xe định kỳ hàng tháng tại các khu đô thị (ước tính 1.2 - 2.5 triệu/tháng).',
        'Giá năng lượng tính theo mức bình quân hiện hành tại thị trường Việt Nam.'
      ],
      limitations: [
        'Chi phí bảo dưỡng có thể biến động lớn sau mốc 60.000 km (bảo dưỡng lớn cấp 2).'
      ]
    };
  },

  /**
   * MOTORCYCLES: Commuting Cost & Maintenance
   */
  calculateMotorcycleCost(input) {
    const dailyKm = Number(input.dailyKm) || 25;
    const fuelCons = Number(input.fuelConsPer100Km) || 2.0;
    const fuelPrice = Number(input.fuelPrice) || 24000;
    const transmission = input.transmission || 'Scooter';

    const monthlyKm = dailyKm * 30;
    const annualKm = monthlyKm * 12;

    const monthlyFuelLiters = (monthlyKm / 100) * fuelCons;
    const monthlyFuelCost = monthlyFuelLiters * fuelPrice;
    
    // Maintenance: Scooter costs slightly more (CVT oil, belt)
    const monthlyMaintenance = transmission === 'Scooter' ? 120000 : 80000;
    const totalMonthly = monthlyFuelCost + monthlyMaintenance;

    return {
      inputs: { dailyKm, fuelCons, fuelPrice, transmission },
      units: { monthlyCost: 'VNĐ/tháng', costPerKm: 'VNĐ/km' },
      results: {
        monthlyKm,
        annualKm,
        monthlyFuelCost: Math.round(monthlyFuelCost),
        monthlyMaintenance,
        totalMonthlyCost: Math.round(totalMonthly),
        annualRunningCost: Math.round(totalMonthly * 12),
        costPerKm: Math.round(totalMonthly / monthlyKm)
      },
      assumptions: [
        'Tính cho 30 ngày di chuyển mỗi tháng trong khu vực đô thị.',
        'Thay dầu nhớt máy định kỳ mỗi 1.500 - 2.000 km, nhớt láp mỗi 5.000 km đối với xe tay ga.'
      ],
      limitations: [
        'Chưa tính chi phí hao mòn vỏ lốp xe (thay định kỳ sau 20.000 km).'
      ]
    };
  },

  /**
   * HOME: Construction & Renovation Budget Planner
   */
  calculateHomeBudget(input) {
    const landAreaM2 = Number(input.landAreaM2) || 60;
    const floors = Number(input.floors) || 2;
    const packageType = input.packageType || 'medium'; // raw, medium, premium
    const foundationType = input.foundationType || 'strip'; // single, strip, pile
    const roofType = input.roofType || 'concrete'; // corrugated, concrete, tile

    // Coefficients
    const foundationCoeff = foundationType === 'single' ? 0.30 : (foundationType === 'pile' ? 0.40 : 0.50);
    const roofCoeff = roofType === 'corrugated' ? 0.30 : (roofType === 'tile' ? 0.70 : 0.50);
    const floorsCoeff = floors * 1.0;

    const totalCalculatedAreaM2 = landAreaM2 * (foundationCoeff + floorsCoeff + roofCoeff);

    const priceMap = {
      raw: 3800000,
      medium: 6200000,
      premium: 8500000
    };
    const unitPrice = priceMap[packageType] || 6200000;

    const baseCost = totalCalculatedAreaM2 * unitPrice;
    const wasteCost = baseCost * 0.05; // 5% waste rate
    const contingency = baseCost * 0.10; // 10% contingency
    const grandTotal = baseCost + wasteCost + contingency;

    return {
      inputs: { landAreaM2, floors, packageType, foundationType, roofType },
      units: { totalCalculatedAreaM2: 'm²', grandTotal: 'VNĐ' },
      results: {
        totalCalculatedAreaM2: Number(totalCalculatedAreaM2.toFixed(1)),
        unitPricePerM2: unitPrice,
        baseCost: Math.round(baseCost),
        wasteCost: Math.round(wasteCost),
        contingency: Math.round(contingency),
        grandTotal: Math.round(grandTotal)
      },
      assumptions: [
        `Hệ số diện tích quy đổi: Móng (${foundationCoeff * 100}%), Sàn (${floors * 100}%), Mái (${roofCoeff * 100}%).`,
        'Tỷ lệ hao hụt vật tư xây dựng thực tế: 5%.',
        'Khoản dự phòng trượt giá và phát sinh kiến trúc: 10% tổng dự toán.'
      ],
      limitations: [
        'Đây là bảng dự toán định mức tiêu chuẩn, chưa bao gồm gia cố nền đất yếu (ép cọc bê tông sâu) hoặc điều kiện mặt bằng hẻm nhỏ xe tải không vào được.'
      ]
    };
  },

  /**
   * FENG SHUI: Spatial & Microclimate Analysis
   */
  evaluateFengShui(input) {
    const direction = input.direction || 'Nam';
    const orientationData = {
      'Nam': {
        score: 'Rất tốt (Khí hậu ôn hòa)',
        ventilation: 'Đón gió mùa hè mát mẻ, tránh gió rét mùa đông.',
        recommendation: 'Bố trí phòng khách và cửa sổ lớn hướng Nam để tối ưu hóa ánh sáng và đối lưu không khí tự nhiên.'
      },
      'Đông Nam': {
        score: 'Tối ưu (Vượng khí vi khí hậu)',
        ventilation: 'Nắng sớm dịu, thông gió Đông Nam mát lành.',
        recommendation: 'Thích hợp bố trí ban công, phòng ngủ đón nắng sớm tăng cường năng lượng tích cực.'
      },
      'Tây': {
        score: 'Cần giải pháp kỹ thuật (Nắng gắt chiều)',
        ventilation: 'Hấp thụ bức xạ nhiệt cao từ trưa đến chiều tối.',
        recommendation: 'Bắt buộc dùng tường đôi cách nhiệt, lam chắn nắng, kính hộp Low-E hoặc ban công cây xanh làm mát.'
      },
      'Bắc': {
        score: 'Trung bình (Chắn gió lạnh)',
        ventilation: 'Hứng gió mùa Đông Bắc vào mùa đông.',
        recommendation: 'Cửa sổ phía Bắc nên dùng gioăng cao su kín khít, bố trí giếng trời giữa nhà để đón ánh sáng.'
      }
    };

    const evalData = orientationData[direction] || orientationData['Nam'];

    return {
      inputs: { direction },
      results: {
        direction,
        score: evalData.score,
        ventilation: evalData.ventilation,
        recommendation: evalData.recommendation
      },
      assumptions: [
        'Đánh giá dựa trên quy chuẩn vi khí hậu nhiệt đới gió mùa tại Việt Nam kết hợp quan niệm Bát Trạch phong thủy truyền thống.'
      ],
      limitations: [
        'Phân tích chỉ mang tính tham khảo kiến trúc văn hóa, không thay thế cho tính toán năng lượng nhiệt của kỹ sư MEP.'
      ]
    };
  }
};
