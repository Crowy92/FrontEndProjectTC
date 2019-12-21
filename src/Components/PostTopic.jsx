import React, { Component } from 'react';
import { postTopic } from './Apis';
import ErrorDisplay from './ErrorDisplay'

class PostTopic extends Component {
    state = {
        slug: "",
        description: ""
    }

    render() {
        const { slug, description } = this.state;
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