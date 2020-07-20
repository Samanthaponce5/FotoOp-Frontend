import React from 'react'
import ProfileFeed from './ProfileFeed'

class VisitProfile  extends React.Component{
    state={
        user:[],
        userPost:[]
    }
    componentDidMount(){
        fetch(`http://localhost:3000/visit/${this.props.routerProps.match.params.id}`)
  .then((resp)=>resp.json())
  .then((data)=>{ 
    this.setState({user:data.user, userPost:data.posts })

  }
)
    }
    render(){
        // console.log(this.props.routerProps.history)
        return(
            <div className='profileContainer'>
                <div className='bioSection'>
       <ul className='username'> <li><h1>{this.state.user.username}</h1></li> <li><button onClick={this.handleClick} className='editButton'>Edit Profile</button></li></ul>


            <ul className='stats'>
             <li><b>{this.state.userPost.length}</b> posts</li>
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
            {this.state.userPost.length === 0 ? <img src={require('../img/NoPosts.png')}/>:
            this.state.userPost.map((picture)=>{ return <ProfileFeed key={picture.id} username={this.state.user.username} pictures={picture.attachment_url} id={picture.id} routerProps={this.props.routerProps} handleDeletePic={this.handleDeletePic} />})
            }
            </div>
             </div>
        )
    }
}

export default VisitProfile