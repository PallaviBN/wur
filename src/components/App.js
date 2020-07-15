import React, { Fragment } from 'react';
import '../index.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './Home'
import NewPoll from './NewPoll'
import QuestionPoll from './QuestionPoll'
import Leaderboard from './Leaderboard'
import Login from './Login'
import NoMatch from './NoMatch'
import Nav from './Nav'
import {handleInitialData} from '../actions/shared'
import {connect} from 'react-redux'
import LoadingBar from 'react-redux-loading'

class App extends React.Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }
  render(){ 
    const {authedUser} = this.props
    return (
      <Router>
          <Fragment>
            <LoadingBar />
            {this.props.loading
              ? null
              : (authedUser === null) 
                ? <Route component={Login} />
                : (
                  <div className='container'>
                    <Nav />
                    <div className='body'>
                      <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/new' component={NewPoll} />
                        <Route path='/questions/:id' component={QuestionPoll} />
                        <Route path='/leaderboard' component={Leaderboard} />
                        
                        <Route component={NoMatch} />
                      </Switch>
                    </div>
                  </div>
                )
            }
          </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({authedUser, users}){
  return {
    authedUser , 
    loading:  users === null
  }
}
export default connect(mapStateToProps)(App);