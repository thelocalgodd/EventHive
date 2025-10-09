import { Calendar } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">EventHive</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Discover and manage amazing events with ease
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/events">
                  <span className="text-muted-foreground hover:text-foreground cursor-pointer">Browse Events</span>
                </Link>
              </li>
              <li>
                <Link href="/register">
                  <span className="text-muted-foreground hover:text-foreground cursor-pointer">Create Account</span>
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer">For Organizers</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer">Help Center</span>
              </li>
              <li>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer">Contact Us</span>
              </li>
              <li>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer">FAQ</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer">Privacy Policy</span>
              </li>
              <li>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer">Terms of Service</span>
              </li>
              <li>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer">Cookie Policy</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2025 EventHive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
