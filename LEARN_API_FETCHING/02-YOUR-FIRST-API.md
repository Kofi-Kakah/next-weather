# Chapter 2: Your First API Call

## The Simplest API Call Ever

Let's fetch random user data. No API key needed!

### Step 1: Create a Test File
Create `test-api.js` in your project:

```javascript
// Get data from API
const response = await fetch("https://randomuser.me/api/");

// Convert to readable format
const data = await response.json();

// See what we got
console.log(data);
```

### Step 2: Run It
```bash
node test-api.js
```

### Step 3: Output
```
{
  results: [
    {
      name: { first: "John", last: "Smith" },
      email: "john@example.com",
      picture: { medium: "https://..." }
    }
  ]
}
```

**Congratulations! You made your first API call!** 🎉

---

## Breaking Down the Code

```javascript
const response = await fetch(URL);
```

- `fetch()` - Ask the server for data
- `await` - Wait for the answer (don't rush)
- `response` - What the server sent back

```javascript
const data = await response.json();
```

- `.json()` - Convert response to JavaScript object
- `await` - Wait for the conversion to complete

```javascript
console.log(data);
```

- Print the data to screen

---

## Complete Working Example

### Get a Random Joke

```javascript
async function getJoke() {
  try {
    const response = await fetch("https://api.jokes.com/random");
    const data = await response.json();
    
    console.log("Joke:", data.joke);
  } catch (error) {
    console.log("Error:", error.message);
  }
}

getJoke();
```

### Get a Random Cat Fact

```javascript
async function getCatFact() {
  const response = await fetch("https://catfact.ninja/fact");
  const data = await response.json();
  
  console.log("Fact:", data.fact);
  console.log("Length:", data.length);
}

getCatFact();
```

### Get Pokemon Info

```javascript
async function getPokemon(name) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await response.json();
  
  console.log("Name:", data.name);
  console.log("Height:", data.height);
  console.log("Weight:", data.weight);
  console.log("Types:", data.types);
}

getPokemon("pikachu");
```

---

## Error Handling - What If Something Goes Wrong?

### Problem: API is offline
```javascript
const response = await fetch(URL);

if (!response.ok) {
  console.log("Error! Status:", response.status);
}
```

### Full Error Handling
```javascript
async function getWeather(city) {
  try {
    const response = await fetch(URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.log("Failed to fetch:", error.message);
    return null;
  }
}
```

**Explanation:**
- `try` - Try to run this code
- `catch` - If something breaks, do this instead
- `throw new Error` - Create an error message

---

## Key Methods

### 1. GET (Get Data)
Most common. Just read data:

```javascript
fetch("https://api.example.com/data");
```

### 2. POST (Send Data)
Send information to server:

```javascript
fetch("https://api.example.com/create", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "John",
    email: "john@example.com"
  })
});
```

### 3. PUT (Update Data)
Update existing data:

```javascript
fetch("https://api.example.com/update/123", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Jane"
  })
});
```

### 4. DELETE (Remove Data)
Delete data:

```javascript
fetch("https://api.example.com/delete/123", {
  method: "DELETE"
});
```

---

## Response Status Codes

### Check If Successful
```javascript
const response = await fetch(URL);

if (response.ok) {
  console.log("Success!");
} else {
  console.log("Failed. Status:", response.status);
}
```

### Common Statuses

| Code | Meaning | Action |
|------|---------|--------|
| 200 | Success | Continue |
| 201 | Created | Item was created |
| 400 | Bad Request | Check your URL/parameters |
| 401 | Unauthorized | Need API key |
| 404 | Not Found | URL doesn't exist |
| 500 | Server Error | Wait and try again |

---

## Response Headers

Information about the response:

```javascript
const response = await fetch(URL);

// Get content type
console.log(response.headers.get("content-type"));
// Output: "application/json"

// Get remaining requests (if API has limits)
console.log(response.headers.get("x-ratelimit-remaining"));
// Output: "999"
```

---

## Adding Parameters

### Simple Way
```javascript
const city = "London";
const key = "abc123";

fetch(`https://api.example.com/weather?q=${city}&appid=${key}`);
```

### Using URLSearchParams (Professional Way)
```javascript
const params = new URLSearchParams({
  q: "London",
  appid: "abc123",
  units: "metric"
});

fetch(`https://api.example.com/weather?${params}`);
```

Output: `?q=London&appid=abc123&units=metric`

---

## Headers - Extra Information

### Adding Headers
```javascript
fetch(URL, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer YOUR_TOKEN`,
    "User-Agent": "MyApp/1.0"
  }
});
```

### Common Headers

| Header | Value | Purpose |
|--------|-------|---------|
| Content-Type | application/json | Data format |
| Authorization | Bearer token | Authentication |
| User-Agent | MyApp/1.0 | Identify your app |
| Accept | application/json | What format you want |

---

## Practice Exercise 1

### Get GitHub User Info

```javascript
async function getGitHubUser(username) {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();
  
  console.log("Name:", data.name);
  console.log("Followers:", data.followers);
  console.log("Public Repos:", data.public_repos);
}

getGitHubUser("torvalds"); // Creator of Linux
```

---

## Practice Exercise 2

### Get Country Info

```javascript
async function getCountry(countryCode) {
  const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
  const data = await response.json();
  const country = data[0];
  
  console.log("Country:", country.name.common);
  console.log("Capital:", country.capital?.[0]);
  console.log("Population:", country.population);
  console.log("Languages:", country.languages);
}

getCountry("us"); // United States
getCountry("fr"); // France
getCountry("jp"); // Japan
```

---

## Key Takeaways

✅ Use `fetch()` to get data from APIs  
✅ Use `await` to wait for response  
✅ Use `.json()` to convert to object  
✅ Always use `try/catch` for errors  
✅ Check `response.ok` before using data  
✅ Use parameters to filter/customize requests  

---

**Next:** → [03-FETCH-IN-REACT.md](03-FETCH-IN-REACT.md) - Use API calls in React!
