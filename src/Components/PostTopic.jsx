import React, { Component } from 'react';
import { postTopic } from './Apis';
import ErrorDisplay from './ErrorDisplay'

class PostTopic extends Component {
    state = {
        slug: "",
        description: ""
    }

    handleText = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { slug, description } = this.state;
        this.setState({
            slug: "",
            description: "",
            post: true
        })
        postTopic(slug, description).catch(({ response }) => {
            this.setState({
                err: {
                    status: response.status || 500,
                    msg: response.msg || "Something went wrong"
                }
            })
        })
    }

    render() {
        const { slug, description, post, err } = this.state;
        if (err) return (<ErrorDisplay err={err} />)
        if (post === true) return <h1>Article posted!</h1>
        return (
            <form className="continerPostArticle">
                <input className="postArticleInput" value={slug} onChange={this.handleText} name='slug' placeholder="Topic slug" type="text"></input>
                <textarea className="postArticleText" value={description} onChange={this.handleText} name='description' placeholder="Topic description"></textarea>
                <button onClick={this.handleSubmit} disabled={!slug || !description} className="pagebtn-large">
                    <p >Post</p>
                </button>
            </form>
        );
    }
}

export default PostTopic;