import React, { Component } from 'react';
import {Link} from 'react-router-dom'
const axios = require('axios')

class Courses extends Component{
  
  state = {
    courses:[]
  }

  componentDidMount() {
      this.getCourses();
    }

  getCourses = async function() {
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
            
                <Link className="course--module course--add--module" to='/courses/create'>
                    <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                    </span>
                </Link> 
            </div>       
        </div>
      )
  }
}  

export default Courses
