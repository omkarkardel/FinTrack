# FinTrack — Finance Dashboard

A modern, responsive **finance dashboard web application** built with **React + Vite** to showcase clean frontend development, polished UI design, and scalable state management.

🔗 **GitHub Repository:** [FinTrack](https://github.com/omkarkardel/FinTrack)

---

## Overview

**FinTrack** is a fintech-inspired dashboard designed to help users track and understand financial activity through a clean and interactive interface.

This project focuses on:
- building a polished and responsive dashboard UI
- creating reusable frontend components
- managing application state in a clean way
- simulating role-based user behavior on the frontend
- delivering a smooth and modern user experience

It was built as a frontend showcase project to demonstrate **UI/UX thinking**, **component architecture**, and **dashboard development skills**.

---

## Key Highlights

- Premium fintech-inspired interface
- Fully responsive layout
- Dark / Light mode
- Fixed sidebar with scrollable content area
- Interactive dashboard analytics
- Transaction management with search, filters, and sorting
- Frontend-only role-based UI (Viewer / Admin)
- LocalStorage persistence
- Reusable component-based structure

---

## Features

### Dashboard Overview
- Financial summary cards for balance, income, and expenses
- Goals progress visualization
- Spending breakdown chart
- Income and expense trend charts
- Statistics and analytics cards
- Quick beneficiary / transfer panel
- Recent activity overview

### Transactions Management
- Search transactions
- Filter by category and type
- Sort by date and amount
- CSV export
- Empty state handling

### Role-Based UI (Frontend Only)
- **Viewer** role:
  - can view dashboard and transaction data
  - restricted from management actions

- **Admin** role:
  - can add, edit, and delete transactions
  - can manage dashboard interaction features
  - can access all available sections

### Additional UX Features
- Dark / Light mode toggle
- LocalStorage persistence
- Toast notifications
- Modal-based forms with validation
- Smooth animations and transitions
- Responsive desktop / tablet / mobile behavior

---

## Tech Stack

- **React 19**
- **Vite**
- **Tailwind CSS v4**
- **Zustand** + persist middleware
- **Recharts**
- **Framer Motion**
- **Lucide React**
- **Radix Dialog**
- **shadcn/ui style patterns**
- **Sonner** (toast notifications)

---

## Folder Structure

```
src/
  components/
    dashboard/      # Overview cards and analytics widgets
    insights/       # Insights panel visuals
    layout/         # App shell, sidebar, topbar
    transactions/   # Table + modal management UI
    ui/             # Reusable design primitives
  data/             # Mock finance datasets
  hooks/            # Theme + derived metrics hooks
  lib/              # Utility helpers
  pages/            # Route-like page views
  store/            # Zustand store + persistence + RBAC guard
```
---

### Project Architecture Approach

The application is structured around a dashboard shell layout designed to simulate a real-world fintech product interface.

Layout Strategy

The UI follows a clean app shell architecture with:

- a fixed left sidebar
- a top navigation/header
- a scrollable right-side content panel

This structure improves:

- usability by keeping navigation always accessible
- layout consistency across pages
- scalability for multi-page dashboard expansion
- better UX by allowing only the content area to scroll
- Component Strategy

The project is organized into reusable and domain-specific components such as:

- layout components for the app shell
- dashboard widgets for analytics and charts
- transaction components for filters, tables, and forms
- UI primitives for reusable styling patterns

This makes the codebase easier to maintain, extend, and reuse.

---

### State Management Approach

Application state is managed centrally using Zustand with persisted state.

The store handles:

- transactions
- filters
- selected role
- theme
- contacts
- card data
- dashboard metrics

This keeps UI logic predictable and avoids excessive prop drilling.

---

### Data Approach

The project uses realistic mock financial data and LocalStorage persistence to simulate a product-like frontend workflow without requiring a backend.

This allows the dashboard to demonstrate:

- analytics rendering
- filtering and sorting behavior
- role-based UI changes
- persisted user preferences
- Setup Instructions

### Follow these steps to run the project locally.

1. Clone the repository
  git clone https://github.com/omkarkardel/FinTrack.git
  cd dashboard

3. Install dependencies
   ```bash
   npm install


5. Start the development server
   ```bash
   npm run dev

The app will run locally at: http://localhost:5173


Available Scripts
  
Run development server
   ```bash
   npm run dev
   ```

Build for production

  ```bash
  npm run build
  ```

Preview production build
  ```bash
  npm run preview
  ```

Run lint checks
  ```bash
  npm run lint
  ```

---

### Role-Based Access Summary

Viewer
Can access:

- Dashboard
- Transactions
- Insights (if enabled in build)

Cannot:

- add transactions
- edit transactions
- delete transactions
- access management actions
  
Admin
Full dashboard access

- Can perform transaction management actions

- The role behavior is simulated entirely on the frontend using store-level checks and conditional rendering.

### Screenshots

Dashboard

Add screenshot here

Transactions

Add screenshot here

Insights

Add screenshot here

---

### Demo Flow

A simple walkthrough to evaluate the project:

Open the dashboard homepage
Toggle between dark and light mode
Switch role from Admin to Viewer
Navigate to the Transactions page
Demonstrate:
- search
- filters
- sorting
- CSV export
- Switch back to Admin
- Add / edit / delete a transaction using the modal form
  
- Visit:
- Dashboard
- Balance
- Cards
- Goals
- Insights
- Show responsive behavior on smaller screen sizes

### Future Improvements

Potential future enhancements include:

- backend integration with authentication
- API-based transactions and analytics
- recurring payment tracking
- budget planner module
- savings goal automation
- notifications center
- user profile settings

### Author

Omkar Kardel
🔗 GitHub: @omkarkardel



