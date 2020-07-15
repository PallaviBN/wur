import {RECEIVE_DATA} from '../actions/shared'
import {SAVE_ANSWERS} from '../actions/shared'
import {SAVE_QUESTION} from '../actions/shared'

export default function questions (state = {}, action) {
    switch(action.type){
        case RECEIVE_DATA :
            return {...state, ...action.questions}
        
        case SAVE_ANSWERS :
            return {
                ...state,
                [action.qid]: {
                    ...state[action.qid],
                    [action.answer]: {
                        ...state[action.qid][action.answer],
                        votes: state[action.qid][action.answer].votes.concat([action.authedUser])
                    }
                }
            }

        case SAVE_QUESTION :
            return {
                ...state,
                [action.question.id]: action.question
            }
        default :
            return state
    }
}