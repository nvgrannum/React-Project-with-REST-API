import React, {Component} from 'react';
import Form from './Form';

const axios = require('axios');

//Displays a form that updates an existing course, but only if the authorized user is the owner of the course
export default class UpdateCourse extends Component{
  state= {
    title:'',
    description:'',
    estimatedTime:'',
    materialsNeeded:'',
    errors:[],
    user:this.props.context.authenticatedUser || null,
    id:this.props.match.params.id,
    course:{},
    courseUser:{}
  }

  async componentDidMount(){
    await this.getCourse(this.state.id)
      .catch(err=>{console.log(err)})
    console.log(this.state.user)
    
    if (this.state.user === null){
      this.props.history.push('/signin')
    } else if( this.state.user.userId !== this.state.courseUser.id) {
      this.props.history.push('/forbidden')
    }
  }

  //Sends request to the API to get a specific course depending on the url params 
  //or directs to 'notfound' page if the course does not exist
  getCourse = async function(id) {
    await axios.get(`http://localhost:5000/api/courses/${id}`)
    .then(data=>{
        this.setState({
          course:data.data,
          courseUser:data.data.User,
          title:data.data.title,
          description:data.data.description,
          estimatedTime:data.data.estimatedTime,
          materialsNeeded:data.data.materialsNeeded 
        })
      })
    .catch(err=>{
      console.error(err)
      this.props.history.push('/notfound')})
  }

  render(){
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
      user,
      course
    }=this.state

  return (
    
    <div>
      <div className="wrap">
        <h1>Update {course.title}</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Update Course"
            elements={() => (
              <div> 
                <React.Fragment>
                  <div className="main--flex">
                    <div>
                      <label>* Course Title</label>
                      <input 
                        id="title" 
                        name="title" 
                        type="text"
                        value={title} 
                        onChange={this.change} />

                      <p>By {user.firstName} {user.lastName}</p>

                      <label>* Description</label>
                      <textarea 
                        id="description" 
                        name="description"
                        value={description} 
                        onChange={this.change}/>
                    </div>
                    <div>
                      <label>Estimated Time</label>
                      <input 
                        id="estimatedTime" 
                        name="estimatedTime"
                        type="text"
                        value={estimatedTime} 
                        onChange={this.change}/>  

                      <label>Materials Needed</label>
                      <textarea 
                        id="materialsNeeded" 
                        name="materialsNeeded"
                        value={materialsNeeded} 
                        onChange={this.change}/> 
                    </div>
                  </div>             
                  </React.Fragment>
              </div>
            )} />
        <p>* Indicates required field</p>
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

   //Calls Data.js updateCourse to create a PUT request to the API and update the current course
   //Only if the authorized user is the owner of the course
  submit = () => {
    const { context } = this.props;
    const { title, description, estimatedTime, materialsNeeded, userId, user , id} = this.state;
    const course ={title, description, estimatedTime, materialsNeeded, userId} 

    context.data.updateCourse(id, course, user.emailAddress, user.password)
      .then(errors => {
        if(errors.length){
          this.setState({errors:errors})
        } 
        else{
          console.log('course successfully updated')
          this.props.history.push(`/courses/${id}`)
        }}
      )
      .catch(err=>{
        console.error(err)
        this.props.history.push('/error')})

  }
}

