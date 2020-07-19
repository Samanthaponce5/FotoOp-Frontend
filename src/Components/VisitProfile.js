import React from 'react'

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
        
        console.log(this.state.user)
        return(
            <h3 className='notfound'>{this.state.user.username}</h3>
        )
    }
}

export default VisitProfile