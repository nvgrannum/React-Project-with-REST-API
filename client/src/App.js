import React, { Component } from 'react';
//import axios from 'axios'

//const express = require('express');
const axios = require('axios')

class App extends Component{
  
  state = {
    courses:[]
  }

  componentDidMount() {
      this.getCourse();
     
    }

  getCourse = async function() {
    try {
      await axios.get('http://localhost:5000/api/courses')
      .then(data=>{console.log(data.data)});
    } catch (error) {
      console.error(error);
    }
  }

  render(){
    return(this.state.courses)
  }
}  

export default App
