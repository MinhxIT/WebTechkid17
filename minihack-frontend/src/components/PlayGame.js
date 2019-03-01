import React, { Component } from 'react'
import axios from 'axios';
import { ROOT_API } from './../url';
export default class PlayGame extends Component {
    state = {
        game: this.props.game
    }
    renderPlayerName = (players)=>{
        return players.map((player,index)=><th scope="col" key = {index} >{player}</th>);
    }
    handleChangeScore = (row,col,value)=>{
        const {game} = this.state;
        game.scores[row][col] = value;
        axios({
            url:`${ROOT_API}/api/game/${game._id}`,
            method:'PUT',
            data:game
        })
        .then(()=>{
            this.setState({game})
            console.log(game.scores[0]);
            
        })
        .catch((error)=>{
            console.log(error);  
        })
        
    }
    renderRound = (rounds)=>{
        return rounds.map((round,row)=>{
            const playerScore = round.map((score, col)=>
                <td key={col}>
                    <input 
                    onChange={(event)=>{
                        const {value} = event.target;
                        this.handleChangeScore(row,col,value)
                    }} 
                    type="number" 
                    className="form-control" 
                    defaultValue={score}/>
                </td>
            )
            return (
                <tr key={row}>
                    <th scope="row">{row+1}</th>
                   {playerScore}
                </tr>
            )
        })
    }
    handleAddRound = ()=>{
        const {game} = this.state;
        game.scores.push([0,0,0,0]);
        this.setState({game})
        axios({
            url:`${ROOT_API}/api/game/${game._id}`,
            method:'PUT',
            data:game
        })
        .then(()=>{
            // console.log(game.scores);
        })
        .catch((error)=>{
            console.log(error);
            
        })
    }
    renderSumOfScores = (scores)=>{
        let sumOfScore = 0;
        const sumPlayerScores = [0,1,2,3].map(col=>{
            const total = scores.reduce((total,round)=>{
                return total += Number(round[col])
            },0);
            sumOfScore+=total;
            return <th key={col} scope="col">{total}</th> 
        });
        return (
            <>
                <th scope="col">Sum of Score({sumOfScore})</th>
                {sumPlayerScores}
            </>
        )
    }
  render() {
    const {game} = this.state;
    return (
       
      <div>
        <table className="table mt-5">
            <thead className="thead"> 
                <tr>
                    <th scope="col"></th>
                    {this.renderPlayerName(game.players)}
                </tr>
            </thead>
            <thead className="thead-dark"> 
                {this.renderSumOfScores(game.scores)}
            </thead>
            <tbody>
                {this.renderRound(game.scores)}
            </tbody>
        </table>
        <div className="text-center">
            <button className="btn btn-primary btn-game" id="btn-create" onClick={this.handleAddRound}>ADD ROUND</button>
        </div>
      </div>
    )
  }
}
