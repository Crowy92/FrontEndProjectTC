import React, { Component } from 'react';
import { getArticles } from './Apis';
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
        getArticles(this.state.topic, this.state.page, this.state.sort_by).then(articles => {
            this.setState({
                articles,
                isLoading: "false"
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

    render() {
        let { articles, isLoading, page } = this.state;
        if (isLoading === true) return <h2>Loading...</h2>
        return (
            <div>
                < ArticlesNav handleSubmit={this.handleSubmit} />
                <ul>
                    {articles.map(article => {
                        const date = article.created_at.slice(0, 10)
                        return (
                            <Link key={article.article_id} to={`/article/${article.article_id}`}>
                                <li key={article.article_id}>
                                    <h2>{article.title}</h2>
                                    <div className="flexRow">
                                        <p>Votes: {article.votes}</p>
                                        <p>Topic: {article.topic}</p>
                                    </div>
                                    <div className="flexRow">
                                        <p>Author: {article.author}</p>
                                        <p>Posted: {date}</p>
                                    </div>
                                </li>
                            </Link>
                        )
                    })}
                </ul>
                <div className="flexRow">
                    <button onClick={this.changePage} value={-1} className="pagebtn">
                        Previous
                    </button>
                    <h3>Page: {page} </h3>
                    <button onClick={this.changePage} value={1} className="pagebtn">
                        Next
                    </button>
                </div>
            </div>
        );
    }
}

export default Articles;