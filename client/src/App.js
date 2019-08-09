import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Header from './components/Header'
import Courses from './components/Courses'
import CourseDetail from './components/CourseDetail'

function App() {
  return (
    <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Courses} />
        <Route path="/courses/:id" component={CourseDetail} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
