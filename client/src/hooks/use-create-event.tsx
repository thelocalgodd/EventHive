import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CreateEventData {
    title: string;
    description: string;
    category: string;
    eventType: string;
    date: string;
    time: string;
    location: string;
    capacity: number;
    isVirtual: boolean;
    tags: string[];
    status: string;
    accessControl: {
        isPrivate: boolean;
        accessCode?: string;
        allowedDomains: string[];
    };
}

export function useCreateEvent() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (eventData: CreateEventData) => {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(eventData)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to create event');
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] });
            queryClient.invalidateQueries({ queryKey: ['myEvents'] });
            queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
        }
    });
}