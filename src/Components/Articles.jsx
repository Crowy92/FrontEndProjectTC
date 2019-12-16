import React, { Component } from 'react';
import { getArticles, deleteArticle } from './Apis';
import { Link } from '@reach/router';
import ArticlesNav from './ArticlesNav'

class Articles extends Component {
    state = {
        articles: [],
        isLoading: true,
        sort_by: "",
        topic: "",
        page: 1
    }

    componentDidMount = () => {
        this.fetchArticles()
    }

    componentDidUpdate = (prevProps, prevState) => {
        const { topic, sort_by, page } = this.state
        if (prevState.topic !== topic || prevState.sort_by !== sort_by || prevState.page !== page) {
            this.fetchArticles()
        } else if (prevProps.page !== this.props.page) {
            this.fetchArticles()
        }
    }

    fetchArticles = () => {
        getArticles(this.state.topic, this.state.page, this.state.sort_by).then(({ articles, total_count }) => {
            this.setState({
                articles,
                isLoading: "false",
                total_count
            })
        })
    }

    changePage = (event) => {
        const { value } = event.target
        this.setState((currentState) => {
            const newPage = parseInt(currentState.page) + parseInt(value);
            return { page: newPage }
        })
    }

    handleSubmit = (sort_by, topic) => {
        this.setState({ sort_by, topic })
    }

    deleteArticle = (article_id) => {
        deleteArticle(article_id).then((response) => {
            this.setState((currentState) => {
                const updatedArticles = currentState.articles.filter(article => article.article_id.toString() !== article_id.toString())
                return { articles: updatedArticles }
            })
        })
    }

    render() {
        let { articles, isLoading, page, total_count } = this.state;
        const { user } = this.props;
        if (isLoading === true) return <h2>Loading...</h2>
        return (
            <div>
                < ArticlesNav handleSubmit={this.handleSubmit} />
                <ul>
                    {articles.map(article => {
                        const date = article.created_at.slice(0, 10)
                        return (
                            <li key={article.article_id}>
                                <Link key={article.article_id} to={`/article/${article.article_id}`}>
                                    <h2>{article.title}</h2>
                                </Link>
                                <div className="flexRow">
                                    <p>Votes: {article.votes}</p>
                                    <p>Topic: {article.topic}</p>
                                </div>
                                <div className="flexRow">
                                    <p>Author: {article.author}</p>
                                    <p>Posted: {date}</p>
                                </div>
                                {user === article.author && <button onClick={() => this.deleteArticle(article.article_id)} className="pagebtn">Delete</button>}
                            </li>
                        )
                    })}
                </ul>
                <div className="flexRow">
                    <button disabled={page < 2} onClick={this.changePage} value={-1} className="pagebtn">
                        Previous
                    </button>
                    <h3>Articles: {page * 10 - 9} to {page * 10 > total_count ? total_count : page * 10} out of {total_count}</h3>
                    <button disabled={page > Math.floor(total_count / 10)} onClick={this.changePage} value={1} className="pagebtn">
                        Next
                    </button>
                </div>
            </div>
        );
    }
}

export default Articles;