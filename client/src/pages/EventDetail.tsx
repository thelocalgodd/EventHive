import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, MapPin, Users, Lock, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

interface Event {
  _id: string;
  title: string;
  description: string;
  category: string;
  eventType: 'public' | 'corporate';
  organizer: {
    name: string;
    email: string;
  };
  date: string;
  time: string;
  location: string;
  isVirtual: boolean;
  capacity: number;
  registeredCount: number;
  image?: string;
  tags: string[];
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  accessControl: {
    isPrivate: boolean;
    accessCode?: string;
    allowedDomains: string[];
  };
}

export default function EventDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await api.get(`/events/${id}`);
      setEvent(response.data.event);
      
      // Check if user is already registered
      if (user) {
        try {
          const regResponse = await api.get('/registrations/my-registrations');
          const isAlreadyRegistered = regResponse.data.registrations.some(
            (reg: any) => reg.event._id === id
          );
          setIsRegistered(isAlreadyRegistered);
        } catch (err) {
          // Ignore error for registration check
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load event');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!user) {
      setLocation('/login');
      return;
    }

    setRegistering(true);
    setError('');

    try {
      const payload = event?.accessControl.isPrivate && accessCode 
        ? { accessCode } 
        : {};
        
      await api.post(`/registrations/${id}`, payload);
      setIsRegistered(true);
      // Refresh event to update registered count
      fetchEvent();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setRegistering(false);
    }
  };

  const handleCancelRegistration = async () => {
    setRegistering(true);
    try {
      await api.delete(`/registrations/${id}`);
      setIsRegistered(false);
      fetchEvent();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to cancel registration');
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error && !event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-destructive">{error}</p>
            <Button 
              onClick={() => setLocation('/events')} 
              className="w-full mt-4"
            >
              Back to Events
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!event) return null;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const canRegister = event.status === 'published' && 
                     event.registeredCount < event.capacity && 
                     !isRegistered;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          {event.image && (
            <div className="w-full h-64 overflow-hidden rounded-t-lg">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-3xl mb-2">{event.title}</CardTitle>
                <CardDescription className="text-lg">
                  Organized by {event.organizer.name}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                {event.accessControl.isPrivate && (
                  <Badge variant="secondary">
                    <Lock className="w-3 h-3 mr-1" />
                    Private
                  </Badge>
                )}
                <Badge variant={
                  event.status === 'published' ? 'default' :
                  event.status === 'cancelled' ? 'destructive' :
                  'secondary'
                }>
                  {event.status}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              {event.description}
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <span>{formatDate(event.date)}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <span>{event.time}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <span>{event.location}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  <span>{event.registeredCount} / {event.capacity} registered</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="font-medium">Category: </span>
                  <Badge variant="outline">{event.category}</Badge>
                </div>
                
                <div>
                  <span className="font-medium">Type: </span>
                  <Badge variant="outline">{event.eventType}</Badge>
                </div>
                
                {event.tags.length > 0 && (
                  <div>
                    <span className="font-medium">Tags: </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {event.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Registration Section */}
            <div className="border-t pt-6">
              {!user ? (
                <div className="text-center">
                  <p className="mb-4">Please log in to register for this event.</p>
                  <Button onClick={() => setLocation('/login')}>
                    Log In
                  </Button>
                </div>
              ) : isRegistered ? (
                <div className="text-center">
                  <p className="text-green-600 mb-4">✓ You are registered for this event</p>
                  <Button 
                    variant="outline" 
                    onClick={handleCancelRegistration}
                    disabled={registering}
                  >
                    {registering ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Cancelling...
                      </>
                    ) : (
                      'Cancel Registration'
                    )}
                  </Button>
                </div>
              ) : canRegister ? (
                <div className="space-y-4">
                  {event.accessControl.isPrivate && (
                    <div className="space-y-2">
                      <Label htmlFor="accessCode">Access Code</Label>
                      <Input
                        id="accessCode"
                        type="password"
                        placeholder="Enter access code"
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value)}
                      />
                    </div>
                  )}
                  
                  {error && (
                    <p className="text-sm text-destructive">{error}</p>
                  )}
                  
                  <div className="text-center">
                    <Button 
                      onClick={handleRegister}
                      disabled={registering || (event.accessControl.isPrivate && !accessCode)}
                      size="lg"
                    >
                      {registering ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Registering...
                        </>
                      ) : (
                        'Register for Event'
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-muted-foreground">
                    {event.registeredCount >= event.capacity 
                      ? 'This event is full' 
                      : event.status !== 'published' 
                      ? 'Registration is not available' 
                      : 'Registration closed'}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}