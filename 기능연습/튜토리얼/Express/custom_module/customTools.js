const sanitizeHTML = require('sanitize-html');

module.exports = {
  list: array => {
    return array
      .map(element => {
        return `<li><a href="/page/${element.id}">${sanitizeHTML(element.title)}</a></li>`;
      })
      .join(' ');
  },

  control: (title, condition) => {
    const create = `<a href="/create">create</a>`;
    const update = `<a href="/update/${title}">update</a>`;
    const deleteBtn = `
      <form
        action="/process_delete"
        method="post"
      >
        <input type="hidden" name="id" value="${title}">
        <input type="submit" name="delete" value="delete">
      </form>
    `;
    if (condition.id === undefined) {
      return create;
    }
    return `${create} ${update} ${deleteBtn}`;
  },

  template: (title, list, article, control) => {
    return `
      <!doctype html>
      <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
          <style>
            table, table * {
              padding: 5px;
              border: 1px solid black;
            }
          </style>
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          <a href="/author">author</a>
          <ol>
            ${list}
          </ol>
          ${control}
          ${article}
        </body>
      </html>
    `;
  },

  article: (title = '', data = '', author = '', form = '') => {
    return `
      <h2>${title}</h2>
      <p>${data}</p>
      <p>${author !== '' ? `article written by ${author}` : ''}</p>
      <p>${form}</p>
    `;
  },

  form: (mode, id = '', title = '', desc = '', options = '') => {
    const dropdown = () => {
      if (mode === 'add_author' || mode === 'author_update') return '';
      return `
        <p>
          <select name="author">
            ${options}
          </select>
        </p>
      `;
    };

    return `
      <form
        action="/process_${mode}"
        method="post"
      >
        <input type="hidden" name="id" value="${id}">
        <p>
          <input
            type="text"
            name="title"
            placeholder="${mode === 'add_author' || mode === 'author_update' ? 'name' : 'title'}"
            value="${sanitizeHTML(title)}">
        </p>
        <p>
          <textarea
            name="description"
            placeholder="${
              mode === 'add_author' || mode === 'author_update' ? 'title' : 'description'
            }"
          >${sanitizeHTML(desc)}</textarea>
        </p>
          ${dropdown()}
        <p><input type="submit"></p>
      </form>
    `;
  },

  option: (array, authorId) => {
    return array
      .map(arrayElement => {
        return `
        <option
          value=${arrayElement.id}
          ${arrayElement.id === authorId ? ' selected' : ''}
        >${sanitizeHTML(arrayElement.name)}</option>
      `;
      })
      .join(' ');
  },

  table: table => {
    const tablerow = table
      .map(element => {
        const deleteBtn = `
      <form
        action="/process_author_delete"
        method="post"
      >
        <input type="hidden" name="id" value="${element.id}">
        <input type="submit" name="delete" value="delete">
      </form>
    `;
        return `
        <tr>
          <td>${sanitizeHTML(element.name)}</td>
          <td>${sanitizeHTML(element.profile)}</td>
          <td><a href="/author_update?id=${element.id}">update</a></td>
          <td>${deleteBtn}</td>
        </tr>
      `;
      })
      .join(' ');
    return `
      <table>
        <thead>
          <tr>
            <td>name</td>
            <td>title</td>
            <td>update</td>
            <td>delete</td>
          </tr>
        </thead>
        <tbody>
          ${tablerow}
        </tbody>
      </table>
    `;
  }
};
