import React, { Component } from 'react';
//import axios from 'axios'

//const express = require('express');
const axios = require('axios')

class App extends Component{
  
  state = {
    courses:[]
  }

  componentDidMount() {
      this.getUser();
      this.test();
    }

  test = async () => {
    await axios.get(`localhost:5000/api/courses`)
      .then(resultsData => {this.setState({courses:resultsData})})
      .catch(error=> console.log('error fetching data', error));
  }

  getUser = async function() {
    try {
      const response = await axios.get('localhost:5000/api/courses');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  render(){
    return(this.state.courses)
  }
}  

export default App
