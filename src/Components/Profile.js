import React from 'react'
import ProfileFeed from './ProfileFeed'
import {BsPerson} from 'react-icons/bs';

export default class Profile extends React.Component{
   
    state={
        pictures:[],
        follower:[],
        following:[]
    }

    componentDidMount(){
      this.fetchProfile()
      }

      fetchProfile=()=>{
        const token = localStorage.getItem("token")
        if(token){
          fetch(`http://localhost:3000/profile`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(resp => resp.json())
          .then(data => {
            this.setState({pictures:data.posts, follower:data.followers, following:data.followees})
            // console.log(data)
          })
        }
      }

      handleDeletePic=(e)=>{
        let id =  e.currentTarget.id
    
        fetch(`http://localhost:3000/pictures/${id}`, {
                 method: 'DELETE'
          })
          .then(()=>{
            const modal = document.getElementById("myModal");
            modal.style.display = "none";

            const token = localStorage.getItem("token")
            if(token){
              fetch(`http://localhost:3000/profile`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              })
              .then(resp => resp.json())
              .then(data => {
                this.setState({pictures:data.posts})
                // console.log(data.posts)
              })
              .then(()=>{
                this.state.pictures.map((picture)=>{ return <ProfileFeed key={picture.id} username={this.props.user.username} pictures={picture.attachment_url} id={picture.id} routerProps={this.props.routerProps} handleDeletePic={this.handleDeletePic} />})
              })
            }
          })
      }
     
       handleClick=(e)=>{
          this.props.routerProps.history.push('/edit')
        }

    render(){
      
        return(
            <div className='profileContainer'>
                <div className='bioSection'>
       <ul className='username'> <li><h1>{this.props.user.username}</h1></li> <li><button onClick={this.handleClick} className='editButton'>Edit Profile</button></li></ul>


            <ul className='stats'>
             <li><b>{this.state.pictures.length}</b> posts</li>
             <li><b>{this.state.follower.length}</b> followers</li> 
             <li><b>{this.state.following.length}</b> following</li>
            </ul>
            <div className='name'> {this.props.user.firstname} {this.props.user.lastname}</div>
            <div className='bio'>
              {this.props.user.bio}
              </div>

         </div>
            <div className='hr'></div><br/>
            <div className='pictureContainer'>
               {this.state.pictures.length === 0 ? <img src={require('../img/NoPosts.png')}/>:
            this.state.pictures.map((picture)=>{ return <ProfileFeed key={picture.id} username={this.props.user.username} pictures={picture.attachment_url} id={picture.id} routerProps={this.props.routerProps} handleDeletePic={this.handleDeletePic} currentUser={this.props.currentUser} />})
            }
            </div>
             </div>
        )
    }
}