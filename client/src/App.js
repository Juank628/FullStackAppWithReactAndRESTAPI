import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import withContext from './Context'
import Header from './components/Header'
import Courses from './components/Courses'
import CourseDetail from './components/CourseDetail'
import CreateCourse from './components/CreateCourse'
import UpdateCourse from './components/UpdateCourse'
import UserSignIn from './components/UserSignIn';

const HeaderWithContext = withContext(Header)
const CoursesWithContext = withContext(Courses)
const CreateCourseWithXontext = withContext(CreateCourse)
const CourseDetailWithContext = withContext(CourseDetail)
const UpdateCourseWithContext = withContext(UpdateCourse)
const UserSignInWithContext = withContext(UserSignIn)

function App() {
  return (
    <BrowserRouter>
    <div>
      <HeaderWithContext />
      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <Route path="/courses/create" component={CreateCourseWithXontext} />
        <Route path="/courses/:id/update" component={UpdateCourseWithContext} /> 
        <Route path="/courses/:id" component={CourseDetailWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
