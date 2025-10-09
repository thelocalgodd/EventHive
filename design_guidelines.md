# EventHive Design Guidelines

## Design Approach

**Hybrid Reference-Based System**
- Event Discovery & Details: Draw inspiration from Eventbrite's visual event cards + Airbnb's clean information hierarchy
- Organizer Dashboard: Follow Linear's minimal, data-focused interface with clear typography and functional design
- Authentication: Clean, centered forms with modern gradient accents

**Core Principles:**
1. Visual-first for attendee experience (browsing, discovering events)
2. Efficiency-focused for organizer tools (management, analytics)
3. Trust-building through professional polish and clear information hierarchy
4. Mobile-first responsive design

---

## Color Palette

### Light Mode
- **Primary Brand**: 248 83% 56% (vibrant purple-blue)
- **Primary Hover**: 248 83% 48%
- **Secondary**: 210 100% 50% (bright blue for accents)
- **Background**: 0 0% 100% (pure white)
- **Surface**: 220 13% 97% (light gray for cards)
- **Border**: 220 13% 91%
- **Text Primary**: 222 47% 11% (near black)
- **Text Secondary**: 215 16% 47% (medium gray)
- **Success**: 142 71% 45% (green for confirmations)
- **Warning**: 38 92% 50% (orange for capacity warnings)
- **Error**: 0 72% 51% (red for errors)

### Dark Mode
- **Primary Brand**: 248 73% 62% (lighter purple-blue)
- **Primary Hover**: 248 73% 68%
- **Secondary**: 210 100% 60%
- **Background**: 222 47% 11% (deep dark blue-black)
- **Surface**: 217 33% 17% (dark card background)
- **Border**: 217 33% 24%
- **Text Primary**: 210 40% 98% (near white)
- **Text Secondary**: 217 20% 70% (light gray)
- **Input Background**: 217 33% 14% (darker for form fields)

---

## Typography

**Font Stack:** Inter (via Google Fonts CDN), with system fallbacks
- **Headings**: Font weights 600-700, tighter letter spacing (-0.02em)
- **Body**: Font weight 400-500
- **Button/Labels**: Font weight 500-600, slight letter spacing (0.01em)

**Scale (Desktop):**
- Hero/H1: text-5xl/text-6xl (48-60px), leading-tight
- H2: text-4xl (36px), leading-tight  
- H3: text-2xl (24px), leading-snug
- H4: text-xl (20px)
- Body: text-base (16px), leading-relaxed
- Small: text-sm (14px)
- Labels: text-sm uppercase tracking-wide

**Mobile Adjustments:** Reduce heading sizes by 25-30%

---

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Micro spacing (elements within components): 2, 4
- Component padding: 4, 6, 8
- Section spacing: 12, 16, 20, 24
- Page margins: 16, 20, 24

**Container Strategy:**
- Full-width sections: `w-full` with inner `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Content sections: `max-w-6xl mx-auto`
- Forms/Text: `max-w-xl mx-auto`
- Dashboards: `max-w-7xl mx-auto`

**Grid Systems:**
- Event cards: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` with gap-6
- Dashboard stats: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` with gap-4
- Two-column layouts: `grid-cols-1 lg:grid-cols-2` with gap-8

---

## Component Library

### Navigation
- Sticky header with blur backdrop (backdrop-blur-xl bg-white/80 dark:bg-gray-900/80)
- Logo left, navigation center, auth buttons right
- Mobile: Hamburger menu with slide-in drawer
- Active state: Primary color underline with subtle bottom border

### Event Cards
- White surface (light) / dark surface cards with rounded-xl corners
- Event image as card header with aspect ratio 16:9
- Overlay gradient on image bottom for date/category badges
- Card body: Event title (text-xl font-semibold), description truncated (2 lines), location/time with icons
- Footer: Attendee count, capacity indicator (progress bar), register button
- Hover: Subtle lift with shadow-lg transition

### Forms & Inputs
- Rounded-lg borders with focus ring (ring-2 ring-primary)
- Dark mode: Dedicated darker background for all inputs (bg-gray-800 in dark mode)
- Floating labels or top-aligned labels with text-sm
- Error states: Red border with error message below
- Select dropdowns: Custom styled with chevron icon

### Buttons
- Primary: Solid primary color with white text, rounded-lg, px-6 py-3
- Secondary: Outlined with primary border, transparent background
- Ghost: No border, primary text with hover background
- Over images: Blurred background (backdrop-blur-md bg-white/10) with white text, no hover effects needed
- Icons: Leading or trailing icon with gap-2

### Dashboard Stat Cards
- Grid layout with rounded-lg cards
- Large number (text-3xl font-bold) with label below
- Icon in corner with primary color background circle
- Subtle border and shadow

### Data Tables (Attendee Lists)
- Striped rows for better readability
- Sticky header on scroll
- Action buttons (edit/delete) in row with icon buttons
- Mobile: Card view instead of table

### Modals & Dialogs
- Centered overlay with backdrop blur and dim (bg-black/50)
- Rounded-xl white/dark card with shadow-2xl
- Header with title and close X button
- Padded content area (p-6)
- Footer with action buttons aligned right

### Loading States
- Skeleton loaders for cards with animated pulse
- Spinner for button states (small circle with spin animation)
- Page transitions: Subtle fade-in

---

## Page-Specific Design

### Landing/Home Page
- **Hero Section (90vh)**: Full-width gradient background (primary to secondary diagonal), centered headline + CTA, large event search bar
- **Featured Events**: 3-column grid showcasing upcoming events with images
- **How It Works**: 3-step process with numbered icons and descriptions
- **For Organizers**: Split section with image left, benefits list right
- **CTA Section**: Gradient background with centered CTA button
- **Footer**: Multi-column with links, social icons, newsletter signup

### Event Discovery
- **Filter Bar**: Sticky top bar with category pills, search input, type/status dropdowns
- **Results Grid**: Responsive event cards with infinite scroll or pagination
- **Empty State**: Centered illustration with "No events found" message

### Event Details
- **Hero**: Full-width event image with overlay containing title, date, location
- **Info Grid**: Two-column - left (description, details), right (sticky registration card with capacity, price, register button)
- **Organizer Section**: Avatar, name, bio, contact button
- **Related Events**: Horizontal scroll carousel

### Authentication Pages
- **Centered Card**: max-w-md with logo at top, form fields, submit button, link to alternate page (login/register)
- **Role Selection**: Radio button group with visual cards for attendee/organizer
- **Background**: Subtle gradient or mesh pattern

### Dashboards
- **Attendee**: Hero stats (registered events, upcoming count), event list with status badges, profile quick-edit
- **Organizer**: Top metrics grid (total events, total attendees, active events), event management table with quick actions, create event CTA button (fixed bottom-right on mobile)

---

## Images

**Hero Images:**
- Landing page: Use vibrant event/crowd image (conference, concert, networking)
- Event details: Full-width event-specific image

**Supporting Images:**
- Event cards: Always include event thumbnail images
- Landing sections: Include supporting imagery for "For Organizers" section
- Profile/Dashboard: Avatar placeholders with initials

**Image Treatment:**
- Rounded corners (rounded-lg for cards, rounded-xl for heroes)
- Subtle overlay gradients for text readability
- Lazy loading with blur-up placeholders

---

## Interactions & Micro-animations

Use sparingly:
- Card hover: Subtle translate-y lift (transform -translate-y-1)
- Button press: Scale down slightly (scale-95) on active
- Page transitions: Fade-in with duration-200
- Success notifications: Slide-in from top with bounce

**NO gratuitous animations** - keep it professional and performant