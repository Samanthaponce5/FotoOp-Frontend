import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header'
import SignInForm from './SignInForm';
import LoginForm from './LoginForm'
import NavBar from './NavBar'


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



  render(){
    console.log(this.state.user)

    return(
     <BrowserRouter>
     <NavBar handleAuthClick={this.handleAuthClick}/>
     <Switch>

      <Route exact path='/' render={(props)=>(<LoginForm handleLogin={this.handleLogin}/>)}/> 
      <Route exact path='/signup' render={(props)=>(<SignInForm handleLogin={this.handleLogin}/>)}/> 



     </Switch>
     </BrowserRouter>
    )
  }
}



export default App;

{/* <div className="App">
<Header handleFormSwitch={this.handleFormSwitch}/>
{
  this.renderForm()
}
<button onClick={this.handleAuthClick} className="ui button">Access Authorized Route</button>
</div> */}
