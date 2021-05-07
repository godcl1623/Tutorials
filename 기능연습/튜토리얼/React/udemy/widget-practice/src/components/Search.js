import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
  const [term, setTerm] = useState('');
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

  useEffect(() => {
    const searchQuery = async () => {
      const { data } = await axios.get('https://ko.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: term
        }
      });

      setResults(data.query.search);
    }

    const timeoutId = setTimeout(() => {
      if (term) {
        searchQuery();
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    }
  }, [term]);

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