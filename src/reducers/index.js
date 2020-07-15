import { combineReducers } from 'redux'
import authedUser from './authedUser'
import users from './users'
import questions from './ques'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
    
    users,
    questions,
    authedUser,
    loadingBar: loadingBarReducer,
})