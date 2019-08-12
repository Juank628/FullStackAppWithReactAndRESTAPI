import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './global.css';
import withContext from "./Context";
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import UserSignUp from "./components/UserSignUp"
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import PrivateRoute from "./PrivateRoute";
import NotFound from "./components/NotFound";
import Forbidden from "./components/Forbidden";
import UnhandledError from "./components/UnhandledError"

const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CreateCourseWithContext = withContext(CreateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignUpWithContext = withContext(UserSignUp)
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const PrivRouteWithContext = withContext(PrivateRoute);

function App() {
  return (
    <BrowserRouter>
      <div>
        <HeaderWithContext />
        <Switch>
          {/***********private routes************/}
          <PrivRouteWithContext
            path="/courses/create"
            component={CreateCourseWithContext}
          />
          <PrivRouteWithContext
            path="/courses/:id/update"
            component={UpdateCourseWithContext}
          />
          {/***********public routes************/}
          <Route exact path="/" component={CoursesWithContext} />
          <Route exact path="/courses/:id" component={CourseDetailWithContext} />
          <Route exact path="/signup" component={UserSignUpWithContext} />
          <Route exact path="/signin" component={UserSignInWithContext} />
          <Route exact path="/signout" component={UserSignOutWithContext} />
          <Route exact path="/notfound" component={NotFound} />
          <Route exact path="/forbidden" component={Forbidden} />
          <Route exact path="/error" component={UnhandledError} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
