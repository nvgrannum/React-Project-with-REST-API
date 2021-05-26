import React, { Component } from 'react';
import {Link} from 'react-router-dom'
const axios = require('axios')

class Courses extends Component{
  
  state = {
    courses:[]
  }

  componentDidMount() {
      this.getCourse();
    }

  getCourse = async function() {
    try {
      let courses = await axios.get('http://localhost:5000/api/courses')
      .then(data=>{
          this.setState({courses:data.data});
        });
        return courses
    } catch (error) {
      console.error(error);
    }
  }

  

  render(){

    return(
        <div>
            <div className="wrap main--grid">
                    {this.state.courses.map(course=>
                    <Link className="course--module course--link" to={`/courses/${course.id}`} key={course.id}>
                        <h2 className="course--label">Course</h2>
                        <h3 className="course--title" >{course.title}</h3>
                    </Link>)}
            </div>
        </div>
      )
  }
}  

export default Courses
