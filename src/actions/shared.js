import {getInitialData, saveQuestionAnswer, saveQuestion} from '../utils/api'
import {setAuthUser} from './authedUser'
import {showLoading, hideLoading} from 'react-redux-loading'

export const RECEIVE_DATA = 'RECEIVE_DATA'
export const SAVE_ANSWERS = 'SAVE_ANSWERS'
export const SAVE_QUESTION = 'SAVE_QUESTION'

function receiveData (users, questions) {
    return {
        type: RECEIVE_DATA,
        users,
        questions,
    }
}

export function setAuthedUser(authedUser){
    return (dispatch) => {
        dispatch(showLoading())
        setTimeout(() => {
            dispatch(setAuthUser(authedUser))
            dispatch(hideLoading())
        }, 1500)
    }
}
export function handleInitialData(){
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({users, questions}) => {
                dispatch(receiveData(users, questions))
                dispatch(hideLoading())
            })
    }
}


function saveAnswersAction({authedUser, qid, answer}){
    return {
        type: SAVE_ANSWERS,
        authedUser,
        qid,
        answer
    }
}


export function handleSaveAnswers(authedUser, qid, answer){
    return (dispatch) => {
        dispatch(showLoading())
        return saveQuestionAnswer({authedUser, qid, answer})
        .then(() => dispatch(saveAnswersAction({authedUser, qid, answer})))
        .then(() => dispatch(hideLoading()))
    }   
}

function saveQuestionAction(question){
    return {
        type: SAVE_QUESTION,
        question
    }
}

export function handleSaveQuestion(optionOneText, optionTwoText, author){
    return (dispatch) => {
        dispatch(showLoading())
        return saveQuestion({ optionOneText, optionTwoText, author })
        .then((question) => dispatch(saveQuestionAction(question)))
        .then(() => dispatch(hideLoading()))
    }
}