import React from 'react'

export default class NavBar extends React.Component{
    render(){
        return(
            <>
            <button onClick={this.props.handleAuthClick} className="ui button">Access Authorized Route</button>
            </>
        )
    }
}