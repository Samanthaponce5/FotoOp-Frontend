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
import HomePage from './Components/HomePage';

const history = createBrowserHistory()

 class App extends React.Component{
  state = {
    user:{},
    form:'',
    users:[]
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

  // allUsers=()=>{
  //   fetch('http://localhost:3000/users')
  //   .then((resp)=>resp.json())
  //   .then((data)=>this.setState({users:data}))
  // }

  // trying to get the list pf users but doesnt show up on the page
  handleUserSearch=(e)=>{
          const searchText = e.target.value;
          const inputval = e.target.value
          let matches;
    if(e.target.value != 0){
      document.querySelector('.filterSearch').style.opacity = '1'
    }else{
      document.querySelector('.filterSearch').style.opacity = '0'
    }
    fetch('http://localhost:3000/users')
    .then((resp)=>resp.json())
    .then((data)=>{
      // return data.map((user)=><ol className="usernameSearch"><li >{user.username}</li></ol>)
      if (inputval.length != 0) {
        					matches = data.filter((users) => {
        						const regex = new RegExp(`^${searchText}`, 'gi');
        
        						return users.username.match(regex) || users.username.match(regex); //change later to search by title or album
        					});
        
        					if (matches.length > 0) {
        						this.setState({users:matches}) 
        					}
        				
        				} else {
                  matches = [];
                  this.setState({users:matches})
        				}
        			
    })



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
     
     <NavBar history={history} {...this.state} logout={this.logout} handleUserSearch={this.handleUserSearch}/>
     <Switch>
      <Route exact path='/' render={(props)=>(<Landing />)}/> 
      <Route exact path='/login' render={(props)=>(<LoginForm handleLogin={this.handleLogin} handleAuthClick={this.handleAuthClick} routerProps={props}/>)}/> 
      <Route exact path='/signup' render={(props)=>(<SignInForm handleLogin={this.handleLogin} handleAuthClick={this.handleAuthClick}/>)}/> 
      {/* {this.state.user.username ?(
        <> */}
      <Route exact path='/home' render={(props)=>(<HomePage />)}/> 
      <Route exact path='/post' render={(props)=>(<Feed {...this.state} />)}/> 
      <Route exact path='/edit' render={(props)=>(<Edit {...this.state}  />)}/> 
      <Route exact path='/profile' render={(props)=>(<Profile {...this.state}  routerProps={props} />)}/>

  



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
