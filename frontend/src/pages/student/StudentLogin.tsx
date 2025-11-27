import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { GraduationCap, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { loginStudent } from "@/lib/api";

const StudentLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token, user } = await loginStudent(formData.email, formData.password);
      localStorage.setItem("studentToken", token);
      toast.success("Login successful!");
      navigate("/student/dashboard");
    } catch (err: any) {
      toast.error(err?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/5 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        
        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 mb-4">
              <GraduationCap className="h-8 w-8 text-accent" />
            </div>
            <h1 className="text-2xl font-bold">Student Login</h1>
            <p className="text-muted-foreground mt-2">Sign in to access your exams</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="student@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              Sign In
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/student/register" className="text-primary hover:underline">
                Register here
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default StudentLogin;
