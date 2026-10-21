# Step 4: How to Modify & Extend

## Adding a New Feature - Show Forecast

### Step 1: Update API Function
In `app/Utils/weatherApi.ts`, add a new function:

```typescript
export async function getWeatherForecast(city: string): Promise<ForecastData> {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );
  
  if (!response.ok) {
    throw new Error("Could not fetch forecast");
  }
  
  return response.json();
}
```

### Step 2: Add State in page.tsx
```typescript
const [forecast, setForecast] = useState<ForecastData | null>(null);
```

### Step 3: Fetch When City Changes
```typescript
const fetchWeather = async (city: string) => {
  setLoading(true);
  try {
    const data = await getWeatherByCity(city);
    const forecastData = await getWeatherForecast(city);
    setWeather(data);
    setForecast(forecastData);
  } catch (err) {
    setError("Failed to fetch");
  }
  setLoading(false);
};
```

### Step 4: Create New Component
Create `app/Components/ForecastDisplay.tsx`:

```typescript
'use client';

interface ForecastDisplayProps {
  data: ForecastData;
}

export default function ForecastDisplay({ data }: ForecastDisplayProps) {
  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">5-Day Forecast</h2>
      <div className="grid grid-cols-5 gap-4">
        {data.list.slice(0, 40).map((item, index) => (
          <div key={index} className="bg-blue-50 p-4 rounded">
            <p>{new Date(item.dt * 1000).toLocaleDateString()}</p>
            <p className="text-lg font-bold">{item.main.temp}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Step 5: Use in Page
```typescript
{forecast && <ForecastDisplay data={forecast} />}
```

---

## Adding a New Weather Property

### Current Weather Shows
- Temperature
- Humidity
- Wind speed
- Visibility
- Cloud coverage

### API Also Has (Not Currently Shown)
- UV Index
- Air Quality
- Pollen Count

### To Add Air Quality:

**1. Add to weatherApi.ts:**
```typescript
const AIR_QUALITY_URL = "https://api.openweathermap.org/data/2.5/air_pollution";

export async function getAirQuality(lat: number, lon: number) {
  const response = await fetch(
    `${AIR_QUALITY_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  return response.json();
}
```

**2. Fetch in page.tsx:**
```typescript
const airQuality = await getAirQuality(data.coord.lat, data.coord.lon);
setAirQuality(airQuality);
```

**3. Display in WeatherDisplay.tsx:**
```typescript
<div className="bg-white rounded-lg p-6">
  <h3>Air Quality Index</h3>
  <p className="text-2xl font-bold">{data.list[0].main.aqi}</p>
</div>
```

---

## Changing Colors & Styles

### Change Navbar Color
```typescript
// From:
<nav className="bg-white shadow-md">

// To:
<nav className="bg-blue-900 text-white shadow-md">
```

### Change Weather Card Colors
```typescript
// From:
<div className="bg-gradient-to-br from-blue-400 to-blue-600">

// To:
<div className="bg-gradient-to-br from-purple-400 to-pink-600">
```

### Use Tailwind Classes
Common useful classes:
- `bg-red-500` - Red background
- `text-white` - White text
- `rounded-lg` - Rounded corners
- `shadow-xl` - Big shadow
- `p-6` - Padding
- `mb-4` - Margin bottom

---

## Common Mistakes & Fixes

### Error: "Cannot read property of undefined"
```typescript
// ❌ Wrong
{data.main.temp}

// ✅ Right (add null check)
{data?.main?.temp || "N/A"}
```

### Error: "Invalid src prop on Image"
Make sure domain is allowed in `next.config.ts`:
```typescript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "yourdomain.com",
    },
  ],
},
```

### State Not Updating
```typescript
// ❌ Wrong (mutating directly)
weather.main.temp = 20;

// ✅ Right (create new object)
setWeather({ ...weather, main: { ...weather.main, temp: 20 } });
```

---

## Useful Resources

- **Tailwind CSS Classes:** https://tailwindcss.com/docs/
- **React Hooks:** https://react.dev/reference/react
- **OpenWeatherMap API:** https://openweathermap.org/api
- **TypeScript Basics:** https://www.typescriptlang.org/docs/handbook/

---

**Next Step:** → Check out [LEARN_API_FETCHING/](../LEARN_API_FETCHING/) folder to learn API fetching!
