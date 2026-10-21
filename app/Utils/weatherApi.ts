const API_KEY = "6776ea79d46637b69c3ec728b3601d42";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export async function getWeatherByCity(city: string): Promise<WeatherData> {
  const response = await fetch(
    `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error("City not found or API error");
  }

  return response.json();
}

export function getWeatherIcon(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
}
