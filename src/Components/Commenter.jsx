import React, { Component } from 'react';

class Commenter extends Component {
    state = {
        comment: ""
    }

    handleChange = (event) => {
        this.setState({ comment: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { user, article_id, submitComment } = this.props;
        const { comment } = this.state
        submitComment(article_id, user, comment)
        this.setState({ comment: "" })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <textarea value={this.state.comment} onChange={this.handleChange} placeholder="make a comment" className="bigText"></textarea>
                <button className="pagebtn" type="submit">Comment</button>
            </form>
        );
    }
}

export default Commenter;