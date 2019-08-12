import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import withContext from "./Context";
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import PrivateRoute from "./PrivateRoute";

const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CreateCourseWithContext = withContext(CreateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);
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
            restrictId={false}
            component={CreateCourseWithContext}
          />
          <PrivRouteWithContext
            path="/courses/:id/update"
            restrictId={true}
            component={UpdateCourseWithContext}
          />
          {/***********public routes************/}
          <Route exact path="/" component={CoursesWithContext} />
          <Route path="/courses/:id" component={CourseDetailWithContext} />
          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signout" component={UserSignOutWithContext} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
