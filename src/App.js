import React from 'react';
import './Style/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignInForm from './Components/SignInForm';
import LoginForm from './Components/LoginForm'
import NavBar from './Components/NavBar'
import Feed from './Components/Feed';
import Profile from './Components/Profile';
import { createBrowserHistory } from "history"
import Landing from './Components/Landing';
import Edit from './Components/Edit';

const history = createBrowserHistory()

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

 handleLogin = (data) => {
    this.setState({user:data})
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


  logout = () => {
      localStorage.clear();
      this.setState({user:{}})
  }



 

  render(){
    // console.log(this.state.user)

    return(
     <BrowserRouter >
     
     <NavBar history={history} {...this.state} logout={this.logout}/>
     <Switch>
      <Route exact path='/' render={(props)=>(<Landing />)}/> 
      <Route exact path='/login' render={(props)=>(<LoginForm handleLogin={this.handleLogin} handleAuthClick={this.handleAuthClick} routerProps={props}/>)}/> 
      <Route exact path='/signup' render={(props)=>(<SignInForm handleLogin={this.handleLogin} handleAuthClick={this.handleAuthClick}/>)}/> 
      {this.state.user.username ?(
        <>
      <Route exact path='/post' render={(props)=>(<Feed {...this.state} />)}/> 
      <Route exact path='/edit' render={(props)=>(<Edit {...this.state}  />)}/> 
      <Route exact path='/profile' render={(props)=>(<Profile {...this.state}  routerProps={props} />)}/> </>) : (<h1 className='notfound'>Page Not Found</h1>)

  }



     </Switch>
     </BrowserRouter>
    )
  }
}



export default App;

/* <div className="App">
<Header handleFormSwitch={this.handleFormSwitch}/>
{
  this.renderForm()
}
<button onClick={this.handleAuthClick} className="ui button">Access Authorized Route</button>
</div> */
