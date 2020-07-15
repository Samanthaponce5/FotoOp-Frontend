import React from 'react'
import { DirectUpload } from 'activestorage';


export default class Edit extends React.Component{
 

    constructor() {
        super()
        this.state = {
            name: '',
            username: '',
            bio: '',
            email: '',
            image: {}
        }
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


    handleSubmit = (event) => {
        event.preventDefault()
        let product = {
            name: this.state.name,
            username: this.state.username,
            bio: this.state.bio,
            email: this.state.email
        }

        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(resp => resp.json())
            .then(data => this.uploadFile(this.state.image, data))
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
      return (
        <form className='productForm' onSubmit={this.handleSubmit}>

                
                <input className='name' placeholder='Name' type='text' name='name' value={this.state.name} onChange={this.handleOnChange} /><br />
         
                <input className='username' type='text' placeholder='Username' name='username' value={this.state.username} onChange={this.handleOnChange} /><br />
            
                <input className='bio' type='text' placeholder='Bio' name='bio' value={this.state.bio} onChange={this.handleOnChange} /><br />
              
                <input className='email' type='text' placeholder='Email' name='email' value={this.state.email} onChange={this.handleOnChange} /><br />
             
                <input className='filebtn' type='file' name='image' onChange={this.handleOnChange} /><br />
                <input className='filesbm' type='submit' value='Profile Pic' />


            </form>
        )
    }
}