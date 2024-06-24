import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignUp from './components/signup';

import './App.css';


function App() {
  
  return (
    <div id='app'>
      <Router>
        <Routes>
          <Route path = "/"></Route>
          <Route path = "/signup" element={<SignUp/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
