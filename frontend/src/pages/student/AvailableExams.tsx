import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Clock, FileQuestion, ArrowRight } from "lucide-react";
import StudentLayout from "@/components/layouts/StudentLayout";

const AvailableExams = () => {
  // Mock data - will be fetched from Spring Boot backend
  const exams = [
    {
      id: 1,
      title: "Data Structures Final",
      description: "Comprehensive exam covering arrays, linked lists, trees, graphs, and algorithms",
      duration: 90,
      questionCount: 50,
      passingPercentage: 60,
    },
    {
      id: 2,
      title: "Web Development Quiz",
      description: "HTML, CSS, JavaScript fundamentals and best practices",
      duration: 45,
      questionCount: 30,
      passingPercentage: 70,
    },
    {
      id: 3,
      title: "Database Management",
      description: "SQL queries, normalization, and database design principles",
      duration: 60,
      questionCount: 40,
      passingPercentage: 65,
    },
    {
      id: 4,
      title: "Algorithm Design",
      description: "Dynamic programming, greedy algorithms, and complexity analysis",
      duration: 120,
      questionCount: 60,
      passingPercentage: 60,
    },
  ];

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Available Exams</h1>
          <p className="text-muted-foreground mt-1">Select an exam to begin</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search exams..." className="pl-10" />
        </div>

        {/* Exams Grid */}
        <div className="grid gap-6">
          {exams.map((exam) => (
            <Card key={exam.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{exam.title}</h3>
                  <p className="text-muted-foreground mb-4">{exam.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{exam.duration} minutes</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <FileQuestion className="h-4 w-4" />
                      <span>{exam.questionCount} questions</span>
                    </div>
                    <div className="text-muted-foreground">
                      Passing: {exam.passingPercentage}%
                    </div>
                  </div>
                </div>
                <Button asChild size="lg">
                  <Link to={`/student/exam/take/${exam.id}`}>
                    Start Exam
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Info Box */}
        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-2">Before You Start:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Ensure you have a stable internet connection</li>
            <li>Once started, the timer will begin automatically</li>
            <li>Your exam will auto-submit when time expires</li>
            <li>You can flag questions for review before submitting</li>
            <li>Results will be available immediately after submission</li>
          </ul>
        </Card>
      </div>
    </StudentLayout>
  );
};

export default AvailableExams;
