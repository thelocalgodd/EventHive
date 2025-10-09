import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2, Users, MoreVertical } from "lucide-react";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Event {
  id: string;
  title: string;
  date: Date;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  registeredCount: number;
  capacity: number;
}

interface EventManagementTableProps {
  events: Event[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onViewAttendees?: (id: string) => void;
}

const statusColors = {
  draft: 'bg-muted text-muted-foreground',
  published: 'bg-chart-3/10 text-chart-3',
  cancelled: 'bg-destructive/10 text-destructive',
  completed: 'bg-primary/10 text-primary',
};

export function EventManagementTable({ events, onEdit, onDelete, onViewAttendees }: EventManagementTableProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Registered</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                No events found
              </TableCell>
            </TableRow>
          ) : (
            events.map((event) => (
              <TableRow key={event.id} data-testid={`row-event-${event.id}`}>
                <TableCell className="font-medium" data-testid={`text-title-${event.id}`}>
                  {event.title}
                </TableCell>
                <TableCell data-testid={`text-date-${event.id}`}>
                  {format(event.date, 'MMM dd, yyyy')}
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[event.status]} data-testid={`badge-status-${event.id}`}>
                    {event.status}
                  </Badge>
                </TableCell>
                <TableCell data-testid={`text-capacity-${event.id}`}>
                  {event.registeredCount}/{event.capacity}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit?.(event.id)}
                      data-testid={`button-edit-${event.id}`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewAttendees?.(event.id)}
                      data-testid={`button-attendees-${event.id}`}
                    >
                      <Users className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" data-testid={`button-more-${event.id}`}>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onDelete?.(event.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
