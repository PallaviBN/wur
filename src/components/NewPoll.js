import React from 'react'
import { handleSaveQuestion } from '../actions/shared';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class NewPoll extends React.Component {
    state = {
        optionOne: '',
        optionTwo: ''
    }
    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({ [name]: value })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const {dispatch, authedUser} = this.props
        const {optionOne, optionTwo} = this.state
        dispatch(handleSaveQuestion(optionOne, optionTwo, authedUser))
        .then(() => this.setState({optionOne: '', optionTwo: ''}))
        .then(() => this.props.history.push('/'))
    }
    disabled = () => {
        return this.state.optionOne === '' || this.state.optionTwo === ''
    }
    render(){
        const {optionOne, optionTwo} = this.state
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3'>
                        <div className='form-container'>
                            <div className='form-top'><h2>Create New Poll</h2></div>
                            <div className='form-body'>
                                <div className='form-intro'>
                                    <p>Complete the question</p>
                                    <p><b>Would you rather..</b></p>
                                </div>
                                <form onSubmit={this.handleSubmit}>
                                    <input type='text' name='optionOne' value={optionOne} placeholder='Enter Option One..' onChange={this.handleChange} />
                                    <div className='divider'>
                                    <span>OR</span>
                                        <hr></hr>
                                    </div>
                                    <input type='text' name='optionTwo' value={optionTwo} placeholder='Enter Option Two..' onChange={this.handleChange} />
                                    <button type='submit' className='btn btn-submit' disabled={this.disabled()}>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({authedUser}){
    return {
        authedUser
    }
}
export default withRouter(connect(mapStateToProps)(NewPoll))