import React, {Component} from 'react';
import '../App.css';

class Modal extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {

  //   }
  // }
  showHideClassName = () => {
    if (this.props.state === false) {
      return 'modalRoot';
    } else {
      return 'modalRoot active';
    }
  }
  render() {
    console.log(this.props.state)
    return(
      <div
        className={this.showHideClassName()}
      >
        <div className="modalLayer"></div>
        <div className="modal">
          <h2>{this.props.data.title}</h2>
          <p>{this.props.data.date}</p>
          <p>내용</p>
          <button
            onClick={() => {
              this.props.close();
            }}
          >닫기</button>
        </div>
      </div>
    );
  }
}

export default Modal;