import React, { Component } from 'react';
import Header from './Components/Header'
import Article from './Components/Article'
import { Router } from '@reach/router';
import { getUsers } from './Components/Apis'
import User from './Components/User'
import Articles from './Components/Articles';
import Userlogin from './Components/Userlogin';
import ArticlePoster from './Components/ArticlePoster'
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

class App extends Component {
  state = {
    user: "",
    users: []
  }

  componentDidMount = () => {
    this.findUsers();
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
    const { users } = this.state;
    return (
      <div className="App">
        <img alt="news-logo" className="logo" src="https://storiesflistgv2.blob.core.windows.net/stories/2017/10/newsbanner_24Aug_b.jpg" />
        <div className="flexRowNav">
          <Header user={this.state.user} />
          <Userlogin signIn={this.SignIn} users={users} />
        </div>
        <Router primary={false}>
          <Articles path='/' />
          <Article user={this.state.user} path='/article/:article_id' />
          <User user={this.state.user} users={this.state.users} path='/user' />
          <ArticlePoster user={this.state.user} path='/postarticle' />
        </Router>
      </div>
    );
  }
}

export default App;
