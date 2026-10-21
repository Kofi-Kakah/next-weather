# Step 1: Project Setup

## What We Did
We set up a Next.js weather app from scratch with TypeScript and Tailwind CSS.

## The Files Created
```
next-weather/
├── app/
│   ├── page.tsx           (Main page - shows weather)
│   ├── layout.tsx         (App wrapper)
│   ├── globals.css        (Styles)
│   ├── Components/
│   │   ├── Navbar.tsx     (Top navigation)
│   │   ├── SearchBox.tsx  (Search input)
│   │   └── WeatherDisplay.tsx (Weather details)
│   └── Utils/
│       ├── weatherApi.ts  (API functions)
│       └── cn.ts          (Helper function)
├── package.json           (Dependencies)
├── next.config.ts         (Next.js config)
└── tsconfig.json          (TypeScript config)
```

## What Each Folder Does

### `app/`
Main folder where your app lives. Every file here is part of your website.

### `app/Components/`
Reusable pieces of UI:
- **Navbar.tsx** - Header at top with logo and search
- **SearchBox.tsx** - Input field to search cities
- **WeatherDisplay.tsx** - Shows all weather information

### `app/Utils/`
Helper functions that do the hard work:
- **weatherApi.ts** - Talks to OpenWeatherMap API
- **cn.ts** - Utility to merge CSS classes

## Key Technologies Used

| Technology | What it Does |
|---|---|
| **Next.js** | React framework that makes web apps |
| **React** | Library for building user interfaces |
| **TypeScript** | JavaScript with type safety (catches errors) |
| **Tailwind CSS** | Fast way to style with classes |
| **React Icons** | Pre-made icon components |

## How to Start the App

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

---

**Next Step:** → [02-API-SETUP.md](02-API-SETUP.md)
