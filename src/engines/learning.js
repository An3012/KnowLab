/**
 * KnowLab — Learning Engine
 * Handles user level progression, progress tracking, quiz scoring, and weak concepts.
 */

const STORAGE_KEY = 'knowlab_user_progress_v1';

export const LearningEngine = {
  getProgress() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('LocalStorage error in LearningEngine:', e);
    }
    return {
      completedConcepts: [],
      quizScores: {},
      savedDomainLevels: {
        "real-estate": 0,
        "pc-building": 0,
        "cars": 0,
        "motorcycles": 0,
        "home": 0,
        "feng-shui": 0
      },
      weakConcepts: []
    };
  },

  saveProgress(progress) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  },

  markConceptCompleted(conceptId) {
    const progress = this.getProgress();
    if (!progress.completedConcepts.includes(conceptId)) {
      progress.completedConcepts.push(conceptId);
      this.saveProgress(progress);
    }
    return progress;
  },

  recordQuizResult(conceptId, isCorrect) {
    const progress = this.getProgress();
    progress.quizScores[conceptId] = isCorrect;
    
    if (!isCorrect && !progress.weakConcepts.includes(conceptId)) {
      progress.weakConcepts.push(conceptId);
    } else if (isCorrect && progress.weakConcepts.includes(conceptId)) {
      progress.weakConcepts = progress.weakConcepts.filter(id => id !== conceptId);
    }

    this.saveProgress(progress);
    return progress;
  },

  calculateUserLevel(domainId) {
    const progress = this.getProgress();
    const completedCount = progress.completedConcepts.filter(id => id.startsWith(domainId)).length;

    if (completedCount >= 8) return 4; // Expert
    if (completedCount >= 5) return 3; // Advanced
    if (completedCount >= 3) return 2; // Practical
    if (completedCount >= 1) return 1; // Basic
    return 0; // Beginner Zero-Knowledge
  }
};
