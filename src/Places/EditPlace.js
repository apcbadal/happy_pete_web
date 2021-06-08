import React, {Component} from "react";
import FirebaseConfig from "../config/FirebaseConfig";
import {ACCESS_TOKEN, CURRENT_USER} from "../constants";
import Alert from "react-s-alert";
import '../user/login/Login.css'

class EditPlace extends Component {
    constructor(props) {
        super(props);
        this.state = {
           key:null, category:"",  name:"",phoneNumber:"",address:"",website:"",happyHour:"",drinkMenu:"",foodMenu:"",latitude:'',longitude:'',avatar_url:""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        let data =this.props.location.data
        this.setState({
            name: data.name,
            phoneNumber:data.phoneNumber,
            website:data.website,
            longitude:parseFloat(data.longitude),
            latitude:parseFloat(data.latitude),
            address:data.address,
            happyHour:data.happyHour,
            foodMenu:data.foodMenu,
            drinkMenu:data.drinkMenu,
            category:data.category,
            key:data.key,
            avatar_url:data.avatar_url
        })
    }

    handleSelect(event){
        this.setState({
            category:event.target.value
        })

    }
    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        });
    }
    handleSubmit(event){
        event.preventDefault()
        FirebaseConfig.database()
            .ref("places/"+this.state.key)
            .set({
                name: this.state.name,
                phoneNumber:this.state.phoneNumber,
                website:this.state.website,
                longitude:parseFloat(this.state.longitude),
                latitude:parseFloat(this.state.latitude),
                address:this.state.address,
                happyHour:this.state.happyHour,
                foodMenu:this.state.foodMenu,
                drinkMenu:this.state.drinkMenu,
                category:this.state.category,
                avatar_url:this.state.avatar_url
            })
            .then(() => Alert.success("Data Saved successfully."),
                this.setState({
                    category:"",  name:"",phoneNumber:"",address:"",website:"",happyHour:"",drinkMenu:"",foodMenu:"",latitude:'',longitude:'',avatar_url:""
                }),
            );
    }


    render() {
        return (
            <div className="login-container">
                <div className="login-content">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-item">
                            <input type="text" name="name"
                                   className="form-control" placeholder="Name of Bar"
                                   value={this.state.name} onChange={this.handleInputChange} required/>
                        </div>
                        <div className="form-item">
                            <input type="text" name="phoneNumber"
                                   className="form-control" placeholder="Phone Number"
                                   value={this.state.phoneNumber} onChange={this.handleInputChange} required/>
                        </div>
                        <div className="form-item">
                            <input type="text" name="address"
                                   className="form-control" placeholder="Address"
                                   value={this.state.address} onChange={this.handleInputChange} required/>
                        </div>
                        <div className="form-item">
                            <input type="text" name="website"
                                   className="form-control" placeholder="Website"
                                   value={this.state.website} onChange={this.handleInputChange} required/>
                        </div>
                        <div className="form-item">
                            <input type="text" name="happyHour"
                                   className="form-control" placeholder="Hour for Happy Hour"
                                   value={this.state.happyHour} onChange={this.handleInputChange} required/>
                        </div>
                        <div className="form-item">
                            <input type="text" name="drinkMenu"
                                   className="form-control" placeholder="Drink Menu"
                                   value={this.state.drinkMenu} onChange={this.handleInputChange} required/>
                        </div>
                        <div className="form-item">
                            <input type="text" name="foodMenu"
                                   className="form-control" placeholder="Food Menu"
                                   value={this.state.foodMenu} onChange={this.handleInputChange} required/>
                        </div>
                        <div className="form-item">
                            <input type="text" name="latitude"
                                   className="form-control" placeholder="Latitude"
                                   value={this.state.latitude} onChange={this.handleInputChange} required/>
                        </div>
                        <div className="form-item">
                            <input type="text" name="longitude"
                                   className="form-control" placeholder="Longitude"
                                   value={this.state.longitude} onChange={this.handleInputChange} required/>
                        </div>
                        <div className="form-item">
                            <select className="form-control" value={this.state.category} onChange={this.handleSelect}
                            >
                                <option value="Food">Food</option>
                                <option value="Restaurant">Wine</option>
                                <option value="Cocktails">Cocktails</option>
                                <option value="Beer">Beer</option>
                            </select>
                        </div>
                        <div className="form-item">
                            <input type="text" name="avatar_url"
                                   className="form-control" placeholder="Avatar URL"
                                   value={this.state.avatar_url} onChange={this.handleInputChange}/>
                        </div>
                        <div className="form-item">
                            <button type="submit" className="btn btn-block btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default EditPlace
