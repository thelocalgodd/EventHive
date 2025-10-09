import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import type { EventFilters as EventFiltersType } from "../types/api";

interface EventFiltersProps {
  onFilterChange?: (filters: EventFiltersType) => void;
}

const categories = [
  'All Categories',
  'Technology',
  'Business',
  'Arts & Culture',
  'Music',
  'Sports',
  'Education',
  'Networking',
];

const eventTypes = [
  'All Types',
  'Public',
  'Corporate',
];

const statuses = [
  'All Status',
  'Published',
  'Draft',
  'Completed',
  'Cancelled',
];

export function EventFilters({ onFilterChange }: EventFiltersProps) {
  const [filters, setFilters] = useState({
    search: '',
    category: 'All Categories',
    eventType: 'All Types',
    status: 'All Status',
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    // Transform to API format
    const apiFilters: EventFiltersType = {};
    if (newFilters.search) apiFilters.search = newFilters.search;
    if (newFilters.category !== 'All Categories') apiFilters.category = newFilters.category;
    if (newFilters.eventType !== 'All Types') apiFilters.eventType = newFilters.eventType.toLowerCase();
    if (newFilters.status !== 'All Status') apiFilters.status = newFilters.status.toLowerCase();

    onFilterChange?.(apiFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      search: '',
      category: 'All Categories',
      eventType: 'All Types',
      status: 'All Status',
    };
    setFilters(resetFilters);
    onFilterChange?.({});
  };

  return (
    <div className="bg-card border border-card-border rounded-lg p-4 space-y-4">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Filters</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search events..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="pl-9"
            data-testid="input-filter-search"
          />
        </div>

        <Select
          value={filters.category}
          onValueChange={(value) => handleFilterChange('category', value)}
        >
          <SelectTrigger data-testid="select-category">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.eventType}
          onValueChange={(value) => handleFilterChange('eventType', value)}
        >
          <SelectTrigger data-testid="select-event-type">
            <SelectValue placeholder="Event Type" />
          </SelectTrigger>
          <SelectContent>
            {eventTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.status}
          onValueChange={(value) => handleFilterChange('status', value)}
        >
          <SelectTrigger data-testid="select-status">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          data-testid="button-reset-filters"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
