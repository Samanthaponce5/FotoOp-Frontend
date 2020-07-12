import React from 'react'
import { ApiHost } from '../constants'

export default class ProfileFeed extends React.Component{

    render(){
        return(
            <>
        <img className='feedImg' src={`${ApiHost}${this.props.pictures}`} />
      </>
        )
    }
}