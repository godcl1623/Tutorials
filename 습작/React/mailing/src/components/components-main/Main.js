import React, { Component } from 'react';
import Navigation from '../Navigation';
import MainForm from './Main-form';
import MainStart from './Main-start';
import MainAbout from './Main-about';
import '../styles/Main.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state={
      selectedClass: 'MainForm'
    }
    this.scopeRef = React.createRef();
  }

  whatIsThis = (event) => {
    console.log(event.target)
    const classValue = event.target.classList.value;
    if (classValue === 'main' || classValue === '' ||
      classValue === 'navigation' || classValue === 'main-menu') return;
    this.setState({
      selectedClass: event.target.classList.value
    })
  }

  changeComponent = () => {
    switch (this.state.selectedClass) {
      case 'MainStart':
        return <MainStart />
      case 'MainForm':
        return <MainForm />
      case 'MainAbout':
        return <MainAbout />
      default:
        return <h1 className="loading">Loading...</h1>
    }
  }

  navigationMenu = [
    {
      className: 'MainStart',
      textValue: 'Main Page'
    },
    {
      className: 'MainAbout',
      textValue: 'About Us'
    },
    {
      className: 'MainForm',
      textValue: 'Sign-up'
    }
  ]

  render() {
    return(
      <div className="main" onClick={this.whatIsThis} >
        <Navigation
          menuData={this.navigationMenu}
        />
        {this.changeComponent()}
      </div>
    );
  }
}

export default Main;
