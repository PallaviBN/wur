import React from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
class Question extends React.Component {
    redirectToPoll = (e, id) => {
        e.preventDefault();
        this.props.history.push(`/questions/${id}`)
    }
    render(){

        const {question, user, id, authedUser} = this.props
        const {optionOne, optionTwo} = question

        return (
            <div className='question-card'>
                <div className='asker'>{user.name} Asks:</div>
                <div className='body container-fluid'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <div className='image'><img src={user.avatarURL} alt='avatar' /></div>
                        </div>
                        <div className='col-md-8'>
                            <div className='info'>
                                <h5>Would you rather?</h5>
                                <p>-{optionOne.text}</p>
                                <p>-{optionTwo.text}</p>
                                {Object.keys(authedUser.answers).includes(id) 
                                    ? <Link className='btn results' to={{ 
                                        pathname:`/questions/${id}`,
                                        state: { showResults:true } 
                                    }}>Show Results</Link>
                                    : <Link className='btn results' to={{ 
                                        pathname:`/questions/${id}`,
                                        state: { showResults:false } 
                                    }}>Answer Poll</Link>
                                }
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({questions, users, authedUser}, {id}){
    const question = questions[id]
    return {
        
        question: question ? question : null,
        user: users[question.author] ? users[question.author] : null,
        authedUser: users[authedUser]
    }
}
export default connect(mapStateToProps)(Question);