import config from './config';

//Helper class
/*
Contains user and course API request functions
*/
export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {    
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  /*
  Makes a GET request to the API to fetch the user attempting to sign in
  Requires authorization
  Status 200 - Successful response
  Status 401 - Unauthorized request
  Other responses will fall to a 500 server response and throw a new error
  */
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  /*
  Makes a POST request to the API to create a new user and add to the database
  Does not require authorization
  Status 201 - Successful response
  Status 400 - Incomplete request
  Other responses will fall to a 500 server response and throw a new error
  */
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  /*
  Makes a POST request to the API to create a new course.
  Requires authorization
  Status 201 - Successful response
  Status 400 - Incomplete or inaccurate request
  Other responses will fall to a 500 server response and throw a new error
  */

  async createCourse(course,emailAddress, password) {
    const response = await this.api(`/courses`, 'POST', course, true, {emailAddress, password});
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  /*
    Makes a GET request to the API to get the full list of courses from the database.
    Does not requires authorization
    Status 200 - Successful response
    Other responses will fall to a 500 server response and throw a new error
    */
  async getCourses() {
    const response = await this.api(`/courses`, 'GET');
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  /*
  Makes a GET request to the API to fetch a specific course.
  Does not require authorization
  Status 201 - Successful response
  Other responses will fall to a 500 server response and throw a new error
  */
  async getCourse(id) {
    const response = await this.api(`/courses/${id}`, 'GET');
    if (response.status === 200) {
      return response.json().then(data => data);
    } else {
      throw new Error();
    }
  }

   /*
  Makes a PUT request to the API to fetch a specific course and update the contents.
  Requires authorization
  Status 204 - Successful response
  Status 401/403 - Unauthorized request
  Other responses will fall to a 500 server response and throw a new error
  */
  async updateCourse(courseId, course, emailAddress, password) {
    const response = await this.api(`/courses/${courseId}`, 'PUT', course, true, {emailAddress, password});
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 401 || response.status === 403) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
  }
  }

   /*
  Makes a DELETE request to the API to destroy a specific course.
  Requires authorization
  Status 204 - Successful response
  Status 403 - Forbidden request
  Other responses will fall to a 500 server response and throw a new error
  */
  async deleteCourse(courseId, course, emailAddress, password) {
    const response = await this.api(`/courses/${courseId}`, 'DELETE', course, true, {emailAddress, password});
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 403) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
  }
  }

}
