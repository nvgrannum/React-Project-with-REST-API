import React, {Component} from 'react';
import Form from './Form';
import ReactMarkdown from 'react-markdown';

const axios = require('axios');

//Displays the course information as a final check and submitting on the 'delete' page permanently deletes the course
export default class DeleteCourse extends Component{
  state= {
    errors:[],
    user:this.props.context.authenticatedUser || null,
    id:this.props.match.params.id,
    course:{},
    courseUser:{}
  }
/*
Fetches the course and user data from the API.
If the request is made from a non-authorized user (not signed in), the page redirects to the signin page.
If the request is made from an authorized user, but the user is not the owner of the course, the page redirects to 'Forbidden'.
Any other errors, including if the course ID is not in the database, returns an error and redirects to 'not found'
*/
  async componentDidMount(){
    await this.getCourse(this.state.id)
        
    if (this.state.user === null){
      this.props.history.push('/signin')
    } else if( this.state.user.userId !== this.state.courseUser.id) {
      this.props.history.push('/forbidden')
    }
  }

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

  render(){
    const {
      errors,
      course,
      courseUser
    }=this.state

  return (
    
    <div>
     <div className="wrap">
        <h1>Delete Course: "{course.title}"</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Delete Course"
            elements={() => (
              <div className="wrap">
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
            </div>
            )} />
      </div>   
    </div>
  );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  cancel = () => {
    this.props.history.push(`/courses/${this.state.id}`);
  }

   //Calls Data.js deleteCourse to create a DELETE request to the API and destroy the current course
   //Only if the authorized user is the owner of the course
  submit = () => {
    const { context } = this.props;
    const { title, description, estimatedTime, materialsNeeded, userId, user , id} = this.state;
    const course ={title, description, estimatedTime, materialsNeeded, userId} 

    context.data.deleteCourse(id, course, user.emailAddress, user.password)
      .then(errors => {
        if(errors.length){
          this.setState({errors:errors})
        } 
        else{
          console.log('course successfully deleted')
          this.props.history.push(`/`)
        }}
      )
      .catch(err=>{
        console.error(err)
        this.props.history.push('/error')})

  }
}

