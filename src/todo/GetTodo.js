import React, {Component} from 'react';
import LoadingIndicator from '../common/LoadingIndicator';
import Collapsible from 'react-collapsible';
import {getTodoList} from '../util/APIUtils';
import './GetToDo.css';

const HorizonalLine = (color) => (
    <hr
        style={{
            color: color,
            height: 1,
        }}
    />
);

class GetTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: [],
            title: "",
            createDate: "",
            todolists: [],
            loading: false
        };
    }

    getTodo() {
        this.setState({
            loading: true
        });
        getTodoList()
            .then(response => {
                this.setState({
                    project: response,
                    loading: false
                })


            })
    }

    componentDidMount() {
        this.getTodo();
    }


    render() {
        if (this.state.loading) {
            return <LoadingIndicator/>
        }

        return (

            <div className="row">
                {this.state.project.map((item) =>
                    <Item key={item.uniqueId} item={item}/>
                )}
            </div>
        )
    }
}

export default GetTodo;

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todolists: [],
            loading: false,
            trueStatus: null,
            statusCount: null
        };
    }

    componentDidMount() {
        this.setState({
            todolists: this.props.item.todolists,

        })

        var todoListItems = [];
        todoListItems = this.props.item
        let todoLists = []
        todoLists = todoListItems.todolists
        let trueStatus = 0;
        let statusCount = todoLists.length;
        for (var i in todoLists) {
            if (todoLists[i].status === true) {
                trueStatus += 1;
            }
        }
        todoListItems.trueCount = trueStatus
        this.setState({
            trueStatus: trueStatus,
            statusCount: statusCount
        })
    }

    render() {
        let todoLists = this.state.todolists
        let trueStatus;
        for (var i in todoLists) {
            if (todoLists[i].status === true) {
                trueStatus = +1;
            }
        }
        return (
            <div className="todo-lists">
                <div className="row">
                    <Collapsible className="todo-title" trigger={this.props.item.title}>
                        <HorizonalLine color="red"/>
                        <div className="summary-row">
                            <div className="summary-text">Summary :</div>
                            <div>{this.state.trueStatus}/{this.state.statusCount} todos completed .</div>
                        </div>
                        <div>
                            <div className="completed-todo-div">
                                <div className="completed-todo">Completed</div>
                                <div className="todo-row">
                                    <div style={{marginRight: '1%', fontWeight: '700'}}>Status</div>
                                    <div style={{marginLeft: '5%', width: '10%', fontWeight: '700'}}>Description</div>
                                    <div style={{marginLeft: '9%', width: '10%', fontWeight: '700'}}>Date</div>
                                </div>
                                {this.state.todolists.map((todolists) =>
                                    <TodoListTrue key={todolists.uniqueId} todolists={todolists}/>
                                )}
                            </div>
                            <div className="pending-todo-div">
                                <div className="pending-todo">Pending</div>
                                <div className="todo-row">
                                    <div style={{marginRight: '1%', fontWeight: '700'}}>Status</div>
                                    <div style={{marginLeft: '5%', width: '10%', fontWeight: '700'}}>Description</div>
                                    <div style={{marginLeft: '9%', width: '10%', fontWeight: '700'}}>Date</div>
                                </div>
                                {this.state.todolists.map((todolistsF) =>
                                    <TodoListFalse key={todolistsF.uniqueId} todolists={todolistsF}/>
                                )}
                            </div>

                        </div>
                    </Collapsible>
                </div>
            </div>
        );
    }
}

class TodoListTrue extends Component {
    render() {
        let status;
        status = this.props.todolists.status;
        let trueStatus;
        if (status === true) {
            trueStatus = status
        }
        return (
            <div>
                <div className="row">
                    {trueStatus ? (
                        <div className="todo-row" style={{marginBottom: '0.5%'}}>
                            <input type="checkbox" defaultChecked={trueStatus}/>
                            <div style={{marginLeft: '10%', width: '15%'}}>{this.props.todolists.description}</div>
                            <div style={{width: '15%'}}>{this.props.todolists.createdDate}</div>
                        </div>
                    ) : (
                        <div>
                        </div>
                    )}

                </div>
            </div>
        )

    }
}

class TodoListFalse extends Component {
    render() {
        let status;
        status = this.props.todolists.status;
        let falseStatus;
        if (status === false) {
            falseStatus = true
        }
        return (
            <div>
                <div className="row">
                    {falseStatus ? (
                        <div className="todo-row" style={{marginBottom: '0.5%'}}>
                            <input type="checkbox" defaultChecked={false}/>
                            <div style={{marginLeft: '10%', width: '15%'}}>{this.props.todolists.description}</div>
                            <div style={{width: '15%'}}>{this.props.todolists.createdDate}</div>
                        </div>
                        
                    ) : (
                        
                        <div>
                            
                        </div>
                    )}

                </div>
            </div>
        )

    }
}