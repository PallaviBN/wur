import React from 'react'
import { connect } from 'react-redux'
import {setAuthedUser} from '../actions/shared'

class Login extends React.Component {
    state={
        authedUser:''
    }
    handleChange = (e) => {
        const value = e.target.value
        this.setState({authedUser: value})
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const {dispatch} = this.props
        dispatch(setAuthedUser(this.state.authedUser))
        console.log(this.state.authedUser)
    }
    disabled = () => {
        return this.state.authedUser === ''
    }
    render(){
        const { users } = this.props
        return (
            <div className='login-form'>
                <div className='login-top'>
                    <h4>Would You Rather ?</h4>
                    <p>Sign In To Continue</p>
                </div>
                <div className='login-body'>
                    <ul>
                        {users.map(user => (
                            <li key={user.id}><img src={user.avatarURL}></img></li>
                        ))}
                    </ul>
                    <h4>Sign In</h4>
                    <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                        <select>
                            <option className='default-option'>Select a Friend</option>
                        
                            {users.map(user => (
                                <option value={user.id} key={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                        <button type='submit' className='btn' disabled={this.disabled()}>Login</button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps({users}, {setAuthedUser}){
    return {
        users: Object.values(users),
        setAuthedUser
    }
}
export default connect(mapStateToProps)(Login)