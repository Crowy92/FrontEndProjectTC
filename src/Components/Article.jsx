import React, { Component } from 'react';
import { getArticle, patchArticle } from './Apis';
import Comments from './Comments';
import ErrorDisplay from './ErrorDisplay';

class Article extends Component {
    state = {
        article: "",
        isLoading: true,
        comment: false,
        voted: false
    }

    componentDidMount = () => {
        getArticle(this.props.article_id).then(article => {
            this.setState({
                article,
                isLoading: 'false'
            })
        }).catch(({ response }) => {
            this.setState({
                err: {
                    status: response.status || 500,
                    msg: response.msg || "Something went wrong"
                },
                isLoading: false
            })
        })
    }

    handleVote = (event) => {
        const { id, name } = event.target;
        patchArticle(id, name)
        this.setState((currentState) => {
            const newVote = parseInt(currentState.article.votes) + parseInt(name);
            currentState.article.votes = newVote;
            return {
                article: currentState.article,
                voted: true
            }
        })
    }

    render() {
        let { article, isLoading, voted, err } = this.state;
        if (isLoading === true) return <h2>Loading...</h2>
        if (err) return <ErrorDisplay err={err} />
        let topicpic;
        if (article.topic === 'football') {
            topicpic = 'https://images.pexels.com/photos/47354/the-ball-stadion-football-the-pitch-47354.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';
        } else if (article.topic === 'cooking') {
            topicpic = 'https://images.pexels.com/photos/2284166/pexels-photo-2284166.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        } else if (article.topic === 'coding') {
            topicpic = 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        }
        return (
            <div>
                <div className='container'>

                    <h2>{article.title}</h2>
                    <div className="flexRowCentre">
                        <img alt="topic" className='topicpic' src={topicpic} />
                        <div>
                            <div className="flexRowCentre">
                                <p className="Votes">Votes: {article.votes}</p>
                                {this.props.user && <button disabled={voted} id={article.article_id} name={1} onClick={this.handleVote} className="pagebtn">˄</button>}
                                {this.props.user && <button disabled={voted} id={article.article_id} name={-1} onClick={this.handleVote} className="pagebtn">˅</button>}
                            </div>
                            <p>Topic: {article.topic}</p>
                            <p>Author: {article.author}</p>
                            <p>Posted: {article.created_at}</p>
                        </div>
                    </div>
                    <p>{article.body}</p>
                </div>
                <div className='container'>
                    <h2>Comments:</h2>
                    <Comments user={this.props.user} article_id={article.article_id} />
                </div>
            </div>
        );
    }
}

export default Article;