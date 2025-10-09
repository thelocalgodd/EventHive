import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, CheckCircle, Clock } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  trend?: string;
}

function StatCard({ icon, label, value, trend }: StatCardProps) {
  return (
    <Card className="hover-elevate transition-all">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-3xl font-bold" data-testid={`stat-${label.toLowerCase().replace(/\s/g, '-')}`}>
              {value}
            </p>
            {trend && (
              <p className="text-xs text-muted-foreground">{trend}</p>
            )}
          </div>
          <div className="p-3 bg-primary/10 rounded-full">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface DashboardStatsProps {
  role: 'attendee' | 'organizer';
  stats: {
    totalEvents?: number;
    registeredEvents?: number;
    upcomingEvents?: number;
    totalAttendees?: number;
    activeEvents?: number;
  };
}

export function DashboardStats({ role, stats }: DashboardStatsProps) {
  if (role === 'attendee') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          icon={<Calendar className="h-6 w-6 text-primary" />}
          label="Registered Events"
          value={stats.registeredEvents || 0}
        />
        <StatCard
          icon={<Clock className="h-6 w-6 text-primary" />}
          label="Upcoming Events"
          value={stats.upcomingEvents || 0}
        />
        <StatCard
          icon={<CheckCircle className="h-6 w-6 text-primary" />}
          label="Attended Events"
          value={stats.totalEvents || 0}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={<Calendar className="h-6 w-6 text-primary" />}
        label="Total Events"
        value={stats.totalEvents || 0}
      />
      <StatCard
        icon={<Users className="h-6 w-6 text-primary" />}
        label="Total Attendees"
        value={stats.totalAttendees || 0}
      />
      <StatCard
        icon={<CheckCircle className="h-6 w-6 text-primary" />}
        label="Active Events"
        value={stats.activeEvents || 0}
      />
      <StatCard
        icon={<Clock className="h-6 w-6 text-primary" />}
        label="Upcoming"
        value={stats.upcomingEvents || 0}
      />
    </div>
  );
}
