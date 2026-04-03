# 📈 FinTrack — Finance Dashboard

A modern, responsive **finance dashboard web application** built with **React + Vite** to showcase clean frontend development, polished UI design, and scalable state management.

🔗 **GitHub Repository:** [FinTrack](https://github.com/omkarkardel/FinTrack)
🌐 **Live Demo:** [View FinTrack](https://fin-track-en431kyre-omkars-projects-446298cd.vercel.app/)


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

## 🛠️ Tech Stack

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

## 📂 Folder Structure

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

## Project Architecture Approach

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

## State Management Approach

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

## Data Approach

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

    ```bash
    cd dashboard

2. Install dependencies
 
   ```bash
   npm install


3. Start the development server
   
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

## Role-Based Access Summary

- Viewer
Can access:

- Dashboard
- Transactions
- Insights (if enabled in build)

Cannot:

- add transactions
- edit transactions
- delete transactions
- access management actions
  
- Admin
Full dashboard access

- Can perform transaction management actions

- The role behavior is simulated entirely on the frontend using store-level checks and conditional rendering.

## 📸 Screenshots   

### Dashboard

<img width="1920" height="895" alt="FinTrack - Google Chrome 03-04-2026 08_39_07 PM" src="https://github.com/user-attachments/assets/246096ea-48a5-4e2f-9498-bdf7340c125f" />
<img width="1920" height="869" alt="File Explorer 03-04-2026 08_44_17 PM" src="https://github.com/user-attachments/assets/9fec8498-028e-4b5e-9098-10fa78673d31" />
<img width="1920" height="871" alt="FinTrack - Google Chrome 03-04-2026 08_44_28 PM" src="https://github.com/user-attachments/assets/087f7041-81f0-466f-8c64-e47397638cf3" />
<img width="1920" height="878" alt="FinTrack - Google Chrome 03-04-2026 08_44_48 PM" src="https://github.com/user-attachments/assets/07719d38-dc30-44b5-a33f-7d534ce81fac" />

---

### Transactions

  <img width="1920" height="871" alt="Captures - File Explorer 03-04-2026 08_53_36 PM" src="https://github.com/user-attachments/assets/1994eb96-f8fb-4234-9263-224f29c1a391" />
  <img width="1920" height="891" alt="FinTrack - Google Chrome 03-04-2026 08_53_46 PM" src="https://github.com/user-attachments/assets/ff223e42-c488-4239-a187-152be77a6611" />

---

### Insights

  <img width="1920" height="885" alt="FinTrack - Google Chrome 03-04-2026 08_54_04 PM" src="https://github.com/user-attachments/assets/67b576d2-d140-4f8d-a07c-377c8bdda05a" />

---

### Cards
  
  <img width="1920" height="887" alt="FinTrack - Google Chrome 03-04-2026 08_54_16 PM" src="https://github.com/user-attachments/assets/1b5f8df4-3ce1-46e0-9267-64f571072a93" />


---

### Goals

<img width="1920" height="895" alt="FinTrack - Google Chrome 03-04-2026 08_54_33 PM" src="https://github.com/user-attachments/assets/7ec3fce5-7929-4c77-99a7-45d2382a8dc4" />

---

## Demo Flow

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

## Future Improvements

Potential future enhancements include:

- backend integration with authentication
- API-based transactions and analytics
- recurring payment tracking
- budget planner module
- savings goal automation
- notifications center
- user profile settings

## Author

Omkar Kardel

🔗 GitHub: @omkarkardel



