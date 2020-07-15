import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleSaveAnswers} from '../actions/shared'
import {Link} from 'react-router-dom'

class QuestionPoll extends Component {
    state = {
        selectedOption: '',
        // it gives me undefined if someone tries to access it directly, what shall I do?
        // I tried to use (!!) so it can turn undefined into false, but it didn't work neither
        resultsView: '',
    }
    handleChange = (e) => {
        this.setState({selectedOption: e.target.value})
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const answer = this.state.selectedOption;
        const {dispatch, authedUser, id} = this.props 
        
        dispatch(handleSaveAnswers(authedUser, id, answer))
        .then(() => this.setState({resultsView: true}))
    }
    isDisabled = () => {
        return this.state.selectedOption === ''
    }
    componentDidMount(){
        const {authedUser, question} = this.props
        // to check if the user answered this questions or not
        if(question) {
            const isAnswered =  question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)
            if(isAnswered){
                this.setState({resultsView: true})
            } else {
                this.setState({resultsView: false})
            }

        }
        
    }
    render(){
        const {question, user, authedUser} = this.props
        // to catch wrong routes
        if(!question){
            return (
                <h3>Nothing to see here, wrong route..</h3>
            )
        }
        const {optionOne, optionTwo} = question

        const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;


        let optionOnePercentage = Math.round((question.optionOne.votes.length / totalVotes) * 100);
        let optionTwoPercentage = Math.round((question.optionTwo.votes.length / totalVotes) * 100);
        return (
            <div className='question-card'>
                <div className='asker'> <p>{user.name} Asks: </p></div>
                <div className='body container-fluid'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <div className='image'><img src={user.avatarURL} /></div>
                        </div>
                        {this.state.resultsView === false &&
                            <div className='col-md-8'>
                                <div className='info'>
                                    <h5>Would you rather?</h5>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className='form-check'>
                                            <label>
                                                <input 
                                                    type='radio' 
                                                    name='options' 
                                                    value='optionOne'
                                                    checked={this.state.selectedOption === 'optionOne'}
                                                    onChange={this.handleChange}
                                                    className="form-check-input"
                                                />
                                                {optionOne.text} 
                                            </label>
                                        </div>
                                        <div className='form-check'>
                                            <label>
                                                <input 
                                                    type='radio' 
                                                    name='options' 
                                                    value='optionTwo'
                                                    checked={this.state.selectedOption === 'optionTwo'}
                                                    onChange={this.handleChange}
                                                    className="form-check-input"
                                                />
                                                {optionTwo.text} 
                                            </label>
                                        </div>
                                        <button className='btn submit' type='submit' disabled={this.isDisabled()}>Submit</button>
                                    </form>
                                </div>
                            </div>
                        }
                        
                        {this.state.resultsView === true && 
                            <div className='col-md-8'>
                                <div className="results-view">
                                    <h5>Results<span>Would you rather?</span></h5>
                                    <div style={{borderColor: optionOne.votes.length > optionTwo.votes.length ? 'green' : 'none' }} className='vote-card'>
                                        {question.optionOne.votes.includes(authedUser) && 
                                            <div className='badge'>
                                                <p>Your<br></br>Vote</p>
                                            </div>
                                        }
                                        <h6>{optionOne.text}</h6>
                                        <p>{optionOne.votes.length} out of {optionOne.votes.length + optionTwo.votes.length} votes</p>
                                        <span className='percentage'>Percentage: {optionOnePercentage } %</span>
                                    </div>
                                    <div style={{borderColor: optionTwo.votes.length > optionOne.votes.length ? 'green' : 'none' }} className='vote-card'>
                                        {question.optionTwo.votes.includes(authedUser) && 
                                            <span className='badge'>
                                                <p>Your<br></br>Vote</p>
                                            </span>
                                        }
                                        <h6>{optionTwo.text}</h6>
                                        <p>{optionTwo.votes.length} out of {optionOne.votes.length + optionTwo.votes.length} votes </p>
                                        <span className='percentage'>Percentage: {optionTwoPercentage} %</span>
                                    </div>
                                    <Link to='/' className='btn back'>Back</Link>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({users, questions, authedUser}, props){
    const {id} = props.match.params
    const question = questions[id]
    return {
        question: question ? question : null,
        user: question ? users[question.author] : null,
        authedUser,
        id
    }
}
export default connect(mapStateToProps)(QuestionPoll)