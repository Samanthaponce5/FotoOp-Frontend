import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from "@fortawesome/free-solid-svg-icons";

import '../Style/App.css';


export default class NavBar extends React.Component{
    render(){
        return(
            <>
            <nav >

				<input type="checkbox" id='check'/>
				<label htmlFor='check' className='checkbtn'>
				<FontAwesomeIcon icon={faBars} />
				</label>
				<label className="logo">InstaReact</label>

					<ul className='nav-links'>
						<li className="homeLink">
							<Link to="/">About</Link>
						</li>

						<li className="sellContentLink">
							<Link to="/home">Home</Link>
						</li>
					
						<li className='cartlink'>
      
							<Link to="/cart">Cart</Link>
						</li>
		
						
							<li className='loglink'>
								<Link to="/login">Login</Link>
								
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