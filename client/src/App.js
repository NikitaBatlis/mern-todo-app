import React from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';


export default function App() {

  return (
    <div className= "wrapper">
    <Router>
      <div>
        <Switch>
          <Route path="/">
            <Login />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>        
        </Switch>
      </div>
    </Router>
    </div>
  );
}
