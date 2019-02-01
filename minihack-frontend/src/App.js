import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import CreateGame from './components/CreateGame';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  isClick = ()=>{
    this.setState({
    })
  }
  
  render() {
    
    return (
      <div className="App container">
        <Header/>
        <CreateGame/>
      </div>
    );
  }
}

export default App;
