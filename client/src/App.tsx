import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider, useAuth } from "../src/context/AuthContext";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import BrowseEvents from "@/pages/BrowseEvents";
import EventDetail from "@/pages/EventDetail";
import Dashboard from "@/pages/Dashboard";
import CreateEvent from "@/pages/CreateEvent";
import ViewAttendees from "@/pages/ViewAttendees";
import NotFound from "@/pages/not-found";

function Router() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        isAuthenticated={!!user} 
        userRole={user?.role || "attendee"}
        onLogout={logout}
      />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/events" component={BrowseEvents} />
          <Route path="/events/:id" component={EventDetail} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/create-event" component={CreateEvent} />
          <Route path="/events/:id/attendees" component={ViewAttendees} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Router />
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
