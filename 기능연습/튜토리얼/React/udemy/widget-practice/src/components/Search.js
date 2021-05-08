import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
  // 기본 검색어를 지정하는 경우
  const [term, setTerm] = useState('리액트');
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  // 기본 검색어를 지정하지 않는 경우
  // const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);

  const renderResult = results.map(result => {
    return (
      <div key={result.pageid} className="item">
        <div className="content">
          <div className="header">
            <a
              href={`https://ko.wikipedia.org?curid=${result.pageid}`}
            >
              {result.title}
            </a>
          </div>
          {/* {result.snippet} */}
          <span dangerouslySetInnerHTML={{__html: result.snippet}}></span>
        </div>
      </div>
    );
  });

  // 버전 1 - state term의 useState 기본값으로 빈 문자열('')을 사용한 경우에 사용
  // useEffect(() => {
  //   const searchQuery = async () => {
  //     const { data } = await axios.get('https://ko.wikipedia.org/w/api.php', {
  //       params: {
  //         action: 'query',
  //         list: 'search',
  //         origin: '*',
  //         format: 'json',
  //         srsearch: term
  //       }
  //     });

  //     setResults(data.query.search);
  //   }

  //   const timeoutId = setTimeout(() => {
  //     if (term) {
  //       searchQuery();
  //     }
  //   }, 500);

  //   return () => {
  //     clearTimeout(timeoutId);
  //   }
  // }, [term]);

  // 버전 2 - state term의 useState 기본값으로 빈 문자열이 아니라 특정 검색어를 사용한 경우에 사용

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [term]);

  useEffect(() => {
    const searchQuery = async () => {
      const { data } = await axios.get('https://ko.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: debouncedTerm
        }
      });

      setResults(data.query.search);
    }

    searchQuery();
  }, [debouncedTerm]);

  return(
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
            className="input"
            value={term}
            onChange={e => setTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="ui celled list">
        {renderResult}
      </div>
    </div>
  );
}

export default Search;