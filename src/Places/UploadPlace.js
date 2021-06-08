import React, {Component} from "react";
import FirebaseConfig from "../config/FirebaseConfig";
import {ACCESS_TOKEN, CURRENT_USER} from "../constants";
import Alert from "react-s-alert";
import '../user/login/Login.css'

class UploadPlace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category:"",  name:"",phoneNumber:"",address:"",website:"",happyHour:"",drinkMenu:[{menu:"",price:""}],foodMenu:[{menu:"",price:""}],latitude:'',longitude:'',avatar_url:""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
       // this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSelect(event){
        this.setState({
            category:event.target.value
        })

    }
    handleChange(i, e) {
        const { name, value } = e.target;
        let drinkMenu = [...this.state.drinkMenu];
        drinkMenu[i] = {...drinkMenu[i], [name]: value};
        if(e.target.checked){
            const { name, checked} = e.target;
            drinkMenu[i]={...drinkMenu[i],[name]:checked}
        }
        this.setState({ drinkMenu });
    }
    handleFoodChange(i,e){
        const { name, value } = e.target;
        let foodMenu = [...this.state.foodMenu];
        foodMenu[i] = {...foodMenu[i], [name]: value};
        if(e.target.checked){
            const { name, checked} = e.target;
            foodMenu[i]={...foodMenu[i],[name]:checked}
        }
        this.setState({ foodMenu });
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
        if(this.state.category===undefined||this.state.category===null||this.state.category===""){
            Alert.error("Please select category.")
        }
        event.preventDefault()
        FirebaseConfig.database()
            .ref('/places/')
            .push({
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
                    category:"",  name:"",phoneNumber:"",address:"",website:"",happyHour:"",drinkMenu:[{menu:"",price:""}],foodMenu:[{menu:"",price:""}],latitude:'',longitude:'',avatar_url:""
                }),
            );
    }

    createDrinkUI(){
        return this.state.drinkMenu.map((el, i) => (
            <div key={i} className="form-control todo-div">
                <input className="form-inline" placeholder="Menu" name="menu" value={el.menu ||''} onChange={this.handleChange.bind(this, i)} />
                <input  placeholder="Price" name="price" value={el.price ||''} onChange={this.handleChange.bind(this, i)} />
            </div>
        ))
    }
    createFoodUI(){
        return this.state.foodMenu.map((el, i) => (
            <div key={i} className="form-control todo-div">
                <input className="form-inline" placeholder="Menu" name="menu" value={el.menu ||''} onChange={this.handleFoodChange.bind(this, i)} />
                <input  placeholder="Price" name="price" value={el.price ||''} onChange={this.handleFoodChange.bind(this, i)} />
            </div>
        ))
    }
    addClick(){
        this.setState(prevState => ({
            drinkMenu: [...prevState.drinkMenu, { menu: "", price: "" }]
        }))
    }
    addFoodMenu(){
        this.setState(prevState => ({
            foodMenu: [...prevState.foodMenu, { menu: "", price: "" }]
        }))
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
                    <label>Drink Menu</label>
                    {this.createDrinkUI()}

                </div>
                <input className="add-more-btn" type='button' value='Add more' onClick={this.addClick.bind(this)}/>
                <div className="form-item">
                    <label>Food Menu</label>
                    {this.createFoodUI()}
                </div>
                <input className="add-more-btn" type='button' value='Add more' onClick={this.addFoodMenu.bind(this)}/>
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
                        <option value="none">Select Category</option>
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

export default UploadPlace
