import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import type { RegisterForm as RegisterFormType } from "../types/api";

export function RegisterForm() {
  const [formData, setFormData] = useState<RegisterFormType>({
    name: '',
    email: '',
    password: '',
    role: 'attendee',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    email: '',
    password: '',
    organizationType: '',
  });
  const { register } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const clearFieldErrors = () => {
    setFieldErrors({
      name: '',
      email: '',
      password: '',
      organizationType: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    clearFieldErrors();

    try {
      await register(formData);
      toast({
        title: "Account created!",
        description: "Welcome to EventHive. You can now start discovering events.",
      });
      setLocation('/dashboard');
    } catch (error) {
      let errorMessage = "Failed to create account. Please try again.";
      let newFieldErrors = { name: '', email: '', password: '', organizationType: '' };

      if (error instanceof Error) {
        const message = error.message.toLowerCase();
        
        // Handle specific validation errors
        if (message.includes('email already exists') || message.includes('email is already registered') || message.includes('user already exists')) {
          errorMessage = "An account with this email already exists. Please sign in instead.";
          newFieldErrors.email = "This email is already registered";
        } else if (message.includes('invalid email') || message.includes('email format')) {
          errorMessage = "Please enter a valid email address.";
          newFieldErrors.email = "Invalid email format";
        } else if (message.includes('password') && (message.includes('weak') || message.includes('short') || message.includes('minimum'))) {
          errorMessage = "Password must be at least 8 characters long and contain a mix of letters and numbers.";
          newFieldErrors.password = "Password is too weak";
        } else if (message.includes('name') && (message.includes('required') || message.includes('invalid'))) {
          errorMessage = "Please enter a valid full name.";
          newFieldErrors.name = "Name is required";
        } else if (message.includes('organization type') || message.includes('org type')) {
          errorMessage = "Please select an organization type.";
          newFieldErrors.organizationType = "Organization type is required";
        } else if (message.includes('validation') || message.includes('invalid')) {
          errorMessage = "Please check all fields and try again.";
        } else {
          errorMessage = error.message;
        }

        setFieldErrors(newFieldErrors);
      }
      
      toast({
        title: "Registration failed",
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
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>Join EventHive to discover and manage events</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: '' });
                }}
                required
                data-testid="input-name"
                className={fieldErrors.name ? "border-red-500" : ""}
              />
              {fieldErrors.name && <p className="text-sm text-red-500">{fieldErrors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: '' });
                }}
                required
                data-testid="input-email"
                className={fieldErrors.email ? "border-red-500" : ""}
              />
              {fieldErrors.email && (
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-red-500">{fieldErrors.email}</p>
                  {fieldErrors.email.includes('already registered') && (
                    <Link href="/login">
                      <span className="text-xs text-primary hover:underline cursor-pointer">
                        Sign in instead →
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
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: '' });
                }}
                required
                minLength={8}
                data-testid="input-password"
                className={fieldErrors.password ? "border-red-500" : ""}
              />
              <p className="text-xs text-muted-foreground">Must be at least 8 characters</p>
              {fieldErrors.password && <p className="text-sm text-red-500">{fieldErrors.password}</p>}
            </div>

            <div className="space-y-3">
              <Label>I am an:</Label>
              <RadioGroup
                value={formData.role}
                onValueChange={(value: 'attendee' | 'organizer') =>
                  setFormData({ ...formData, role: value, organizationType: value === 'attendee' ? undefined : formData.organizationType })
                }
              >
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover-elevate">
                  <RadioGroupItem value="attendee" id="attendee" data-testid="radio-attendee" />
                  <Label htmlFor="attendee" className="flex-1 cursor-pointer">
                    <div className="font-medium">Attendee</div>
                    <div className="text-xs text-muted-foreground">I want to discover and join events</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover-elevate">
                  <RadioGroupItem value="organizer" id="organizer" data-testid="radio-organizer" />
                  <Label htmlFor="organizer" className="flex-1 cursor-pointer">
                    <div className="font-medium">Organizer</div>
                    <div className="text-xs text-muted-foreground">I want to create and manage events</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {formData.role === 'organizer' && (
              <div className="space-y-2">
                <Label htmlFor="orgType">Organization Type</Label>
                <Select
                  value={formData.organizationType}
                  onValueChange={(value: 'individual' | 'corporate') => {
                    setFormData({ ...formData, organizationType: value });
                    if (fieldErrors.organizationType) setFieldErrors({ ...fieldErrors, organizationType: '' });
                  }}
                >
                  <SelectTrigger 
                    id="orgType" 
                    data-testid="select-org-type"
                    className={fieldErrors.organizationType ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select organization type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="corporate">Corporate</SelectItem>
                  </SelectContent>
                </Select>
                {fieldErrors.organizationType && <p className="text-sm text-red-500">{fieldErrors.organizationType}</p>}
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || (formData.role === 'organizer' && !formData.organizationType)}
              data-testid="button-register"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login">
                <span className="text-primary hover:underline cursor-pointer" data-testid="link-login">
                  Sign in
                </span>
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}