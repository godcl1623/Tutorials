{
  type Video = {
    id: string;
    title: string;
    url: string;
    data: string;
  };

  function getVideo(id: string): Video {
    return {
      id,
      title: 'video',
      url: 'https://...',
      data: 'byte-data..'
    };
  }

  function getVideoMetadata(id: string): Pick<Video, 'id' | 'title'> {
    return {
      id: id,
      title: 'title'
    };
  }

  type VideoMetadata = Omit<Video, 'id' | 'title'>;
  function getVideo2(url: string): VideoMetadata {
    return {
      url,
      data: 'byte-data..'
    }
  }
  const video: VideoMetadata = {
    url: 'https://...',
    data: 'byte-data..'
  };
  console.log(getVideo2(video.url));
}
