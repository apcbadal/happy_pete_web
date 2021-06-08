import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import AppHeader from '../common/AppHeader';
import Home from '../home/Home';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import { getCurrentUser,currentUser } from '../util/APIUtils';
import {ACCESS_TOKEN, CURRENT_USER} from '../constants';
import PrivateRoute from '../common/PrivateRoute';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css';
import AddTodo from '../todo/addtodo'
import GetTodo from '../todo/GetTodo'
import Triangle  from "../todo/triangle";
import UploadPlace from "../Places/UploadPlace"
import GetAllPlace from "../Places/GetAllPlace";
import EditPlace from "../Places/EditPlace";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: false
    }

    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  loadCurrentlyLoggedInUser() {
    this.setState({
      loading: true
    });
      let currentUserObj =localStorage.getItem(CURRENT_USER)
    if(currentUserObj){
      console.log("Current user "+currentUserObj)
      this.setState({
        currentUser: currentUserObj,
        authenticated: true,
        loading: false
      });
    }
    else{
      this.setState({
        loading:false
      })
    }
   /* currentUser()
    .then(response => {
      console.log(response)
      this.setState({
        currentUser: response,
        authenticated: true,
        loading: false
      });
    }).catch(error => {
      this.setState({
        loading: false
      });
    });*/
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(CURRENT_USER)
    this.setState({
      authenticated: false,
      currentUser: null
    });
    Alert.success("You're safely logged out!");
  }

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
  }

  render() {
    if(this.state.loading) {
      return <LoadingIndicator />
    }

    return (
      <div className="app">
        <div className="app-top-box">
          <AppHeader authenticated={this.state.authenticated} onLogout={this.handleLogout} />
        </div>
        <div className="app-body">
          <Switch>
            <Home exact path="/"authenticated={this.state.authenticated} />
            <PrivateRoute path="/profile" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
    component={Profile}/>
              <PrivateRoute path="/addTodo" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
    component={AddTodo}/>
              <PrivateRoute path="/getTodo" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
    component={GetTodo}/>
            <PrivateRoute path="/uploadPlace" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
                          component={UploadPlace}/>
            <Route path="/login"
    render={(props) => <Login authenticated={this.state.authenticated} {...props} />}/>
            <Route path="/signup"
    render={(props) => <Signup authenticated={this.state.authenticated} {...props} />}/>
            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}/>
            <Route path="/triangle" component={Triangle}/>
            <Route path="/getAllPlace" component={GetAllPlace}/>
            <Route path="/editPlace" component={EditPlace}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
        <Alert stack={{limit: 3}}
          timeout = {3000}
          position='top-right' effect='slide' offset={65} />
      </div>
    );
  }
}

export default App;
