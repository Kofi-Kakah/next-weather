# Weather App Documentation

## Overview
Complete step-by-step guide on how this weather app was built.

## Contents

### 📁 [01-PROJECT-SETUP.md](01-PROJECT-SETUP.md)
Learn about the project structure and all the files we created.

**Topics:**
- Folder structure
- File organization
- Technologies used
- How to start the app

---

### 📁 [02-API-SETUP.md](02-API-SETUP.md)
Understand how we connected to OpenWeatherMap API.

**Topics:**
- What is an API?
- Getting API keys
- How requests/responses work
- Understanding the weatherApi.ts file

---

### 📁 [03-COMPONENTS-EXPLAINED.md](03-COMPONENTS-EXPLAINED.md)
Deep dive into each component and how they work.

**Topics:**
- React components basics
- Main page (page.tsx)
- Navbar component
- SearchBox component
- WeatherDisplay component
- State management

---

### 📁 [04-HOW-TO-MODIFY.md](04-HOW-TO-MODIFY.md)
Learn how to add features and customize the app.

**Topics:**
- Adding new features (forecast)
- Adding new weather properties
- Changing colors and styles
- Common mistakes and fixes

---

## Quick Start

1. Read **01-PROJECT-SETUP.md** to understand the structure
2. Read **02-API-SETUP.md** to understand APIs
3. Read **03-COMPONENTS-EXPLAINED.md** to understand the code
4. Read **04-HOW-TO-MODIFY.md** to add your own features

---

## Running the App

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Then open: `http://localhost:3000`

---

## Key Concepts Explained

### State (useState)
Data that can change. Example:
```typescript
const [temperature, setTemperature] = useState(0);
setTemperature(25);  // Updates to 25
```

### Fetch (Getting Data)
Asking a server for information:
```typescript
const response = await fetch(URL);
const data = await response.json();
```

### Components
Reusable UI pieces like LEGO blocks:
```typescript
<Navbar />
<SearchBox />
<WeatherDisplay />
```

### Props (Passing Data)
Giving information to a component:
```typescript
<Navbar currentLocation="London" />
```

### Conditional Rendering
Show/hide based on conditions:
```typescript
{loading ? <Spinner /> : <Weather />}
{error && <Error message={error} />}
```

---

## File Size Reference

| File | Lines | Purpose |
|------|-------|---------|
| page.tsx | ~80 | Main logic |
| Navbar.tsx | ~80 | Header |
| SearchBox.tsx | ~30 | Search input |
| WeatherDisplay.tsx | ~350 | Weather details |
| weatherApi.ts | ~60 | API functions |

---

## Common Next Steps

1. **Add a 5-day forecast** → See 04-HOW-TO-MODIFY.md
2. **Add air quality data** → See 04-HOW-TO-MODIFY.md
3. **Save favorites** → Use localStorage
4. **Add more cities** → Create a cities list component
5. **Deploy to web** → Use Vercel (free hosting for Next.js)

---

## Troubleshooting

### App not starting?
```bash
npm install
npm run dev
```

### Port 3000 already in use?
```bash
npm run dev -- -p 3001
```

### Hot reload not working?
Close terminal and run `npm run dev` again.

---

## Need to Learn APIs?
👉 Check the **[LEARN_API_FETCHING](../LEARN_API_FETCHING/)** folder!

It teaches you how to fetch data from ANY API without needing help.
