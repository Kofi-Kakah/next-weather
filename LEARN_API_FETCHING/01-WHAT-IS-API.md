# Chapter 1: What is an API?

## Simple Definition
An API is a **waiter in a restaurant**:
- You ask a question (order food)
- The waiter gets your request to the kitchen
- The kitchen makes what you asked for
- The waiter brings it back to you

## In Programming Terms

### API = Application Programming Interface

```
You (Client) ─→ Request ─→ API (Server)
You (Client) ←─ Response ←─ API (Server)
```

### Example in Real Life

**Scenario:** You want weather data for London

```
CLIENT SIDE                          SERVER SIDE
┌────────────┐                      ┌──────────────┐
│  Your App  │                      │   Weather    │
│            │ ──"Get London"──→   │   Database   │
│            │                      │              │
│            │ ←─"15°C, cloudy"─   │              │
└────────────┘                      └──────────────┘
```

---

## Types of APIs

### 1. Weather APIs
Get weather data:
```
Request: "Give me weather for London"
Response: { temp: 15, condition: "cloudy" }
```

### 2. News APIs
Get news articles:
```
Request: "Give me tech news"
Response: [ { title: "AI advances", ... } ]
```

### 3. Currency APIs
Get exchange rates:
```
Request: "USD to EUR rate"
Response: { rate: 0.92 }
```

### 4. Movie APIs
Get movie information:
```
Request: "Get movie 'Inception'"
Response: { title: "Inception", year: 2010, rating: 8.8 }
```

### 5. Map APIs
Get location data:
```
Request: "Get coordinates for 'Paris'"
Response: { latitude: 48.8566, longitude: 2.3522 }
```

---

## How APIs Talk to Each Other

### The Protocol: HTTP/HTTPS
- **HTTP** = Unsecure (don't use for passwords)
- **HTTPS** = Secure (good for passwords and money)

### The Format: JSON
Data format that's easy to read:

```json
{
  "name": "London",
  "temperature": 15,
  "conditions": "Cloudy",
  "humidity": 72
}
```

Breaking it down:
- `"name"` = key (label)
- `"London"` = value (actual data)

---

## API Endpoint - The Address

Think of it like a street address. It tells the API where to look.

### Example Endpoints

```
OpenWeatherMap:
https://api.openweathermap.org/data/2.5/weather

Joke API:
https://api.jokes.com/random

Pokemon API:
https://pokeapi.co/api/v2/pokemon/pikachu
```

---

## Parameters - The Instructions

Parameters are like additional instructions. They come after `?`

```
https://api.example.com/weather?city=London&units=celsius
                                └─ Parameters ─┘
```

Breaking it down:
- `city=London` - Search for London
- `units=celsius` - Use Celsius not Fahrenheit
- `&` - Separates multiple parameters

### Common Parameters

| Parameter | Meaning | Example |
|-----------|---------|---------|
| `q` | Query (search term) | `q=London` |
| `units` | Measurement units | `units=metric` |
| `lang` | Language | `lang=en` |
| `limit` | How many results | `limit=10` |
| `sort` | How to sort | `sort=popularity` |
| `key` or `apikey` | Your API key | `key=abc123` |

---

## API Key - Your Password

An API key is like a password that identifies you:
- Servers know how many requests you made
- Prevents abuse
- Free tier often has limits (1000 requests/day)

Example URL with API key:
```
https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY_HERE
```

⚠️ **NEVER** share your API key on GitHub!

---

## Status Codes - The Response

When you get a response, it has a status code:

| Code | Meaning | Example |
|------|---------|---------|
| **200** | Success ✅ | Got the data |
| **400** | Bad Request ❌ | URL was wrong |
| **401** | Unauthorized ❌ | API key missing |
| **404** | Not Found ❌ | City doesn't exist |
| **500** | Server Error ❌ | Server is broken |

---

## Request vs Response

### Request (You Ask)
```
GET /weather?q=London&appid=key123 HTTP/1.1
Host: api.openweathermap.org
```

### Response (API Answers)
```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "name": "London",
  "main": {
    "temp": 15.5,
    "humidity": 72
  }
}
```

---

## Let's Look at Real APIs

### Example 1: OpenWeatherMap
```
https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_KEY&units=metric
```

Get back:
```json
{
  "name": "London",
  "main": { "temp": 15, "humidity": 72 },
  "weather": [{ "description": "cloudy" }]
}
```

### Example 2: PokéAPI (FREE - No Key Needed!)
```
https://pokeapi.co/api/v2/pokemon/pikachu
```

Get back:
```json
{
  "name": "pikachu",
  "height": 4,
  "weight": 60,
  "types": [{ "name": "electric" }]
}
```

### Example 3: Random User API (FREE - No Key Needed!)
```
https://randomuser.me/api/
```

Get back:
```json
{
  "results": [{
    "name": { "first": "John", "last": "Doe" },
    "email": "john@example.com",
    "picture": { "medium": "url..." }
  }]
}
```

---

## Key Takeaways

✅ API = Server that gives you data  
✅ You send a Request → Server sends Response  
✅ Use URLs to talk to APIs  
✅ Add parameters with `?` and `&`  
✅ Get back data in JSON format  
✅ Status codes tell you if it worked  

---

**Next:** → [02-YOUR-FIRST-API.md](02-YOUR-FIRST-API.md) - Make your first API call!
