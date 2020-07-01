import React from 'react';
import './Style/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignInForm from './Components/SignInForm';
import LoginForm from './Components/LoginForm'
import NavBar from './Components/NavBar'


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
     <NavBar />
     <Switch>

      <Route exact path='/login' render={(props)=>(<LoginForm handleLogin={this.handleLogin} handleAuthClick={this.handleAuthClick}/>)}/> 
      <Route exact path='/signup' render={(props)=>(<SignInForm handleLogin={this.handleLogin} handleAuthClick={this.handleAuthClick}/>)}/> 



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
