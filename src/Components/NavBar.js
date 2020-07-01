import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from "@fortawesome/free-solid-svg-icons";

import '../Style/App.css';


export default class NavBar extends React.Component{
	handleClick=(e)=>{
		if (e.target.className === 'link'){
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
    render(){
        return(
            <>
            <nav >

				<input type="checkbox" id='check' onClick={this.handleCheck}/>
				<label htmlFor='check' className='checkbtn'>
				<FontAwesomeIcon icon={faBars} />
				</label>
				<label className="logo">InstaReact</label>

					<ul className='nav-links' >
						<li>
							<Link className="link" onClick={this.handleClick} to="/">About</Link>
						</li>
 
						<li>
							<Link className="link" onClick={this.handleClick} to="/home">Home</Link>
						</li>
					
						<li>
      
							<Link className="link" onClick={this.handleClick} to="/cart">Cart</Link>
						</li>
		
						
							<li>
								<Link className="link" onClick={this.handleClick} to="/login">Login</Link>
								
							</li>
						
					</ul>
					<div className='burger'>
						<div className='line1'></div>
						<div className='line2'></div>
						<div className='line3'></div>
					</div>
				</nav>

            </>
        )
    }
}