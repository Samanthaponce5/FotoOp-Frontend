import {combineReducers} from 'redux'
import commentReducer from './commentReducer'


export default combineReducers({
   acomments:commentReducer
})









// import {combineReducers} from 'redux'
// import {reducer as formReducer} from 'redux-form'
// import productReducer from './productsReducer'
// import cartReducer from './cartReducer'

// import authReducer from './authReducer'

// export default combineReducers({
//     auth:authReducer,
//     form:formReducer,
//     products:productReducer,
//     cart:cartReducer
// })


