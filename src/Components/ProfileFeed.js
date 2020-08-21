import React from 'react'
import { ApiHost } from '../constants'
import {FaComment} from 'react-icons/fa';
import {FaRegComment} from 'react-icons/fa';

import {IoIosHeart} from 'react-icons/io';
import {IoIosHeartEmpty} from 'react-icons/io';
import {BsThreeDots} from 'react-icons/bs';


export default class ProfileFeed extends React.Component{


    state={
      picture:{},
      comments:[],
      like:false
    }
  // Get the image and insert it inside the modal - use its "alt" text as a caption
 img = document.getElementById("feedImg");
   handlesimgClick=(e)=>{
     fetch(`http://localhost:3000/pictures/${e.target.id}`)
     .then((resp)=>resp.json())
     .then(data => {
      this.setState({picture:data.picture, comments:data.comments})
      // console.log(data)
      const dots = document.querySelector('.dots')
      const threedots = document.querySelector('.threedots')
      const modal = document.getElementById("myModal");

      modal.style.display = "block";
      const  modalImg = document.getElementById("img01");
      modalImg.src =  `${ApiHost}${data.picture.attachment_url}`;
      if(dots&&threedots){
         dots.id = data.id
      threedots.id = data.id
      }
   
    })
    

  }

  
  // Get the <span> element that closes the modal
 span = document.getElementsByClassName("close")[0];
  
  // When the user clicks on <span> (x), close the modal
   handlespanClick = function() { 
   const modal = document.getElementById("myModal");

    modal.style.display = "none";
  }

  handleLike=(e)=>{
 //give each li an id of the picture
 // and do and if statement if the 
 //li == the id like only that one heart
    this.setState({like:!this.state.like})
  }
getComment=()=>{
  // Li wont show up maybe do an if statement like you dod in the home?
  //it console.logs out correctly when click on image ????
  return this.state.comments.map((c)=>{return <li>{c.comment}</li>})
}

    render(){
      // Get the modal
      // console.log('comments!',this.state.comments)
     
        return(
          <>
            <span className='imagecontainer'>             
       <img className='feedImg' id={this.props.id} src={`${ApiHost}${this.props.pictures}`} onClick={this.handlesimgClick}  onMouseDown={this.handlesimgClick} alt='upload'/>
       <div className="middle">
        <ul className="text"><li><IoIosHeart size={25}/> <span className='number'>50</span></li> <li><FaComment size={25}/><span className='number'> 10 </span></li></ul>
        </div>
        </span> 

        <div id="myModal" className="modal" >
  <span onClick={this.handlespanClick} className="close">&times;</span>
  <div className='background'>
  <img src={`${ApiHost}${this.state.picture.attachment_url}`} className="modal-content" id="img01" alt='upload'/>
  <div className='comments'>
    
        <div className='tophr'><div className='usernameModal'>{this.props.username}</div>  {this.props.currentUser.username === this.props.username?<div className='threedots'  onClick={this.props.handleDeletePic}><BsThreeDots className='dots'  size={15}/></div>:null }</div>
         <div className='centerComment'>

           <ul id='co'>

        {this.state.comments.map(c=> <li id='comment' key={c.id}>{c.comment}</li>)}
           </ul>
              </div> 
          <div className='bottomhr'><ul className='likesandcomments'>
        {this.state.like ? <li style={{color: 'red'}} onClick={this.handleLike}><IoIosHeart size={30}/></li> : <li  onClick={this.handleLike} ><IoIosHeartEmpty size={30}/> </li> }<li><FaRegComment size={25}/> </li></ul>
            <div className='likers'>Liked by 49 others  </div>
            <div className='date'> MAY 30</div>
          </div>
          <input className='modalcomment' type='text' name='comment' placeholder='Add a comment...'/>
  </div>
  </div>
</div>
        </> 
      )
    }
}