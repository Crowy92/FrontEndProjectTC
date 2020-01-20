import React, { Component } from 'react';
import { getComments, patchComment, deleteComment, postComment } from './Apis';
import Commenter from './Commenter'
import ErrorDisplay from './ErrorDisplay'

class Comments extends Component {
    state = {
        isLoading: true,
        comments: [],
        err: "",
        voted: false
    }

    componentDidMount() {
        getComments(this.props.article_id)
            .then(comments => {
                this.setState({ comments, isLoading: false })
            })
    }

    handleVote = (event) => {
        const { id, value } = event.target;
        this.setState((currentState) => {
            const updatedComments = currentState.comments.map(comment => {
                if (comment.comment_id.toString() === id.toString()) {
                    comment.votes = parseInt(comment.votes) + parseInt(value)
                    comment.voted = comment.voted === undefined ? parseInt(value) : parseInt(comment.voted) + parseInt(value);
                }
                return comment;
            })
            return {
                comments: updatedComments,
                voted: true
            }
        })
        patchComment(id, value).catch(({ response }) => {
            this.setState((currentState) => {
                const updatedComments = currentState.comments.map(comment => {
                    if (comment.comment_id.toString() === id.toString()) {
                        comment.votes = parseInt(comment.votes) - parseInt(value)
                        comment.voted -= value
                        comment.err = true
                    }
                    return comment;
                })
                return {
                    comments: updatedComments
                }
            })
        })
    }

    submitComment = (artId, username, body) => {
        postComment(artId, username, body).then((comment) => {
            this.setState(currentState => {
                return { comments: [comment, ...currentState.comments] }
            })
        }).catch(({ response }) => {
            this.setState({
                err: {
                    status: response.status || 500,
                    msg: response.msg || "Something went wrong"
                }
            })
        })
    }

    deleteComment = (event) => {
        const { id } = event.target
        deleteComment(id)
        this.setState((currentState) => {
            const updatedComments = currentState.comments.filter(comment => comment.comment_id.toString() !== id.toString())
            return { comments: updatedComments }
        })
    }

    render() {
        let { comments, isLoading, err } = this.state;
        if (isLoading === true) return <h2>Loading...</h2>
        return (
            <div>
                {this.props.user && <Commenter user={this.props.user} article_id={this.props.article_id} submitComment={this.submitComment} />}
                {err && <ErrorDisplay err={err} />}
                <ul>
                    {comments.map(comment => {
                        const date = comment.created_at.slice(0, 10)
                        return (
                            <li key={comment.comment_id}>
                                <h4>Author: {comment.author}</h4>
                                <p>{comment.body}</p>
                                <div className="flexRow">
                                    <p className="Italics">Posted: {date}</p>
                                    <p className="Votes">Votes: {comment.votes}</p>
                                    <div>
                                        {this.props.user && <button disabled={comment.voted > 0} id={comment.comment_id} value={1} onClick={this.handleVote} className="pagebtn">˄</button>}
                                        {this.props.user && <button disabled={comment.voted < 0} id={comment.comment_id} value={-1} onClick={this.handleVote} className="pagebtn">˅</button>}
                                        {this.props.user === comment.author && <button id={comment.comment_id} onClick={this.deleteComment} className="pagebtn">Delete</button>}
                                    </div>
                                    {comment.err && <ErrorDisplay err={comment.err} />}
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

export default Comments;