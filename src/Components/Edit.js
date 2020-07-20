import React from 'react'
import { DirectUpload } from 'activestorage';


export default class Edit extends React.Component{
 

    state = {
            firstname: this.props.currentUser.firstname,
            lastname:this.props.currentUser.lastname,
            username: this.props.currentUser.username,
            bio: this.props.currentUser.bio,
            password:this.props.currentUser.password,
            email: this.props.currentUser.email,
            image: {}
        
    }

    handleOnChange = (event) => {
        if (event.target.name === 'image') {
            this.setState({
                [event.target.name]: event.target.files[0]
            })
        } else {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
    }


    // handleSubmit = (event) => {
    //     event.preventDefault()
    //     let product = {
    //         name: this.state.name,
    //         username: this.state.username,
    //         bio: this.state.bio,
    //         email: this.state.email
    //     }

    //     fetch('http://localhost:3000/users', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         },
    //         body: JSON.stringify(product)
    //     })
    //         .then(resp => resp.json())
    //         .then(data => this.uploadFile(this.state.image, data))
    // }

    handleSubmit=(e)=>{
        e.preventDefault()
            let user = {
                firstname: this.state.firstname,
                lastname:this.state.lastname,
                username: this.state.username,
                bio: this.state.bio,
                password:this.state.password,
                email: this.state.email
            }
    
            fetch(`http://localhost:3000/users/${this.props.currentUser.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then(resp => resp.json())
                .then(data => console.log(data))
                this.props.profileFetch()
    }


    uploadFile = (file, user) => {
        const upload = new DirectUpload(file, 'http://localhost:3000/rails/active_storage/direct_uploads')
        upload.create((error, blob) => {
            if (error) {
                console.log(error)
            } else {
                fetch(`http://localhost:3000/users/${user.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ image: blob.signed_id })
                })
                    .then(resp => resp.json())
                    .then(data => this.props.updateCurrentProduct(data))
            }
        })
    }
    
    render(){
        console.log(this.props.currentUser)
      return (
        <form className='productForm' onSubmit={this.handleSubmit}>

                
                <input className='firstname' placeholder='First Name' type='text' name='firstname' value={this.state.firstname} onChange={this.handleOnChange} /><br />
                <input className='lastname' placeholder='Last Name' type='text' name='lastname' value={this.state.lastname} onChange={this.handleOnChange} /><br />
                <input className='email' type='text' placeholder='Email' name='email' value={this.state.email} onChange={this.handleOnChange} /><br />
                <input className='bio' type='text' placeholder='Bio' name='bio' value={this.state.bio} onChange={this.handleOnChange} /><br />

                <input className='username' type='text' placeholder='Username' name='username' value={this.state.username} onChange={this.handleOnChange} /><br />
                <input className='password' placeholder='Password' type='text' name='password' value={this.state.password} onChange={this.handleOnChange} /><br />

              
             
                <input className='filebtn' type='file' name='image' onChange={this.handleOnChange} /><br />
                <input className='filesbm' type='submit' value='Profile Pic' />
                <button type='submit'>Submit</button>

            </form>
        )
    }
}