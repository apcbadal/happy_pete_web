import React, { Component } from "react";
import FirebaseConfig from "../config/FirebaseConfig";
import { ACCESS_TOKEN, CURRENT_USER } from "../constants";
import Alert from "react-s-alert";
import './UploadPlace.css'

class UploadPlace extends Component {

    constructor(props) {
        super(props);
        this.state = {
           swipeImageURIs:[{swipeImageURI:''}], category: "", name: "", phoneNumber: "", address: "", website: "", happyHour: "", drinkMenu: [{ menu: "", price: "" }], foodMenu: [{ menu: "", price: "" }], latitude: '', longitude: '', avatar_url: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSwipeImageChange=this.handleSwipeImageChange.bind(this)
        this.removeSwipeImage=this.removeSwipeImage.bind(this)
        // this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSelect(event) {
        this.setState({
            category: event.target.value
        })

    }
    handleChange(i, e) {
        const { name, value } = e.target;
        let drinkMenu = [...this.state.drinkMenu];
        drinkMenu[i] = { ...drinkMenu[i], [name]: value };
        if (e.target.checked) {
            const { name, checked } = e.target;
            drinkMenu[i] = { ...drinkMenu[i], [name]: checked }
        }
        this.setState({ drinkMenu });
    }
    handleFoodChange(i, e) {
        const { name, value } = e.target;
        let foodMenu = [...this.state.foodMenu];
        foodMenu[i] = { ...foodMenu[i], [name]: value };
        if (e.target.checked) {
            const { name, checked } = e.target;
            foodMenu[i] = { ...foodMenu[i], [name]: checked }
        }
        this.setState({ foodMenu });
    }
    handleSwipeImageChange(i, e) {
        const { name, value } = e.target;
        let swipeImageURIs = [...this.state.swipeImageURIs];
        swipeImageURIs[i] = { ...swipeImageURIs[i], [name]: value };
        if (e.target.checked) {
            const { name, checked } = e.target;
            swipeImageURIs[i] = { ...swipeImageURIs[i], [name]: checked }
        }
        this.setState({ swipeImageURIs });
    }
    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: inputValue
        });
    }
    handleSubmit(event) {
        if (this.state.category === undefined || this.state.category === null || this.state.category === "") {
            Alert.error("Please select category.")
        }
        event.preventDefault()
        FirebaseConfig.database()
            .ref('/places/')
            .push({
                name: this.state.name,
                phoneNumber: this.state.phoneNumber,
                website: this.state.website,
                longitude: parseFloat(this.state.longitude),
                latitude: parseFloat(this.state.latitude),
                address: this.state.address,
                happyHour: this.state.happyHour,
                foodMenu: this.state.foodMenu,
                drinkMenu: this.state.drinkMenu,
                category: this.state.category,
                avatar_url: this.state.avatar_url,
                swipeImageURIs: this.state.swipeImageURIs
            })
            .then(() => Alert.success("Data Saved successfully."),
                this.setState({
                    category: "", name: "", phoneNumber: "", address: "", website: "", happyHour: "", drinkMenu: [{ menu: "", price: "" }], foodMenu: [{ menu: "", price: "" }],swipeImageURIs: [{ swipeImageURI: ""}], latitude: '', longitude: '', avatar_url: ""
                }),
            );
    }

    createDrinkUI() {
        return this.state.drinkMenu.map((el, i) => (
            <div key={i} className="todo-div MenuItem form-item row">
                <input className="form-control col-lg-6" placeholder="Menu" name="menu" value={el.menu || ''} onChange={this.handleChange.bind(this, i)} />
                <input className="form-control col-lg-6" placeholder="Price" name="price" value={el.price || ''} onChange={this.handleChange.bind(this, i)} />
                <input className="btn delete-btn" type='button' value="Delete" onClick={this.removeDrinkMenu.bind(this)} />
            </div>
        ))
    }
    createFoodUI() {
        return this.state.foodMenu.map((el, i) => (
            <div key={i} className="todo-div MenuItem form-item">
                <input className="form-control" placeholder="Menu" name="menu" value={el.menu || ''} onChange={this.handleFoodChange.bind(this, i)} />
                <input className="form-control" placeholder="Price" name="price" value={el.price || ''} onChange={this.handleFoodChange.bind(this, i)} />
                <input className="btn delete-btn" type='button' value="Delete" onClick={this.removeFoodMenu.bind(this)} />

            </div>
        ))
    }
    createSwipeImageUI() {
        return this.state.swipeImageURIs.map((el, i) => (
            <div key={i} className="todo-div MenuItem form-item">
                <input className="form-control" placeholder="Image URL" name="swipeImageURI" value={el.swipeImageURI || ''} onChange={this.handleSwipeImageChange.bind(this, i)} />
                <input className="btn delete-btn" type='button' value="Delete" onClick={this.removeSwipeImage.bind(this)} />

            </div>
        ))
    }
    addClick() {
        this.setState(prevState => ({
            drinkMenu: [...prevState.drinkMenu, { menu: "", price: "" }]
        }))
    }
    addSwipeImage(){
        this.setState(prevState => ({
            swipeImageURIs: [...prevState.swipeImageURIs, { swipeImageURI: ""   }]
        }))
    }
    addFoodMenu() {
        this.setState(prevState => ({
            foodMenu: [...prevState.foodMenu, { menu: "", price: "" }]
        }))
    }
    removeDrinkMenu(i){
        let drinkMenu = [...this.state.drinkMenu];
        drinkMenu.splice(i, 1);
        this.setState({ drinkMenu});
    }
    removeFoodMenu(i){
        let foodMenu = [...this.state.foodMenu];
        foodMenu.splice(i, 1);
        this.setState({ foodMenu});
    }
    removeSwipeImage(i){
        let swipeImage = [...this.state.swipeImageURIs];
        swipeImage.splice(i, 1);
        this.setState({ swipeImage});
    }

    render() {
        return (

            <div className="uploadPlace__container">

                <div className="uploadPlace__form">

                    <h1 className="form__heading">Upload Place</h1>

                    <form onSubmit={this.handleSubmit}>

                        <div className="row">
                        <div className="form-item col-lg-6">
                            <label for="name">Name of the bar</label>
                            <input type="text" name="name"
                                className="form-control"
                                id="name" value={this.state.name} onChange={this.handleInputChange} required />
                        </div>

                        <div className="form-item col-lg-6">
                            <label for="phone">Phone number</label>
                            <input type="text" name="phoneNumber"
                                className="form-control" id="phone" value={this.state.phoneNumber} onChange={this.handleInputChange} required />
                        </div>
                        </div>

                        <div className="form-item">
                            <label for="address">Address</label>

                            <input type="text" name="address"
                                className="form-control" id="address"
                                value={this.state.address} onChange={this.handleInputChange} required />
                        </div>

                        <div className="form-item">
                            <label for="website__url">Website URL</label>

                            <input type="text" name="website"
                                className="form-control" placeholder="https://www.abc.com" id="website__url" value={this.state.website} onChange={this.handleInputChange} required />
                        </div>

                        <div className="row">
                            <div className="form-item col-lg-6" >
                                <label for="latitude">Location : Latitude</label>
                                <input type="text" name="latitude"
                                    className="form-control" placeholder="Latitude" id="latitude"
                                    value={this.state.latitude} onChange={this.handleInputChange} required />
                            </div>

                            <div className="form-item col-lg-6">
                                <label for="longitude">Longitude</label>
                                <input type="text" name="longitude"
                                    className="form-control" placeholder="Longitude" id="longitude"
                                    value={this.state.longitude} onChange={this.handleInputChange} required />
                            </div>
                        </div>

                        <div className="form-item">
                            <label for="happy__hour">Hour for Happy Hour</label>

                            <input type="text" name="happyHour" id="happy__hour"
                                className="form-control" value={this.state.happyHour} onChange={this.handleInputChange} required />
                        </div>

                        <div className="form-item">
                            <label>Drink Menu</label>
                            <div className="drinkMenuContainer">
                                {this.createDrinkUI()}
                            </div>

                        </div>

                        <div className="buttonContainer">
                        <input className="btn add-more-btn" type='button' value='Add more' onClick={this.addClick.bind(this)} />
                        </div>

                        <div className="form-item">
                            <label>Food Menu</label>
                            {this.createFoodUI()}
                        </div>
                        <div className="buttonContainer">
                        <input className="btn add-more-btn" type='button' value='Add more' onClick={this.addFoodMenu.bind(this)} />
                        </div>

                        <div className="form-item">
                            <label for="category">Category</label>

                            <select id="category" className="form-control" style={{borderWidth:"2px", borderColor:"#a5a5a5", lineHeight:2.5}} value={this.state.category} onChange={this.handleSelect}>
                                <option value="none">Select Category</option>
                                <option value="Food">Food</option>
                                <option value="Restaurant">Wine</option>
                                <option value="Cocktails">Cocktails</option>
                                <option value="Beer">Beer</option>
                            </select>
                        </div>

                        <div className="form-item">

                            <label for="avatar_url">Avatar URL</label>
                            <input type="text" name="avatar_url"
                                id="avatar_url"
                                className="form-control" placeholder="Avatar URL"
                                value={this.state.avatar_url} onChange={this.handleInputChange} />
                        </div>
                        <div className="form-item">
                            <label>Add Swipe Image URL</label>
                            {this.createSwipeImageUI()}
                        </div>
                        <div className="buttonContainer">
                            <input className="btn add-more-btn" type='button' value='Add more' onClick={this.addSwipeImage.bind(this)} />
                        </div>


                        <div className="form-item">
                            <button type="submit" className="btn btn-block save-btn" style={{marginTop:"50px"}}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default UploadPlace
