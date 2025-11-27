import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, Eye } from "lucide-react";
import StudentLayout from "@/components/layouts/StudentLayout";

const AllResults = () => {
  // Mock data - will be fetched from Spring Boot backend
  const results = [
    {
      id: 1,
      examTitle: "Data Structures Final",
      score: 42,
      totalQuestions: 50,
      percentage: 84,
      status: "Pass",
      date: "2024-01-15",
      time: "10:30 AM",
    },
    {
      id: 2,
      examTitle: "Algorithm Design",
      score: 46,
      totalQuestions: 50,
      percentage: 92,
      status: "Pass",
      date: "2024-01-10",
      time: "2:15 PM",
    },
    {
      id: 3,
      examTitle: "Web Development Quiz",
      score: 22,
      totalQuestions: 30,
      percentage: 73,
      status: "Pass",
      date: "2024-01-05",
      time: "11:00 AM",
    },
    {
      id: 4,
      examTitle: "Database Management",
      score: 23,
      totalQuestions: 40,
      percentage: 58,
      status: "Fail",
      date: "2024-01-02",
      time: "3:45 PM",
    },
  ];

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">My Results</h1>
          <p className="text-muted-foreground mt-1">View all your exam results</p>
        </div>

        {/* Results List */}
        <div className="grid gap-6">
          {results.map((result) => (
            <Card key={result.id} className="p-6">
              <div className="flex justify-between items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 h-12 w-12 rounded-full flex items-center justify-center ${result.status === "Pass" ? "bg-success/10" : "bg-destructive/10"}`}>
                      {result.status === "Pass" ? (
                        <CheckCircle2 className="h-6 w-6 text-success" />
                      ) : (
                        <XCircle className="h-6 w-6 text-destructive" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1">{result.examTitle}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Submitted on {result.date} at {result.time}
                      </p>
                      <div className="flex items-center gap-6">
                        <div>
                          <p className="text-sm text-muted-foreground">Score</p>
                          <p className="text-2xl font-bold">{result.percentage}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Correct</p>
                          <p className="text-2xl font-bold">{result.score}/{result.totalQuestions}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Status</p>
                          <p className={`text-lg font-semibold ${result.status === "Pass" ? "text-success" : "text-destructive"}`}>
                            {result.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Button asChild>
                  <Link to={`/student/exam/result/${result.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats Summary */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Overall Statistics</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Exams</p>
              <p className="text-2xl font-bold">{results.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Average Score</p>
              <p className="text-2xl font-bold text-primary">
                {Math.round(results.reduce((acc, r) => acc + r.percentage, 0) / results.length)}%
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Passed</p>
              <p className="text-2xl font-bold text-success">
                {results.filter(r => r.status === "Pass").length}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Failed</p>
              <p className="text-2xl font-bold text-destructive">
                {results.filter(r => r.status === "Fail").length}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </StudentLayout>
  );
};

export default AllResults;
