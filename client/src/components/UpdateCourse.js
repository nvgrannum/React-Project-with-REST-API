import React, {Component} from 'react';
import Form from './Form';
import Cookies from 'js-cookie';

const axios = require('axios');


export default class UpdateCourse extends Component{
  state= {
    title:'',
    description:'',
    estimatedTime:'',
    materialsNeeded:'',
    errors:[],
    user:Cookies.getJSON('authenticatedUser'),
    userId:Cookies.getJSON('authenticatedUser').userId,
    id:this.props.match.params.id,
    course:{},
    courseUser:{}
  }

  componentDidMount(){
    console.log(this.state.user)
    this.getCourse(this.state.id)
  }

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
    .catch(err=>{console.error(err)})
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
  console.log(title)
  return (
    
    <div>
      {user? 
      (<div className="wrap">
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
          )
          : 
          (<h2>Authorization Required. Please sign in.</h2>)}    
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

   //can't get context (authorizedUser) to register, so fetching cookies each time...
  submit = () => {
    const { context } = this.props;
    const {authorizedUser} = context
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
      .catch(err=>console.error(err))

  }
}

