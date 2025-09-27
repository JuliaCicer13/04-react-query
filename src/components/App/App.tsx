import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Loader from "../Loader/Loader";
import type {Movie} from "../../types/movie";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { fetchMovies }from "../../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from '../MovieModal/MovieModal';
import {Toaster} from "react-hot-toast";
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import css from "../App/App.module.css";


export default function App() { 

  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [page, setPage] = useState(1);
  const [topic, setTopic] = useState('');


  const {data, isLoading, isError, isSuccess} = useQuery({
    queryKey: ['movies', topic, page],
    queryFn: () => fetchMovies(topic , page),
    enabled: topic !== "",
    placeholderData: keepPreviousData,
  });

   const totalPages = data?.total_page ?? 0;


   const handleSearch = async(newTopic: string) => {
      setTopic(newTopic);
      setPage(1);

   }

   const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };


  return (
    <>
    <SearchBar onSubmit={handleSearch}/>
    
    {isSuccess && totalPages > 1 && (
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={({ selected }) => setPage(selected + 1)}
        forcePage={page - 1}
        containerClassName={css.pagination}
        activeClassName={css.active}
        nextLabel="→"
        previousLabel="←"
      />
    )}
    {isLoading && <Loader/>}
    {isError && <ErrorMessage/>}
    {movies.length > 0 && <MovieGrid onSelect={openModal} movies={movies}/>}
    {selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal}/>}
    <Toaster position="top-right" reverseOrder={false}/>
    </>
  );
}
 
