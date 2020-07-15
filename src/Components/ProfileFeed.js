import React from 'react'
import { ApiHost } from '../constants'
import {FaComment} from 'react-icons/fa';
import {FaRegComment} from 'react-icons/fa';

import {IoIosHeart} from 'react-icons/io';
import {IoIosHeartEmpty} from 'react-icons/io';

export default class ProfileFeed extends React.Component{


    state={
      picture:''
    }
  // Get the image and insert it inside the modal - use its "alt" text as a caption
 img = document.getElementById("feedImg");
   handlesimgClick=(e)=>{
     console.log(e.target)
     fetch(`http://localhost:3000/pictures/${e.target.id}`)
     .then((resp)=>resp.json())
     .then(data => {
      this.setState({picture:data.attachment_url})
      // console.log(data)
    })

  }
  handlesimgClicks=(e)=>{
      const modal = document.getElementById("myModal");
   const captionText = document.getElementById("caption");
    const  modalImg = document.getElementById("img01");

    modal.style.display = "block";
    modalImg.src =  `${ApiHost}${this.state.picture}`;
    captionText.innerHTML = this.alt;
    console.log(e.target.src)
  }
  
  // Get the <span> element that closes the modal
 span = document.getElementsByClassName("close")[0];
  
  // When the user clicks on <span> (x), close the modal
   handlespanClick = function() { 
   const modal = document.getElementById("myModal");

    modal.style.display = "none";
  }
    render(){
      // Get the modal
        return(
          <>
            <span className='imagecontainer'>             
       <img className='feedImg' id={this.props.id} src={`${ApiHost}${this.props.pictures}`} onClick={this.handlesimgClicks} onMouseDown={this.handlesimgClick}/>
       <div className="middle">
        <ul className="text"><li><IoIosHeart size={25}/> <span className='number'>50</span></li> <li><FaComment size={25}/><span className='number'> 10 </span></li></ul>
        </div>
        </span> 

        <div id="myModal" className="modal" >
  <span onClick={this.handlespanClick} className="close">&times;</span>
  <div className='background'>
  <img src={`${ApiHost}${this.state.picture}`} className="modal-content" id="img01"/>
  <div className='comments'>
    
        <div className='tophr'><div className='usernameModal'>{this.props.username}</div></div>
         <div className='centerComment'>Super long comment to test the scrollability Lorem ipsum dolor sit amet,
           consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e
           t dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
             dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
             nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
              t dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
             dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
             nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              </div> 
          <div className='bottomhr'><ul className='likesandcomments'>
             <li><IoIosHeartEmpty size={30}/> </li> <li><FaRegComment size={25}/> </li></ul>
            <div className='likers'>Liked by 49 others  </div>
            <div className='date'> MAY 30</div>
          </div>
          <input className='modalcomment' type='text' name='comment' placeholder='Add a comment...'/>
  </div>
  </div>
  <div id="caption"></div>
</div>
        </> 
      )
    }
}