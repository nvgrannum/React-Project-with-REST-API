import React, {Component} from 'react';
import Form from './Form';
import { Link } from 'react-router-dom';


export default class CreateCourse extends Component{
  state= {
    title:'',
    courseDescription:'',
    estimatedTime:'',
    materialsNeeded:'',
    errors:[],
    user:{}
  }


render(){
  const {
    title,
    courseDescription,
    estimatedTime,
    materialsNeeded,
    errors,
  }=this.state
  
  return (
    <div>
      <div className="wrap">
        <ErrorsDisplay errors={errors} />
        <h1>Create Course</h1>
      </div> 
      <form>
          <div className="main--flex">
              <div>
                  <label htmlFor="courseTitle">* Course Title</label>
                  <input 
                    id="courseTitle" 
                    name="courseTitle" 
                    type="text" 
                    value={title} 
                    onChange={this.change}/>

                  <p>By user.firstName user.lastName</p>

                  <label htmlFor="courseDescription">* Course Description</label>
                  <textarea id="courseDescription" name="courseDescription" value={courseDescription}></textarea>
              </div>
              <div>
                  <label htmlFor="estimatedTime">Estimated Time</label>
                  <input 
                    id="estimatedTime" 
                    name="estimatedTime" 
                    type="text" 
                    value={estimatedTime} 
                    onChange={this.change}/>

                  <label htmlFor="materialsNeeded">Materials Needed</label>
                  <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded}></textarea>
              </div>
          </div>
          <button className="button" type="submit">Create Course</button><a className="button button-secondary" href='/'>Cancel</a>
          <p>* Indicates required field</p>
      </form>
    </div>
  );
          }
}

function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            {errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
        </div>
      </div>
    );
  }


  return errorsDisplay;
}
