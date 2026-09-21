﻿using System;
using System.Collections.Generic;
using System.Linq;

namespace KnowLab.Engines
{
    public class UserProgressModel
    {
        public List<string> CompletedConcepts { get; set; }
        public Dictionary<string, bool> QuizScores { get; set; }
        public List<string> WeakConcepts { get; set; }
        public int CurrentLevel { get; set; }

        public UserProgressModel()
        {
            CompletedConcepts = new List<string>();
            QuizScores = new Dictionary<string, bool>();
            WeakConcepts = new List<string>();
            CurrentLevel = 0;
        }
    }

    public static class LearningEngine
    {
        private static readonly UserProgressModel _sharedProgress = new UserProgressModel();

        public static UserProgressModel GetUserProgress()
        {
            _sharedProgress.CurrentLevel = CalculateUserLevel(_sharedProgress.CompletedConcepts.Count);
            return _sharedProgress;
        }

        public static int CalculateUserLevel(int completedCount)
        {
            if (completedCount >= 8) return 4; // Chuyên sâu
            if (completedCount >= 5) return 3; // Nâng cao
            if (completedCount >= 3) return 2; // Thực hành
            if (completedCount >= 1) return 1; // Cơ bản
            return 0;                           // Chưa biết gì
        }

        public static bool CompleteConcept(string conceptId)
        {
            if (!_sharedProgress.CompletedConcepts.Contains(conceptId))
            {
                _sharedProgress.CompletedConcepts.Add(conceptId);
                _sharedProgress.CurrentLevel = CalculateUserLevel(_sharedProgress.CompletedConcepts.Count);
                return true;
            }
            return false;
        }

        public static bool SubmitQuiz(string quizId, string conceptId, int selectedIndex, int correctIndex)
        {
            bool isCorrect = (selectedIndex == correctIndex);
            _sharedProgress.QuizScores[quizId] = isCorrect;
            if (isCorrect)
            {
                CompleteConcept(conceptId);
                _sharedProgress.WeakConcepts.Remove(conceptId);
            }
            else
            {
                if (!_sharedProgress.WeakConcepts.Contains(conceptId))
                {
                    _sharedProgress.WeakConcepts.Add(conceptId);
                }
            }
            return isCorrect;
        }

        public static ConceptModel GetNextRecommendedConcept(string domainId = null)
        {
            var concepts = KnowledgeEngine.GetConcepts(domainId);
            foreach (var c in concepts)
            {
                if (!_sharedProgress.CompletedConcepts.Contains(c.Id))
                {
                    return c;
                }
            }
            return concepts.FirstOrDefault();
        }
    }
}
