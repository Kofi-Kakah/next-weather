# Step 3: Understanding Components

## What is a Component?
A component is a reusable piece of UI - like a LEGO brick. Build once, use many times.

## The Main Page (page.tsx)

### What It Does
- Shows a loading spinner while fetching data
- Shows an error message if something goes wrong
- Displays weather when data loads

### Key Parts

```typescript
const [weather, setWeather] = useState<WeatherData | null>(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

**State** = Data that can change:
- `weather` - The API data we get
- `loading` - Is it still fetching?
- `error` - Did something go wrong?

### The fetchWeather Function
```typescript
const fetchWeather = async (city: string) => {
  setLoading(true);      // Show spinner
  try {
    const data = await getWeatherByCity(city);
    setWeather(data);    // Got data! Show it
  } catch (err) {
    setError("Failed");  // Oops! Show error
  }
  setLoading(false);     // Hide spinner
};
```

**Flow:**
1. User searches for "Paris"
2. Set `loading = true` (show spinner)
3. Fetch data from API
4. Set `weather = data` (update display)
5. Set `loading = false` (hide spinner)

---

## The Navbar Component

### What It Does
Shows the header with logo, search box, and location info.

### Responsive Design
- **Mobile:** Logo + Search + Menu button
- **Tablet:** Logo + Search + Location info + Menu
- **Desktop:** All elements visible side-by-side

### Key Feature: Mobile Menu
```typescript
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

const toggleMobileMenu = () => {
  setIsMobileMenuOpen(!isMobileMenuOpen);
};
```

Toggles menu open/closed on mobile.

### Displaying Current Location
```typescript
<p>{currentLocation}</p>  // Shows "London", "Paris", etc.
```

Gets passed from page.tsx:
```typescript
<Navbar currentLocation={weather?.name} />
```

---

## The SearchBox Component

### What It Does
Simple input field + button to search cities.

### Props It Receives
```typescript
type props = {
  className?: string;        // CSS classes
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;  // Called while typing
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;     // Called on search
}
```

### How It Works
```html
<input onChange={onChange} />  <!-- Calls onChange while typing -->
<button type="submit">Search</button>  <!-- Calls onSubmit on click -->
```

---

## The WeatherDisplay Component

### What It Does
Shows ALL the weather details in nice cards.

### Information Displayed

| Section | What it Shows |
|---------|--------------|
| **Header** | City name, country, date, weather icon |
| **Temperature** | Current temp, feels like, min/max |
| **Atmosphere** | Humidity, pressure, wind, visibility |
| **Other** | Cloud coverage, sunrise/sunset, coordinates |

### Key Features

#### 1. Helper Functions
```typescript
const formatTime = (timestamp: number, timezone: number) => {
  // Convert Unix timestamp to readable time
  // Example: 1620000000 → "3:30 PM"
};

const kmToMiles = (km: number) => {
  // Convert kilometers to miles
  // Example: 10 km → "6.21 miles"
};
```

#### 2. Display Weather Icon
```typescript
<Image
  src={getWeatherIcon(data.weather[0].icon)}
  alt="weather"
/>
```

Shows a weather picture (cloud, sun, rain, etc.)

#### 3. Progress Bars
```typescript
<div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
  <div style={{ width: `${data.main.humidity}%` }} />
</div>
```

Shows humidity/cloud coverage as a bar that fills up.

#### 4. Responsive Grid
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
```

- 1 column on mobile
- 2 columns on desktop

---

**Next Step:** → [04-HOW-TO-MODIFY.md](04-HOW-TO-MODIFY.md)
