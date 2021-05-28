import React, {Component} from 'react';
import Form from './Form';
import Cookies from 'js-cookie';


export default class CreateCourse extends Component{
  state= {
    title:'',
    description:'',
    estimatedTime:'',
    materialsNeeded:'',
    errors:[],
    user:Cookies.getJSON('authenticatedUser'),
    userId:Cookies.getJSON('authenticatedUser').userId
  }

  componentDidMount(){
    console.log(this.state.user)
  }

  render(){
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
      user
    }=this.state
  
  return (
    
    <div>
      {user? 
      (<div className="wrap">
        <h1>Create Course</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Create Course"
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

  //Returns user to home page without creating new course
  cancel = () => {
    this.props.history.push('/');
   }

  //Sends the post request to the API to create new course 
  submit = () => {
    const { context } = this.props;
    console.log(context.authenticatedUser)
    const { title, description, estimatedTime, materialsNeeded, userId, user } = this.state;
    const course ={title, description, estimatedTime, materialsNeeded, userId} 

    //Calls the Data.js file's createCourse to add a new course with authenticated user as 'owner'
    context.data.createCourse(course, user.emailAddress, user.password)
      .then(response => {
        if(response.length){
          this.setState({
            errors:response})
        } 
        else{
          console.log('course created')
          this.props.history.push('/')
        }}
      )
      .catch(err=>{console.error(err)})

  }
}
