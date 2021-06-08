import React, { Component } from 'react';
import './Home.css';
import '../user/login/Login.css'
import {
    NavLink
  } from "react-router-dom";

class Home extends Component {
    render() {
        return (

            <div className="home-container">
                { this.props.authenticated ? (
                    <div>
                <div className="social-login"style={{width:'30%',marginLeft:'35%'}}>
                <div className="btn btn-block social-btn github" >
                    <NavLink to="/uploadPlace">Upload Place </NavLink>
                </div>
                </div>
                <div className="social-login"style={{width:'30%',marginLeft:'35%'}}>
                <div className="btn btn-block social-btn github" >
                    <NavLink to="/getAllPlace">View Place </NavLink>
                </div>
                </div>
                </div>

                ): (
                    <div className="container">
                    <div className="graf-bg-container">
                        <div className="graf-layout">
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                        </div>
                    </div>
                    <h1 className="home-title">Welcome</h1>
                </div>

                )}
            </div>

        )
    }
}

export default Home;
