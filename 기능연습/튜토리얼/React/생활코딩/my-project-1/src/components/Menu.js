import React, { Component } from 'react';

class Menu extends Component {
  render() {
    const data = this.props.data;
    const lists = [];
    let i = 0;
    while (i < data.length) {
      lists.push(
        <li key={data[i].id}>
          <a 
            href={"/content/"+data[i].id}
            onClick={function(event) {
              this.props.onClickElement(event);
            }.bind(this)}
          >
            {data[i].title}
          </a>
        </li>
      );
      i++;
    }
    return (
      <nav>
        <ul>
          {lists}
        </ul>
      </nav>
    )
  }
}

export default Menu;
