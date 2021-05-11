import { useState, useEffect } from 'react';
import YoutubeAPI from '../api/YoutubeAPI';

const useVideos = (defaultSearchTerm) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    searchVideo(defaultSearchTerm);
  }, [defaultSearchTerm]);

  const searchVideo = async input => {
    const response = await YoutubeAPI.get('/search', {
      params: {
        q: input
      }
    });
    setVideos(response.data.items);
  };

  return [videos, searchVideo];
};

export default useVideos;