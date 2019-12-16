import React, { Component } from 'react';
import { getTopics, postArticle } from './Apis';
import ErrorDisplay from './ErrorDisplay';

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

    handleSubmit = (event) => {
        event.preventDefault();
        const { body, title, topic } = this.state;
        this.setState({
            topic: '',
            body: '',
            title: '', post: true
        })
        postArticle(title, body, this.props.user, topic).catch(({ response }) => {
            this.setState({
                err: {
                    status: response.status || 500,
                    msg: response.msg || "Something went wrong"
                }

            })
        })
    }

    handleClick = (event) => {
        event.preventDefault()
    }

    render() {
        const { isLoading, topics, body, title, topic, post, err } = this.state;
        if (isLoading === true) return <h2>Loading...</h2>
        if (err) return (<ErrorDisplay err={err} />)
        if (post === true) return <h1>Article posted!</h1>
        return (
            <form className="containerPostArticle">
                <input className="postArticleInput" value={title} onChange={this.handleText} name='title' placeholder="article title" type="text"></input>
                <textarea className="postArticleText" value={body} onChange={this.handleText} name='body' placeholder="article body"></textarea>
                <div className="navigation">
                    <div className="dropdown">
                        <button onClick={this.handleClick} className="dropbtn">Topics</button>
                        <div className="dropdown-content">
                            {topics.map(topic => {
                                return (
                                    <div key={topic.slug}>
                                        <label onChange={this.handleTopics}><input className="dropdown" name="topic" type="radio" value={topic.slug} />{topic.slug}</label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <button onClick={this.handleSubmit} disabled={!topic || !body || !title} className="pagebtn-large">
                    <p >Post</p>
                </button>
            </form>
        );
    }
}

export default ArticlePoster;