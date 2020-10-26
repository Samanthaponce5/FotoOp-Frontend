import React from 'react';
import { ApiHost } from '../constants';
import { FaRegComment } from 'react-icons/fa';
import { IoIosHeart } from 'react-icons/io';
import { IoIosHeartEmpty } from 'react-icons/io';

export default class Home extends React.Component {
	state = {
		pending: [],
		pictures: [],
		number_columns: 4,
		loading: true,
		user_id: '',
		like: false,
		user: [],
		comment: '',
    comments: [],
    allikes:[]
	};

	componentDidMount() {
		this.loadPictures();
		this.fetchUser();
	}

	loadPictures = () => {
		const token = localStorage.getItem('token');

		fetch(`${ApiHost}/pictures.json`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => response.json())
			.then((pictures) =>
				this.setState({
					pictures: pictures.posts,
          comments: pictures.comments,
          allikes:pictures.likes,
					loading: false,
				})
			);
	};

	fetchUser = (id) => {
		fetch(`${ApiHost}/users`)
			.then((resp) => resp.json())
			.then((data) => this.setState({ user: data }));
	};

	// handleLike=(e)=>{
	//   //give each li an id of the picture
	//   // and do and if statement if the
	//   //li == the id like only that one heart
	//      this.setState({like:!this.state.like})
	//    }

	getUser = (pic) => {
		return this.state.user.map((u) => {
			if (u.id === pic.user_id) {
				return (
					<span
						onClick={() => this.props.visitUserProfile(u.id)}
						key={u.id}
						id={u.id}
					>
						{u.username}
					</span>
				);
			}
		});
	};

	handleOnChange = (e) => {
		let { value, name } = e.target;
		this.setState({ [name]: value });
	};

	commentFetch = (e, post) => {
		e.preventDefault();
		const token = localStorage.getItem('token');
		if (token && this.state.comment.length > 0) {
			fetch('http://localhost:3000/comments', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({
					user_id: this.props.currentUser.id,
					picture_id: post,
					comment: this.state.comment,
				}),
			})
				.then((resp) => resp.json())
				.then(() => this.loadPictures());
			this.setState({ comment: '' });
		}
	};

	handleLike = (e, post) => {
		
			this.setState({ like: true });
			const token = localStorage.getItem('token');
			if (token) {
				fetch(`http://localhost:3000/pictures/${post}/likes`, {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
					body: JSON.stringify({
						user_id: this.props.currentUser.id,
						picture_id: post,
					}),
				})
					// .then((resp)=>resp.json())
          .then((data) => console.log(data));
			}
	};

  handleUnLike=(e,post)=>{
    this.setState({ like: false });
    const token = localStorage.getItem('token');
    if (token) {
      //find a way to get the id of the like to delete the like????
      fetch(`http://localhost:3000/pictures/${post}/likes/${23}`, {
        method: 'Delete',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
    }
  }
	render() {
    console.log(this.state.comment);

		return (
			<>
				<div>
					{this.state.pictures.map((picture,e) => (
						<div key={picture.id} className="homeimgdiv">
							<div className="tophomeimg">
								<h3 className="names"> {this.getUser(picture)}</h3>
							</div>
							<img
								className="homefeedImg"
								data-id={picture.id}
								src={`${ApiHost}${picture.attachment_url}`}
								alt="upload"
							/>
							<div className="bottomhomeimg">
								<ul className="likesandcomments">
                  
									{this.state.like ? (
										<li
                    id={picture.id}
											style={{ color: 'red' }}
											onClick={(e) => this.handleUnLike(e, picture.id)}
										>
											<IoIosHeart size={30} />
										</li>
									) : (
										<li onClick={(e) => this.handleLike(e, picture.id)}>
											<IoIosHeartEmpty size={30} />{' '}
										</li>
									)}
									<li>
										<FaRegComment size={25} />{' '}
									</li>
								</ul>


                {console.log('likes',this.state.allikes)}
				<div className="likers">Liked by {this.state.allikes.map((like)=>{if(like.map((l)=>l.picture_id) === picture.id)
					{return like.length}})} </div>

								<div className="homecenterComment">
									<ul>
										{this.state.comments.map((co) => {
											return co.map((c) => {
												if (c.picture_id === picture.id) {
													return <li>{c.comment}</li>;
												}
											});
										})}
									</ul>
								</div>

								<div className="homedate"> MAY 30</div>

								<form onSubmit={(e) => this.commentFetch(e, picture.id)}>
									{' '}
									<input
										name="comment"
										value={this.state.comment}
										id={picture.id}
										onChange={this.handleOnChange}
										className="homeimginput"
										type="text"
										placeholder="         Add a comment..."
									/>
									<button type="submit" className="homepost">
										Post
									</button>
								</form>
							</div>
						</div>
					))}
				</div>
			</>
		);
	}
}
