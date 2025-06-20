# Mythguard

## Overview
A modern e-commerce platform built with Next.js 15, featuring a dynamic product catalog, user authentication, and admin dashboard. This project showcases advanced React patterns and best practices in building scalable e-commerce solutions.

## Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Authentication**: Clerk
- **Database**: Prisma with Supabase
- **State Management**: React Context
- **Carousel**: Embla Carousel

## Key Features
- 🛍️ Product catalog with dynamic filtering
- 🔐 Secure authentication with Clerk
- 📊 Admin dashboard for sales and inventory management
- 🎨 Modern UI with dark/light mode support
- 🛒 Shopping cart functionality
- 💳 Secure checkout process

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Supabase account
- Clerk account

### Installation
1. Clone the repository
```bash
git clone <repository-url>
cd udemy-store
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```
Fill in your environment variables in `.env.local`

4. Set up the database
```bash
npm run prisma:push
npm run prisma:generate
```

5. Start the development server
```bash
npm run dev
# or
yarn dev
```

## Project Structure
```
├── app/              # Next.js app directory
├── components/       # Reusable UI components
├── lib/             # Utility functions and configurations
├── prisma/          # Database schema and migrations
├── public/          # Static assets
├── types/           # TypeScript type definitions
└── utils/           # Helper functions
```

## Scripts
- `dev`: Start development server
- `build`: Build for production
- `start`: Start production server
- `lint`: Run ESLint
- `prisma:push`: Push database changes
- `prisma:generate`: Generate Prisma client
- `prisma:studio`: Open Prisma Studio
- `seed`: Seed the database

## Author
- [Morgan Ero](https://github.com/MorganEro)

