import { useQuery } from '@tanstack/react-query';

interface DashboardStats {
    totalEvents?: number;
    totalAttendees?: number;
    activeEvents?: number;
    upcomingEvents?: number;
    registeredEvents?: number;
}

export function useDashboardStats(role: 'organizer' | 'attendee') {
    return useQuery<DashboardStats>({
        queryKey: ['dashboardStats', role],
        queryFn: async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(`/api/users/dashboard-stats?role=${role}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch dashboard stats');
            }

            const data = await response.json();
            return data.stats;
        },
        refetchInterval: 30000,
        staleTime: 0,
    });
}