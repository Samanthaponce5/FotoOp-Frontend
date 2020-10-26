// export default (state = {}, action) => {
// 	switch (action.type) {
// 	   case 'GET_CART':
// 			return { ...state, items: action.payload };
// 		case 'GET_PRODUCTS_IN_CART':
// 			return { ...state, [action.payload.id]: action.payload };
// 		 case 'GET_ORDERS':
// 			return { ...state, order: action.payload };
// 		case 'UPDATE_CART':
// 			return { ...state, order: action.payload };
// 		  case 'DELETE_ITEM':
// 			return {...state, items:state.items.filter((item) =>{ if(item.id !== action.payload){ return item} })}
// 		  default:
// 		  	 return state;
// 	}
// }

export default (state = {}, action) => {
	switch (action.type) {
	   case 'GET_COMMENTS':
			return { ...state, acomment: action.payload };

		  default:
		  	 return state;
	}
}
