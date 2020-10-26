import api from '../apis/Store';

// export const autoLogin = () => {
// 	return async (dispatch) => {
// 		const token = localStorage.getItem('token');
// 		if (token) {
// 			const response = await api.get('/auto_login', {
// 				headers: { Authorization: `Bearer ${token}` },
// 			});
//       dispatch({ type: 'AUTO_SIGNIN', payload: response.data });
// 		}
// 	};
// };

// import { ApiHost } from "../constants"





export const getCommentsAction=(id)=>{
    return async (dispatch)=>{
        const response = await api.get(`/pictures/${id}`)
        dispatch({type:'GET_COMMENTS', payload:response.data.comments})
        console.log('doesit workhipe',response.data.comments)
    }
}