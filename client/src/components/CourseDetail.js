import {withRouter} from 'react-router-dom'
import React, { Component} from 'react';
import Cookies from 'js-cookie';
import ReactMarkdown from 'react-markdown';
const axios = require('axios');


class CourseDetail extends Component{
  
  state = {
    info:{},
    id:this.props.match.params.id,
    courseUser:{},
    authenticatedUserId:Cookies.getJSON('authenticatedUser').userId
  }

  componentDidMount() {
      this.getCourse(this.state.id);
    }

  getCourse = async function(id) {
      await axios.get(`http://localhost:5000/api/courses/${id}`)
      .then(data=>{
          this.setState({
            info:data.data,
            courseUser:data.data.User 
          })
        })
      .catch(err=>{console.error(err)})
    }

  

  render() {
    const {info, courseUser, authenticatedUserId} = this.state;
    console.log(info)
    console.log(courseUser.id)
    console.log(info.materialsNeeded)

    return(
      <div id="root">
            <div className="actions--bar">
                <div className="wrap">
                  {(courseUser.id === authenticatedUserId)? (
                    <div>
                      <a className="button" href={`/courses/${info.id}/update`}>Update Course</a>
                      <a className="button" href={`/courses/${info.id}/delete`}>Delete Course</a>
                      <a className="button button-secondary" href="/">Return to List</a>
                    </div>):
                    (<a className="button button-secondary" href="/">Return to List</a>)}
                </div>
            </div>
            
            <div className="wrap">
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course Detail</h3>
                            <h4 className="course--name">{info.title}</h4>
                            <p>{`By ${courseUser.firstName} ${courseUser.lastName}`}</p>

                            <ReactMarkdown>{info.description}</ReactMarkdown>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{info.estimatedTime || 'Not Provided'}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            {info.materialsNeeded? (
                              <ReactMarkdown className="course--detail--list" children={info.materialsNeeded} />)
                              :
                              (<p>None Required</p>)
                            }
                             
                        </div>
                    </div>
                </form>
            </div>
    </div>
    )
  }
}


export default withRouter(CourseDetail)