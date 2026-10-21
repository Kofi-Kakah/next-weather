# Chapter 4: Free APIs To Practice With

## No API Key Required ✅

### 1. Random User Generator
Get random person data
```
https://randomuser.me/api/
```
**Returns:** Name, email, phone, picture, address

**Example:**
```javascript
fetch("https://randomuser.me/api/")
  .then(r => r.json())
  .then(d => console.log(d.results[0].name));
```

---

### 2. PokéAPI
Get Pokemon information
```
https://pokeapi.co/api/v2/pokemon/pikachu
```
**Returns:** Height, weight, types, abilities, sprites

**Try These:**
```
/pokemon/bulbasaur
/pokemon/charmander
/pokemon/squirtle
/pokemon/ditto
```

---

### 3. RESTCountries
Get country information
```
https://restcountries.com/v3.1/alpha/US
```
**Returns:** Capital, population, languages, borders, flags

**Examples:**
```
/alpha/fr     (France)
/alpha/jp     (Japan)
/alpha/mx     (Mexico)
/alpha/de     (Germany)
```

---

### 4. Quotes API
Get random quotes
```
https://api.quotable.io/random
```
**Returns:** Quote text, author, tags

**Useful Endpoints:**
```
/quotes          (Get all quotes)
/authors         (Get all authors)
/tags            (Get all tags)
/random?tags=famous  (Random famous quote)
```

---

### 5. Joke API
Get random jokes
```
https://api.jokes.com/random
```
**Returns:** Joke text, type (programming, knock-knock, etc.)

---

### 6. Cat Facts
Get random cat facts
```
https://catfact.ninja/fact
```
**Returns:** Random fact about cats

**Bonus:**
```
https://api.thedogapi.com/v1/images/search
```
Get random dog pictures (no key needed for basic use)

---

### 7. Open-Meteo Weather (FREE, NO KEY!)
Get weather data without API key
```
https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&current_weather=true
```
**Returns:** Temperature, wind speed, precipitation

---

### 8. GitHub API
Get GitHub user info
```
https://api.github.com/users/torvalds
```
**Returns:** Name, followers, repos, avatar

**Try:**
```
/users/gvanrossum    (Python creator)
/users/linux         (Linux creator)
/users/brendaneich   (JavaScript creator)
```

---

### 9. OpenLibrary
Search books
```
https://openlibrary.org/search.json?title=The+Lord+of+the+Rings
```
**Returns:** Book title, author, first publish year, cover

---

### 10. Agify API
Guess person's age from name
```
https://api.agify.io?name=michael
```
**Returns:** Estimated age, count

---

## API Key Required (Usually Free Tier) 🔑

### 1. OpenWeatherMap
```
https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_KEY
```
- Get free key at: https://openweathermap.org/api
- Free tier: 60 calls/minute

---

### 2. NewsAPI
```
https://newsapi.org/v2/everything?q=technology&apiKey=YOUR_KEY
```
- Get free key at: https://newsapi.org/
- Free tier: 100 requests/day

---

### 3. OMDB (Movie Database)
```
https://www.omdbapi.com/?t=Inception&apiKey=YOUR_KEY
```
- Get free key at: https://www.omdbapi.com/apikey.aspx
- Free tier: 1000 requests/day

---

### 4. SpaceX API
Get SpaceX rocket data
```
https://api.spacexdata.com/v4/rockets
```
- No key required!

---

### 5. US States API
Get US state info
```
https://api.coindesk.com/v1/bpi/currentprice.json
```
Bitcoin price in different currencies

---

## Practice Projects

### Project 1: Random Person Card
```javascript
async function showRandomPerson() {
  const response = await fetch("https://randomuser.me/api/");
  const data = await response.json();
  const person = data.results[0];
  
  console.log(person.name.first + " " + person.name.last);
  console.log(person.email);
  console.log(person.phone);
}

showRandomPerson();
```

---

### Project 2: Pokemon Finder
```javascript
async function findPokemon(name) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemon = await response.json();
  
  console.log("Name:", pokemon.name);
  console.log("Height:", pokemon.height);
  console.log("Weight:", pokemon.weight);
  console.log("Types:", pokemon.types.map(t => t.type.name).join(", "));
}

findPokemon("charizard");
```

---

### Project 3: Country Info
```javascript
async function getCountryInfo(code) {
  const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
  const data = await response.json();
  const country = data[0];
  
  console.log("Country:", country.name.common);
  console.log("Capital:", country.capital?.[0]);
  console.log("Population:", country.population.toLocaleString());
  console.log("Languages:", Object.values(country.languages).join(", "));
  console.log("Flag:", country.flags.png);
}

getCountryInfo("us");
```

---

### Project 4: Random Quote Display
```javascript
async function showQuote() {
  const response = await fetch("https://api.quotable.io/random");
  const quote = await response.json();
  
  console.log(`"${quote.content}"`);
  console.log(`— ${quote.author}`);
}

showQuote();
```

---

### Project 5: User Search (GitHub)
```javascript
async function searchGitHubUser(username) {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const user = await response.json();
  
  console.log("Name:", user.name);
  console.log("Bio:", user.bio);
  console.log("Followers:", user.followers);
  console.log("Repos:", user.public_repos);
  console.log("Avatar:", user.avatar_url);
}

searchGitHubUser("torvalds");
```

---

## Finding More APIs

### API Directories

1. **RapidAPI**
   - https://rapidapi.com
   - Thousands of APIs, some free

2. **Programmable Web**
   - https://www.programmableweb.com/apis/directory
   - Huge directory of public APIs

3. **Public APIs**
   - https://github.com/public-apis/public-apis
   - GitHub list of free public APIs

4. **OpenAPIs**
   - https://openapis.io
   - Directory of open API specifications

---

## API Testing Tools

### Online Tools (No Installation)
1. **Postman Web** - https://www.postman.com/product/postman-web/
2. **Insomnia** - https://insomnia.rest/
3. **Thunder Client** - VS Code Extension
4. **REST Client** - VS Code Extension

### Simple Browser Test
```javascript
// Just paste in browser console
fetch("https://api.github.com/users/torvalds")
  .then(r => r.json())
  .then(d => console.log(d))
```

---

## Common Patterns

### Get and Log
```javascript
const response = await fetch(URL);
const data = await response.json();
console.log(data);
```

### Search/Filter
```javascript
const response = await fetch(`${URL}?q=search_term`);
const data = await response.json();
```

### Get Single Item
```javascript
const response = await fetch(`${URL}/id`);
const data = await response.json();
```

### Paginated Results
```javascript
const response = await fetch(`${URL}?page=1&limit=10`);
const data = await response.json();
```

---

## Troubleshooting API Issues

### Problem: API Key Invalid
✅ Check key is correct  
✅ Check key is not expired  
✅ Check key is in correct format  

### Problem: CORS Error
❌ Can't call API from browser (security)  
✅ Use backend/server to call API  

### Problem: 404 Not Found
✅ Check URL spelling  
✅ Check endpoint exists  
✅ Check parameters are correct  

### Problem: Rate Limit Exceeded
✅ Wait and try again  
✅ Upgrade to paid plan  
✅ Cache responses locally  

---

## Next Steps

1. **Try** 3 different APIs from this list
2. **Build** a small project with 2 APIs
3. **Create** your own API using mock data
4. **Deploy** your React app to the web

---

**Done!** You now know how to fetch from any API! 🚀

Go back to [DOCUMENTATION](../DOCUMENTATION/) to see how we built the weather app.
