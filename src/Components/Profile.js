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
            this.setState({pictures:data})
            // console.log(data)
          })
        }
      }

    render(){
        console.log(this.props)
        return(
            <div className='profileContainer'>
                <div >
        <h1>{this.props.user.username}</h1>
            <ul className='stats'>
            <li>50 posts</li>
           <li>215 followers</li> 
            <li>147 following</li>
            </ul>
                </div>
            <div className='hr'></div><br/>
            <div className='pictureContainer'>
            {this.state.pictures.map((picture)=>{ return <ProfileFeed key={picture.id} pictures={picture.attachment_url} />})}
            </div>
             </div>
        )
    }
}