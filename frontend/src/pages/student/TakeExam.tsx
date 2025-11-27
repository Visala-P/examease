import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Clock, ChevronLeft, ChevronRight, Flag } from "lucide-react";
import { toast } from "sonner";

const TakeExam = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(5400); // 90 minutes in seconds
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());

  // Mock exam data - will be fetched from Spring Boot backend
  const exam = {
    title: "Data Structures Final Exam",
    duration: 90,
    questions: [
      {
        id: 1,
        text: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      },
      {
        id: 2,
        text: "Which data structure uses LIFO principle?",
        options: ["Queue", "Stack", "Array", "Linked List"],
      },
      // Add more questions as needed
    ],
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleSubmit = () => {
    // TODO: Submit to Spring Boot backend
    // Example: POST to /api/exam/submit
    toast.success("Exam submitted successfully!");
    navigate("/student/exam/result/123");
  };

  const toggleFlag = () => {
    const newFlagged = new Set(flaggedQuestions);
    if (newFlagged.has(currentQuestion)) {
      newFlagged.delete(currentQuestion);
    } else {
      newFlagged.add(currentQuestion);
    }
    setFlaggedQuestions(newFlagged);
  };

  const progress = ((currentQuestion + 1) / exam.questions.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <h1 className="font-bold text-lg">{exam.title}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-warning">
                <Clock className="h-5 w-5" />
                <span className="font-mono font-bold">{formatTime(timeRemaining)}</span>
              </div>
              <Button onClick={handleSubmit} variant="default">
                Submit Exam
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Question Palette */}
          <aside className="lg:col-span-1">
            <Card className="p-4 sticky top-24">
              <h3 className="font-semibold mb-4">Question Palette</h3>
              <div className="grid grid-cols-5 gap-2">
                {exam.questions.map((_, index) => (
                  <Button
                    key={index}
                    size="sm"
                    variant={currentQuestion === index ? "default" : answers[index] ? "secondary" : "outline"}
                    className={`h-10 ${flaggedQuestions.has(index) ? "border-warning border-2" : ""}`}
                    onClick={() => setCurrentQuestion(index)}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-primary rounded" />
                  <span>Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-secondary rounded" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-warning rounded" />
                  <span>Flagged</span>
                </div>
              </div>
            </Card>
          </aside>

          {/* Question Content */}
          <div className="lg:col-span-3">
            <Card className="p-8">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-sm font-medium text-muted-foreground">
                    Question {currentQuestion + 1} of {exam.questions.length}
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleFlag}
                    className={flaggedQuestions.has(currentQuestion) ? "text-warning" : ""}
                  >
                    <Flag className="h-4 w-4 mr-2" />
                    {flaggedQuestions.has(currentQuestion) ? "Unflag" : "Flag"}
                  </Button>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-6">
                    {exam.questions[currentQuestion].text}
                  </h3>
                  
                  <RadioGroup
                    value={answers[currentQuestion] || ""}
                    onValueChange={handleAnswerChange}
                    className="space-y-4"
                  >
                    {exam.questions[currentQuestion].options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value={option} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="flex justify-between pt-6">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    onClick={() => setCurrentQuestion(Math.min(exam.questions.length - 1, currentQuestion + 1))}
                    disabled={currentQuestion === exam.questions.length - 1}
                  >
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeExam;
