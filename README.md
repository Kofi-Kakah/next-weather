# Next Weather App

A modern, responsive weather application built with [Next.js 16](https://nextjs.org/), [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), and [Tailwind CSS v4](https://tailwindcss.com/). It fetches real-time weather data from the [OpenWeatherMap API](https://openweathermap.org/api) and displays comprehensive weather information in an intuitive, user-friendly interface.

## Features

- **Real-time Weather Data** - Get current weather conditions for any city worldwide
- **Search Functionality** - Search for weather by city name with a clean search interface
- **Default Location** - Loads weather for London on initial page load
- **Comprehensive Weather Information**:
  - Current temperature and "feels like" temperature
  - Weather conditions with icons
  - Temperature min/max range
  - Humidity with visual indicator
  - Atmospheric pressure
  - Wind speed, direction, and gusts
  - Visibility (in km and miles)
  - Cloud coverage with visual indicator
  - Sunrise and sunset times (timezone-aware)
  - Geographic coordinates
- **Responsive Design** - Optimized for mobile, tablet, and desktop devices
- **Modern UI** - Clean interface with gradient cards, icons from React Icons, and smooth animations
- **Loading & Error States** - User-friendly feedback during data fetching

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| [Next.js](https://nextjs.org/) | 16.2.6 | React framework with App Router |
| [React](https://react.dev/) | 19.2.4 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | ^5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | ^4 | Styling |
| [OpenWeatherMap API](https://openweathermap.org/) | - | Weather data provider |
| [React Icons](https://react-icons.github.io/react-icons/) | ^5.6.0 | Icon library |
| [clsx](https://github.com/lukeed/clsx) & [tailwind-merge](https://github.com/dcastil/tailwind-merge) | ^2.1.1, ^3.5.0 | Conditional class utilities |

## Project Structure

```
next-weather/
├── app/
│   ├── Components/
│   │   ├── Navbar.tsx        # Navigation bar with search and location
│   │   ├── SearchBox.tsx     # Search input component
│   │   └── WeatherDisplay.tsx # Main weather display with all metrics
│   ├── Utils/
│   │   ├── cn.ts             # Utility for merging Tailwind classes
│   │   └── weatherApi.ts     # OpenWeatherMap API integration
│   ├── favicon.ico
│   ├── globals.css           # Global styles and Tailwind imports
│   ├── layout.tsx            # Root layout with Geist font
│   └── page.tsx              # Main page component
├── public/                   # Static assets
├── package.json
├── tsconfig.json
└── next.config.ts
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18.x or later
- npm, yarn, pnpm, or bun package manager
- An API key from [OpenWeatherMap](https://openweathermap.org/api) (free tier available)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/next-weather.git
cd next-weather
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Configure API Key**

The API key is currently hardcoded in `app/Utils/weatherApi.ts`. For production use, it's recommended to move this to environment variables.

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
```

Then update `app/Utils/weatherApi.ts`:

```typescript
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
```

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server on [http://localhost:3000](http://localhost:3000) |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint for code quality checks |

## API Reference

The app uses the [OpenWeatherMap Current Weather Data API](https://openweathermap.org/current):

- **Endpoint**: `https://api.openweathermap.org/data/2.5/weather`
- **Parameters**: `q={city}`, `appid={API_KEY}`, `units=metric`
- **Response**: Returns current weather data including temperature, conditions, wind, etc.

## Components Overview

### `Navbar.tsx`
Navigation bar containing the app logo, search box, and current location display. Includes a geolocation button (currently shows coordinates in an alert).

### `SearchBox.tsx`
Reusable search form component with an input field and search button using React Icons.

### `WeatherDisplay.tsx`
Displays all weather information in a structured layout with:
- Header with location, date, and weather icon
- Current and "feels like" temperature
- Weather condition description
- Temperature range cards
- Grid of atmospheric conditions (humidity, pressure, wind, visibility)
- Cloud coverage
- Sunrise/sunset times
- Location coordinates
- Last updated timestamp

All times are converted to the location's local timezone using the API's timezone offset.

## Customization

- **Styling**: Modify Tailwind classes in components or update `app/globals.css`
- **Default City**: Change `"London"` in `app/page.tsx` line 16
- **Units**: The API is called with `units=metric` (Celsius). Change to `imperial` for Fahrenheit
- **Font**: Uses Geist Sans font configured in `app/layout.tsx`

## Deployment

The easiest way to deploy is with [Vercel](https://vercel.com/):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/next-weather)

For other deployment options, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Notes

- The OpenWeatherMap API key is exposed in client-side code. For production, consider using a server-side route or environment variables with proper restrictions.
- The geolocation button currently only displays coordinates in an alert - it doesn't fetch weather for the current location.
- This project was bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## License

This project is private and not licensed for public use.
