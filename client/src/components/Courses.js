import React, { Component } from "react";
import {Link, withRouter} from 'react-router-dom';

class Courses extends Component {
  state = {
    courses: []
  };

  /*get courses from api*/
  componentDidMount() {
    fetch(`${this.props.context.baseUrl}/courses`)
      .then(data => data.json())
      .then(courses => this.setState({ courses: courses }))
      .catch(err => {
        this.props.history.push({
          pathname:  '/error',
          state: { error: err.message }
        })
      });
  }

  render() {
    const { courses } = this.state;
    return (
      <div className="bounds">
        {courses.map((course,item) => (
          <div className="grid-33" key={item}>
            <Link className="course--module course--link" to={`/courses/${course.id}`}>
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{course.title}</h3>
            </Link>
          </div>
        ))}

        <div className="grid-33">
          <Link
            className="course--module course--add--module"
            to={'courses/create'}
          >
            <h3 className="course--add--title">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 13 13"
                className="add"
              >
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " />
              </svg>
              New Course
            </h3>
          </Link>
        </div>
      </div>
      )
    }}

    export default withRouter(Courses)