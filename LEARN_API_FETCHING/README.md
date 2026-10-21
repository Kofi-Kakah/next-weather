# Learn API Fetching - Complete Guide

## For Complete Beginners

Welcome! This guide teaches you how to fetch data from **ANY API** without asking for help.

## What You'll Learn

- ✅ What is an API?
- ✅ How to make API requests
- ✅ How to handle responses
- ✅ How to use APIs in React
- ✅ How to find and use free APIs

## Contents

### 📚 Chapter 1: [01-WHAT-IS-API.md](01-WHAT-IS-API.md)
**Learn the basics**
- What is an API?
- How do APIs work?
- Types of APIs
- Request/Response explained
- Real API examples

**Time: 15 minutes**

---

### 💻 Chapter 2: [02-YOUR-FIRST-API.md](02-YOUR-FIRST-API.md)
**Make your first API call**
- Simplest API call ever
- Breaking down the code
- Error handling
- HTTP Methods (GET, POST, PUT, DELETE)
- Response status codes
- Working examples

**Time: 20 minutes**

**After this, you can:**
- Make basic API calls
- Handle errors
- Add parameters

---

### ⚛️ Chapter 3: [03-FETCH-IN-REACT.md](03-FETCH-IN-REACT.md)
**Use APIs in React**
- useEffect hook explained
- Fetching data on page load
- Fetching when user types
- Multiple API calls
- Custom hooks
- Common mistakes

**Time: 25 minutes**

**After this, you can:**
- Fetch data in React components
- Show loading/error states
- Create search functionality
- Build API-powered apps

---

### 🎯 Chapter 4: [04-API-LIST.md](04-API-LIST.md)
**Free APIs to practice with**
- 20+ free APIs (no key needed)
- APIs with free tier
- Practice projects
- Finding more APIs
- Troubleshooting

**Time: 10 minutes (reference)**

**After this, you can:**
- Try real APIs
- Build practice projects
- Find APIs for any use case

---

## Learning Path

### Complete Beginner
1. Read Chapter 1 (understand concepts)
2. Read Chapter 2 (hands-on coding)
3. Try 3 APIs from Chapter 4
4. Read Chapter 3 (apply in React)

### Time: ~1 hour

---

### With React Experience
1. Skim Chapter 1
2. Skim Chapter 2
3. Focus on Chapter 3
4. Use Chapter 4 as reference

### Time: ~30 minutes

---

## Quick Start

### Run Your First API Call

**Create file: `test.js`**
```javascript
fetch("https://randomuser.me/api/")
  .then(r => r.json())
  .then(d => console.log(d))
```

**Run:**
```bash
node test.js
```

**See:** Random person data printed!

---

### Try In React

**Create file: `app.tsx`**
```typescript
'use client';
import { useEffect, useState } from "react";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://randomuser.me/api/")
      .then(r => r.json())
      .then(d => setUser(d.results[0]));
  }, []);

  return (
    <div>
      {user && (
        <>
          <img src={user.picture.medium} />
          <p>{user.name.first} {user.name.last}</p>
        </>
      )}
    </div>
  );
}
```

**Run:**
```bash
npm run dev
```

**See:** Random person appears on page!

---

## Key Concepts

### fetch()
Ask a server for data
```javascript
fetch(URL)
```

### async/await
Wait for response
```javascript
const data = await fetch(URL).json()
```

### useEffect
Run code in React
```typescript
useEffect(() => { /* code */ }, [])
```

### States
Store data that changes
```typescript
const [data, setData] = useState(null)
```

---

## Common APIs Used in Chapter 4

| API | Data | Key Needed |
|-----|------|-----------|
| RandomUser | People | No |
| PokéAPI | Pokemon | No |
| RESTCountries | Countries | No |
| GitHub | Users | No |
| OpenWeatherMap | Weather | Yes |
| NewsAPI | News Articles | Yes |

---

## After You Finish

### Level 1: Basics ✅
- Understand API concept
- Make simple calls
- Handle errors

### Level 2: Advanced
- Multiple API calls
- Caching responses
- Rate limiting
- Authentication

### Level 3: Expert
- Build your own API
- API versioning
- GraphQL APIs
- WebSockets

---

## Exercises

### Easy (20 minutes)
1. Get weather for 3 cities
2. Display random Pokemon
3. Show country info

### Medium (45 minutes)
1. Build Pokemon search
2. Create country comparison
3. Make quote generator

### Hard (2 hours)
1. Build multi-API dashboard
2. Create favorites system
3. Add dark mode and animations

---

## Cheat Sheet

### Basic Fetch
```javascript
const data = await fetch(URL).then(r => r.json())
```

### With Error Handling
```javascript
try {
  const data = await fetch(URL).then(r => r.json())
} catch (err) {
  console.log("Error:", err)
}
```

### In React
```typescript
useEffect(() => {
  fetch(URL).then(r => r.json()).then(setData)
}, [])
```

### With Parameters
```javascript
const url = `${BASE}?q=search&limit=10`
fetch(url)
```

### POST Request
```javascript
fetch(URL, {
  method: "POST",
  body: JSON.stringify({key: "value"})
})
```

---

## FAQ

### Q: Do I need an API key?
**A:** Some APIs yes, many are free without keys. Start with free ones.

### Q: Can I use APIs from browser?
**A:** Usually not. Some block browser requests (CORS). Use backend or CORS proxy.

### Q: How fast is fetch?
**A:** Depends on server. Usually 100ms-2000ms. Always show loading.

### Q: Can I cache API responses?
**A:** Yes! Use localStorage or sessionStorage.

### Q: What if API is down?
**A:** Handle error gracefully. Show user-friendly message.

---

## Getting Help

### Resources
- [MDN Fetch Documentation](https://developer.mozilla.org/en-US/docs/Web/API/fetch)
- [React Documentation](https://react.dev)
- [API Search](https://www.programmableweb.com/apis/directory)

### Common Issues

**CORS Error?**
→ API blocks browser calls. Use server or proxy.

**401 Unauthorized?**
→ Missing or invalid API key.

**Rate Limited?**
→ Making too many requests. Wait or upgrade.

---

## Ready to Build?

Start with Chapter 1: [01-WHAT-IS-API.md](01-WHAT-IS-API.md)

Or jump to Chapter 4 for quick practice: [04-API-LIST.md](04-API-LIST.md)

---

## Recommended Order

1. **Understand** - Read Chapter 1
2. **Practice** - Try exercises in Chapter 2
3. **Apply** - Build app in Chapter 3
4. **Explore** - Test APIs in Chapter 4
5. **Build** - Create your own project!

---

**Go back to [DOCUMENTATION](../DOCUMENTATION/) folder to learn about the weather app**

Let's go! 🚀
