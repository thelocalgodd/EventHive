import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Shield, Zap, Globe, Heart } from "lucide-react";

export function About() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calendar className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">EventHive</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A modern, intuitive platform for creating, managing, and attending events. 
            Built with cutting-edge technology to deliver seamless experiences.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Event Management
              </CardTitle>
              <CardDescription>
                Create and manage events with ease
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Create public and private events</li>
                <li>• Manage attendee registrations</li>
                <li>• Real-time event updates</li>
                <li>• Event analytics and insights</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                User Roles
              </CardTitle>
              <CardDescription>
                Flexible role-based access control
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <Badge variant="secondary">Organizer</Badge> - Create and manage events</li>
                <li>• <Badge variant="outline">Attendee</Badge> - Discover and attend events</li>
                <li>• Secure authentication system</li>
                <li>• Personalized dashboards</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Modern Technology
              </CardTitle>
              <CardDescription>
                Built with the latest web technologies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• React with TypeScript</li>
                <li>• Responsive design with Tailwind CSS</li>
                <li>• Real-time updates</li>
                <li>• Dark/Light theme support</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Accessibility
              </CardTitle>
              <CardDescription>
                Inclusive design for everyone
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• WCAG compliant interface</li>
                <li>• Keyboard navigation support</li>
                <li>• Screen reader friendly</li>
                <li>• Mobile-first responsive design</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle>How EventHive Works</CardTitle>
            <CardDescription>
              Getting started is simple and straightforward
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">1</span>
                </div>
                <h3 className="font-semibold mb-2">Sign Up</h3>
                <p className="text-sm text-muted-foreground">
                  Create your account and choose your role as an organizer or attendee
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">2</span>
                </div>
                <h3 className="font-semibold mb-2">Explore or Create</h3>
                <p className="text-sm text-muted-foreground">
                  Browse existing events or create your own with our intuitive event builder
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">3</span>
                </div>
                <h3 className="font-semibold mb-2">Connect & Engage</h3>
                <p className="text-sm text-muted-foreground">
                  Attend events, network with others, and build lasting connections
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mission Statement */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              EventHive is dedicated to bringing people together through meaningful events and experiences. 
              We believe that great events have the power to inspire, educate, and create lasting connections. 
              Our platform is designed to make event organization effortless and event discovery delightful, 
              whether you're hosting a small workshop or managing a large conference.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}