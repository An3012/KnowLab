/**
 * Automated Test Suite — PC Hardware Compatibility & Clearance Engine
 */

import { CompatibilityEngine } from '../src/engines/compatibility.js';
import { DomainData } from '../src/data/domainData.js';

let totalTests = 0;
let passedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`  [FAIL] ${message}`);
    process.exitCode = 1;
  }
}

console.log('====================================================');
console.log('RUNNING AUTOMATED PC COMPATIBILITY & CLEARANCE TESTS');
console.log('====================================================\n');

// -------------------------------------------------------------
// TEST CASE 1: Intel CPU (LGA1700) + AMD AM5 Motherboard
// -------------------------------------------------------------
console.log('Test Case 1: Intel Core i5-13600K (LGA1700) + Gigabyte B650 (AM5)');
const intelCpu = DomainData.pc.cpus.find(c => c.id === 'cpu-intel-13600k');
const am5Mobo = DomainData.pc.motherboards.find(m => m.id === 'mb-gigabyte-b650-gaming-x');

const res1 = CompatibilityEngine.check({
  cpu: intelCpu,
  motherboard: am5Mobo
});
assert(res1.compatible === false, 'Build should be marked INCOMPATIBLE');
assert(res1.issues.some(i => i.type === 'SOCKET_MISMATCH'), 'Should detect SOCKET_MISMATCH issue');
console.log('');

// -------------------------------------------------------------
// TEST CASE 2: DDR5 RAM + DDR4-only Motherboard
// -------------------------------------------------------------
console.log('Test Case 2: DDR5-6000 RAM + ASUS B760-PLUS D4 (DDR4-only)');
const ddr5Ram = DomainData.pc.ram.find(r => r.id === 'ram-corsair-ddr5-32gb');
const ddr4Mobo = DomainData.pc.motherboards.find(m => m.id === 'mb-asus-b760-d4');

const res2 = CompatibilityEngine.check({
  ram: ddr5Ram,
  motherboard: ddr4Mobo
});
assert(res2.compatible === false, 'Build should be marked INCOMPATIBLE');
assert(res2.issues.some(i => i.type === 'RAM_GENERATION_MISMATCH'), 'Should detect RAM_GENERATION_MISMATCH issue');
console.log('');

// -------------------------------------------------------------
// TEST CASE 3: GPU too long for Case (Clearance exceeded)
// -------------------------------------------------------------
console.log('Test Case 3: Gigabyte RTX 4080 Super (342mm) + Xigmatek NYX (Max 315mm)');
const longGpu = DomainData.pc.gpus.find(g => g.id === 'gpu-rtx-4080-super');
const compactCase = DomainData.pc.cases.find(c => c.id === 'case-xigmatek-nyx');

const res3 = CompatibilityEngine.check({
  gpu: longGpu,
  caseComp: compactCase
});
assert(res3.compatible === false, 'Build should be marked INCOMPATIBLE');
assert(res3.issues.some(i => i.type === 'GPU_CLEARANCE_EXCEEDED'), 'Should detect GPU_CLEARANCE_EXCEEDED issue');
console.log('');

// -------------------------------------------------------------
// TEST CASE 4: CPU Cooler too tall for Case (Clearance exceeded)
// -------------------------------------------------------------
console.log('Test Case 4: Cooler 175mm height + Compact Case (Max 160mm)');
const tallCooler = {
  id: 'tall-cooler',
  name: 'Ultra Tall Dual Tower Cooler',
  coolerType: 'Air Cooler',
  heightMm: 175,
  supportedSockets: ['AM5']
};

const res4 = CompatibilityEngine.check({
  cooler: tallCooler,
  caseComp: compactCase
});
assert(res4.compatible === false, 'Build should be marked INCOMPATIBLE');
assert(res4.issues.some(i => i.type === 'COOLER_CLEARANCE_EXCEEDED'), 'Should detect COOLER_CLEARANCE_EXCEEDED issue');
console.log('');

// -------------------------------------------------------------
// TEST CASE 5: PSU Insufficient Power (< Peak load + 15%)
// -------------------------------------------------------------
console.log('Test Case 5: Intel i7-14700K (253W) + RTX 4080 Super (320W) + 550W PSU');
const powerHungryCpu = DomainData.pc.cpus.find(c => c.id === 'cpu-intel-14700k');
const lowWattagePsu = DomainData.pc.psus.find(p => p.id === 'psu-cooler-master-550w');

const res5 = CompatibilityEngine.check({
  cpu: powerHungryCpu,
  gpu: longGpu,
  psu: lowWattagePsu
});
assert(res5.compatible === false, 'Build should be marked INCOMPATIBLE due to insufficient PSU');
assert(res5.issues.some(i => i.type === 'PSU_INSUFFICIENT_POWER'), 'Should detect PSU_INSUFFICIENT_POWER issue');
assert(res5.power.totalPeakWatts > 600, 'Total peak watts should exceed 600W');
console.log('');

// -------------------------------------------------------------
// TEST CASE 6: Fully Compatible High-End Build
// -------------------------------------------------------------
console.log('Test Case 6: Fully Compatible Ryzen 7600X + B650 + DDR5 + RTX 4070 Super + 750W ATX 3.0 PSU + Montech Case + Thermalright Cooler');
const amdCpu = DomainData.pc.cpus.find(c => c.id === 'cpu-amd-7600x');
const rtx4070 = DomainData.pc.gpus.find(g => g.id === 'gpu-rtx-4070-super');
const psu750 = DomainData.pc.psus.find(p => p.id === 'psu-corsair-rm750e');
const case903 = DomainData.pc.cases.find(c => c.id === 'case-montech-air-903');
const cooler120 = DomainData.pc.coolers.find(c => c.id === 'cooler-thermalright-peerless-120');

const res6 = CompatibilityEngine.check({
  cpu: amdCpu,
  motherboard: am5Mobo,
  ram: ddr5Ram,
  gpu: rtx4070,
  psu: psu750,
  caseComp: case903,
  cooler: cooler120
});

assert(res6.compatible === true, 'Valid build must be marked COMPATIBLE');
assert(res6.status === 'COMPATIBLE', 'Status should be COMPATIBLE');
assert(res6.issues.filter(i => i.severity === 'error').length === 0, 'No errors in valid build');
assert(res6.power.headroomPercent >= 20, `Headroom must be >= 20% (Actual: ${res6.power.headroomPercent}%)`);
console.log('');

console.log('====================================================');
console.log(`PC COMPATIBILITY TEST RESULT: ${passedTests}/${totalTests} TESTS PASSED CLEANLY`);
console.log('====================================================');
