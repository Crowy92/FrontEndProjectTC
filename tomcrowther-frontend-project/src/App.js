import React from 'react';
import Header from './Components/Header'
import Article from './Components/Article'
import { Router } from '@reach/router'
import Articles from './Components/Articles';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Router primary={false}>
        <Articles path='/' />
        <Articles path='/articles/topics/:topic' />
        <Article path='/article/:article_id' />
        <Articles path='/articles/pages/:page' />
      </Router>
    </div>
  );
}

export default App;
