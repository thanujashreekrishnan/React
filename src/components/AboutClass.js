import React from 'react';

class AboutClass extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            count:0
        }
        
    }
    componentDidMount()
    {
        console.log("componentDidMount() - AboutClass=----api calls done here");
    }
    render(){
        return (
            <div>
                <div className = "about-class-card">
                    <h1>Name - {this.props.name}</h1>
                    <h3>Location - {this.props.location}</h3>
                    <button onClick ={()=> {
                        this.setState({
                            count: this.state.count +1
                        })
                    }}
                    >Count - {this.state.count}</button>

                </div>
                <h1>About Us - Class Component</h1>
                <p>This is a class component in React.</p>
            </div>
        )
}
}

export default AboutClass;

/*
1] we can import {Component} from react and extend the class with Component instead of React.Component, this class component is used ion older react
2] a class componet will have a reneder method which will return the JSX
3] we take props as an argument in the constructor and pass it to super(props) to access the props in the class component
4]  we use super(props) to call the constructor of the parent class (React.Component) and pass the props to it. This is necessary to initialize the component with the props passed to it.
5] we can access the props in the class component using this.props
6]  when we have nested class components we come to a process of react life cycle.
7] in react life cycle we have 3 phases - Mounting, Updating and Unmounting. Each phase has its own methods which we can use to perform certain actions at specific points in the component's life cycle.
8] life cycle - >  constructor() -> render() -> componentDidMount() -> componentDidUpdate() -> componentWillUnmount()
9] these life cycle of parent and child first in parent life cycle constructor() -> render() -> then in child life cycle constructor() -> render() how much ever child the constructor and render is done then the componentdidmount() of all are bacthed and excecuted.
10] componentDidMount() is called after the component is rendered and mounted to the DOM. It is used to perform any side effects or data fetching that needs to happen after the component is rendered.
11] componentDidUpdate() is called after the component is updated and re-rendered. It is used to perform any side effects or data fetching that needs to happen after the component is updated.
12] componentWillUnmount() is called before the component is unmounted and removed from the DOM. It is used to perform any cleanup or cancel any subscriptions that were created in componentDidMount().
13] we can use these life cycle methods to perform certain actions at specific points in the component's life cycle.
14] we can also use these life cycle methods to optimize the performance of our components by preventing unnecessary re-renders or data fetching
15] state in class componet  is an object that holds the data that can change over time and affect the rendering of the component. We can define the state in the constructor and update it using this.setState() method. When the state is updated, the component re-renders with the new state values.
*/