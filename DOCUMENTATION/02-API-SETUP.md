# Step 2: API Setup - Connecting to OpenWeatherMap

## What is an API?
An API (Application Programming Interface) is like a waiter at a restaurant:
- You ask it a question (request)
- It gets the information (talks to server)
- It brings you the answer (response)

## Our Weather API

**Provider:** OpenWeatherMap
**Endpoint:** `https://api.openweathermap.org/data/2.5/weather`

### Getting Your API Key

1. Go to https://openweathermap.org/api
2. Sign up for free account
3. Go to "API Keys" section
4. Copy your API key
5. Put it in `.env.local` or directly in code (not recommended for production)

In our app, we used:
```
API_KEY = "6776ea79d46637b69c3ec728b3601d42"
```

## How Weather API Works

### Request (What We Ask)
```
URL: https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY&units=metric
```

Breaking it down:
- `q=London` - City name
- `appid=YOUR_API_KEY` - Your API key
- `units=metric` - Temperature in Celsius (not Fahrenheit)

### Response (What We Get)
```json
{
  "name": "London",
  "main": {
    "temp": 15.5,
    "feels_like": 14.2,
    "humidity": 72,
    "pressure": 1013
  },
  "weather": [{
    "main": "Cloudy",
    "description": "overcast clouds"
  }],
  "wind": {
    "speed": 4.5,
    "deg": 250
  }
}
```

## The weatherApi.ts File

This file has all the functions to talk to the API:

```typescript
// Get weather by city name
export async function getWeatherByCity(city: string): Promise<WeatherData> {
  const response = await fetch(
    `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
  );
  
  if (!response.ok) {
    throw new Error("City not found");
  }
  
  return response.json();
}

// Get weather icon
export function getWeatherIcon(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
}
```

## Understanding the Code

### `fetch()`
Sends a request to the server:
```typescript
const response = await fetch(URL);
```

### `await`
Wait for the response to come back (might take a few seconds).

### `.json()`
Convert the response to a JavaScript object we can use.

### `TypeScript Interface`
Describes what data we expect:
```typescript
export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  // ... more fields
}
```

---

**Next Step:** → [03-COMPONENTS-EXPLAINED.md](03-COMPONENTS-EXPLAINED.md)
