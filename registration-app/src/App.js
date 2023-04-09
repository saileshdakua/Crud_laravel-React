import {useState} from 'react';
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom';
import Home from './components/Home/Home';

import Register from './components/Register/Register';
import Login from './components/Login/Login';
import axios from 'axios';
import AddTodo from './components/AddTodo';
import View from './components/View';
import Navbar from './components/Navbar';
import EditTodo from './components/EditTodo'

axios.defaults.withCredentials = true;

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

function App() {


  return (
    <div className="App">
        <Router>
          <Switch>


            {/* <Route exact path="/" component={Home}/> */}
            <Route path="/login" component={Login}/>
            <Route exact path="/" component={Register}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/home" component={Home}/>
           
            <Route exact path="/logout" component={Login}/>
            <Route exact path="/addtodo" component={AddTodo}/>
            <Route exact path="/navbar" component={Navbar}/>
            <Route exact path="/view" component={View}/>
            <Route exact path="/edittodo/:id" component={EditTodo}/>
            <Route path="/home">
              {localStorage.getItem('auth_token','auth_id') ? <Redirect to='/login' /> : <Login />}
            </Route>


          </Switch>
        </Router>
    </div>
  );
}

export default App;
