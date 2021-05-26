import {withRouter} from 'react-router-dom'
import React, { Component, useState, useEffect } from 'react';
const axios = require('axios');


const CourseDetail =(props) => {
  const [info, setInfo] = useState([]);
  const id = props.match.params.id;


  useEffect(()=> {
 
        axios.get(`http://localhost:5000/api/courses/${id}`)
        .then(response=>{
            setInfo(response.data)
            console.log(info);
          })
        .catch(err=>{console.error(err)})

    }, []);
  const user = info.User
  console.log(user)
  return (
    <div id="root">
            <div className="actions--bar">
                <div className="wrap">
                    <a className="button" href={`/courses/${id}/update`}>Update Course</a>
                    <a className="button" href={`/courses/${id}/delete`}>Delete Course</a>
                    <a className="button button-secondary" href="/">Return to List</a>
                </div>
            </div>
            
            <div className="wrap">
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course Detail</h3>
                            <h4 className="course--name">{info.title}</h4>
                            <p>{`By ${info.firstName} Smith`}</p>

                            <p>{info.description}</p>
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
    );
  }


export default withRouter(CourseDetail)