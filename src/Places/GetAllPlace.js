import React,{Component} from 'react';
import FirebaseConfig  from "../config/FirebaseConfig";
import {Card} from "react-bootstrap";
import {Button,Modal} from "react-bootstrap";
import {useHistroy,Link, withRouter} from 'react-router-dom'

class GetAllPlace extends Component{
    constructor(props) {
        super(props);
        this.state={
            place:[]

        }
    }
    componentDidMount() {
        let bar=[];
        FirebaseConfig.database().ref('/places').once('value').then(snapshot=>{
                snapshot.forEach((child=>{
                    bar.push({
                        name: child.val().name,
                        address: child.val().address,
                        key: child.key,
                        website: child.val().website,
                        longitude: child.val().longitude,
                        latitude: child.val().latitude,
                        phoneNumber: child.val().phoneNumber,
                        foodMenu: child.val().foodMenu,
                        drinkMenu: child.val().drinkMenu,
                        happyHour: child.val().happyHour,
                        category:child.val().category,
                        avatar_url:child.val().avatar_url
                    })
                    this.setState({
                        place:bar
                    })
                }))
        })
    }

    render() {
        return(
            <div>
                <div className="row">
                    {this.state.place.map((item) =>
                        <Item key={item.key} item={item}/>
                    )}
                </div>
            </div>
        )
    }
}
class Item extends Component {
    constructor(props) {
        super(props);
        this.state={
            show:false
        }
    }

    render(){
        const { location, history } = this.props

        return(
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={this.props.item.avatar_url} />
                <Card.Body>
                    <Card.Title>{this.props.item.name}</Card.Title>
                    <Card.Text>
                        {this.props.item.address}
                    </Card.Text>
                    <Link
                        to={{
                            pathname: "/editPlace",
                            data: this.props.item // your data array of objects
                        }}
                    >Edit</Link>
                    {/*<Button onClick={this.removePlace(this.props.item.key)}>Delete</Button>*/}
                </Card.Body>
            </Card>
        )
    }


    removePlace(key) {
        FirebaseConfig.database().ref('places/').child(key).remove();
    }
}

export  default withRouter(GetAllPlace)
