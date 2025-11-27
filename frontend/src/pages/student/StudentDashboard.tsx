import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Award, Clock, TrendingUp } from "lucide-react";
import StudentLayout from "@/components/layouts/StudentLayout";
import PerformanceChart from "@/components/PerformanceChart";
import { useUser } from "@/context/UserContext";

const StudentDashboard = () => {
  const { user } = useUser();

  const stats = [
    { label: "Exams Taken", value: "12", icon: FileText, color: "text-primary" },
    { label: "Average Score", value: "85%", icon: Award, color: "text-success" },
    { label: "Pending Exams", value: "3", icon: Clock, color: "text-warning" },
    { label: "Pass Rate", value: "92%", icon: TrendingUp, color: "text-accent" },
  ];

  return (
    <StudentLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Welcome Back{user?.name ? `, ${user.name}!` : "!"}</h1>
            <p className="text-muted-foreground mt-1">Here's your learning progress</p>
          </div>
          <Button asChild>
            <Link to="/student/exams">
              <FileText className="mr-2 h-4 w-4" />
              Take Exam
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className={`h-12 w-12 rounded-full bg-muted flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Performance Chart */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Performance Trend</h2>
          <div className="h-64">
            <PerformanceChart />
          </div>
        </Card>

        {/* Available Exams */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Available Exams</h2>
            <Button asChild variant="link">
              <Link to="/student/exams">View All</Link>
            </Button>
          </div>
          <div className="space-y-4">
            {[
              { title: "Data Structures Final", duration: "90 mins", questions: 50 },
              { title: "Web Development Quiz", duration: "45 mins", questions: 30 },
              { title: "Database Management", duration: "60 mins", questions: 40 },
            ].map((exam) => (
              <div key={exam.title} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div>
                  <p className="font-medium">{exam.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {exam.duration} • {exam.questions} questions
                  </p>
                </div>
                <Button asChild size="sm">
                  <Link to={`/student/exam/take/${exam.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    Start Exam
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Results */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Results</h2>
          <div className="space-y-4">
            {[
              { title: "Algorithm Design", score: 92, status: "Pass", date: "2 days ago" },
              { title: "Operating Systems", score: 88, status: "Pass", date: "5 days ago" },
              { title: "Computer Networks", score: 76, status: "Pass", date: "1 week ago" },
            ].map((result) => (
              <div key={result.title} className="flex items-center justify-between py-3 border-b last:border-b-0">
                <div>
                  <p className="font-medium">{result.title}</p>
                  <p className="text-sm text-muted-foreground">{result.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-success">{result.score}%</p>
                  <p className="text-xs text-success">{result.status}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;
