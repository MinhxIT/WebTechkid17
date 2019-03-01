import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Header from './components/Header'
import CreateGame from './components/CreateGame';
import { ROOT_API } from './url';
import PlayGame from './components/PlayGame';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ganme: null
    }
  }
  
  isClick = ()=>{
    this.setState({
    })
  }
  componentWillMount(){
    const {pathname} = window.location;
    const gameId = pathname.split('/')[2];
    if(gameId){
      axios({
        url:`${ROOT_API}/api/game/${gameId}`,
        method:"GET"
      })
      .then((data)=>{
        const {game} = data.data;
        if(game && game._id){
          this.setState({game})
        }
      })
      .catch((error)=>{
        console.log(error);
      })
    }
  }
  render() {
    const {game} = this.state;
    return (
      <div className="App container">
        <Header/>
        {
          game && game._id
          ?<PlayGame game={game}/>
          :<CreateGame />
        }
      </div>
    );
  }
}
export default App;
