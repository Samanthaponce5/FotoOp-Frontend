import React from 'react'
import { ApiHost } from '../constants'
import {FaRegComment} from 'react-icons/fa';
import {IoIosHeart} from 'react-icons/io';
import {IoIosHeartEmpty} from 'react-icons/io';

export default class Home extends React.Component{

 
    state = {
        pending:[],
      pictures: [],
      number_columns: 4,
      loading: true,
      user_id:'',
      like:false,
      user:[]
    }
  
  
  componentDidMount() {
    this.loadPictures()
    this.fetchUser()
  }
  
  loadPictures=()=> {
    fetch(`${ApiHost}/pictures.json`)
      .then((response) => response.json())
      .then((pictures) =>
    //   console.log(pictures)
        this.setState({
          pictures: pictures,
          loading: false
        })
  
      )

      
  }

  fetchUser=(id)=>{
    fetch(`${ApiHost}/users`)
    .then((resp)=>resp.json())
    .then((data)=> this.setState({user:data}))

   
  }

  
  handleLike=(e)=>{
    //give each li an id of the picture
    // and do and if statement if the 
    //li == the id like only that one heart
       this.setState({like:!this.state.like})
     }
  
  
  getUser=(pic)=>{
     return this.state.user.map((u)=>{
          if(u.id === pic.user_id){
              return <span onClick={()=>this.props.visitUserProfile(u.id)} id={u.id}>{u.username}</span> 
          }
      })
  }
  
//   pictureRows() {
//     let rows = []
//     let row = []
//     this.state.pictures.forEach((picture) => {
//       row.push(picture)
//       if (row.length === this.state.number_columns) {
//         rows.push(row)
//         row = []
//       }
//     })
//     if (row.length > 0) {
//       rows.push(row)
//     }
//     return rows
//   }


    render(){
        return(
            <>
             <div>
          {this.state.pictures.map((picture) =>
            <div key={picture.id} className='homeimgdiv'>
                <div className='tophomeimg'><h3 className='names'  > {this.getUser(picture)}</h3></div>
              <img className='homefeedImg' data-id={picture.id} src={`${ApiHost}${picture.attachment_url}`} />
              <div className='bottomhomeimg'>
              <ul className='likesandcomments'>
        {this.state.like ? <li style={{color: 'red'}} onClick={this.handleLike}><IoIosHeart size={30}/></li> : <li  onClick={this.handleLike} ><IoIosHeartEmpty size={30}/> </li> }<li><FaRegComment size={25}/> </li></ul>
        <div className='likers'>Liked by 49 others  </div>

        <div className='homecenterComment'>Super long comment to test the scrollability Lorem ipsum dolor sit amet,
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
             t aliquip ex ea commodo consequat. Duis aute irure
             dolor in reprehenderit in voluptate velit esse 
              </div> 

            <div className='homedate'> MAY 30</div>
                  <input className='homeimginput' type='text' placeholder='         Add a comment...'/>
              </div>
            </div>
          )}
        </div>
      
            </>
        )
    }
}