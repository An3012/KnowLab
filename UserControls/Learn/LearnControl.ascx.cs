using System;
using System.Linq;
using System.Web.UI;
using System.Web.UI.WebControls;
using KnowLab.Engines;

namespace KnowLab.UserControls.Learn
{
    public partial class LearnControl : UserControl
    {
        private static string _currentConceptId;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                BindRoadmap();
                string conceptId = Request.QueryString["concept"];
                if (string.IsNullOrEmpty(conceptId))
                {
                    var firstConcept = KnowledgeEngine.GetConcepts().FirstOrDefault();
                    if (firstConcept != null) conceptId = firstConcept.Id;
                }
                LoadLesson(conceptId);
            }
        }

        private void BindRoadmap()
        {
            var progress = LearningEngine.GetUserProgress();
            litProgressText.Text = $"{progress.CompletedConcepts.Count} Khái Niệm Đã Học (Level {progress.CurrentLevel})";

            var lessons = KnowledgeEngine.GetConcepts();
            rptRoadmapLessons.DataSource = lessons;
            rptRoadmapLessons.DataBind();
        }

        private void LoadLesson(string conceptId)
        {
            _currentConceptId = conceptId;
            var c = KnowledgeEngine.GetConceptById(conceptId);
            if (c != null)
            {
                litLessonLevel.Text = c.Level.ToString();
                litLessonTitle.Text = c.Title;
                litLessonSummary.Text = c.Summary;
                litLessonExplanation.Text = c.Explanation;

                var quizzes = KnowledgeEngine.GetQuizzesByConcept(conceptId);
                if (quizzes.Count > 0)
                {
                    var q = quizzes[0];
                    litQuizQuestion.Text = q.QuestionText;
                    rblQuizOptions.Items.Clear();
                    for (int i = 0; i < q.Options.Count; i++)
                    {
                        rblQuizOptions.Items.Add(new ListItem(q.Options[i], i.ToString()));
                    }
                    pnlQuiz.Visible = true;
                    pnlQuizFeedback.Visible = false;
                }
                else
                {
                    pnlQuiz.Visible = false;
                }
            }
        }

        protected void btnSelectLesson_Click(object sender, EventArgs e)
        {
            LinkButton btn = (LinkButton)sender;
            LoadLesson(btn.CommandArgument);
        }

        protected void btnSubmitQuiz_Click(object sender, EventArgs e)
        {
            if (rblQuizOptions.SelectedIndex >= 0)
            {
                var quizzes = KnowledgeEngine.GetQuizzesByConcept(_currentConceptId);
                if (quizzes.Count > 0)
                {
                    var q = quizzes[0];
                    int selected = Convert.ToInt32(rblQuizOptions.SelectedValue);
                    bool isCorrect = LearningEngine.SubmitQuiz(q.Id, _currentConceptId, selected, q.CorrectOptionIndex);

                    pnlQuizFeedback.Visible = true;
                    if (isCorrect)
                    {
                        pnlQuizFeedback.CssClass = "mt-3 p-3 rounded-3 bg-success-subtle text-success border border-success-subtle";
                        litQuizFeedback.Text = "<strong>ĐÚNG RỒI!</strong> " + q.Explanation;
                    }
                    else
                    {
                        pnlQuizFeedback.CssClass = "mt-3 p-3 rounded-3 bg-danger-subtle text-danger border border-danger-subtle";
                        litQuizFeedback.Text = "<strong>CHƯA CHÍNH XÁC!</strong> Đáp án đúng là: " + q.Options[q.CorrectOptionIndex] + ". " + q.Explanation;
                    }

                    BindRoadmap();
                }
            }
        }
    }
}
