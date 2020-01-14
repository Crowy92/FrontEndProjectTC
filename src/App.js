import React, { Component } from 'react';
import Header from './Components/Header'
import Article from './Components/Article'
import { Router } from '@reach/router';
import { getUsers } from './Components/Apis'
import User from './Components/User'
import Articles from './Components/Articles';
import PostTopic from './Components/PostTopic'
import Userlogin from './Components/Userlogin';
import ArticlePoster from './Components/ArticlePoster'
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import ErrorDisplay from './Components/ErrorDisplay';

class App extends Component {
  state = {
    user: "",
    users: []
  }

  componentDidMount = () => {
    this.findUsers();
    const username = localStorage.getItem('username')
    username && this.SignIn(username)
  }

  SignIn = (user) => {
    this.setState({ user })
  }

  findUsers = () => {
    getUsers().then(users => {
      this.setState({ users })
    })
  }

  render() {
    const { users, user } = this.state;
    return (
      <div className="App">
        <div className="fittedtop">
          <img alt="news-logo" className="news" src="https://storiesflistgv2.blob.core.windows.net/stories/2017/10/newsbanner_24Aug_b.jpg" />
        </div>
        <div className="flexRowNav">
          <Header user={this.state.user} signIn={this.SignIn} />
          {user === "" && <Userlogin signIn={this.SignIn} users={users} />}
        </div>
        <Router primary={false}>
          <Articles user={this.state.user} path='/' />
          <Article user={this.state.user} path='/article/:article_id' />
          <User user={user} users={users} path='/user' />
          <ArticlePoster user={this.state.user} path='/postarticle' />
          <PostTopic user={this.state.user} path='/posttopic' />
          <ErrorDisplay default />
        </Router>
      </div>
    );
  }
}

export default App;
