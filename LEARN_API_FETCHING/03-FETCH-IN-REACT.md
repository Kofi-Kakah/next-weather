# Chapter 3: API Calls in React

## The Problem
Can't just call `fetch()` anywhere in React. Need to use **useEffect hook**.

---

## The Hook: useEffect

### What It Does
Runs code when component loads or updates.

### Basic Syntax
```typescript
useEffect(() => {
  // Code here runs after component shows up
}, [dependencies]);
```

### Example
```typescript
import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    console.log("Component loaded!");
  }, []);
  
  return <h1>Hello</h1>;
}
```

**Output:** "Component loaded!" appears once when page loads.

---

## Fetching Data On Load

### Step 1: Create States
```typescript
const [data, setData] = useState(null);      // The data
const [loading, setLoading] = useState(true); // Is it loading?
const [error, setError] = useState(null);     // Did it error?
```

### Step 2: Fetch In useEffect
```typescript
useEffect(() => {
  async function fetchData() {
    try {
      setLoading(true);
      const response = await fetch("https://api.example.com/data");
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  
  fetchData();
}, []); // Empty array = run once on load
```

### Step 3: Show Data
```typescript
if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error}</p>;
return <p>{data.name}</p>;
```

---

## Complete Example: Show Random User

```typescript
'use client';

import { useEffect, useState } from "react";

interface User {
  name: {
    first: string;
    last: string;
  };
  email: string;
  picture: {
    medium: string;
  };
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch("https://randomuser.me/api/");
        const data = await response.json();
        setUser(data.results[0]);
      } catch (err) {
        setError("Failed to fetch user");
      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, []); // Run once on page load

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div>
      <img src={user.picture.medium} alt="User" />
      <h1>{user.name.first} {user.name.last}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

---

## Fetching When User Types

### Search For Pokemon

```typescript
import { useEffect, useState } from "react";

export default function PokemonSearch() {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!search) {
      setPokemon(null);
      return;
    }

    async function fetchPokemon() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
        );
        if (!response.ok) throw new Error("Not found");
        
        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();
  }, [search]); // Re-run when search changes

  return (
    <div>
      <input
        type="text"
        placeholder="Search Pokemon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Searching...</p>}
      
      {pokemon && (
        <div>
          <h2>{pokemon.name}</h2>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
      )}
    </div>
  );
}
```

**How it works:**
- User types in input → `setSearch` updates
- `search` changes → `useEffect` runs
- Fetches pokemon data
- Shows result

---

## Search With Delay (Debounce)

Problem: Fetches too often while typing  
Solution: Wait until user stops typing

```typescript
import { useEffect, useState } from "react";

export default function SmartSearch() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    // Timer that runs after 500ms of no typing
    const timer = setTimeout(() => {
      if (search) {
        console.log("Searching for:", search);
        // Fetch here
      }
    }, 500); // Wait 500 milliseconds

    // Clean up if user types again before timer ends
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <input
      type="text"
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
```

---

## Multiple API Calls

### Problem: Need data from 2 APIs

```typescript
useEffect(() => {
  async function fetchAll() {
    setLoading(true);
    try {
      // Get user
      const userRes = await fetch(`/api/users/${userId}`);
      const user = await userRes.json();
      setUser(user);

      // Get user's posts
      const postsRes = await fetch(`/api/users/${userId}/posts`);
      const posts = await postsRes.json();
      setPosts(posts);

      // Get user's friends
      const friendsRes = await fetch(`/api/users/${userId}/friends`);
      const friends = await friendsRes.json();
      setFriends(friends);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  fetchAll();
}, [userId]);
```

---

## Parallel Fetching (Faster)

Get all data at same time instead of waiting for each one:

```typescript
useEffect(() => {
  async function fetchAll() {
    try {
      // Start all requests at same time
      const [userRes, postsRes, friendsRes] = await Promise.all([
        fetch(`/api/users/${userId}`),
        fetch(`/api/users/${userId}/posts`),
        fetch(`/api/users/${userId}/friends`)
      ]);

      // Convert all to JSON
      const user = await userRes.json();
      const posts = await postsRes.json();
      const friends = await friendsRes.json();

      // Update states
      setUser(user);
      setPosts(posts);
      setFriends(friends);
    } catch (err) {
      setError(err.message);
    }
  }

  fetchAll();
}, [userId]);
```

---

## Cleanup Functions

Sometimes need to stop requests when component unmounts.

```typescript
useEffect(() => {
  let isMounted = true; // Track if component is still visible

  async function fetchData() {
    const response = await fetch(URL);
    const data = await response.json();
    
    if (isMounted) { // Only update if component still exists
      setData(data);
    }
  }

  fetchData();

  // Cleanup function runs when component disappears
  return () => {
    isMounted = false;
  };
}, []);
```

---

## Custom Hook for Fetching

Make reusable fetch logic:

```typescript
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetch Data() {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Use it anywhere:
export default function App() {
  const { data: user, loading, error } = useFetch("https://randomuser.me/api/");
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <p>Hello {user.results[0].name.first}</p>;
}
```

---

## Dependency Array Guide

```typescript
useEffect(() => {
  console.log("This code runs...");
}, ???);
```

### 1. Empty array `[]`
Runs once when component loads:
```typescript
useEffect(() => {
  // Runs ONE time
}, []);
```

### 2. With dependencies `[variable]`
Runs when variable changes:
```typescript
useEffect(() => {
  // Runs when 'search' changes
}, [search]);
```

### 3. No dependency array
Runs after EVERY render (usually bad):
```typescript
useEffect(() => {
  // Runs EVERY time component updates
});
```

---

## Common Mistakes

### ❌ Wrong: Forget await
```typescript
const data = fetch(URL); // Wrong! data is a Promise
```

### ✅ Right: Use await
```typescript
const response = await fetch(URL); // Correct!
```

---

### ❌ Wrong: No dependency array
```typescript
useEffect(() => {
  fetch(URL); // Runs infinite loop!
});
```

### ✅ Right: Add dependency array
```typescript
useEffect(() => {
  fetch(URL); // Runs once
}, []);
```

---

### ❌ Wrong: Missing states
```typescript
if (loading) return;  // 'loading' not defined!
```

### ✅ Right: Define states first
```typescript
const [loading, setLoading] = useState(true);
if (loading) return; // Works!
```

---

## Practice: Weather Search in React

```typescript
'use client';

import { useEffect, useState } from "react";

export default function WeatherSearch() {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getWeather() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=YOUR_KEY`
        );
        
        if (!response.ok) throw new Error("City not found");
        
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
        setWeather(null);
      } finally {
        setLoading(false);
      }
    }

    getWeather();
  }, [city]); // Re-fetch when city changes

  return (
    <div>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city..."
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{color: "red"}}>Error: {error}</p>}
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}
```

---

## Key Takeaways

✅ Use `useEffect` to fetch data in React  
✅ Always manage loading and error states  
✅ Use dependency array to control when it runs  
✅ Use `async/await` inside useEffect  
✅ Clean up if needed (return cleanup function)  

---

**Next:** → [04-API-LIST.md](04-API-LIST.md) - List of free APIs to try!
