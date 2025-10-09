import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { EventCard } from "./components/EventCard";
import { EventFilters } from "./components/EventFilters";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { EventDetailsView } from "./components/EventDetailsView";
import { DashboardStats } from "./components/DashboardStats";
import { EventManagementTable } from "./components/EventManagementTable";
import { CreateEventForm } from "./components/CreateEventForm";
import { Button } from "./components/ui/button";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useEvents, useEvent, useMyEvents } from "./hooks/useEvents";
import { useMyRegistrations, useRegisterForEvent, useCancelRegistration } from "./hooks/useRegistrations";
import type { EventFilters as EventFiltersType } from "./types/api";

// Import event images
import businessEvent from '../../attached_assets/generated_images/Business_conference_presentation_event_e6f329f2.png';
import concertEvent from '../../attached_assets/generated_images/Live_music_concert_event_aacc7e97.png';
import techWorkshop from '../../attached_assets/generated_images/Tech_workshop_training_session_a37358c6.png';
import networkingEvent from '../../attached_assets/generated_images/Corporate_networking_mixer_event_c61b902e.png';
import artEvent from '../../attached_assets/generated_images/Art_gallery_exhibition_event_0dcb9354.png';

function HomePage() {
    const [, setLocation] = useLocation();
    const { data: eventsData, isLoading } = useEvents({ status: 'published' });
    const featuredEvents = eventsData?.events?.slice(0, 3) || [];

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1">
                <Hero onSearch={(query) => {
                    setLocation(`/events?search=${encodeURIComponent(query)}`);
                }} />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
                    <section>
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">Featured Events</h2>
                            <p className="text-muted-foreground">Discover popular events happening soon</p>
                        </div>
                        {isLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {featuredEvents.map((event) => (
                                    <EventCard
                                        key={event._id}
                                        id={event._id}
                                        title={event.title}
                                        description={event.description}
                                        category={event.category}
                                        eventType={event.eventType}
                                        date={new Date(event.date)}
                                        time={event.time}
                                        location={event.location}
                                        capacity={event.capacity}
                                        registeredCount={event.registeredCount}
                                        imageUrl={event.image || businessEvent}
                                        isVirtual={event.isVirtual}
                                        organizerName={event.organizer.name}
                                        onRegister={() => setLocation(`/events/${event._id}`)}
                                        onViewDetails={() => setLocation(`/events/${event._id}`)}
                                    />
                                ))}
                            </div>
                        )}
                    </section>

                    <section className="bg-gradient-to-br from-primary/10 to-chart-2/10 rounded-2xl p-8 sm:p-12">
                        <div className="max-w-3xl mx-auto text-center space-y-6">
                            <h2 className="text-3xl font-bold">For Event Organizers</h2>
                            <p className="text-lg text-muted-foreground">
                                Create and manage amazing events with our powerful platform. Track registrations, manage attendees, and grow your community.
                            </p>
                            <Button size="lg" onClick={() => setLocation('/register')} data-testid="button-get-started">
                                Get Started
                            </Button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

function EventsPage() {
    const [, setLocation] = useLocation();
    const [filters, setFilters] = useState<EventFiltersType>({});
    const { data: eventsData, isLoading } = useEvents(filters);
    const events = eventsData?.events || [];

    // Parse URL search params
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const search = urlParams.get('search');
        if (search) {
            setFilters(prev => ({ ...prev, search }));
        }
    }, []);

    const handleFilterChange = (newFilters: EventFiltersType) => {
        setFilters(newFilters);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold mb-2">Discover Events</h1>
                <p className="text-muted-foreground">Find events that match your interests</p>
            </div>

            <EventFilters onFilterChange={handleFilterChange} />

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <EventCard
                            key={event._id}
                            id={event._id}
                            title={event.title}
                            description={event.description}
                            category={event.category}
                            eventType={event.eventType}
                            date={new Date(event.date)}
                            time={event.time}
                            location={event.location}
                            capacity={event.capacity}
                            registeredCount={event.registeredCount}
                            imageUrl={event.image || businessEvent}
                            isVirtual={event.isVirtual}
                            organizerName={event.organizer.name}
                            onRegister={() => setLocation(`/events/${event._id}`)}
                            onViewDetails={() => setLocation(`/events/${event._id}`)}
                        />
                    ))}
                </div>
            )}

            {!isLoading && events.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No events found matching your filters</p>
                </div>
            )}
        </div>
    );
}

function EventDetailsPage({ params }: { params: { id: string } }) {
    const { user } = useAuth();
    const { data: eventData, isLoading } = useEvent(params.id);
    const { data: registrationsData } = useMyRegistrations();
    const registerMutation = useRegisterForEvent();
    const cancelMutation = useCancelRegistration();

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-64 bg-muted rounded-lg" />
                    <div className="h-8 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                </div>
            </div>
        );
    }

    if (!eventData?.success || !eventData.event) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Event not found</h1>
                    <p className="text-muted-foreground">The event you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    const event = eventData.event;
    const isRegistered = registrationsData?.registrations?.some(
        reg => reg.event._id === event._id
    ) || false;

    const handleRegister = async () => {
        if (!user) return;

        try {
            await registerMutation.mutateAsync({ eventId: event._id });
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    const handleCancelRegistration = async () => {
        try {
            await cancelMutation.mutateAsync(event._id);
        } catch (error) {
            console.error('Cancellation failed:', error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <EventDetailsView
                event={{
                    id: event._id,
                    title: event.title,
                    description: event.description,
                    category: event.category,
                    eventType: event.eventType,
                    date: new Date(event.date),
                    time: event.time,
                    location: event.location,
                    capacity: event.capacity,
                    registeredCount: event.registeredCount,
                    imageUrl: event.image || businessEvent,
                    isVirtual: event.isVirtual,
                    isPrivate: event.accessControl.isPrivate,
                    tags: event.tags,
                    organizer: {
                        name: event.organizer.name,
                        email: event.organizer.email,
                    },
                }}
                isRegistered={isRegistered}
                canRegister={!!user && event.status === 'published'}
                onRegister={handleRegister}
                onCancelRegistration={handleCancelRegistration}
            />
        </div>
    );
}

function AttendeeDashboard() {
    const { data: registrationsData, isLoading } = useMyRegistrations();
    const registrations = registrationsData?.registrations || [];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
                <p className="text-muted-foreground">Manage your event registrations</p>
            </div>

            <DashboardStats
                role="attendee"
                stats={{
                    registeredEvents: registrations.length,
                    upcomingEvents: registrations.filter(r => new Date(r.event.date) > new Date()).length,
                    totalEvents: registrations.length,
                }}
            />

            <div>
                <h2 className="text-xl font-semibold mb-4">My Registered Events</h2>
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {registrations.map((registration) => (
                            <EventCard
                                key={registration._id}
                                id={registration.event._id}
                                title={registration.event.title}
                                description={registration.event.description}
                                category={registration.event.category}
                                eventType={registration.event.eventType}
                                date={new Date(registration.event.date)}
                                time={registration.event.time}
                                location={registration.event.location}
                                capacity={registration.event.capacity}
                                registeredCount={registration.event.registeredCount}
                                imageUrl={registration.event.image || businessEvent}
                                isVirtual={registration.event.isVirtual}
                                organizerName={registration.event.organizer.name}
                                onRegister={() => { }}
                                onViewDetails={() => window.location.href = `/events/${registration.event._id}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function OrganizerDashboard() {
    const [, setLocation] = useLocation();
    const { data: eventsData, isLoading } = useMyEvents();
    const events = eventsData?.events || [];

    const organizerEvents = events.map(e => ({
        id: e._id,
        title: e.title,
        date: new Date(e.date),
        status: e.status as 'draft' | 'published' | 'cancelled' | 'completed',
        registeredCount: e.registeredCount,
        capacity: e.capacity,
    }));

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Organizer Dashboard</h1>
                    <p className="text-muted-foreground">Manage your events and attendees</p>
                </div>
                <Button onClick={() => setLocation('/create-event')} data-testid="button-create-event">
                    Create Event
                </Button>
            </div>

            <DashboardStats
                role="organizer"
                stats={{
                    totalEvents: events.length,
                    totalAttendees: events.reduce((sum, e) => sum + e.registeredCount, 0),
                    activeEvents: events.filter(e => e.status === 'published').length,
                    upcomingEvents: events.filter(e => new Date(e.date) > new Date()).length,
                }}
            />

            <div>
                <h2 className="text-xl font-semibold mb-4">My Events</h2>
                {isLoading ? (
                    <div className="animate-pulse space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-16 bg-muted rounded-lg" />
                        ))}
                    </div>
                ) : (
                    <EventManagementTable
                        events={organizerEvents}
                        onEdit={(id) => setLocation(`/events/${id}/edit`)}
                        onDelete={(id) => console.log('Delete event:', id)}
                        onViewAttendees={(id) => setLocation(`/events/${id}/attendees`)}
                    />
                )}
            </div>
        </div>
    );
}

function CreateEventPage() {
    const [, setLocation] = useLocation();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <CreateEventForm
                onSubmit={(data) => {
                    console.log('Event created:', data);
                    setLocation('/dashboard');
                }}
            />
        </div>
    );
}

function Router() {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <div className="min-h-screen flex flex-col">
            <Header
                isAuthenticated={isAuthenticated}
                userRole={user?.role || 'attendee'}
                userName={user?.name || ''}
                onLogout={logout}
            />
            <main className="flex-1 flex flex-col">
                <Switch>
                    <Route path="/" component={HomePage} />
                    <Route path="/events" component={EventsPage} />
                    <Route path="/events/:id" component={EventDetailsPage} />
                    <Route path="/login">
                        <LoginForm />
                    </Route>
                    <Route path="/register">
                        <RegisterForm />
                    </Route>
                    <Route path="/dashboard">
                        {user?.role === 'organizer' ? <OrganizerDashboard /> : <AttendeeDashboard />}
                    </Route>
                    <Route path="/create-event" component={CreateEventPage} />
                    <Route>
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <h1 className="text-4xl font-bold mb-4">404</h1>
                                <p className="text-muted-foreground">Page not found</p>
                            </div>
                        </div>
                    </Route>
                </Switch>
            </main>
            <Footer />
            <Toaster />
        </div>
    );
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <AuthProvider>
                    <Router />
                </AuthProvider>
            </TooltipProvider>
        </QueryClientProvider>
    );
}

export default App;