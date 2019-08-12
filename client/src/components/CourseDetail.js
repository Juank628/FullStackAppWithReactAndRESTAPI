import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
const ReactMarkdown = require("react-markdown");

class CourseDetail extends Component {
  state = {
    course: {}
  };

  /*get course from api*/
  componentDidMount() {
    fetch(`${this.props.context.baseUrl}/courses/${this.props.match.params.id}`)
      .then(data => {
        if (data.status === 404) {
          this.props.history.push("/notfound");
        } else {
          data.json().then(course => this.setState({ ...course }));
        }
      })
      .catch(err => {
        this.props.history.push({
          pathname: "/error",
          state: { error: err.message }
        });
      });
  }

  /*delete a course*/
  deleteCourse = () => {
    const { context } = this.props;
    const { id } = this.state.course;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: context.login.logedUser.Authorization
      }
    };
    fetch(`${context.baseUrl}/courses/${id}`, options)
      .then(() => this.props.history.push("/"))
      .catch(err => {
        this.props.history.push({
          pathname: "/error",
          state: { error: err.message }
        });
      });
  };

  render() {
    const { course } = this.state;
    const { logedUser } = this.props.context.login;

    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              {course.userId === logedUser.id ? (
                <span>
                  <Link
                    className="button"
                    to={`/courses/${this.state.course.id}/update`}
                  >
                    Update Course
                  </Link>
                  <div className="button" to={"/"} onClick={this.deleteCourse}>
                    Delete Course
                  </div>
                </span>
              ) : null}
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
              <ReactMarkdown source={course.description} />
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
                  <ReactMarkdown source={course.materialsNeeded} />
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CourseDetail);
