import React, { Component } from "react";
import {withRouter} from 'react-router-dom'

class CreateCourse extends Component {
  state = {
    newCourse: {
      title: "",
      description: "",
      estimatedTime: "",
      materialsNeeded: "",
      userId: "1"
    },
    errors: []
  };

  cancel = e => {
    e.preventDefault();
    this.props.history.push('/')
  }

  inputChange = e => {
    const target = e.target.name;
    const value = e.target.value;
    this.setState(prevState => ({
      newCourse: {
        ...prevState.newCourse,
        [target]: value
      }
    }));
  };

  insertCourse = e => {
    e.preventDefault();
    const { context } = this.props;
    const options = {
      method: "POST",
      body: JSON.stringify(this.state.newCourse),
      headers: {
        "Content-Type": "application/json",
        Authorization: context.actions.getAuth()
      }
    };
    fetch(`${context.baseUrl}/courses`, options)
      .then(res => {
        if (res.status === 201) {
          return [];
        } else if (res.status === 400) {
          res.json().then(data => this.setState({ errors: data.errors }));
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
          {errors.length ? (
            <div>
              <h2 className="validation--errors--label">Validation errors</h2>
              <div className="validation-errors">
                <ul>
                  {errors.map(error => (<li>{error}</li>))}
                </ul>
              </div>
            </div>
          ) : null}
          <form onSubmit={this.insertCourse}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    className="input-title course--title--input"
                    placeholder="Course title..."
                    onChange={this.inputChange}
                  />
                </div>
                <p>By Joe Smith</p>
              </div>
              <div className="course--description">
                <div>
                  <textarea
                    id="description"
                    name="description"
                    className=""
                    placeholder="Course description..."
                    onChange={this.inputChange}
                  />
                </div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div>
                      <input
                        id="estimatedTime"
                        name="estimatedTime"
                        type="text"
                        className="course--time--input"
                        placeholder="Hours"
                        onChange={this.inputChange}
                      />
                    </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                      <textarea
                        id="materialsNeeded"
                        name="materialsNeeded"
                        className=""
                        placeholder="List materials..."
                        onChange={this.inputChange}
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">
                Create Course
              </button>
              <button
                className="button button-secondary"
                onClick={this.cancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateCourse)