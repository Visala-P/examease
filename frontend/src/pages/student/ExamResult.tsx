import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, Award, Clock, ArrowLeft } from "lucide-react";
import StudentLayout from "@/components/layouts/StudentLayout";

const ExamResult = () => {
  // Mock data - will be fetched from Spring Boot backend
  const result = {
    examTitle: "Data Structures Final Exam",
    score: 42,
    totalQuestions: 50,
    percentage: 84,
    passingPercentage: 60,
    status: "Pass",
    timeTaken: "78 mins",
    correctAnswers: 42,
    incorrectAnswers: 8,
    submittedAt: "2024-01-15 10:30 AM",
  };

  const questions = [
    {
      id: 1,
      text: "What is the time complexity of binary search?",
      selectedAnswer: "O(log n)",
      correctAnswer: "O(log n)",
      isCorrect: true,
    },
    {
      id: 2,
      text: "Which data structure uses LIFO principle?",
      selectedAnswer: "Queue",
      correctAnswer: "Stack",
      isCorrect: false,
    },
    // Add more questions...
  ];

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div>
          <Button asChild variant="ghost" size="sm" className="mb-4">
            <Link to="/student/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Exam Results</h1>
        </div>

        {/* Result Summary */}
        <Card className="p-8">
          <div className="text-center space-y-4">
            <div className={`inline-flex h-20 w-20 items-center justify-center rounded-full ${result.status === "Pass" ? "bg-success/10" : "bg-destructive/10"}`}>
              <Award className={`h-10 w-10 ${result.status === "Pass" ? "text-success" : "text-destructive"}`} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{result.examTitle}</h2>
              <p className={`text-4xl font-bold mt-2 ${result.status === "Pass" ? "text-success" : "text-destructive"}`}>
                {result.percentage}%
              </p>
              <p className="text-muted-foreground mt-1">
                {result.correctAnswers} out of {result.totalQuestions} correct
              </p>
            </div>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${result.status === "Pass" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
              {result.status === "Pass" ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <XCircle className="h-5 w-5" />
              )}
              <span className="font-semibold">{result.status}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8 pt-8 border-t">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Correct Answers</p>
              <p className="text-2xl font-bold text-success">{result.correctAnswers}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Incorrect Answers</p>
              <p className="text-2xl font-bold text-destructive">{result.incorrectAnswers}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Time Taken</p>
              <p className="text-2xl font-bold flex items-center justify-center gap-2">
                <Clock className="h-5 w-5" />
                {result.timeTaken}
              </p>
            </div>
          </div>
        </Card>

        {/* Detailed Review */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-6">Detailed Review</h3>
          <div className="space-y-6">
            {questions.map((question, index) => (
              <div key={question.id} className={`p-4 rounded-lg border-2 ${question.isCorrect ? "border-success/20 bg-success/5" : "border-destructive/20 bg-destructive/5"}`}>
                <div className="flex items-start gap-3">
                  <div className={`mt-1 h-6 w-6 rounded-full flex items-center justify-center ${question.isCorrect ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"}`}>
                    {question.isCorrect ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <XCircle className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium mb-3">
                      Question {index + 1}: {question.text}
                    </p>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="text-muted-foreground">Your Answer: </span>
                        <span className={question.isCorrect ? "text-success font-medium" : "text-destructive font-medium"}>
                          {question.selectedAnswer}
                        </span>
                      </p>
                      {!question.isCorrect && (
                        <p>
                          <span className="text-muted-foreground">Correct Answer: </span>
                          <span className="text-success font-medium">{question.correctAnswer}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex gap-4">
          <Button asChild variant="outline" className="flex-1">
            <Link to="/student/results">View All Results</Link>
          </Button>
          <Button asChild className="flex-1">
            <Link to="/student/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    </StudentLayout>
  );
};

export default ExamResult;
