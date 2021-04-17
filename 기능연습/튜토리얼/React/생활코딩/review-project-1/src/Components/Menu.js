import React, {Component} from 'react';

class Menu extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.data !== this.props.data) {
      return true;
    }
    return false;
  }
  render() {
    console.log('menu');
    const data = this.props.data;
    const lists = [];
    data.forEach(element => {
      lists.push(
        <li
          key = {element.id}
        >
          <a
            href = {`/contents/${element.id}`}
            data-id = {element.id}
            onClick = {event => {
              event.preventDefault();
              this.props.onClickElements(event.target.dataset.id);
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