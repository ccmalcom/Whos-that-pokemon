import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      // totalTime: 10,
      timeRemaining: undefined,
    }
  }

  fetchPokemon() {
    this.setState({timeRemaining: 10})
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      })
      .catch((err) => console.log(err))
      this.timer();
    }

    timer(){
      const countdown = setInterval(() => {
        this.setState((state) => {
          if(this.state.timeRemaining > 0){
            return {timeRemaining: state.timeRemaining - 1}
          } else {
            console.log('time up')
            clearInterval(countdown);
          }
        })
        console.log(this.state.timeRemaining)
    }, 1000);
    }

  render() {
    return (
      <div className={'wrapper'}>
        {this.state.pokeName !== '' && this.state.timeRemaining !== 0 ?
        <h1 className={'timer'} >{this.state.timeRemaining}</h1>
        : 
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button> }
        {this.state.timeRemaining == 0 ?
        <div className={'pokeWrap'}>
        <img className={'pokeImg'} src={this.state.pokeSprite} />
        <h1 className={'pokeName'}>{this.state.pokeName}</h1>
        </div>  
        : 
        <div className={'pokeWrap'}>
        <img className={'pokeImgDark'} src={this.state.pokeSprite} />
        </div> }  
      </div>
    )
  }
}

export default PokeFetch;