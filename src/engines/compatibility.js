/**
 * KnowLab — PC Compatibility & Clearance Engine
 * Deterministic, pure rules engine checking electrical, physical,
 * and interface compatibility across all PC components.
 */

export class CompatibilityEngine {
  /**
   * Run full compatibility & clearance check on a PC build configuration.
   * @param {Object} build - Object containing selected components: { cpu, motherboard, ram, gpu, storage, psu, caseComp, cooler }
   * @returns {Object} Full compatibility diagnostic report
   */
  static check(build) {
    const issues = [];
    const { cpu, motherboard, ram, gpu, storage, psu, caseComp, cooler } = build;

    // 1. CPU & Motherboard Socket Compatibility
    if (cpu && motherboard) {
      if (cpu.socket !== motherboard.socket) {
        issues.push({
          severity: "error",
          type: "SOCKET_MISMATCH",
          components: ["CPU", "Motherboard"],
          title: "Xung đột chân cắm (Socket Mismatch)",
          message: `CPU ${cpu.name} dùng socket ${cpu.socket}, nhưng bo mạch chủ ${motherboard.name} dùng socket ${motherboard.socket}.`,
          explanation: "Chân cắm vật lý giữa vi xử lý và bo mạch chủ hoàn toàn khác nhau. Không thể lắp đặt.",
          recommendation: `Hãy chọn bo mạch chủ có socket ${cpu.socket} (ví dụ các dòng chipset tương ứng), hoặc đổi CPU tương thích ${motherboard.socket}.`
        });
      }
    }

    // 2. RAM & Motherboard DDR Generation Compatibility
    if (ram && motherboard) {
      if (ram.generation !== motherboard.ramType) {
        issues.push({
          severity: "error",
          type: "RAM_GENERATION_MISMATCH",
          components: ["RAM", "Motherboard"],
          title: "Xung đột thế hệ bộ nhớ RAM (DDR Generation Mismatch)",
          message: `RAM ${ram.name} là chuẩn ${ram.generation}, nhưng bo mạch chủ ${motherboard.name} chỉ hỗ trợ khe cắm ${motherboard.ramType}.`,
          explanation: "Rãnh khuyết chân cắm (notch key) và điện áp giữa DDR4 và DDR5 khác nhau. Không thể cắm vừa về mặt cơ học.",
          recommendation: `Chọn kit RAM chuẩn ${motherboard.ramType} hoặc đổi bo mạch chủ sang phiên bản hỗ trợ ${ram.generation}.`
        });
      }

      // Check RAM slot count
      if (ram.modules > motherboard.ramSlots) {
        issues.push({
          severity: "error",
          type: "RAM_SLOTS_EXCEEDED",
          components: ["RAM", "Motherboard"],
          title: "Vượt quá số khe cắm RAM trên bo mạch chủ",
          message: `Bộ RAM gồm ${ram.modules} thanh, nhưng bo mạch chủ chỉ có ${motherboard.ramSlots} khe cắm RAM.`,
          explanation: "Không đủ khe cắm vật lý để gắn toàn bộ các thanh RAM trong kit.",
          recommendation: `Chọn kit RAM ${motherboard.ramSlots} thanh hoặc đổi bo mạch chủ có 4 khe RAM.`
        });
      }
    }

    // 3. Motherboard Form Factor vs Case Support
    if (motherboard && caseComp) {
      const isMoboSupported = caseComp.formFactorSupport.some(
        f => f.toLowerCase() === motherboard.formFactor.toLowerCase()
      );
      if (!isMoboSupported) {
        issues.push({
          severity: "error",
          type: "FORM_FACTOR_MISMATCH",
          components: ["Motherboard", "Case"],
          title: "Kích thước bo mạch chủ không vừa vỏ Case",
          message: `Bo mạch chủ chuẩn ${motherboard.formFactor}, nhưng vỏ case ${caseComp.name} chỉ hỗ trợ: ${caseComp.formFactorSupport.join(", ")}.`,
          explanation: "Khoang lắp đặt và các vị trí ốc cố định (standoffs) trong thùng máy không đủ diện tích cho bo mạch chủ này.",
          recommendation: `Chọn vỏ case hỗ trợ kích thước ${motherboard.formFactor} (ví dụ Mid-Tower ATX) hoặc chọn bo mạch chủ chuẩn ${caseComp.formFactorSupport[0]}.`
        });
      }
    }

    // 4. GPU Length Clearance Check
    if (gpu && caseComp) {
      if (gpu.lengthMm > caseComp.maxGpuLengthMm) {
        issues.push({
          severity: "error",
          type: "GPU_CLEARANCE_EXCEEDED",
          components: ["GPU", "Case"],
          title: "Card đồ họa vượt quá chiều dài cho phép của Case (Clearance Check)",
          message: `Card đồ họa ${gpu.name} dài ${gpu.lengthMm}mm, nhưng case ${caseComp.name} chỉ cho phép tối đa ${caseComp.maxGpuLengthMm}mm.`,
          explanation: "Card đồ họa sẽ bị cấn vào quạt trước hoặc khay ổ cứng của thùng máy, không thể lắp vừa.",
          recommendation: `Chọn vỏ case có khoang GPU dài tối thiểu ${gpu.lengthMm + 20}mm, hoặc chọn phiên bản card đồ họa 2 quạt ngắn hơn.`
        });
      } else if (caseComp.maxGpuLengthMm - gpu.lengthMm < 15) {
        issues.push({
          severity: "warning",
          type: "GPU_CLEARANCE_TIGHT",
          components: ["GPU", "Case"],
          title: "Khoảng trống lắp Card đồ họa rất sát",
          message: `GPU dài ${gpu.lengthMm}mm, case tối đa ${caseComp.maxGpuLengthMm}mm (còn dư ${caseComp.maxGpuLengthMm - gpu.lengthMm}mm).`,
          explanation: "Khoảng trống hẹp có thể gây khó khăn khi luồn dây nguồn hoặc lắp thêm quạt/tản nhiệt nước phía trước.",
          recommendation: "Kiểm tra kỹ độ dày tản nhiệt nước phía trước nếu có dự định lắp đặt."
        });
      }
    }

    // 5. CPU Cooler Height Clearance Check
    if (cooler && caseComp) {
      if (cooler.coolerType === "Air Cooler" && cooler.heightMm > caseComp.maxCpuCoolerHeightMm) {
        issues.push({
          severity: "error",
          type: "COOLER_CLEARANCE_EXCEEDED",
          components: ["Cooler", "Case"],
          title: "Chiều cao tản nhiệt CPU vượt quá nắp hông Case",
          message: `Tản khí ${cooler.name} cao ${cooler.heightMm}mm, trong khi case ${caseComp.name} chỉ cho phép chiều cao tối đa ${caseComp.maxCpuCoolerHeightMm}mm.`,
          explanation: "Ống đồng tản nhiệt sẽ cấn vào mặt kính cường lực hoặc nắp hông thùng máy, không thể đóng nắp case.",
          recommendation: `Chọn tản khí có chiều cao nhỏ hơn ${caseComp.maxCpuCoolerHeightMm}mm hoặc đổi case rộng hơn.`
        });
      } else if (cooler.coolerType === "AIO Liquid Cooler" && cooler.radiatorSizeMm > 0) {
        const radSupported = caseComp.supportedRadiatorSizesMm && caseComp.supportedRadiatorSizesMm.includes(cooler.radiatorSizeMm);
        if (!radSupported) {
          issues.push({
            severity: "error",
            type: "RADIATOR_CLEARANCE_MISMATCH",
            components: ["Cooler", "Case"],
            title: "Kích thước Radiator tản nhiệt nước không vừa Case",
            message: `Tản nước ${cooler.name} dùng két nước ${cooler.radiatorSizeMm}mm, nhưng case ${caseComp.name} chỉ hỗ trợ: ${caseComp.supportedRadiatorSizesMm ? caseComp.supportedRadiatorSizesMm.join("mm, ") : "không có"}mm.`,
            explanation: "Thùng máy không có đủ vị trí bắt ốc và khoảng hở thông gió cho radiator kích cỡ này.",
            recommendation: `Chọn radiator kích thước phù hợp với case (ví dụ ${caseComp.supportedRadiatorSizesMm ? caseComp.supportedRadiatorSizesMm[0] : 240}mm) hoặc đổi vỏ case lớn hơn.`
          });
        }
      }
    }

    // 6. CPU Cooler Socket Support Check
    if (cooler && cpu) {
      const isSocketSupported = cooler.supportedSockets.some(
        s => s.toLowerCase() === cpu.socket.toLowerCase()
      );
      if (!isSocketSupported) {
        issues.push({
          severity: "error",
          type: "COOLER_SOCKET_MISMATCH",
          components: ["Cooler", "CPU"],
          title: "Tản nhiệt không hỗ trợ ngàm Socket của CPU",
          message: `Tản nhiệt ${cooler.name} chỉ hỗ trợ ngàm: ${cooler.supportedSockets.join(", ")}; nhưng CPU dùng socket ${cpu.socket}.`,
          explanation: "Không thể bắt ốc cố định cụm tản nhiệt vào bo mạch chủ và bề mặt CPU nếu thiếu ngàm tương thích.",
          recommendation: `Chọn tản nhiệt có ngàm hỗ trợ ${cpu.socket} đi kèm sẵn trong hộp.`
        });
      }
    }

    // 7. Power & PSU Connectors Calculation
    const power = this.calculatePower(build);

    if (psu) {
      if (psu.wattageWatts < power.minPsuWatts) {
        issues.push({
          severity: "error",
          type: "PSU_INSUFFICIENT_POWER",
          components: ["PSU"],
          title: "Bộ nguồn thiếu công suất an toàn (Power Overload Risk)",
          message: `Nguồn ${psu.name} (${psu.wattageWatts}W) thấp hơn mức tối thiểu yêu cầu ${power.minPsuWatts}W của hệ thống.`,
          explanation: `Ước tính tải tối đa (Peak Load) hệ thống là ${power.totalPeakWatts}W. Cần tối thiểu ${power.minPsuWatts}W để tránh sập nguồn khi chơi game hoặc render nặng.`,
          recommendation: `Đề xuất nâng cấp nguồn lên từ ${power.recommendedPsuWatts}W để đảm bảo độ bền và headroom an toàn 20-30%.`
        });
      } else if (power.headroomPercent < 20) {
        issues.push({
          severity: "warning",
          type: "PSU_LOW_HEADROOM",
          components: ["PSU"],
          title: "Độ dự phòng công suất nguồn (Headroom) ở mức thấp",
          message: `Bộ nguồn hiện có mức headroom ${power.headroomPercent}% (Dưới ngưỡng an toàn khuyến nghị 20% - 30%).`,
          explanation: "Bộ nguồn hoạt động sát công suất tối đa sẽ phát nhiệt nhiều hơn, quạt ồn hơn và giảm hiệu suất chuyển đổi điện năng.",
          recommendation: `Cân nhắc nâng nguồn lên ${power.recommendedPsuWatts}W để đạt điểm rơi hiệu suất tối ưu (80 Plus Gold).`
        });
      }

      // Check PSU Connectors for GPU
      if (gpu && psu.connectors) {
        if (gpu.powerConnectors.some(c => c.includes("12VHPWR")) && !psu.connectors.has12Vhpwr) {
          issues.push({
            severity: "warning",
            type: "PSU_CONNECTOR_12VHPWR_ADAPTER",
            components: ["PSU", "GPU"],
            title: "Nguồn không có sẵn dây cắm chuẩn 12VHPWR PCIe 5.0",
            message: `Card ${gpu.name} dùng cổng 16-pin (12VHPWR), nguồn ${psu.name} chỉ có đầu cắm PCIe 8-pin truyền thống.`,
            explanation: "Bạn sẽ phải dùng cáp chuyển đổi (adapter) từ 2x hoặc 3x 8-pin đi kèm card. Dây cáp sẽ chiếm diện tích khoang máy.",
            recommendation: "Nếu có thể, hãy ưu tiên chọn bộ nguồn chuẩn ATX 3.0 có sẵn cổng và dây 12VHPWR 450W/600W nguyên bản."
          });
        }
      }
    }

    const hasErrors = issues.some(i => i.severity === "error");
    const hasWarnings = issues.some(i => i.severity === "warning");

    let status = "COMPATIBLE";
    let statusSummary = "Tất cả linh kiện đã chọn tương thích hoàn toàn về điện áp và kích thước.";
    if (hasErrors) {
      status = "INCOMPATIBLE";
      statusSummary = "Phát hiện xung đột phần cứng nghiêm trọng. Cần điều chỉnh linh kiện trước khi lắp ráp.";
    } else if (hasWarnings) {
      status = "WARNING";
      statusSummary = "Cấu hình có thể lắp đặt nhưng cần lưu ý một số giới hạn kích thước hoặc nguồn.";
    }

    return {
      compatible: !hasErrors,
      status,
      statusSummary,
      issues,
      power
    };
  }

  /**
   * Calculate system power consumption and recommended PSU wattage.
   */
  static calculatePower(build) {
    const { cpu, gpu } = build;
    const cpuTdp = cpu ? (cpu.peakTdpWatts || cpu.tdpWatts || 65) : 65;
    const gpuTdp = gpu ? (gpu.tdpWatts || 150) : 0;
    const otherWatts = 75; // Motherboard, RAM, SSD NVMe, Chassis Fans, Pump

    const totalPeakWatts = Math.round(cpuTdp + gpuTdp + otherWatts);
    const minPsuWatts = Math.round(totalPeakWatts * 1.15); // Min 15% headroom
    const recommendedPsuWatts = Math.ceil((totalPeakWatts * 1.30) / 50) * 50; // Recommended 30% headroom rounded to 50W

    const psuWatts = build.psu ? build.psu.wattageWatts : 0;
    let headroomPercent = 0;
    if (psuWatts > 0) {
      headroomPercent = Math.round(((psuWatts - totalPeakWatts) / psuWatts) * 100);
    }

    return {
      cpuTdp,
      gpuTdp,
      otherWatts,
      totalPeakWatts,
      minPsuWatts,
      recommendedPsuWatts,
      headroomPercent,
      formula: "Total Peak = CPU Peak TDP + GPU TDP + System Base (75W); Recommended PSU = Total Peak x 1.30 (30% Headroom)",
      assumptions: [
        "Công suất CPU tính theo mức tải Turbo/Boost tối đa (Peak TDP/PL2).",
        "Công suất GPU tính theo mức thiết kế tiêu thụ đầy tải (TDP/TBP).",
        "Phụ tải nền hệ thống (Mainboard, 2 thanh RAM, 1 SSD M.2, 4 quạt case) tính trung bình 75W.",
        "Mức độ dự phòng an toàn tiêu chuẩn khuyến nghị là 20% - 30% để nguồn hoạt động ở dải tải hiệu suất cao nhất."
      ]
    };
  }
}
