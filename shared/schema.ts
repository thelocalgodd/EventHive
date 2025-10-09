// Shared types between frontend and backend
export interface User {
  id: string;
  name: string;
  email: string;
  role: "attendee" | "organizer";
  organizationType?: "individual" | "corporate";
  createdAt: string;
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  category: string;
  eventType: "public" | "corporate";
  organizer: {
    _id: string;
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
  status: "draft" | "published" | "cancelled" | "completed";
  accessControl: {
    isPrivate: boolean;
    accessCode?: string;
    allowedDomains: string[];
  };
  createdAt: string;
}

export interface Registration {
  _id: string;
  user: string;
  event: Event;
  status: "confirmed" | "cancelled" | "waitlist";
  registrationDate: string;
}
