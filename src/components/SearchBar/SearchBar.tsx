import styles from "./SearchBar.module.css"
import {toast} from "react-hot-toast";
import { useId } from "react";

interface SearchBarProps {
    onSubmit: (value: string) => void;
}
export default function SearchBar ({onSubmit}: SearchBarProps) {
    const textId = useId();
    const handleSubmit = (formData: FormData) => {
       const query = formData.get("query") as string;
       console.log(query);

        if (query === "") {
        toast.error("Please enter your search query");
        return;
     }
     onSubmit(query);
    }
    

    return (
    <header className={styles.header}>
       <div className={styles.container}>
    <a
      className={styles.link}
      href="https://www.themoviedb.org/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Powered by TMDB
    </a>
    <form action={handleSubmit} className={styles.form}>
      <label htmlFor={textId}></label>
      <input
        className={styles.input}
        type="text"
        id={textId}
        name="query"
        autoComplete="off"
        placeholder="Search movies..."
        autoFocus
      />
      <button className={styles.button} type="submit">
        Search
      </button>
    </form>
  </div>
</header>
    )
}