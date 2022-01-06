{
  type Video = {
    id: string;
    title: string;
    url: string;
    data: string;
  };

  // 비디오와 관련된 모든 데이터를 반환하는 함수 -> 무거움
  function getVideo(id: string): Video {
    return {
      id,
      title: 'video',
      url: 'https://...',
      data: 'byte-data..'
    };
  }

  // 비디오의 간단한 정보만 반환하는 함수 -> 가벼움
  // 이렇게 사용하는 것은 별로 좋지 않음 => 별도 타입으로 선언해 재사용 가능하도록 만드는 것이 더 좋음
  function getVideoMetadata(id: string): Pick<Video, 'id' | 'title'> {
    return {
      id: id,
      title: 'title'
    };
  }

  // 바람직한 형태
  type VideoMetadata = Pick<Video, 'id' | 'title'>;
  function getVideoMetadata(id: string): VideoMetadata {
    return {
      id: id,
      title: 'title'
    };
  }
}
