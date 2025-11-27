import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, BookOpen, FileQuestion, FileCheck, LogOut, Plus } from "lucide-react";
import AdminLayout from "@/components/layouts/AdminLayout";

const AdminDashboard = () => {
  // Mock data - will be fetched from Spring Boot backend
  const stats = [
    { label: "Total Students", value: "142", icon: Users, color: "text-primary" },
    { label: "Total Exams", value: "28", icon: BookOpen, color: "text-accent" },
    { label: "Total Questions", value: "456", icon: FileQuestion, color: "text-success" },
    { label: "Total Submissions", value: "1,284", icon: FileCheck, color: "text-warning" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your examination portal</p>
          </div>
          <Button asChild>
            <Link to="/admin/exams/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Exam
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

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Button asChild variant="outline" size="lg" className="h-auto py-4 flex-col gap-2">
              <Link to="/admin/exams">
                <BookOpen className="h-6 w-6" />
                <span>Manage Exams</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-auto py-4 flex-col gap-2">
              <Link to="/admin/students">
                <Users className="h-6 w-6" />
                <span>Manage Students</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-auto py-4 flex-col gap-2">
              <Link to="/admin/submissions">
                <FileCheck className="h-6 w-6" />
                <span>View Submissions</span>
              </Link>
            </Button>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Submissions</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center justify-between py-3 border-b last:border-b-0">
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-muted-foreground">Data Structures Final Exam</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-success">85%</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
