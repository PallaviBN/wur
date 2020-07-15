import React from 'react'
import { NavLink, withRouter} from 'react-router-dom'
import {setAuthedUser} from '../actions/shared'
import {connect} from 'react-redux'

class Nav extends React.Component {
    handleLogout = () => {
        const {dispatch} = this.props

        dispatch(setAuthedUser(null))
        setTimeout(() => {
            this.props.history.push('/')
        }, 1500)
    }
    render () {
        return (
            <nav className="navbar navbar-expand-lg ">
                <h1 className="navbar-brand">Would You Rather...?</h1>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink to='/' exact className='nav-link' activeClassName='active'>
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/newpoll' className='nav-link' activeClassName='active'>
                                New Poll
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/scoreboard' className='nav-link' activeClassName='active'>
                               Scoreboard
                            </NavLink>
                        </li>
                    </ul>
                    <span className="navbar-text">
                        <span className='username'>{this.props.userName}</span>
                        <button className='btn logout' onClick={this.handleLogout}>Logout</button>
                    </span>
                </div>
            </nav>
        )
    }
}
function mapStateToProps ({authedUser, users}){
    return {
        userName: users[authedUser].name
    }
}
export default withRouter(connect(mapStateToProps)(Nav))