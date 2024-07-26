import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignUp from './components/signup';
import Login from './components/login';
import Profile from './components/profile';
import ResetPassword from './components/resetPassword';
import ProtectedRoute from './components/protectedRoute';
import Home from './components/home';
import Feed from './components/feed';
import Admin from './components/admin';
import FriendList from './components/friendList';
import { Format } from './Format';
import './App.css';
import AdminRoute from './components/adminRoute';

function App() {

  return (
    <div id='app'>
      <Router>
        <Routes>
          <Route path = "/" element={<Home/>}/>
          <Route path = "/signup" element={<SignUp/>}/>
          <Route path = "/login" element={<Login/>}/>
          <Route path = "/reset" element={<ResetPassword/>}/>
          <Route element={<ProtectedRoute/>}>
            <Route element={<Format/>}>
              {/* put protected routes here (i.e. anything other than signup, login, or password reset.) */}
              <Route path = "/feed" element={<Feed/>}/>
              <Route path = "/profile/:email" element={<Profile/>}/>
              <Route path="/friendlist" element={<FriendList/>}/>
              {/* regular users should not be able to access admin pages */}
              <Route element={<AdminRoute/>}>
                <Route path="/admin" element={<Admin/>}/>
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
