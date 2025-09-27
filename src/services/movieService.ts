import axios from "axios";
import type { Movie } from "../types/movie";

interface MoviesHttpResponse {
    results: Movie[];
    total_page: number;
}
export const fetchMovies = async (
   query: string,
   page: number
): Promise<Movie[]> =>{
  const response  = await axios.get<MoviesHttpResponse>("https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query,
        include_adult: false,
        language: "en-US",
        page,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    });
    console.log("Raw response:", response.data.results);
        return response.data.results;
}

