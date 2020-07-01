import React from 'react';
import './App.css';
import Header from './Header'
import SignInForm from './SignInForm';
import LoginForm from './LoginForm'


 class App extends React.Component{

  state = {
    user:{},
    form:''
  }

  componentDidMount(){
    const token = localStorage.getItem("token")
    if(token){
      fetch(`http://localhost:3000/auto_login`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(resp => resp.json())
      .then(data => {
        this.setState({user:data})
        // console.log(data)
      })
    }
  }

 handleLogin = (user) => {
    this.setState({user})
  }

 handleFormSwitch = (input) => {
    this.setState({form:input})
  }

 handleAuthClick = () => {
    const token = localStorage.getItem("token")
    fetch(`http://localhost:3000/user_is_authed`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
  }



 renderForm = () => {
    switch(this.state.form){
      case "login":
        return <LoginForm handleLogin={this.handleLogin}/>
        break;
      default:
        return <SignInForm handleLogin={this.handleLogin}/>
    }
  }

  render(){
    console.log(this.state.user)

    return(
      <div className="App">
      <Header handleFormSwitch={this.handleFormSwitch}/>
      {
        this.renderForm()
      }
      <button onClick={this.handleAuthClick} className="ui button">Access Authorized Route</button>
  </div>

    )
  }
}



export default App;

