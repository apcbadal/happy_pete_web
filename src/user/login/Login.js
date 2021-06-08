import React, { Component } from 'react';
import './Login.css';
import {GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, ACCESS_TOKEN, CURRENT_USER} from '../../constants';
import { login } from '../../util/APIUtils';
import { Link, Redirect } from 'react-router-dom'
import fbLogo from '../../img/fb-logo.png';
import googleLogo from '../../img/google-logo.png';
import githubLogo from '../../img/github-logo.png';
import Alert from 'react-s-alert';
import FirebaseConfig from "../../config/FirebaseConfig";

class Login extends Component {
    componentDidMount() {
        // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
        // Here we display the error and then remove the error query parameter from the location.
        if(this.props.location.state && this.props.location.state.error) {
            setTimeout(() => {
                Alert.error(this.props.location.state.error, {
                    timeout: 5000
                });
                this.props.history.replace({
                    pathname: this.props.location.pathname,
                    state: {}
                });
            }, 100);
        }
    }

    render() {
        if(this.props.authenticated) {
            return <Redirect
                to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>;
        }

        return (
            <div className="login-container">
                <div className="login-content">
                    <h1 className="login-title">Login <br/>Happy St Pete</h1>
                    <LoginForm {...this.props} />
                </div>
            </div>
        );
    }
}

class SocialLogin extends Component {
    render() {
        return (
            <div className="social-login">
                <a className="btn btn-block social-btn github" href={GITHUB_AUTH_URL}>
                    <img src={githubLogo} alt="Github" /> Log in with Github</a>
            </div>
        );
    }
}


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        FirebaseConfig.auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((result)=>{
                if(FirebaseConfig.auth().currentUser.emailVerified) {
                    let role = null;
                    let userName=null;
                    let email=null;
                    let phoneNumber =null
                    FirebaseConfig.database().ref("users/")
                        .orderByChild("email").equalTo(this.state.email).once("value")
                        .then((snapshot) => {
                            let userInfo = snapshot.val();
                            for (let attributes in userInfo) {
                                role = userInfo[attributes].role;
                                email =userInfo[attributes].email;
                                userName=userInfo[attributes].name;
                                phoneNumber=userInfo[attributes].phoneNumber
                            }
                            FirebaseConfig.auth().onAuthStateChanged(function (user){
                                if(user){
                                    let obj = {};
                                    obj.name=userName;
                                    obj.email=email;
                                    obj.phoneNumber=phoneNumber;
                                    let currentUserObj=JSON.stringify(obj)
                                    user.getIdToken().then(idToken =>{
                                            localStorage.setItem(ACCESS_TOKEN, idToken);
                                            localStorage.setItem(CURRENT_USER,currentUserObj)
                                            Alert.success("You're successfully logged in!");
                                            window.location.reload()
                                    } )
                                }
                            })

                        })
                }
                else{
                    FirebaseConfig.auth().currentUser.sendEmailVerification().then(r => {
                        alert("Your email address is not verified yet, Please check your email and verify first")
                    });
                }
            })
            .catch((error)=>{
                alert("Your Email or Password is wrong.")
            })

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-item">
                    <input type="email" name="email"
                        className="form-control" placeholder="Email"
                        value={this.state.email} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <input type="password" name="password"
                        className="form-control" placeholder="Password"
                        value={this.state.password} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <button type="submit" className="btn btn-block btn-primary">Login</button>
                </div>
            </form>
        );
    }
}

export default Login
