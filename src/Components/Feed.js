import React from 'react'
import Pictures from './Pictures'
import '../Style/App.css';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';

function Feed(props) {
  console.log(props.user)
  return (
    <div className="container">
      <Pictures user={props.user.id}/>
    </div>
  )
}



export default Feed;