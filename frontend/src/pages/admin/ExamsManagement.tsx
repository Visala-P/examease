import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2, FileQuestion } from "lucide-react";
import AdminLayout from "@/components/layouts/AdminLayout";
import { toast } from "sonner";

const ExamsManagement = () => {
  // Mock data - will be fetched from Spring Boot backend
  const exams = [
    {
      id: 1,
      title: "Data Structures Final",
      description: "Comprehensive exam covering all data structure topics",
      duration: 90,
      questionCount: 50,
      submissionCount: 142,
    },
    {
      id: 2,
      title: "Web Development Quiz",
      description: "HTML, CSS, JavaScript fundamentals",
      duration: 45,
      questionCount: 30,
      submissionCount: 98,
    },
    {
      id: 3,
      title: "Database Management",
      description: "SQL queries and database design principles",
      duration: 60,
      questionCount: 40,
      submissionCount: 115,
    },
  ];

  const handleDelete = (id: number) => {
    // TODO: Call Spring Boot backend DELETE endpoint
    toast.success("Exam deleted successfully");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Manage Exams</h1>
            <p className="text-muted-foreground mt-1">Create and manage examination papers</p>
          </div>
          <Button asChild>
            <Link to="/admin/exams/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Exam
            </Link>
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search exams..." className="pl-10" />
        </div>

        {/* Exams List */}
        <div className="grid gap-6">
          {exams.map((exam) => (
            <Card key={exam.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{exam.title}</h3>
                  <p className="text-muted-foreground mb-4">{exam.description}</p>
                  <div className="flex gap-6 text-sm text-muted-foreground">
                    <span>Duration: {exam.duration} mins</span>
                    <span>Questions: {exam.questionCount}</span>
                    <span>Submissions: {exam.submissionCount}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/admin/exams/${exam.id}/questions`}>
                      <FileQuestion className="mr-2 h-4 w-4" />
                      Questions
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/admin/exams/${exam.id}/edit`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(exam.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ExamsManagement;
