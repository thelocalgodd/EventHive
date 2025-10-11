import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    email: '',
    password: '',
  });
  const { login } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const clearFieldErrors = () => {
    setFieldErrors({
      email: '',
      password: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    clearFieldErrors();

    try {
      await login({ email, password });
      toast({
        title: "Welcome back!",
        description: "You have been successfully logged in.",
      });
      setLocation('/dashboard');
    } catch (error) {
      let errorMessage = "Something went wrong. Please try again.";
      let newFieldErrors = { email: '', password: '' };
      
      if (error instanceof Error) {
        const message = error.message.toLowerCase();
        
        if (message.includes('email') || message.includes('user not found') || message.includes('account not found') || message.includes('no user found')) {
          errorMessage = "No account found with this email address.";
          newFieldErrors.email = "No account found with this email";
        } else if (message.includes('password') || message.includes('invalid credentials') || message.includes('incorrect password') || message.includes('wrong password')) {
          errorMessage = "Incorrect password. Please try again.";
          newFieldErrors.password = "Incorrect password";
        } else if (message.includes('blocked') || message.includes('suspended') || message.includes('disabled')) {
          errorMessage = "Your account has been suspended. Please contact support.";
          newFieldErrors.email = "Account suspended";
        } else if (message.includes('not verified') || message.includes('verify')) {
          errorMessage = "Please verify your email address before signing in.";
          newFieldErrors.email = "Email not verified";
        } else {
          errorMessage = error.message;
        }

        setFieldErrors(newFieldErrors);
      }
      
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-chart-2/10 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <div className="p-3 bg-primary/10 rounded-full">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to your EventHive account</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: '' });
                }}
                required
                data-testid="input-email"
                className={fieldErrors.email ? "border-red-500" : ""}
              />
              {fieldErrors.email && (
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-red-500">{fieldErrors.email}</p>
                  {fieldErrors.email.includes('No account found') && (
                    <Link href="/register">
                      <span className="text-xs text-primary hover:underline cursor-pointer">
                        Create an account instead →
                      </span>
                    </Link>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: '' });
                }}
                required
                data-testid="input-password"
                className={fieldErrors.password ? "border-red-500" : ""}
              />
              {fieldErrors.password && (
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-red-500">{fieldErrors.password}</p>
                  {fieldErrors.password.includes('Incorrect password') && (
                    <Link href="/forgot-password">
                      <span className="text-xs text-primary hover:underline cursor-pointer">
                        Forgot your password? →
                      </span>
                    </Link>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <Link href="/forgot-password">
                <span className="text-sm text-primary hover:underline cursor-pointer">
                  Forgot password?
                </span>
              </Link>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              data-testid="button-login"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              Don't have an account?{' '}
              <Link href="/register">
                <span className="text-primary hover:underline cursor-pointer" data-testid="link-register">
                  Sign up
                </span>
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}