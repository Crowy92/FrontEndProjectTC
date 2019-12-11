import React, { Component } from 'react';
import { getComments, patchComment } from './Apis';

class Comments extends Component {
    state = {
        isLoading: true,
        comments: []
    }

    componentDidMount() {
        getComments(this.props.article_id)
            .then(comments => {
                this.setState({ comments, isLoading: false })
            })
    }

    handleVote = (event) => {
        const { id, name } = event.target;
        patchComment(id, name).then(newComment => {
            this.setState((currentState) => {
                const updatedComments = currentState.comments.map(comment => {
                    if (comment.comment_id.toString() === id.toString()) {
                        return newComment;
                    } else {
                        return comment;
                    }
                })
                return { comments: updatedComments }
            })
        })
    }

    render() {
        let { comments, isLoading } = this.state;
        if (isLoading === true) return <h2>Loading...</h2>
        return (
            <ul>
                {comments.map(comment => {
                    const date = comment.created_at.slice(0, 10)
                    return (
                        <li key={comment.comment_id}>
                            <h4>Author: {comment.author}</h4>
                            <p>{comment.body}</p>
                            <div className="flexRow">
                                <p>Posted: {date}</p>
                                <p className="Votes">Votes: {comment.votes}</p>
                                <div>
                                    <button id={comment.comment_id} name={1} onClick={this.handleVote} className="votebtn">Upvote</button>
                                    <button id={comment.comment_id} name={-1} onClick={this.handleVote} className="votebtnangry">DownVote</button>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        );
    }
}

export default Comments;