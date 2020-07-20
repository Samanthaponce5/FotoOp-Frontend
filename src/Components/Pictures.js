import React from 'react'
import { ApiHost } from '../constants'


class Pictures extends React.Component {
  

  state = {
      pending:[],
    pictures: [],
    number_columns: 4,
    loading: true,
    user_id:''

  }


componentDidMount() {
  this.loadPictures()
}

loadPictures=()=> {
  fetch(`${ApiHost}/pictures.json`)
    .then((response) => response.json())
    .then((pictures) =>
    
      this.setState({
        pictures: pictures,
        loading: false
      })

    )
}





pictureRows() {
  let rows = []
  let row = []
  this.state.pictures.forEach((picture) => {
    row.push(picture)
    if (row.length === this.state.number_columns) {
      rows.push(row)
      row = []
    }
  })
  if (row.length > 0) {
    rows.push(row)
  }
  return rows
}


render() {
  let body;
 let handleFileInputChange=(event)=> {
       body = new FormData()
      body.append('picture[attachment]', event.target.files[0] )
  
    }
    let handleSubmit =(e)=>{
      e.preventDefault()
      const token = localStorage.getItem("token")
      fetch(
          `${ApiHost}/pictures.json`,
          {
            method: 'POST',
            headers: {
              "Authorization": `Bearer ${token}`
            },
            body: body

          }
        )
        .then((response) => response.json())
        .then((picture) => {
          let pictures = this.state.pictures
          pictures.unshift(picture)
          this.setState({
            pictures: pictures
          })
        })
        document.querySelector('.form-control-file').value =''
    }

  if (this.state.loading) return null

  return(
    <div className="pictures_container">

      <div className="row">
        <div className="col">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="file_upload">Upload Picture</label>
              <input type="file" className="form-control-file" id="file_upload" onChange={handleFileInputChange} />
              <button type='submit'>Submit</button>
            </div>
          </form>
        </div>
      </div>

      {/* {this.pictureRows().map((pictureRow, rowIndex) =>
        <div key={`picture_row_${rowIndex}`} className="row">
          {pictureRow.map((picture, columnIndex) =>
            <div key={`picture_row_${rowIndex}_col_${columnIndex}`} className="col-sm-3">
              <img className='feedImg' data-id={picture.id} src={`${ApiHost}${picture.attachment_url}`} />
            </div>
          )}
        </div>
      )} */}
    </div>
  )
}
}

export default Pictures
