import React from 'react'
import { ApiHost } from '../constants'
import {FaComment} from 'react-icons/fa';
import {IoIosHeart} from 'react-icons/io';

export default class ProfileFeed extends React.Component{

    render(){
        return(
            <span className='imagecontainer'>             
       <img className='feedImg' src={`${ApiHost}${this.props.pictures}`} />
       <div className="middle">
        <ul className="text"><li><IoIosHeart size={25}/> <span className='number'>50</span></li> <li><FaComment size={25}/><span className='number'> 10 </span></li></ul>
        </div>
        </span>  
      )
    }
}