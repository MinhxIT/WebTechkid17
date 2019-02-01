import React, { Component } from 'react';
import axios from 'axios';
export default class CreateGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            players:[]
        }
        
    }
    
    handleSubmit = (event)=>{
        event.preventDefault();
        const players = this.state.players;
        axios({
            url:"http://10.10.0.248:6969/api/game",
            method:"POST",
            data:{
                players,
                scores:[]
            }
        })
        .then((data)=>{
            console.log(data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    handleChange = (events)=>{
        const value = events.target.value;
        const name = events.target.name;
        const players = this.state.players;
        players[name] = value
        this.setState({
            players
        });
        console.log(name, value);
        
    }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <input onChange={(events)=>this.handleChange(events)} type="text" name = "0" className="form-control" placeholder="Player 1" required/>
            </div>
            <div className="form-group">
                <input onChange={(events)=>this.handleChange(events)} type="text" name = "1" className="form-control" placeholder="Player 2" required/>
            </div>
            <div className="form-group">
                <input onChange={(events)=>this.handleChange(events)} type="text" name = "2" className="form-control" placeholder="Player 3" required/>
            </div>
            <div className="form-group">
                <input onChange={(events)=>this.handleChange(events)} type="text" name = "3" className="form-control" placeholder="Player 4" required/>
            </div>
            <div className="text-center">
                <button type="submit" className="btn btn-primary btn-game" id="btn-create">Create new game</button>
            </div>
        </form>
      </div>
    )
  }
}
