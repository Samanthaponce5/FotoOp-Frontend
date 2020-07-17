import React from 'react'
import ProfileFeed from './ProfileFeed'
import {BsPerson} from 'react-icons/bs';

export default class Profile extends React.Component{
   
    state={
        pictures:[]
    }

    componentDidMount(){
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
        }
      }
     
       handleClick=(e)=>{
          this.props.routerProps.history.push('/edit')
        }

    render(){
        // console.log(this.props.routerProps.history)
        return(
            <div className='profileContainer'>
                <div className='bioSection'>
       <ul className='username'> <li><h1>{this.props.user.username}</h1></li> <li><button onClick={this.handleClick} className='editButton'>Edit Profile</button></li></ul>


            <ul className='stats'>
             <li><b>50</b> posts</li>
             <li><b>215</b> followers</li> 
             <li><b>147</b> following</li>
            </ul>
            <div className='name'> Samantha Ponce</div>
            <div className='bio'>
              ✝️💙 God's timing is always perfect💙✝️<br/>
              👩‍💻Software Engineer<br/>
              📷🌎✈🐶🐶</div>

         </div>
            <div className='hr'></div><br/>
            <div className='pictureContainer'>
               
            {this.state.pictures.map((picture)=>{ return <ProfileFeed key={picture.id} username={this.props.user.username} pictures={picture.attachment_url} id={picture.id} routerProps={this.props.routerProps} />})}
            
            </div>
             </div>
        )
    }
}