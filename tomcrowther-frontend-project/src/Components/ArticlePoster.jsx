import React, { Component } from 'react';
import { getTopics, postArticle } from './Apis';

class ArticlePoster extends Component {
    state = {
        isLoading: true,
        topic: '',
        body: '',
        title: ''
    }

    handleTopics = (event) => {
        this.setState({ topic: event.target.value })
    }

    componentDidMount = () => {
        this.findTopics()
    }

    findTopics = () => {
        getTopics().then(topics => {
            this.setState({ topics, isLoading: false })
        })
    }

    handleText = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handleSubmit = () => {
        const { body, title, topic } = this.state;
        postArticle(title, body, this.props.username, topic)
    }

    render() {
        const { isLoading, topics, body, title, topic } = this.state;
        console.log(title, body, topic)
        if (isLoading === true) return <h2>Loading...</h2>
        return (
            <form className="container">
                <input onChange={this.handleText} name='title' placeholder="article title" type="text"></input>
                <textarea onChange={this.handleText} name='body' placeholder="article body"></textarea>
                <div className="dropdown">
                    <button className="dropbtn">Topics</button>
                    <div className="dropdown-content">
                        {topics.map(topic => {
                            return (
                                <div key={topic.slug}>
                                    <label onChange={this.handleTopics}><input className="dropdown" name="topic" type="radio" value={topic.slug} />{topic.slug}</label>
                                </div>
                            )
                        })}
                    </div>
                    <button onClick={this.handleSubmit} disabled={!topic || !body || !title} className="pagebtn-large">
                        <p >Post</p>
                    </button>
                </div>
            </form>
        );
    }
}

export default ArticlePoster;