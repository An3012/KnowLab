/**
 * KnowLab — Normalized Domain Catalog & Structured Data
 * Contains real-world specifications, dimensions, power requirements,
 * price ranges, and provenance metadata for all 6 domains.
 * 
 * SOUCE OF TRUTH: Locale-neutral canonical data format.
 */

export const DomainData = {
  // =========================================================================
  // 1. PC BUILDING CATALOG
  // =========================================================================
  pc: {
    cpus: [
      {
        id: "cpu-intel-13600k",
        name: "Intel Core i5-13600K",
        manufacturer: "Intel",
        socket: "LGA1700",
        generation: "13th Gen (Raptor Lake)",
        cores: 14,
        performanceCores: 6,
        efficientCores: 8,
        threads: 20,
        baseClockGhz: 3.5,
        boostClockGhz: 5.1,
        tdpWatts: 125,
        peakTdpWatts: 181,
        supportedRam: ["DDR4", "DDR5"],
        maxRamSpeedDdr4: 3200,
        maxRamSpeedDdr5: 5600,
        pcieVersion: "PCIe 5.0",
        hasIgpu: true,
        igpuModel: "Intel UHD Graphics 770",
        priceVnd: 7690000,
        source: "Intel Official ARK Specification 2024",
        lastUpdated: "2026-01-15"
      },
      {
        id: "cpu-intel-14700k",
        name: "Intel Core i7-14700K",
        manufacturer: "Intel",
        socket: "LGA1700",
        generation: "14th Gen (Raptor Lake Refresh)",
        cores: 20,
        performanceCores: 8,
        efficientCores: 12,
        threads: 28,
        baseClockGhz: 3.4,
        boostClockGhz: 5.6,
        tdpWatts: 125,
        peakTdpWatts: 253,
        supportedRam: ["DDR4", "DDR5"],
        maxRamSpeedDdr4: 3200,
        maxRamSpeedDdr5: 5600,
        pcieVersion: "PCIe 5.0",
        hasIgpu: true,
        igpuModel: "Intel UHD Graphics 770",
        priceVnd: 10990000,
        source: "Intel Official ARK Specification 2024",
        lastUpdated: "2026-01-15"
      },
      {
        id: "cpu-amd-7600x",
        name: "AMD Ryzen 5 7600X",
        manufacturer: "AMD",
        socket: "AM5",
        generation: "Zen 4 (Ryzen 7000)",
        cores: 6,
        performanceCores: 6,
        efficientCores: 0,
        threads: 12,
        baseClockGhz: 4.7,
        boostClockGhz: 5.3,
        tdpWatts: 105,
        peakTdpWatts: 142,
        supportedRam: ["DDR5"],
        maxRamSpeedDdr5: 5200,
        pcieVersion: "PCIe 5.0",
        hasIgpu: true,
        igpuModel: "AMD Radeon Graphics (2 CUs)",
        priceVnd: 5790000,
        source: "AMD Technical Product Specs 2024",
        lastUpdated: "2026-01-15"
      },
      {
        id: "cpu-amd-7800x3d",
        name: "AMD Ryzen 7 7800X3D (3D V-Cache)",
        manufacturer: "AMD",
        socket: "AM5",
        generation: "Zen 4 V-Cache",
        cores: 8,
        performanceCores: 8,
        efficientCores: 0,
        threads: 16,
        baseClockGhz: 4.2,
        boostClockGhz: 5.0,
        tdpWatts: 120,
        peakTdpWatts: 162,
        supportedRam: ["DDR5"],
        maxRamSpeedDdr5: 5200,
        pcieVersion: "PCIe 5.0",
        hasIgpu: true,
        igpuModel: "AMD Radeon Graphics",
        priceVnd: 10490000,
        source: "AMD Technical Product Specs 2024",
        lastUpdated: "2026-01-15"
      },
      {
        id: "cpu-amd-5600",
        name: "AMD Ryzen 5 5600",
        manufacturer: "AMD",
        socket: "AM4",
        generation: "Zen 3 (Ryzen 5000)",
        cores: 6,
        performanceCores: 6,
        efficientCores: 0,
        threads: 12,
        baseClockGhz: 3.5,
        boostClockGhz: 4.4,
        tdpWatts: 65,
        peakTdpWatts: 76,
        supportedRam: ["DDR4"],
        maxRamSpeedDdr4: 3200,
        pcieVersion: "PCIe 4.0",
        hasIgpu: false,
        igpuModel: null,
        priceVnd: 2890000,
        source: "AMD Technical Product Specs 2024",
        lastUpdated: "2026-01-15"
      }
    ],

    motherboards: [
      {
        id: "mb-asus-b760-d4",
        name: "ASUS TUF Gaming B760-PLUS WIFI D4",
        manufacturer: "ASUS",
        socket: "LGA1700",
        chipset: "B760",
        formFactor: "ATX",
        supportedCpuGens: ["12th Gen", "13th Gen", "14th Gen"],
        ramType: "DDR4",
        ramSlots: 4,
        maxRamCapacityGb: 128,
        maxRamSpeedMhz: 5333,
        m2Slots: 3,
        sataPorts: 4,
        pcieX16Slots: 2,
        hasWifi: true,
        lanSpeedGbps: 2.5,
        vrmPhases: "12+1",
        priceVnd: 4190000,
        source: "ASUS TUF Specsheet 2024",
        lastUpdated: "2026-01-15"
      },
      {
        id: "mb-msi-b760m-d5",
        name: "MSI MAG B760M MORTAR WIFI DDR5",
        manufacturer: "MSI",
        socket: "LGA1700",
        chipset: "B760",
        formFactor: "Micro-ATX",
        supportedCpuGens: ["12th Gen", "13th Gen", "14th Gen"],
        ramType: "DDR5",
        ramSlots: 4,
        maxRamCapacityGb: 192,
        maxRamSpeedMhz: 7000,
        m2Slots: 2,
        sataPorts: 6,
        pcieX16Slots: 2,
        hasWifi: true,
        lanSpeedGbps: 2.5,
        vrmPhases: "12+1+1",
        priceVnd: 4690000,
        source: "MSI Official Specifications 2024",
        lastUpdated: "2026-01-15"
      },
      {
        id: "mb-gigabyte-b650-gaming-x",
        name: "Gigabyte B650 GAMING X AX",
        manufacturer: "Gigabyte",
        socket: "AM5",
        chipset: "B650",
        formFactor: "ATX",
        supportedCpuGens: ["Ryzen 7000", "Ryzen 8000", "Ryzen 9000"],
        ramType: "DDR5",
        ramSlots: 4,
        maxRamCapacityGb: 192,
        maxRamSpeedMhz: 6400,
        m2Slots: 3,
        sataPorts: 4,
        pcieX16Slots: 3,
        hasWifi: true,
        lanSpeedGbps: 2.5,
        vrmPhases: "8+2+1",
        priceVnd: 4890000,
        source: "Gigabyte B650 Product Manual 2024",
        lastUpdated: "2026-01-15"
      },
      {
        id: "mb-asrock-b650m-hdv",
        name: "ASRock B650M-HDV/M.2",
        manufacturer: "ASRock",
        socket: "AM5",
        chipset: "B650",
        formFactor: "Micro-ATX",
        supportedCpuGens: ["Ryzen 7000", "Ryzen 8000"],
        ramType: "DDR5",
        ramSlots: 2,
        maxRamCapacityGb: 96,
        maxRamSpeedMhz: 6400,
        m2Slots: 2,
        sataPorts: 4,
        pcieX16Slots: 2,
        hasWifi: false,
        lanSpeedGbps: 2.5,
        vrmPhases: "8+2+1",
        priceVnd: 2990000,
        source: "ASRock Technical Sheet 2024",
        lastUpdated: "2026-01-15"
      },
      {
        id: "mb-asus-b550m-plus",
        name: "ASUS TUF Gaming B550M-PLUS (Wi-Fi) II",
        manufacturer: "ASUS",
        socket: "AM4",
        chipset: "B550",
        formFactor: "Micro-ATX",
        supportedCpuGens: ["Ryzen 3000", "Ryzen 4000", "Ryzen 5000"],
        ramType: "DDR4",
        ramSlots: 4,
        maxRamCapacityGb: 128,
        maxRamSpeedMhz: 4866,
        m2Slots: 2,
        sataPorts: 4,
        pcieX16Slots: 2,
        hasWifi: true,
        lanSpeedGbps: 2.5,
        vrmPhases: "8+2",
        priceVnd: 3250000,
        source: "ASUS Support Documentation 2024",
        lastUpdated: "2026-01-15"
      }
    ],

    gpus: [
      {
        id: "gpu-rtx-4060",
        name: "NVIDIA GeForce RTX 4060 Twin Edge",
        brand: "Zotac",
        chip: "RTX 4060",
        vramGb: 8,
        vramType: "GDDR6",
        tdpWatts: 115,
        recommendedPsuWatts: 500,
        lengthMm: 221,
        thicknessSlots: 2.0,
        heightMm: 123,
        powerConnectors: ["1x 8-pin"],
        pcieVersion: "PCIe 4.0 x8",
        videoOutputs: ["3x DisplayPort 1.4a", "1x HDMI 2.1a"],
        priceVnd: 7890000,
        source: "ZOTAC Official Specs 2024",
        lastUpdated: "2026-01-15"
      },
      {
        id: "gpu-rtx-4070-super",
        name: "NVIDIA GeForce RTX 4070 Super Dual",
        brand: "ASUS",
        chip: "RTX 4070 Super",
        vramGb: 12,
        vramType: "GDDR6X",
        tdpWatts: 220,
        recommendedPsuWatts: 650,
        lengthMm: 267,
        thicknessSlots: 2.5,
        heightMm: 134,
        powerConnectors: ["1x 16-pin (12VHPWR)"],
        pcieVersion: "PCIe 4.0 x16",
        videoOutputs: ["3x DisplayPort 1.4a", "1x HDMI 2.1a"],
        priceVnd: 16990000,
        source: "ASUS Dual RTX 4070 Super Specsheet 2024",
        lastUpdated: "2026-01-15"
      },
      {
        id: "gpu-rtx-4080-super",
        name: "NVIDIA GeForce RTX 4080 Super Gaming OC",
        brand: "Gigabyte",
        chip: "RTX 4080 Super",
        vramGb: 16,
        vramType: "GDDR6X",
        tdpWatts: 320,
        recommendedPsuWatts: 750,
        lengthMm: 342,
        thicknessSlots: 3.5,
        heightMm: 150,
        powerConnectors: ["1x 16-pin (12VHPWR)"],
        pcieVersion: "PCIe 4.0 x16",
        videoOutputs: ["3x DisplayPort 1.4a", "1x HDMI 2.1a"],
        priceVnd: 28990000,
        source: "Gigabyte Gaming OC Manual 2024",
        lastUpdated: "2026-01-15"
      },
      {
        id: "gpu-rx-7800xt",
        name: "AMD Radeon RX 7800 XT Pulse",
        brand: "Sapphire",
        chip: "RX 7800 XT",
        vramGb: 16,
        vramType: "GDDR6",
        tdpWatts: 263,
        recommendedPsuWatts: 700,
        lengthMm: 280,
        thicknessSlots: 2.5,
        heightMm: 129,
        powerConnectors: ["2x 8-pin"],
        pcieVersion: "PCIe 4.0 x16",
        videoOutputs: ["2x DisplayPort 2.1", "2x HDMI 2.1"],
        priceVnd: 14500000,
        source: "Sapphire Pulse Specsheet 2024",
        lastUpdated: "2026-01-15"
      }
    ],

    ram: [
      {
        id: "ram-corsair-ddr4-16gb",
        name: "Corsair Vengeance LPX 16GB (2x8GB) DDR4 3200MHz",
        generation: "DDR4",
        capacityGb: 16,
        modules: 2,
        speedMhz: 3200,
        casLatency: "CL16",
        voltageVolts: 1.35,
        rgb: false,
        heightMm: 34,
        priceVnd: 990000,
        source: "Corsair Product Catalog 2024",
        lastUpdated: "2026-01-15"
      },
      {
        id: "ram-kingston-ddr4-32gb",
        name: "Kingston FURY Beast 32GB (2x16GB) DDR4 3200MHz",
        generation: "DDR4",
        capacityGb: 32,
        modules: 2,
        speedMhz: 3200,
        casLatency: "CL16",
        voltageVolts: 1.35,
        rgb: false,
        heightMm: 34,
        priceVnd: 1850000,
        source: "Kingston Official Specs 2024",
        lastUpdated: "2026-01-15"
      },
      {
        id: "ram-corsair-ddr5-32gb",
        name: "Corsair Vengeance 32GB (2x16GB) DDR5 6000MHz",
        generation: "DDR5",
        capacityGb: 32,
        modules: 2,
        speedMhz: 6000,
        casLatency: "CL36",
        voltageVolts: 1.35,
        rgb: false,
        heightMm: 35,
        priceVnd: 2890000,
        source: "Corsair Product Catalog 2024",
        lastUpdated: "2026-01-15"
      },
      {
        id: "ram-gskill-ddr5-32gb-rgb",
        name: "G.Skill Trident Z5 Neo RGB 32GB (2x16GB) DDR5 6000MHz AMD EXPO",
        generation: "DDR5",
        capacityGb: 32,
        modules: 2,
        speedMhz: 6000,
        casLatency: "CL30",
        voltageVolts: 1.35,
        rgb: true,
        heightMm: 44,
        priceVnd: 3490000,
        source: "G.Skill Product Database 2024",
        lastUpdated: "2026-01-15"
      }
    ],

    storage: [
      {
        id: "ssd-samsung-980pro-1tb",
        name: "Samsung 980 PRO 1TB M.2 NVMe PCIe 4.0",
        formFactor: "M.2 2280",
        interface: "PCIe 4.0 x4, NVMe 1.3c",
        capacityGb: 1000,
        readSpeedMbps: 7000,
        writeSpeedMbps: 5000,
        tbwTerabytes: 600,
        priceVnd: 2590000,
        source: "Samsung Semiconductor Specs 2024",
        lastUpdated: "2026-01-15"
      },
      {
        id: "ssd-kingston-nv2-1tb",
        name: "Kingston NV2 1TB M.2 2280 PCIe 4.0",
        formFactor: "M.2 2280",
        interface: "PCIe 4.0 x4, NVMe",
        capacityGb: 1000,
        readSpeedMbps: 3500,
        writeSpeedMbps: 2100,
        tbwTerabytes: 320,
        priceVnd: 1590000,
        source: "Kingston NV2 Specsheet 2024",
        lastUpdated: "2026-01-15"
      },
      {
        id: "ssd-crucial-bx500-1tb",
        name: "Crucial BX500 1TB 2.5-inch SATA III",
        formFactor: "2.5-inch SATA",
        interface: "SATA III 6Gb/s",
        capacityGb: 1000,
        readSpeedMbps: 540,
        writeSpeedMbps: 500,
        tbwTerabytes: 360,
        priceVnd: 1450000,
        source: "Crucial Product Manual 2024",
        lastUpdated: "2026-01-15"
      }
    ],

    psus: [
      {
        id: "psu-cooler-master-550w",
        name: "Cooler Master MWE 550 Bronze V2 550W",
        wattageWatts: 550,
        efficiencyRating: "80 Plus Bronze",
        modularType: "Non-Modular",
        formFactor: "ATX",
        connectors: {
          motherboard24Pin: 1,
          cpu8Pin: 1,
          pcie8Pin: 2,
          sata: 6,
          has12Vhpwr: false
        },
        priceVnd: 1290000,
        source: "Cooler Master Tech Specs 2024",
        lastUpdated: "2026-01-15"
      },
      {
        id: "psu-corsair-cv650",
        name: "Corsair CV650 650W 80 Plus Bronze",
        wattageWatts: 650,
        efficiencyRating: "80 Plus Bronze",
        modularType: "Non-Modular",
        formFactor: "ATX",
        connectors: {
          motherboard24Pin: 1,
          cpu8Pin: 2,
          pcie8Pin: 2,
          sata: 7,
          has12Vhpwr: false
        },
        priceVnd: 1550000,
        source: "Corsair CV Series Tech Specs 2024",
        lastUpdated: "2026-01-15"
      },
      {
        id: "psu-corsair-rm750e",
        name: "Corsair RM750e 750W 80 Plus Gold ATX 3.0",
        wattageWatts: 750,
        efficiencyRating: "80 Plus Gold",
        modularType: "Fully Modular",
        formFactor: "ATX",
        connectors: {
          motherboard24Pin: 1,
          cpu8Pin: 2,
          pcie8Pin: 3,
          sata: 7,
          has12Vhpwr: true
        },
        priceVnd: 2890000,
        source: "Corsair RM750e ATX 3.0 Specsheet 2024",
        lastUpdated: "2026-01-15"
      },
      {
        id: "psu-asus-tuf-850w",
        name: "ASUS TUF Gaming 850W Gold ATX 3.0",
        wattageWatts: 850,
        efficiencyRating: "80 Plus Gold",
        modularType: "Fully Modular",
        formFactor: "ATX",
        connectors: {
          motherboard24Pin: 1,
          cpu8Pin: 2,
          pcie8Pin: 3,
          sata: 5,
          has12Vhpwr: true
        },
        priceVnd: 3690000,
        source: "ASUS TUF PSU Specsheet 2024",
        lastUpdated: "2026-01-15"
      }
    ],

    cases: [
      {
        id: "case-xigmatek-nyx",
        name: "Xigmatek NYX Air 3F (Compact Micro-ATX)",
        formFactorSupport: ["Micro-ATX", "Mini-ITX"],
        maxGpuLengthMm: 315,
        maxCpuCoolerHeightMm: 160,
        maxPsuLengthMm: 165,
        supportedRadiatorSizesMm: [120, 240],
        driveBays35: 2,
        driveBays25: 2,
        expansionSlots: 4,
        priceVnd: 750000,
        source: "Xigmatek NYX Air Manual 2024",
        lastUpdated: "2026-01-15"
      },
      {
        id: "case-montech-air-903",
        name: "Montech AIR 903 MAX (High Airflow Mid-Tower)",
        formFactorSupport: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
        maxGpuLengthMm: 400,
        maxCpuCoolerHeightMm: 180,
        maxPsuLengthMm: 240,
        supportedRadiatorSizesMm: [120, 240, 280, 360],
        driveBays35: 2,
        driveBays25: 5,
        expansionSlots: 7,
        priceVnd: 1650000,
        source: "Montech Product Specification 2024",
        lastUpdated: "2026-01-15"
      },
      {
        id: "case-lianli-o11d-mini",
        name: "Lian Li O11 Dynamic Mini (Dual Chamber Compact)",
        formFactorSupport: ["ATX", "Micro-ATX", "Mini-ITX"],
        maxGpuLengthMm: 395,
        maxCpuCoolerHeightMm: 170,
        maxPsuLengthMm: 130,
        supportedRadiatorSizesMm: [120, 240, 280, 360],
        driveBays35: 2,
        driveBays25: 2,
        expansionSlots: 7,
        priceVnd: 2650000,
        source: "Lian Li O11D Mini Specsheet 2024",
        lastUpdated: "2026-01-15"
      }
    ],

    coolers: [
      {
        id: "cooler-thermalright-ax120",
        name: "Thermalright Assassin X 120 Refined SE",
        coolerType: "Air Cooler",
        heightMm: 148,
        supportedSockets: ["LGA1700", "LGA1200", "LGA115x", "AM4", "AM5"],
        tdpRatingWatts: 180,
        fansCount: 1,
        radiatorSizeMm: 0,
        priceVnd: 390000,
        source: "Thermalright Specsheet 2024",
        lastUpdated: "2026-01-15"
      },
      {
        id: "cooler-thermalright-peerless-120",
        name: "Thermalright Peerless Assassin 120 SE (Dual Tower)",
        coolerType: "Air Cooler",
        heightMm: 155,
        supportedSockets: ["LGA1700", "LGA1200", "AM4", "AM5"],
        tdpRatingWatts: 245,
        fansCount: 2,
        radiatorSizeMm: 0,
        priceVnd: 890000,
        source: "Thermalright Lab Tests 2024",
        lastUpdated: "2026-01-15"
      },
      {
        id: "cooler-deepcool-ls720",
        name: "DeepCool LS720 360mm AIO Liquid Cooler",
        coolerType: "AIO Liquid Cooler",
        heightMm: 55,
        supportedSockets: ["LGA1700", "LGA1200", "AM4", "AM5", "TR4"],
        tdpRatingWatts: 300,
        fansCount: 3,
        radiatorSizeMm: 360,
        priceVnd: 2790000,
        source: "DeepCool Product Manual 2024",
        lastUpdated: "2026-01-15"
      }
    ],

    benchmarks: [
      {
        game: "Cyberpunk 2077 (Phantom Liberty)",
        resolution: "1440p (2560x1440)",
        graphicsPreset: "Ultra, Ray Tracing Off",
        testedCpu: "Intel Core i5-13600K",
        testedGpu: "RTX 4070 Super",
        testedRam: "32GB DDR5-6000",
        avgFps: 94,
        p1LowFps: 76,
        testDate: "2024-03-10",
        source: "Hardware Unboxed GPU Benchmark Database",
        sourceUrl: "https://youtube.com/hardwareunboxed"
      },
      {
        game: "Black Myth: Wukong",
        resolution: "1440p (2560x1440)",
        graphicsPreset: "Very High, TSR 100%",
        testedCpu: "AMD Ryzen 7 7800X3D",
        testedGpu: "RTX 4070 Super",
        testedRam: "32GB DDR5-6000",
        avgFps: 82,
        p1LowFps: 68,
        testDate: "2024-09-02",
        source: "TechSpot Game Benchmark Test Suite",
        sourceUrl: "https://techspot.com"
      },
      {
        game: "Counter-Strike 2",
        resolution: "1080p (1920x1080)",
        graphicsPreset: "Very High Competitive",
        testedCpu: "AMD Ryzen 7 7800X3D",
        testedGpu: "RTX 4060",
        testedRam: "32GB DDR5-6000",
        avgFps: 345,
        p1LowFps: 220,
        testDate: "2024-04-12",
        source: "Gamers Nexus Benchmarks",
        sourceUrl: "https://gamersnexus.net"
      }
    ]
  },

  // =========================================================================
  // 2. REAL ESTATE CATALOG & PROFILES
  // =========================================================================
  realEstate: {
    propertyTypes: [
      {
        id: "re-condo",
        name: "Căn Hộ Chung Cư Thương Mại",
        typicalDownPaymentMinPercent: 20,
        typicalLoanTermYears: 20,
        legalDocumentTypes: ["Sổ Hồng Lâu Dài", "Hợp Đồng Mua Bán (HĐMB)"],
        averageMaintenanceFeePerM2: 12000,
        typicalRentalYieldPercent: 4.5,
        appreciationRateAnnualPercent: 6.0,
        pricePerM2RangeVnd: { min: 38000000, max: 95000000 }
      },
      {
        id: "re-townhouse",
        name: "Nhà Phố / Liền Kề",
        typicalDownPaymentMinPercent: 30,
        typicalLoanTermYears: 25,
        legalDocumentTypes: ["Sổ Đỏ Riêng", "Giấy Phép Xây Dựng"],
        averageMaintenanceFeePerM2: 0,
        typicalRentalYieldPercent: 2.8,
        appreciationRateAnnualPercent: 9.5,
        pricePerM2RangeVnd: { min: 70000000, max: 220000000 }
      },
      {
        id: "re-land",
        name: "Đất Nền Thổ Cư",
        typicalDownPaymentMinPercent: 50,
        typicalLoanTermYears: 15,
        legalDocumentTypes: ["Sổ Đỏ Thổ Cư (ONT/ODT)"],
        averageMaintenanceFeePerM2: 0,
        typicalRentalYieldPercent: 0,
        appreciationRateAnnualPercent: 12.0,
        pricePerM2RangeVnd: { min: 25000000, max: 120000000 }
      }
    ],

    sampleProperties: [
      {
        id: "prop-hcm-q7-2pn",
        title: "Căn Hộ 2PN Sunrise Riverside (Quận 7, TP.HCM)",
        propertyType: "re-condo",
        location: "Quận 7, TP. Hồ Chí Minh",
        grossAreaM2: 70.0,
        netAreaM2: 64.8,
        priceVnd: 2850000000,
        pricePerM2NetVnd: 43981481,
        monthlyRentEstimatedVnd: 12000000,
        monthlyManagementFeeVnd: 780000,
        legalStatus: "Đã Có Sổ Hồng Riêng",
        source: "Khảo Sát Giao Dịch Thực Tế Batdongsan.com.vn Q1/2026",
        lastUpdated: "2026-02-01"
      },
      {
        id: "prop-hn-caugiay-3pn",
        title: "Căn Hộ 3PN D'Capitale Trần Duy Hưng (Cầu Giấy, Hà Nội)",
        propertyType: "re-condo",
        location: "Cầu Giấy, Hà Nội",
        grossAreaM2: 95.0,
        netAreaM2: 88.5,
        priceVnd: 5600000000,
        pricePerM2NetVnd: 63276836,
        monthlyRentEstimatedVnd: 21000000,
        monthlyManagementFeeVnd: 1400000,
        legalStatus: "Hợp Đồng Mua Bán (Chờ Cấp Sổ)",
        source: "Khảo Sát Batdongsan.com.vn Q1/2026",
        lastUpdated: "2026-02-01"
      }
    ]
  },

  // =========================================================================
  // 3. CARS CATALOG & PROFILES
  // =========================================================================
  cars: {
    models: [
      {
        id: "car-vfe34",
        name: "VinFast VF e34 (Xe Điện EV)",
        segment: "C-SUV",
        engineType: "Electric",
        batteryCapacityKwh: 42.0,
        rangePerChargeKm: 318,
        powerHp: 147,
        torqueNm: 242,
        dimensionsMm: { length: 4300, width: 1768, height: 1613, wheelbase: 2611 },
        curbWeightKg: 1490,
        energyConsumptionPer100Km: "15.2 kWh",
        energyCostPer100KmEstimatedVnd: 58520,
        annualMaintenanceCostEstimatedVnd: 4500000,
        annualDepreciationPercent: 11.0,
        priceVnd: 710000000,
        warrantyYears: 10,
        source: "VinFast Auto Official Spec Sheet 2024",
        lastUpdated: "2026-01-20"
      },
      {
        id: "car-hyundai-creta",
        name: "Hyundai Creta 1.5L Tiêu Chuẩn (Xe Xăng ICE)",
        segment: "B-SUV",
        engineType: "Petrol",
        batteryCapacityKwh: 0,
        rangePerChargeKm: 650,
        powerHp: 115,
        torqueNm: 144,
        dimensionsMm: { length: 4315, width: 1790, height: 1660, wheelbase: 2610 },
        curbWeightKg: 1165,
        energyConsumptionPer100Km: "6.3 Lít",
        energyCostPer100KmEstimatedVnd: 151200,
        annualMaintenanceCostEstimatedVnd: 9500000,
        annualDepreciationPercent: 9.5,
        priceVnd: 599000000,
        warrantyYears: 5,
        source: "TC Motor Hyundai Vietnam Spec 2024",
        lastUpdated: "2026-01-20"
      },
      {
        id: "car-mazda3",
        name: "Mazda 3 1.5L Luxury Sedan (Xe Xăng ICE)",
        segment: "C-Sedan",
        engineType: "Petrol",
        batteryCapacityKwh: 0,
        rangePerChargeKm: 700,
        powerHp: 110,
        torqueNm: 146,
        dimensionsMm: { length: 4660, width: 1795, height: 1440, wheelbase: 2725 },
        curbWeightKg: 1330,
        energyConsumptionPer100Km: "6.1 Lít",
        energyCostPer100KmEstimatedVnd: 146400,
        annualMaintenanceCostEstimatedVnd: 11000000,
        annualDepreciationPercent: 10.0,
        priceVnd: 619000000,
        warrantyYears: 3,
        source: "Thaco Mazda Official Catalog 2024",
        lastUpdated: "2026-01-20"
      }
    ]
  },

  // =========================================================================
  // 4. MOTORCYCLES CATALOG & PROFILES
  // =========================================================================
  motorcycles: {
    models: [
      {
        id: "moto-vision",
        name: "Honda Vision 110cc (Tay Ga Đô Thị)",
        transmissionType: "CVT Tự Động (Dây Curoa)",
        displacementCc: 109.5,
        enginePowerHp: 8.8,
        fuelConsumptionPer100Km: 1.85,
        fuelTankLiters: 4.9,
        curbWeightKg: 95,
        brakeFront: "Đĩa Thủy Lực (CBS)",
        brakeRear: "Tang Trống",
        oilChangeIntervalKm: 2000,
        beltChangeIntervalKm: 20000,
        annualMaintenanceCostEstimatedVnd: 1200000,
        priceVnd: 31690000,
        source: "Honda Vietnam Product Specifications 2024",
        lastUpdated: "2026-01-10"
      },
      {
        id: "moto-wave-alpha",
        name: "Honda Wave Alpha 110cc (Xe Số Truyền Thống)",
        transmissionType: "Số 4 Cấp (Xích/Nhông Sên Dĩa)",
        displacementCc: 109.1,
        enginePowerHp: 8.2,
        fuelConsumptionPer100Km: 1.72,
        fuelTankLiters: 3.7,
        curbWeightKg: 97,
        brakeFront: "Tang Trống",
        brakeRear: "Tang Trống",
        oilChangeIntervalKm: 2000,
        beltChangeIntervalKm: 15000,
        annualMaintenanceCostEstimatedVnd: 750000,
        priceVnd: 17859000,
        source: "Honda Vietnam Product Specifications 2024",
        lastUpdated: "2026-01-10"
      },
      {
        id: "moto-vinfast-feliz",
        name: "VinFast Feliz S (Xe Máy Điện Pin LFP)",
        transmissionType: "Động Cơ Điện In-Hub",
        displacementCc: 0,
        enginePowerHp: 4.0,
        fuelConsumptionPer100Km: 0,
        kwhPer100Km: 3.5,
        fuelTankLiters: 0,
        batteryCapacityKwh: 3.5,
        curbWeightKg: 110,
        brakeFront: "Đĩa Thủy Lực",
        brakeRear: "Tang Trống",
        oilChangeIntervalKm: 0,
        beltChangeIntervalKm: 0,
        annualMaintenanceCostEstimatedVnd: 400000,
        priceVnd: 27000000,
        source: "VinFast E-Scooter Technical Specs 2024",
        lastUpdated: "2026-01-10"
      }
    ]
  },

  // =========================================================================
  // 5. HOME & CONSTRUCTION CATALOG
  // =========================================================================
  home: {
    constructionPackages: [
      {
        id: "pkg-raw",
        name: "Xây Dựng Phần Thô & Nhân Công Hoàn Thiện",
        unitPricePerM2Vnd: 3800000,
        includedItems: [
          "Đào móng, đổ bê tông móng, cột, dầm, sàn",
          "Xây tường gạch ống, trát tường trong và ngoài",
          "Lắp đặt hệ thống ống luồn điện và ống cấp thoát nước âm tường",
          "Nhân công ốp lát gạch và quét sơn nước hoàn thiện (chủ nhà cấp vật tư)"
        ],
        laborCostRatio: 0.40,
        materialCostRatio: 0.60,
        wasteRatePercent: 7.0
      },
      {
        id: "pkg-turnkey-medium",
        name: "Chìa Khóa Trao Tay (Gói Vật Liệu Khá)",
        unitPricePerM2Vnd: 6200000,
        includedItems: [
          "Bao gồm toàn bộ phần thô tiêu chuẩn",
          "Gạch lát nền granite 60x60 hoặc 80x80 loại 1",
          "Thiết bị vệ sinh Inax / Caesar cao cấp",
          "Sơn nước Dulux / Jotun lau chùi hiệu quả",
          "Cửa nhôm kính Xingfa hệ 55, kính dán an toàn 8.38mm",
          "Đèn LED downlight âm trần, dây điện Cadivi"
        ],
        laborCostRatio: 0.35,
        materialCostRatio: 0.65,
        wasteRatePercent: 5.0
      },
      {
        id: "pkg-turnkey-premium",
        name: "Chìa Khóa Trao Tay (Gói Cao Cấp Luxury)",
        unitPricePerM2Vnd: 8500000,
        includedItems: [
          "Toàn bộ phần thô kiên cố mác bê tông cao",
          "Gạch nhập khẩu Tây Ban Nha / Ấn Độ khổ lớn",
          "Thiết bị vệ sinh Toto / Kohler nhập khẩu",
          "Hệ thống điều hòa multi âm trần nối ống gió",
          "Cửa gỗ tự nhiên hoặc nhôm kính cầu cách nhiệt",
          "Thiết bị điện thông minh SmartHome"
        ],
        laborCostRatio: 0.30,
        materialCostRatio: 0.70,
        wasteRatePercent: 4.0
      }
    ],

    areaCoefficients: {
      singleFoundationPercent: 30,
      stripFoundationPercent: 50,
      pileFoundationPercent: 40,
      floorSlabPercent: 100,
      corrugatedRoofPercent: 30,
      concreteRoofPercent: 50,
      tileRoofPercent: 70
    }
  },

  // =========================================================================
  // 6. FENG SHUI KNOWLEDGE & METHODOLOGIES
  // =========================================================================
  fengShui: {
    schools: [
      {
        id: "fs-bat-trach",
        name: "Bát Trạch Minh Cảnh (Trường Phái Bát Trạch)",
        origin: "Phong thủy truyền thống phương Đông, lấy quẻ mệnh cá nhân kết hợp phương vị bát quái.",
        methodology: "Chia 8 hướng thành 4 hướng cát (Sinh Khí, Thiên Y, Diên Niên, Phục Vị) và 4 hướng hung (Tuyệt Mệnh, Ngũ Quỷ, Lục Sát, Họa Hại) dựa trên Đông Tứ Mệnh và Tây Tứ Mệnh.",
        scientificMicroclimateAlignment: "Nên ưu tiên phương vị đón nắng sớm (Đông, Đông Nam) và tránh nắng gắt buổi chiều (Tây) bất kể mệnh quái.",
        culturalContextDisclaimer: "Đây là hệ thống phân loại nhân sinh quan văn hóa cổ truyền, không phải quy luật vật lý tự nhiên bất biến."
      },
      {
        id: "fs-huyen-khong",
        name: "Huyền Không Phi Tinh (Vận Thời & Không Gian)",
        origin: "Trường phái phong thủy tính toán sự chuyển dịch của các sao theo từng vận 20 năm (Hiện tại là Vận 9: 2024 - 2043).",
        methodology: "Lập tinh bàn 9 cung phi tinh dựa trên độ số la bàn tọa độ và thời điểm xây dựng nhập trạch.",
        scientificMicroclimateAlignment: "Tương đồng với việc theo dõi sự thay đổi của ánh sáng mặt trời theo mùa và chu kỳ khí hậu nhiều năm.",
        culturalContextDisclaimer: "Phương pháp biểu tượng hóa chu kỳ thời gian và chuyển động vũ trụ theo triết học cổ phương Đông."
      },
      {
        id: "fs-loan-dau",
        name: "Loan Đầu Hình Thế (Địa Hình & Không Gian Thực)",
        origin: "Trường phái chú trọng vào hình sông, thế núi, đường sá, công trình xung quanh ngôi nhà (Tả Thanh Long, Hữu Bạch Hổ, Tiền Chu Tước, Hậu Huyền Vũ).",
        methodology: "Quan sát thực tế địa vật xung quanh để tránh thế xung sát (góc nhọn nhà đối diện đâm vào, đường đâm thẳng cửa chính, ao tù nước đọng).",
        scientificMicroclimateAlignment: "Hoàn toàn phù hợp với khoa học quy hoạch đô thị, thông gió tự nhiên, hạn chế tiếng ồn và bụi bặm giao thông.",
        culturalContextDisclaimer: "Được công nhận có giá trị thực tiễn cao trong kiến trúc cảnh quan hiện đại."
      }
    ],

    directions: [
      {
        direction: "Nam",
        windSummer: "Đón gió mát mùa hè (gió Nam và Đông Nam mát mẻ).",
        sunWinter: "Ấm áp mùa đông, ánh sáng mặt trời tự nhiên cân bằng quanh năm.",
        urbanArchitectureRecommendation: "Hướng tối ưu nhất cho nhà ở tại khí hậu nhiệt đới gió mùa Việt Nam. Cần thiết kế ban công rộng mở."
      },
      {
        direction: "Đông Nam",
        windSummer: "Đón trọn vẹn luồng gió biển và gió mùa hè trong lành.",
        sunWinter: "Nắng sớm dịu nhẹ, tránh được nắng chiều gay gắt.",
        urbanArchitectureRecommendation: "Rất tốt cho sức khỏe và tiết kiệm điện năng điều hòa làm mát."
      },
      {
        direction: "Tây",
        windSummer: "Hấp thụ nhiệt lượng bức xạ mặt trời cực lớn từ 13h đến 18h.",
        sunWinter: "Không khí ngột ngạt, tường nhà bị tích nhiệt nóng đến nửa đêm.",
        urbanArchitectureRecommendation: "Bắt buộc giải pháp kỹ thuật: tường đôi cách nhiệt, lam chắn nắng, kính low-E, trồng cây xanh mặt tiền."
      },
      {
        direction: "Bắc",
        windSummer: "Ít gió mát mùa hè.",
        sunWinter: "Chịu trực diện các đợt gió mùa Đông Bắc lạnh buốt.",
        urbanArchitectureRecommendation: "Nên làm cửa kính kín khít vào mùa đông, bố trí giếng trời giữa nhà để lấy sáng bù."
      }
    ]
  }
};
