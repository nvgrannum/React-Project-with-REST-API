import {withRouter} from 'react-router-dom'
import React, { Component, useState, useEffect } from 'react';
const axios = require('axios');


class CourseDetailcopy extends Component{
  
  state = {
    info:{},
    id:this.props.match.params.id,
    user:{}
  }

  componentDidMount() {
      this.getCourse(this.state.id);
      console.log(this.props.location.pathname.slice(9))
    }

  getCourse = async function(id) {
      await axios.get(`http://localhost:5000/api/courses/${id}`)
      .then(data=>{
          this.setState({
            info:data.data,
            user:data.data.User 
          })
          console.log(this.state.info);
          console.log(this.state.user)
        })
      .catch(err=>{console.error(err)})
    }

  

  render() {
    const {info, user} = this.state;
    console.log(info)
    console.log(user)
    return(
      <div id="root">
            <div className="actions--bar">
                <div className="wrap">
                    <a className="button" href={`/courses/${info.id}/update`}>Update Course</a>
                    <a className="button" href={`/courses/${info.id}/delete`}>Delete Course</a>
                    <a className="button button-secondary" href="/">Return to List</a>
                </div>
            </div>
            
            <div className="wrap">
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course Detail</h3>
                            <h4 className="course--name">{info.title}</h4>
                            <p>{`By ${user.firstName} ${user.lastName}`}</p>

                            <p>{`${info.description}`}</p>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{info.estimatedTime || 'Not Provided'}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                <li>1/2 x 3/4 inch parting strip</li>
                                <li>1 x 2 common pine</li>
                                <li>1 x 4 common pine</li>
                                <li>1 x 10 common pine</li>
                                <li>1/4 inch thick lauan plywood</li>
                                <li>Finishing Nails</li>
                                <li>Sandpaper</li>
                                <li>Wood Glue</li>
                                <li>Wood Filler</li>
                                <li>Minwax Oil Based Polyurethane</li>
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
    </div>
    )
  }
}


export default withRouter(CourseDetailcopy)