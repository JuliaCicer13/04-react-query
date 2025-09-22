import css from "./MoviesGrid.module.css";
import type { Movie } from "../../types/movie";

interface MovieGridProps {
  movie: Movie[];
  onSelect: (movie: Movie) => void;
}
export default function MovieGrid({movie, onSelect}: MovieGridProps) {
     return (
<ul className={css.grid}>
  {movie.map((movie) => (
    <li key={movie.id}>
       <div className={css.card}
        onClick={()=> onSelect(movie)}
       >
      <img
      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`
    }
      alt={movie.title}
      className={css.image}
    />
	    <h2 className={css.title}>{movie.title}</h2>
       </div>
    </li>
  ))}
 </ul>
  )
}
    
  
  

     
