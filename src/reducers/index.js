import { combineReducers } from 'redux'
import authedUser from './authedUser'
import users from './users'
import ques from './ques'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
    
    users,
    ques,
    authedUser,
    loadingBar: loadingBarReducer,
})