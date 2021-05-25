import React, { Component } from 'react';
import axios from 'axios'

//const express = require('express');


class App extends Component{
  
  state = {
    courses:[]
  }

  componentDidMount() {
      this.test();
    }

  test = async () => {
    await axios.get(`http://localhost:5000/api/courses`)
      .then(results => results.json())
      .then(resultsData => {this.setState({courses:resultsData})})
      .catch(error=> console.log('error fetching data', error));
  }

  render(){
    return(this.state.courses)
  }
}  

export default App
