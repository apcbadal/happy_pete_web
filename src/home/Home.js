import React, { Component } from 'react';
import './Home.css';
import '../user/login/Login.css';
import phone from "../img/phoneInHand.png";
import {
    NavLink
} from "react-router-dom";

class Home extends Component {
    render() {
        return (

            <div className="home-container">
                { this.props.authenticated ? (
                    <div>
                        <div className="social-login">
                            <div className="" >
                                <NavLink className="btn btn-primary btn-uploadPlace" to="/uploadPlace">Upload Place </NavLink>
                            </div>
                        </div>
                        <div className="social-login">
                            <div>
                                <NavLink className="btn btn-primary btn-viewPlace" to="/getAllPlace">View Place </NavLink>
                            </div>
                        </div>
                    </div>

                ) : (
                    <div className="container-loading">
                        <img className="home-image" src={phone} alt="" srcset="" />
                        <h1 className="home-title">Welcome</h1>
                        <p className="home-description">
                           <a href="/login">Login</a> or <a href="/signup">Signup</a> to continue
                        </p>
                    </div>

                )}
            </div>

        )
    }
}

export default Home;
