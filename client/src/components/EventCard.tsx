import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { format } from "date-fns";

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  eventType: 'public' | 'corporate';
  date: Date;
  time: string;
  location: string;
  capacity: number;
  registeredCount: number;
  imageUrl?: string;
  isVirtual?: boolean;
  organizerName: string;
  onRegister?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

export function EventCard({
  id,
  title,
  description,
  category,
  eventType,
  date,
  time,
  location,
  capacity,
  registeredCount,
  imageUrl,
  isVirtual,
  organizerName,
  onRegister,
  onViewDetails,
}: EventCardProps) {
  const spotsLeft = capacity - registeredCount;
  const percentFull = (registeredCount / capacity) * 100;

  return (
    <Card className="overflow-hidden hover-elevate transition-all duration-200 flex flex-col h-full" data-testid={`card-event-${id}`}>
      {imageUrl && (
        <div className="relative aspect-video overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-3 left-3 flex gap-2">
            <Badge className="bg-primary text-primary-foreground" data-testid={`badge-category-${id}`}>
              {category}
            </Badge>
            {isVirtual && (
              <Badge variant="secondary" data-testid={`badge-virtual-${id}`}>Virtual</Badge>
            )}
          </div>
        </div>
      )}
      
      <CardHeader className="space-y-2 flex-1">
        <h3 className="text-xl font-semibold line-clamp-2" data-testid={`text-title-${id}`}>
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`text-description-${id}`}>
          {description}
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span data-testid={`text-date-${id}`}>{format(date, 'MMM dd, yyyy')}</span>
          <Clock className="h-4 w-4 text-muted-foreground ml-2" />
          <span data-testid={`text-time-${id}`}>{time}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="line-clamp-1" data-testid={`text-location-${id}`}>{location}</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span data-testid={`text-registered-${id}`}>{registeredCount}/{capacity}</span>
            </div>
            <span className={`text-xs ${spotsLeft < 10 ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>
              {spotsLeft} spots left
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                percentFull >= 90 ? 'bg-destructive' : percentFull >= 70 ? 'bg-chart-4' : 'bg-primary'
              }`}
              style={{ width: `${percentFull}%` }}
            />
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          By {organizerName}
        </p>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => onViewDetails?.(id)}
          data-testid={`button-view-details-${id}`}
        >
          View Details
        </Button>
        <Button
          className="flex-1"
          onClick={() => onRegister?.(id)}
          disabled={spotsLeft === 0}
          data-testid={`button-register-${id}`}
        >
          {spotsLeft === 0 ? 'Full' : 'Register'}
        </Button>
      </CardFooter>
    </Card>
  );
}
