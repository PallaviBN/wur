import {RECEIVE_DATA} from '../actions/shared'
import {SAVE_ANSWERS} from '../actions/shared'
import {SAVE_QUESTION} from '../actions/shared'

export default function users (state = {}, action) {
    switch(action.type){
        case RECEIVE_DATA :
            return {...state, ...action.users}

        case SAVE_ANSWERS :
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        [action.qid]: action.answer
                    }
                }
            }

        case SAVE_QUESTION :
            return {
                ...state,
                [action.question.author]:{
                    ...state[action.question.author],
                    questions: state[action.question.author].questions.concat([action.question.id])
                }
            }
        default : 
            return state
    }
}