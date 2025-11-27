import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, ShieldCheck, BookOpen, Clock, Award } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-primary-foreground text-sm font-medium">
              <BookOpen className="h-4 w-4" />
              <span>Online Examination Platform</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground">
              Smart Testing, Better Learning
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              A comprehensive examination portal designed for educational excellence. 
              Conduct secure online exams with instant results and detailed analytics.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 hover:shadow-lg transition-all duration-300">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Timed Examinations</h3>
            <p className="text-muted-foreground">
              Built-in timer with auto-submit functionality ensures fair testing conditions for all students.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-300">
            <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
            <p className="text-muted-foreground">
              Get immediate feedback with detailed score breakdowns and performance analytics.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-300">
            <div className="h-12 w-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-success" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Comprehensive Review</h3>
            <p className="text-muted-foreground">
              Review all answers with detailed explanations to enhance the learning experience.
            </p>
          </Card>
        </div>

        {/* Role Selection */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-primary">
            <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Admin Portal</h2>
            <p className="text-muted-foreground mb-6">
              Manage exams, questions, students, and view comprehensive analytics
            </p>
            <Button asChild size="lg" className="w-full">
              <Link to="/admin/login">Admin Login</Link>
            </Button>
          </Card>

          <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-accent">
            <div className="h-20 w-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="h-10 w-10 text-accent" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Student Portal</h2>
            <p className="text-muted-foreground mb-6">
              Take exams, view results, track your progress and manage your profile
            </p>
            <div className="space-y-3">
              <Button asChild size="lg" variant="default" className="w-full">
                <Link to="/student/login">Student Login</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full">
                <Link to="/student/register">New Student? Register</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 Online Examination Portal. Built for educational excellence.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
