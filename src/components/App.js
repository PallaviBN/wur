import React, { Fragment, Component } from 'react';
import '../index.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './Home'
import Nav from './Nav'
import {handleInitialData} from '../actions/shared'
import {connect} from 'react-redux'
import NewPoll from './NewPoll'
import QuestionPoll from './QuestionPoll'
import LoadingBar from 'react-redux-loading'
import Scoreboard from './Scoreboard'
import Login from './Login'
import PageNotFound from './PageNotFound'

class App extends Component {
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
                        <Route path='/newpoll' component={NewPoll} />
                        <Route path='/questions/:id' component={QuestionPoll} />
                        <Route path='/scoreboard' component={Scoreboard} />
                        
                        <Route component={PageNotFound} />
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