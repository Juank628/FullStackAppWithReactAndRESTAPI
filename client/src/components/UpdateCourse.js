import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class UpdateCourse extends Component {
  state = {
    newCourse: {
      title: "",
      description: "",
      estimatedTime: "",
      materialsNeeded: ""
    },
    errors: []
  };

  componentDidMount() {
    fetch(`${this.props.context.baseUrl}/courses/${this.props.match.params.id}`)
      .then(data => data.json())
      .then(data => data.course)
      .then(course => {
        this.setState({
          newCourse: course
        });
      })
      .catch(err => console.log(err));
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

  updateCourse = e => {
    e.preventDefault();
    const { context } = this.props;
    const options = {
      method: "PUT",
      body: JSON.stringify(this.state.newCourse),
      headers: {
        "Content-Type": "application/json",
        Authorization: context.actions.getAuth()
      }
    };
    fetch(`${context.baseUrl}/courses/${this.props.match.params.id}`, options)
      .then(res => {
        if (res.status >= 200 && res.status <= 299) {
          this.props.history.push(`/courses/${this.props.match.params.id}`)
        } else if (res.status === 400) {
          res.json().then(data => this.setState({ errors: data.errors }));
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const { errors } = this.state;
    const {title, description, estimatedTime, materialsNeeded} = this.state.newCourse
    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          {errors.length ? (
            <div>
              <h2 className="validation--errors--label">Validation errors</h2>
              <div className="validation-errors">
                <ul>
                  {errors.map(error => (
                    <li>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
          <form onSubmit={this.updateCourse}>
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
                    value={title}
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
                    value={description}
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
                        value={estimatedTime}
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
                        value={materialsNeeded}
                        onChange={this.inputChange}
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">
                Update Course
              </button>
              <button className="button button-secondary" onClick={()=>this.props.history.push('/')}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(UpdateCourse);
