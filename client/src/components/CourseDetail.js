import React, { Component } from "react";
import {Link} from 'react-router-dom';

export default class CourseDetail extends Component {
  state = {
    course: {}
  };

  componentDidMount() {
    fetch(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
      .then(data => data.json())
      .then(course => this.setState({ ...course }))
      .catch(err => console.log(err));
  }

  render() {
    const { course } = this.state;

    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              <span>
                <a className="button" href="update-course.html">
                  Update Course
                </a>
                <a className="button" href="#">
                  Delete Course
                </a>
              </span>
              <Link className="button button-secondary" to="/">
                Return to List
              </Link>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{course.title}</h3>
              <p>
                {course.user
                  ? `By ${course.user.firstName} ${course.user.lastName}`
                  : null}
              </p>
            </div>
            <div className="course--description">
              <p>{course.description}</p>
            </div>
          </div>
        </div>

        <div className="grid-25 grid-right">
          <div className="course--stats">
            <ul className="course--stats--list">
              <li className="course--stats--list--item">
                <h4>Estimated Time</h4>
                <h3>{course.estimatedTime}</h3>
              </li>
              <li className="course--stats--list--item">
                <h4>Materials Needed</h4>
                <ul>
                  {course.materialsNeeded ? 
                    (course.materialsNeeded
                        .split('*')
                        .slice(1)
                        .map((item,index) => <li key={index}> {item}</li>)) 
                    : 
                    <li>No materials needed</li>}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
