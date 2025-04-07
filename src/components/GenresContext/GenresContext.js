import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import axios from 'axios';

const API_KEY = '716129ae124d90d45aa6c2493a69e577';

const GenresContext = createContext();

export function GenresProvider({ children }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
      .then((res) => {
        setGenres(res.data.genres);
      })
      .catch((err) => {
        console.error('Ошибка при загрузке жанров:', err);
      });
  }, []);

  const value = useMemo(() => ({ genres }), [genres]);

  return (
    <GenresContext.Provider value={value}>{children}</GenresContext.Provider>
  );
}
export function useGenres() {
  return useContext(GenresContext);
}
