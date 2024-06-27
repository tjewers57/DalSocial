import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignUp from './components/signup';
import Login from './components/login';
import ResetPassword from './components/resetPassword';

import './App.css';


function App() {
  
  return (
    <div id='app'>
      <Router>
        <Routes>
          <Route path = "/"></Route>
          <Route path = "/signup" element={<SignUp/>}/>
          <Route path = "/login" element={<Login/>}/>
          <Route path = "/reset" element={<ResetPassword/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
