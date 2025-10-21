import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar, Upload, X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { useCreateEvent } from "../hooks/useEvents";
import { useToast } from "@/hooks/use-toast";
import type { CreateEventForm as CreateEventFormType } from "../types/api";

interface CreateEventFormProps {
  onSubmit?: (data: EventFormData) => void;
  initialData?: Partial<EventFormData>;
  isLoading?: boolean; // Add this prop
}

export interface EventFormData {
  title: string;
  description: string;
  category: string;
  eventType: 'public' | 'corporate';
  date: string;
  time: string;
  location: string;
  capacity: number;
  isVirtual: boolean;
  isPrivate: boolean;
  accessCode?: string;
  allowedDomains?: string;
  tags?: string;
}

const categories = [
  'Technology',
  'Business',
  'Arts & Culture',
  'Music',
  'Sports',
  'Education',
  'Networking',
];

export function CreateEventForm({ onSubmit, initialData, isLoading }: CreateEventFormProps) {
  const [formData, setFormData] = useState<EventFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || '',
    eventType: initialData?.eventType || 'public',
    date: initialData?.date || '',
    time: initialData?.time || '',
    location: initialData?.location || '',
    capacity: initialData?.capacity || 50,
    isVirtual: initialData?.isVirtual || false,
    isPrivate: initialData?.isPrivate || false,
    accessCode: initialData?.accessCode || '',
    allowedDomains: initialData?.allowedDomains || '',
    tags: initialData?.tags || '',
  });

  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const createEventMutation = useCreateEvent();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Image must be less than 5MB",
          variant: "destructive",
        });
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImageBase64(base64String);
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageBase64(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Transform form data to match API format and include image
      const eventData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        eventType: formData.eventType,
        date: formData.date,
        time: formData.time,
        location: formData.location,
        isVirtual: formData.isVirtual,
        capacity: formData.capacity,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
        status: 'published',
        accessControl: {
          isPrivate: formData.isPrivate,
          accessCode: formData.accessCode || undefined,
          allowedDomains: formData.allowedDomains
            ? formData.allowedDomains.split(',').map(domain => domain.trim())
            : [],
        },
        image: imageBase64 || undefined,
      };

      await createEventMutation.mutateAsync(eventData);

      toast({
        title: "Event created!",
        description: "Your event has been successfully created.",
      });

      onSubmit?.(formData);
      setLocation('/dashboard');
    } catch (error) {
      toast({
        title: "Failed to create event",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            {initialData ? 'Edit Event' : 'Create New Event'}
          </CardTitle>
          <CardDescription>
            Fill in the details to {initialData ? 'update your' : 'create a new'} event
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title *</Label>
              <Input
                id="title"
                placeholder="Tech Innovation Summit 2024"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                data-testid="input-title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your event..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={4}
                data-testid="input-description"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger id="category" data-testid="select-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventType">Event Type *</Label>
                <Select
                  value={formData.eventType}
                  onValueChange={(value: 'public' | 'corporate') => setFormData({ ...formData, eventType: value })}
                >
                  <SelectTrigger id="eventType" data-testid="select-event-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="corporate">Corporate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  data-testid="input-date"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time *</Label>
                <Input
                  id="time"
                  placeholder="9:00 AM - 5:00 PM"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required
                  data-testid="input-time"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="Convention Center, Hall A"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                  data-testid="input-location"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity *</Label>
                <Input
                  id="capacity"
                  type="number"
                  min="1"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                  required
                  data-testid="input-capacity"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label htmlFor="isVirtual" className="cursor-pointer">Virtual Event</Label>
                  <p className="text-sm text-muted-foreground">Event will be held online</p>
                </div>
                <Switch
                  id="isVirtual"
                  checked={formData.isVirtual}
                  onCheckedChange={(checked) => setFormData({ ...formData, isVirtual: checked })}
                  data-testid="switch-virtual"
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label htmlFor="isPrivate" className="cursor-pointer">Private Event</Label>
                  <p className="text-sm text-muted-foreground">Require access code or email domain</p>
                </div>
                <Switch
                  id="isPrivate"
                  checked={formData.isPrivate}
                  onCheckedChange={(checked) => setFormData({ ...formData, isPrivate: checked })}
                  data-testid="switch-private"
                />
              </div>
            </div>

            {formData.isPrivate && (
              <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                <div className="space-y-2">
                  <Label htmlFor="accessCode">Access Code (optional)</Label>
                  <Input
                    id="accessCode"
                    placeholder="Enter access code"
                    value={formData.accessCode}
                    onChange={(e) => setFormData({ ...formData, accessCode: e.target.value })}
                    data-testid="input-access-code"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allowedDomains">Allowed Email Domains (optional)</Label>
                  <Input
                    id="allowedDomains"
                    placeholder="company.com, partner.com"
                    value={formData.allowedDomains}
                    onChange={(e) => setFormData({ ...formData, allowedDomains: e.target.value })}
                    data-testid="input-domains"
                  />
                  <p className="text-xs text-muted-foreground">Comma-separated domains</p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (optional)</Label>
              <Input
                id="tags"
                placeholder="AI, Innovation, Networking"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                data-testid="input-tags"
              />
              <p className="text-xs text-muted-foreground">Comma-separated tags</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Event Image (optional)</Label>
              <div className="flex flex-col gap-4">
                {imagePreview ? (
                  <div className="relative rounded-lg overflow-hidden border">
                    <img
                      src={imagePreview}
                      alt="Event preview"
                      className="w-full h-48 object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="image"
                    className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PNG, JPG or GIF (MAX. 5MB)
                      </p>
                    </div>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      data-testid="input-image"
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                className="flex-1"
                disabled={createEventMutation.isPending || isLoading}
                data-testid="button-submit"
              >
                {(createEventMutation.isPending || isLoading) ? 'Saving...' : initialData ? 'Update Event' : 'Create Event'}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                data-testid="button-cancel"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
