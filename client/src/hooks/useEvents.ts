import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../lib/api";
import type { EventFilters, CreateEventForm } from "../types/api";

// Query keys
export const eventKeys = {
  all: ["events"] as const,
  lists: () => [...eventKeys.all, "list"] as const,
  list: (filters?: EventFilters) => [...eventKeys.lists(), filters] as const,
  details: () => [...eventKeys.all, "detail"] as const,
  detail: (id: string) => [...eventKeys.details(), id] as const,
  myEvents: () => [...eventKeys.all, "my-events"] as const,
};

// Get all events with optional filters
export function useEvents(filters?: EventFilters) {
  return useQuery({
    queryKey: eventKeys.list(filters),
    queryFn: () => apiClient.getEvents(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get single event by ID
export function useEvent(id: string) {
  return useQuery({
    queryKey: eventKeys.detail(id),
    queryFn: () => apiClient.getEvent(id),
    enabled: !!id,
  });
}

// Get organizer's events
export function useMyEvents() {
  return useQuery({
    queryKey: eventKeys.myEvents(),
    queryFn: () => apiClient.getMyEvents(),
  });
}

// Create event mutation
export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventData: CreateEventForm) =>
      apiClient.createEvent(eventData),
    onSuccess: () => {
      // Invalidate and refetch events
      queryClient.invalidateQueries({ queryKey: eventKeys.all });
    },
  });
}

// Update event mutation
export function useUpdateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateEventForm>;
    }) => apiClient.updateEvent(id, data),
    onSuccess: (_, { id }) => {
      // Invalidate specific event and lists
      queryClient.invalidateQueries({ queryKey: eventKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: eventKeys.lists() });
      queryClient.invalidateQueries({ queryKey: eventKeys.myEvents() });
    },
  });
}

// Delete event mutation
export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.deleteEvent(id),
    onSuccess: () => {
      // Invalidate all event queries
      queryClient.invalidateQueries({ queryKey: eventKeys.all });
    },
  });
}
