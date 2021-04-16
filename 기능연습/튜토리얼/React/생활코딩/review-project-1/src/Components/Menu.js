import React, { Component } from 'react';

class Menu extends Component {
  render() {
    const data = this.props.data;
    const lists = [];
    data.forEach(element => {
      lists.push(
        <li key={element.id}>
          <a
            href={`/contents/${element.id}`}
            data-id={element.id}
            onClick={event => {
              event.preventDefault();
              this.props.onClickElement(event.target.dataset.id);
            }}
          >
            {element.title}
          </a>
        </li>
      );
    });
    return(
      <nav>
        <ul>
          {lists}
        </ul>
      </nav>
    );
  }
}

export default Menu;