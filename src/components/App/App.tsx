import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import {toast} from 'react-hot-toast';
import Loader from "../Loader/Loader";
import type {Movie} from "../../types/movie";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { fetchMovies }from "../../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from '../MovieModal/MovieModal';

export default function App() {  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoader, setLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setIsSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

 
   const handleSearch = async (query: string) =>{
     try {
      setLoader(true);
      setIsError(false);
      setMovies([]);

     const dataMovies = await fetchMovies(query);

       if(!dataMovies) {
       toast.error("No movies found for your request.");
       return;
     }
     console.log("Movies from API:", dataMovies);
      setMovies(dataMovies);
   } catch {
      setIsError(true);
   } finally {
      setLoader(false);
   }
 };

   const openModal = (movie: Movie) => {
    setIsSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSelectedMovie(null);
  };


  return (
    <>
    <SearchBar onSubmit={handleSearch}/>
    {isLoader && <Loader/>}
    {isError && <ErrorMessage/>}
    {movies.length > 0 && <MovieGrid onSelect={openModal} movie={movies}/>}
    {isModalOpen && selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal}/>}
    </>
  );
}
 
