import React from 'react'
import ProfileFeed from './ProfileFeed'

class VisitProfile  extends React.Component{
    state={
        user:[],
        userPost:[],
        follower:[],
        following:[]
    }
    componentDidMount(){
        fetch(`http://localhost:3000/visit/${this.props.routerProps.match.params.id}`)
  .then((resp)=>resp.json())
  .then((data)=>{ 
    this.setState({user:data.user, userPost:data.posts })

  }
)
    }
//go back to the scema delete unecessary follows table
    handleFollow=(e)=>{
        let id = e.target.id
        const token = localStorage.getItem("token")

        fetch(`http://localhost:3000/follow/${id}`,{
            method:'POST',
            headers:{
                "Authorization": `Bearer ${token}`,
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body:JSON.stringify({
                followee_id:id,
                follower_id:this.props.currentUser.id
            })
        })
        .then((resp)=>resp.json())
        .then((data)=>console.log(data))
        .catch((err)=>console.log(err))
    }
    render(){
        // console.log(this.props.routerProps.history)
        return(
            <div className='profileContainer'>
                <div className='bioSection'>
        <ul className='username'> <li><h1>{this.state.user.username}</h1></li> <li>{this.state.user.id === this.props.currentUser.id ? <button onClick={this.handleClick} className='editButton'>Edit</button> : <button onClick={this.handleFollow} id={this.state.user.id} className='editButton'>Follow</button>}</li></ul>


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
            this.state.userPost.map((picture)=>{ return <ProfileFeed key={picture.id} username={this.state.user.username} pictures={picture.attachment_url} id={picture.id} routerProps={this.props.routerProps} handleDeletePic={this.handleDeletePic} currentUser={this.props.currentUser} />})
            }
            </div>
             </div>
        )
    }
}

export default VisitProfile