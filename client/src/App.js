import React from 'react';
import { BrowserRouter, Switch, Route} from "react-router-dom";
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';


export default function App() {

  return (
    <div className= "wrapper">
      <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Login}/>
            <Route path="/dashboard" exact component={Dashboard}/>
          </Switch>
      </BrowserRouter>
    </div>
  );
}
