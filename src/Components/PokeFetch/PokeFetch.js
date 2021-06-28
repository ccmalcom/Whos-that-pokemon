import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      timeRemaining: 10,
      timerRunning: false,
      visible: false
    }
  }

  componentDidMount() {
    console.log('Component did mount')
    this.countdown = setInterval(() => 
      this.timer(), 1000
    );
  }

  componentDidUpdate() {
    console.log('component did update',)
    if(this.state.timeRemaining === 0 && this.state.visible === false){
      this.setState({visible: true, timerRunning: false});
    } 
  }

  componentWillUnmount() {
    clearInterval(this.countdown)
  }

  fetchPokemon() {
    this.setState({ timerRunning: false, timeRemaining: 10 })
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
          timerRunning: true,
          visible: false
        })
      })
      .catch((err) => console.log(err))
  }

  timer() {
    if(this.state.timerRunning && this.state.timeRemaining > 0){
      this.setState((prevState) => {
          return { timeRemaining: prevState.timeRemaining - 1 }
        })
    }
    }

render() {
  return (
    <div className={'wrapper'}>
      {this.state.timerRunning ?
        <h1 className={'timer'} >{this.state.timeRemaining}</h1>
        :
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>}
      {this.state.visible ?
        <div className={'pokeWrap'}>
          <img className={'pokeImg'} src={this.state.pokeSprite} />
          <h1 className={'pokeName'}>{this.state.pokeName}</h1>
        </div>
        :
        <div className={'pokeWrap'}>
          <img className={'pokeImgDark'} src={this.state.pokeSprite} />
        </div>}
    </div>
  )
}
}

export default PokeFetch;