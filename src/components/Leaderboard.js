import React, {Component} from 'react'
import {connect} from 'react-redux'

class Leaderboard extends Component {
    render(){
        const {users} = this.props
        return (
            <div className='leaderboard'>
            <ul>
                {users.map((user) => (
                    <li key={user.id} className='leaderboard-card'>
                        <div className='row'>
                            <div className='col-md-5'>
                                <div className='image'><img src={user.avatarURL} alt='avatar'/> 
                                <h5><b>{user.name}</b></h5>
                                </div>
                            </div>
                            <div className='col-md-5'>
                                <div className='info row'>
                                    <p className='col-md-6'><u>Questions Answered</u> :<p><b>{user.questionsAnswered}</b></p></p>
                                    <p className='col-md-6'><u>Questions Created</u> :<p><b>{user.questionsCreated}</b></p></p>
                                </div> 
                            </div>
                            <div className='col-md-2'>
                                <div className='score'>
                                    <h5>Score</h5>
                                    <p><h3>{user.total}</h3></p>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            </div>
        )
    }
}

function mapStateToProps({ users}){
    // when you want to return an object use ({})
    const leaderboardData = Object.values(users).map(user => ({
        id: user.id,
        name: user.name,
        avatarURL: user.avatarURL,
        questionsAnswered: Object.keys(user.answers).length,
        questionsCreated: user.questions.length,
        total: Object.keys(user.answers).length + user.questions.length
    })).sort((a, b) => b.total - a.total)
    return {
        users: leaderboardData
    }
}
export default connect(mapStateToProps)(Leaderboard);