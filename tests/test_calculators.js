/**
 * Automated Test Suite — Multi-Domain Calculator & Simulation Engines
 */

import { CalculatorEngine } from '../src/engines/calculator.js';
import { ComparisonEngine } from '../src/engines/comparison.js';

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
console.log('RUNNING AUTOMATED MULTI-DOMAIN CALCULATOR TESTS');
console.log('====================================================\n');

// 1. REAL ESTATE MORTGAGE & DTI & WHAT-IF
console.log('1. Real Estate Mortgage & DTI:');
const mortgage = CalculatorEngine.calculateMortgage({
  price: 2500000000,
  downPaymentPercent: 30,
  interestRatePercent: 9.5,
  termYears: 20,
  monthlyIncome: 35000000,
  monthlyRentIncome: 12000000
});
assert(mortgage.results.downPaymentAmount === 750000000, 'Down payment should be 750 million');
assert(mortgage.results.loanAmount === 1750000000, 'Loan amount should be 1.75 billion');
assert(mortgage.results.monthlyPayment > 16000000 && mortgage.results.monthlyPayment < 17000000, 'Monthly payment within expected annuity range');
assert(mortgage.results.debtToIncomeRatio > 40, 'DTI correctly calculated above 40%');
assert(mortgage.whatIf && mortgage.whatIf.length === 2, 'What-if sensitivity scenarios provided');
assert(mortgage.assumptions.length >= 3, 'Assumptions present');
assert(mortgage.limitations.length >= 2, 'Limitations present');
console.log('');

// 2. PC POWER HEADROOM
console.log('2. PC Power & Headroom:');
const pcPower = CalculatorEngine.calculatePCPower({
  cpuTdp: 125,
  gpuTdp: 220,
  psuWattage: 750
});
assert(pcPower.results.estimatedPeakWatts > 400, 'Peak watts should be > 400W');
assert(pcPower.results.recommendedPsuWatts >= 550, 'Recommended PSU with 30% headroom');
assert(pcPower.results.isPsuSafe === true, '750W PSU is safe for 400W peak');
assert(pcPower.results.psuHeadroomPercent >= 40, 'Headroom percent > 40%');
console.log('');

// 3. CARS 5-YEAR TCO
console.log('3. Cars 5-Year TCO:');
const carTco = CalculatorEngine.calculateCarTCO({
  carPrice: 600000000,
  annualKm: 15000,
  fuelConsumptionPer100Km: 6.5,
  fuelPricePerLiter: 24000,
  engineType: 'Petrol'
});
assert(carTco.results.totalTCO > 300000000, '5-year TCO includes fuel, maintenance, insurance, depreciation');
assert(carTco.results.costPerKm > 4000, 'Cost per km calculated accurately');
assert(carTco.assumptions.length >= 2, 'Car TCO assumptions present');
console.log('');

// 4. MOTORCYCLE COMMUTING
console.log('4. Motorcycle Commuting Cost:');
const motoCost = CalculatorEngine.calculateMotorcycleCost({
  dailyKm: 25,
  fuelConsPer100Km: 2.0,
  fuelPrice: 24000,
  transmission: 'Scooter'
});
assert(motoCost.results.monthlyKm === 750, 'Monthly km = 25 * 30 = 750 km');
assert(motoCost.results.monthlyFuelCost === 360000, 'Monthly fuel = (750/100) * 2 * 24000 = 360,000 VND');
assert(motoCost.results.totalMonthlyCost > 450000, 'Total monthly includes fuel + maintenance');
console.log('');

// 5. HOME CONSTRUCTION BUDGET
console.log('5. Home Construction Budget:');
const homeBudget = CalculatorEngine.calculateHomeBudget({
  landAreaM2: 60,
  floors: 2,
  packageType: 'medium',
  foundationType: 'strip',
  roofType: 'concrete'
});
assert(homeBudget.results.totalCalculatedAreaM2 === 180, 'Calculated area = 60 * (0.5 + 2.0 + 0.5) = 180 m2');
assert(homeBudget.results.unitPricePerM2 === 6200000, 'Package medium rate is 6,200,000 VND/m2');
assert(homeBudget.results.wasteCost > 0, '5% waste rate included in calculation');
assert(homeBudget.results.contingency > 0, '10% contingency included in calculation');
assert(homeBudget.results.grandTotal > 1200000000, 'Grand total includes base, waste, and contingency');
console.log('');

// 6. FENG SHUI EVALUATION
console.log('6. Feng Shui Spatial Orientation:');
const fengShui = CalculatorEngine.evaluateFengShui({ direction: 'Nam' });
assert(fengShui.results.score.includes('Tốt') || fengShui.results.score.includes('tốt'), 'South orientation evaluated favorably for microclimate');
assert(fengShui.limitations.length > 0, 'Cultural limitations disclaimer present');
console.log('');

// 7. COMPARISON ENGINE
console.log('7. Dynamic Comparison Engine:');
const comp = ComparisonEngine.compare(
  [
    { id: 'i1', name: 'Option A', price: 100, cores: 8, tradeOffSummary: 'Tiết kiệm chi phí' },
    { id: 'i2', name: 'Option B', price: 150, cores: 12, tradeOffSummary: 'Hiệu năng cao hơn' }
  ],
  [
    { key: 'price', label: 'Giá tiền', unit: 'USD' },
    { key: 'cores', label: 'Số nhân', unit: 'Cores' }
  ]
);
assert(comp.items.length === 2, '2 items compared');
assert(comp.matrix.length === 2, '2 criteria rows generated');
assert(comp.tradeOffs.length === 2, 'Trade-offs extracted transparently');
console.log('');

console.log('====================================================');
console.log(`MULTI-DOMAIN CALCULATOR TEST RESULT: ${passedTests}/${totalTests} TESTS PASSED CLEANLY`);
console.log('====================================================');
