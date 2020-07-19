import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from "@fortawesome/free-solid-svg-icons";
import {RiHome2Line} from 'react-icons/ri';
import {AiOutlineLogin} from 'react-icons/ai';
import {AiOutlineUser} from 'react-icons/ai';
import {AiOutlineLogout} from 'react-icons/ai';
import {BsUpload} from 'react-icons/bs';


import '../Style/App.css';


export default class NavBar extends React.Component{

	state={
		color:'black'
	}


	

	handleClick=(e)=>{
		if (e.target.className === "link home" || "link upload" || "link logout" || "link profile" || "link login"){
			document.querySelector('.nav-links').style.left = '-100%'
			document.getElementById('check').checked = false

		}
	}

	handleCheck=(e)=>{
		if(e.target.checked === true){
			document.querySelector('.nav-links').style.left = '0'
		}else{
			document.querySelector('.nav-links').style.left = '-100%'

		}
	}

	handleLogout = () => {
		this.props.logout();
		this.props.history.push('/')
		// console.log('logged out')
	  }

	  handleSearch=()=>{
		  if(this.props.users.length === 0){
			return<ol className="usernameSearch"><li >No User Found</li></ol>
		  }else{
		return this.props.users.map((user)=><ol className="usernameSearch"><li onMouseDown={()=>this.props.visitUserProfile(user.id)} key={user.id} >{user.username}</li></ol>)
		  }
	  }

    render(){
		console.log(this.props.users)
        return(
            <>
            <nav >
					
				<input type="checkbox" id='check' onClick={this.handleCheck}/>
				<label htmlFor='check' className='checkbtn'>
				<FontAwesomeIcon icon={faBars} />
				</label>
				<label className="logo">InstaReact</label>

					<ul className='nav-links' >
					
						{this.props.user.username ? (
							<>
							<li ><div className='div'><input  className='usersearch' placeholder='Search' onChange={this.props.handleUserSearch} /><div className='filterSearch'>{this.handleSearch()}</div> </div></li>
						<li>
							<Link style={{color: this.state.color}} className="link home" onClick={this.handleClick} to="/home"><RiHome2Line  size={30}/></Link>
						</li>
						
						<li>
							<Link style={{color: this.state.color}} className="link upload" onClick={this.handleClick} to="/post"><BsUpload size={30}/></Link>
						</li>
 
						<li>
							<Link style={{color: this.state.color}} className="link profile" onClick={this.handleClick} to="/profile"><AiOutlineUser size={30}/></Link>
						</li>
						<li ><Link style={{color: this.state.color}} className="link logout" onClick={this.handleLogout} to="/"><AiOutlineLogout size={30}/></Link></li> </>):(

						
						<li><Link style={{color: this.state.color}} className="link login" onClick={this.handleClick} to="/login"><AiOutlineLogin size={30}/></Link></li>
						)}
					</ul>
					<div className='burger'>
						<div className='line1'></div>
						<div className='line2'></div>
						<div className='line3'></div>
					</div>
				</nav>
			<br/>

			
            </>
        )
    }
}