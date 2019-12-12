import React, { Component } from 'react';
import { getArticle, patchArticle } from './Apis';
import Comments from './Comments';

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
        let { article, isLoading, voted } = this.state;
        if (isLoading === true) return <h2>Loading...</h2>
        return (
            <div>
                <div className='container'>
                    <h2>{article.title}</h2>
                    <div className="flexRowCentre">
                        <p className="Votes">Votes: {article.votes}</p>
                        {this.props.user && <button disabled={voted} id={article.article_id} name={1} onClick={this.handleVote} className="votebtn">👍</button>}
                        {this.props.user && <button disabled={voted} id={article.article_id} name={-1} onClick={this.handleVote} className="votebtnangry">👎</button>}
                    </div>
                    <p>Topic: {article.topic}</p>
                    <p>Author: {article.author}</p>
                    <p>Posted: {article.created_at}</p>
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