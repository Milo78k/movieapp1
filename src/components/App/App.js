import React, { useState, useEffect, useCallback } from 'react';
import { Tabs } from 'antd';
import axios from 'axios';
import Movie from '../Movie';
import RatedMovies from '../RatedMovies';
import { GenresProvider } from '../GenresContext';

const API_KEY = '716129ae124d90d45aa6c2493a69e577';

function App() {
  const [guestSessionId, setGuestSessionId] = useState(null);
  const [ratedMovies, setRatedMovies] = useState([]);
  const [activeTab, setActiveTab] = useState('1');

  const createGuestSession = useCallback(async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${API_KEY}`,
      );
      const newSessionId = res.data.guest_session_id;
      setGuestSessionId(newSessionId);
      return newSessionId;
    } catch (err) {
      console.error('Ошибка создания гостевой сессии:', err);
      return null;
    }
  }, []);

  const fetchRatedMovies = useCallback(async () => {
    let sessionId = guestSessionId;

    if (!sessionId) {
      sessionId = await createGuestSession();
      if (!sessionId) return;
    }

    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?api_key=${API_KEY}`,
      );
      setRatedMovies(res.data.results || []);
    } catch (err) {
      console.error('Ошибка загрузки оцененных фильмов:', err);
    }
  }, [guestSessionId, createGuestSession]);

  const handleRatingUpdate = () => {
    fetchRatedMovies();
  };

  useEffect(() => {
    if (activeTab === '2') {
      fetchRatedMovies();
    }
  }, [activeTab, fetchRatedMovies]);
  useEffect(() => {
    if (!guestSessionId) {
      createGuestSession();
    }
  }, [createGuestSession, guestSessionId]);

  return (
    <GenresProvider>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        centered
        items={[
          {
            key: '1',
            label: 'Search',
            children: (
              <Movie
                guestSessionId={guestSessionId}
                onRateSuccess={handleRatingUpdate}
              />
            ),
          },
          {
            key: '2',
            label: 'Rated',
            children: (
              <RatedMovies
                ratedMovies={ratedMovies}
                fetchRatedMovies={fetchRatedMovies}
              />
            ),
          },
        ]}
      />
    </GenresProvider>
  );
}

export default App;
