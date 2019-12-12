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
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <textarea onChange={this.handleChange} placeholder="make a comment" className="bigText"></textarea>
                <input className="dropbtn" type="submit" />
            </form>
        );
    }
}

export default Commenter;