import React, {Component} from 'react';
import Form from './Form';
import { Link } from 'react-router-dom';


export default class UpdateCourse extends Component{
  state= {
    title:'',
    description:'',
    estimatedTime:'',
    materialsNeeded:'',
    errors:[],
    submitButtonText:'',
  }

render(){
  const {
    title,
    description,
    estimatedTime,
    materialsNeeded,
    errors,
    submitButtonText
  }=this.state
  return (
      <div className="wrap">
        <ErrorsDisplay errors={errors} />
        <h1>Update Course</h1>
        <Form 
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Update Course"
          elements={() => (
            <React.Fragment>
              <input 
                id="title" 
                name="title" 
                type="text"
                value={title} 
                onChange={this.change} 
                placeholder="Course Title" />
              <input 
                id="description" 
                name="description"
                type="description"
                value={description} 
                onChange={this.change} 
                placeholder="Course Description" />                
            </React.Fragment>
          )} />
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
