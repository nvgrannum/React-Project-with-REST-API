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
    await axios.get(`localhost:5000/api/courses`)
      .then(resultsData => {this.setState({courses:resultsData.data})})
      .catch(error=> console.log('error fetching data', error));
  }

  render(){
    return(this.state.courses)
  }
}  

export default App
