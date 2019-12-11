import React, { Component } from 'react';
import { getArticles } from './Apis';
import { Link } from '@reach/router';
import { Button } from 'react-bootstrap'

class Articles extends Component {
    state = {
        articles: [],
        isLoading: true,
        page: 1
    }

    fetchArticles = () => {
        getArticles(this.props.topic, this.props.page).then(articles => {
            this.setState({
                articles,
                isLoading: "false"
            })
        })
    }

    componentDidMount = () => {
        this.fetchArticles()
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.topic !== this.props.topic) {
            this.fetchArticles()
        } else if (prevProps.page !== this.props.page) {
            this.fetchArticles()
        }
    }

    render() {
        let { articles, isLoading } = this.state;
        if (isLoading === true) return <h2>Loading...</h2>
        return (
            <div>
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
            </div>
        );
    }
}

export default Articles;