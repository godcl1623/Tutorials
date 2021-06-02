module.exports = {
  list: array => {
    return array
      .map(element => {
        return `<li><a href="/?id=${element.id}">${element.title}</a></li>`;
      })
      .join(' ');
  },

  control: (title, condition) => {
    const create = `<a href="/create">create</a>`;
    const update = `<a href="/update?id=${title}">update</a>`;
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
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          <ol>
            ${list}
          </ol>
          ${control}
          ${article}
        </body>
      </html>
    `;
  },

  article: (title, data, author = '') => {
    return `
      <h2>${title}</h2>
      <p>${data}</p>
      <p>${author !== '' ? `article written by ${author}` : ''}</p>
    `;
  },

  form: (mode, id = '', title = '', desc = '', options = '') => {
    return `
      <form
        action="/process_${mode}"
        method="post"
      >
        <input type="hidden" name="id" value="${id}">
        <p><input type="text" name="title" placeholder="title" value="${title}"></p>
        <p><textarea name="description" placeholder="description">${desc}</textarea></p>
        <p>
          <select name="author">
            ${options}
          </select>
        </p>
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
        >${arrayElement.name}</option>
      `;
      })
      .join(' ');
  }
};
