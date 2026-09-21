/**
 * KnowLab — Scenario & Decision Journal Engine
 * Manages versioned scenarios, input/assumption/result traceability,
 * diff analysis (Scenario A vs B), and user decision logs.
 */

const SCENARIOS_KEY = 'knowlab_saved_scenarios_v2';
const JOURNAL_KEY = 'knowlab_decision_journal_v2';

export const ScenarioEngine = {
  getScenarios(domainId = null) {
    try {
      const stored = localStorage.getItem(SCENARIOS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (domainId) return parsed.filter(s => s.domainId === domainId);
        return parsed;
      }
    } catch (e) {
      console.warn('LocalStorage scenario fetch error:', e);
    }
    return [];
  },

  saveScenario(scenarioData) {
    const scenarios = this.getScenarios();
    const newScenario = {
      id: 'scen_' + Date.now(),
      name: scenarioData.name || 'Kịch Bản ' + (scenarios.length + 1),
      domainId: scenarioData.domainId || 'general',
      goal: scenarioData.goal || '',
      inputs: scenarioData.inputs || {},
      units: scenarioData.units || {},
      results: scenarioData.results || {},
      assumptions: scenarioData.assumptions || [],
      limitations: scenarioData.limitations || [],
      notes: scenarioData.notes || '',
      engineVersion: '1.0.0',
      dataVersion: '2026-01',
      sourceVersion: '1.0',
      createdAt: new Date().toISOString()
    };

    scenarios.unshift(newScenario);
    try {
      localStorage.setItem(SCENARIOS_KEY, JSON.stringify(scenarios));
    } catch (e) {
      console.warn('LocalStorage scenario save error:', e);
    }
    return newScenario;
  },

  deleteScenario(id) {
    let scenarios = this.getScenarios();
    scenarios = scenarios.filter(s => s.id !== id);
    try {
      localStorage.setItem(SCENARIOS_KEY, JSON.stringify(scenarios));
    } catch (e) {
      console.warn('LocalStorage scenario delete error:', e);
    }
    return scenarios;
  },

  compareScenarios(idA, idB) {
    const scenarios = this.getScenarios();
    const scA = scenarios.find(s => s.id === idA);
    const scB = scenarios.find(s => s.id === idB);

    if (!scA || !scB) return null;

    const diff = {
      scenarioA: scA,
      scenarioB: scB,
      inputDiffs: [],
      resultDiffs: []
    };

    // Compare Inputs
    const allInputKeys = Array.from(new Set([...Object.keys(scA.inputs), ...Object.keys(scB.inputs)]));
    allInputKeys.forEach(k => {
      const valA = scA.inputs[k];
      const valB = scB.inputs[k];
      if (valA !== valB) {
        diff.inputDiffs.push({ key: k, valA, valB });
      }
    });

    // Compare Results
    const allResultKeys = Array.from(new Set([...Object.keys(scA.results), ...Object.keys(scB.results)]));
    allResultKeys.forEach(k => {
      const resA = scA.results[k];
      const resB = scB.results[k];
      if (typeof resA === 'number' && typeof resB === 'number') {
        diff.resultDiffs.push({ key: k, resA, resB, delta: resB - resA });
      } else if (resA !== resB) {
        diff.resultDiffs.push({ key: k, resA, resB, delta: null });
      }
    });

    return diff;
  },

  getDecisionJournal() {
    try {
      const stored = localStorage.getItem(JOURNAL_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('LocalStorage journal fetch error:', e);
    }
    return [];
  },

  saveJournalEntry(entry) {
    const journal = this.getDecisionJournal();
    const newEntry = {
      id: 'jour_' + Date.now(),
      goal: entry.goal || '',
      context: entry.context || '',
      assumptions: entry.assumptions || '',
      decision: entry.decision || '',
      thingsToVerify: entry.thingsToVerify || '',
      createdAt: new Date().toISOString()
    };
    journal.unshift(newEntry);
    try {
      localStorage.setItem(JOURNAL_KEY, JSON.stringify(journal));
    } catch (e) {
      console.warn('LocalStorage journal save error:', e);
    }
    return newEntry;
  }
};
