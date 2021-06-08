import React, { Component } from 'react';
import '../user/login/Login.css'
import './addTodo.css'
import { addTodo } from '../util/APIUtils';
import Alert from 'react-s-alert';

class AddTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title:"",
            todolists: [{status:false, description: ""}]
        };
        this.handleChangeTitle =this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleTitle(event){
          this.setState({
              title:event.target.value
          })
      }

      addClick(){
        this.setState(prevState => ({
            todolists: [...prevState.todolists, { status: "", description: "" }]
        }))
      }

      createUI(){
         return this.state.todolists.map((el, i) => (
           <div key={i} className="form-control todo-div">
              <input className="form-inline" type="checkbox" name="status" value={el.status ||''} onChange={this.handleChange.bind(this, i)} />
              <input  placeholder="Description" name="description" value={el.description ||''} onChange={this.handleChange.bind(this, i)} />
              <input type='button' className="remove-btn" value='Remove' onClick={this.removeClick.bind(this, i)}/>
           </div>
         ))
      }


      handleChange(i, e) {
         const { name, value } = e.target;
         let todolists = [...this.state.todolists];
         todolists[i] = {...todolists[i], [name]: value};
         if(e.target.checked){
            const { name, checked} = e.target;
            todolists[i]={...todolists[i],[name]:checked}
        }
         this.setState({ todolists });
      }

      removeClick(i){
         let todolists = [...this.state.todolists];
         todolists.splice(i, 1);
         this.setState({ todolists });
      }

      handleSubmit(event) {
          const todoRequest=Object.assign({},this.state)
          addTodo(todoRequest)
          .then(response=>{
            Alert.success("Data Saved Successfully !");
            this.setState({
                title:"",
            todolists: [{status:false, description: ""}]
            })
          })

        event.preventDefault();
      }

      render() {
        return (
          <form onSubmit={this.handleSubmit}>
              <div  className=" title-div">
               <input className="form-control" placeholder="Title" name="description"onChange={this.handleTitle.bind(this)} />
            </div>
              {this.createUI()}
              <input className="add-more-btn" type='button' value='Add more' onClick={this.addClick.bind(this)}/>
              <input className="submit-btn" type="submit" value="Submit" />
          </form>
        );
      }
    }
export default AddTodo;
