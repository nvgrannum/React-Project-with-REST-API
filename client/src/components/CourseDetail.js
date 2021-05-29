import {withRouter} from 'react-router-dom'
import React, { Component} from 'react';
import ReactMarkdown from 'react-markdown';
const axios = require('axios');

//Displays the full detailed information for individual courses.
class CourseDetail extends Component{
  
  state = {
    course:{},
    id:this.props.match.params.id,
    courseUser:{},
    authenticatedUser:this.props.context.authenticatedUser || null
  }

  async componentDidMount() {
      await this.getCourse(this.state.id);
    }

  //Sends request to the API to get a specific course depending on the url params 
  //or directs to 'notfound' page if the course does not exist
  getCourse = async function(id) {
      await axios.get(`http://localhost:5000/api/courses/${id}`)
      .then(data=>{
          this.setState({
            course:data.data,
            courseUser:data.data.User 
          })
        })
      .catch(err=>{
        console.error(err)
        this.props.history.push('/notfound')})
    }

  
    /*Checks if there is an authenticated user. If there is an authenticated user AND the user's id
    matches the course's owner, then update and delete buttons display. If the user is not authorized
    or the authorized user is not the course owner, update and delete buttons do not display*/
  render() {
    const {course, courseUser, authenticatedUser} = this.state;

    return(
      <div id="root">
            <div className="actions--bar">
                <div className="wrap">
                  {authenticatedUser ? 
                    ((courseUser.id === authenticatedUser.userId)? (
                    <div>
                      <a className="button" href={`/courses/${course.id}/update`}>Update Course</a>
                      <a className="button" href={`/courses/${course.id}/delete`}>Delete Course</a>
                      <a className="button button-secondary" href="/">Return to List</a>
                    </div>):<a className="button button-secondary" href="/">Return to List</a>) :
                    (<a className="button button-secondary" href="/">Return to List</a>)}
                </div>
            </div>
            
            <div className="wrap">
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course Detail</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>{`By ${courseUser.firstName} ${courseUser.lastName}`}</p>

                            <ReactMarkdown>{course.description}</ReactMarkdown>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime || 'Not Provided'}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            {course.materialsNeeded? (
                              <ReactMarkdown className="course--detail--list" children={course.materialsNeeded} />)
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