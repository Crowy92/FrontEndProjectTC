import React, { Component } from 'react';
import { getTopics } from './Apis';

class ArticlesNav extends Component {
    state = {
    }

    handleChange = (event) => {
        this.setState({ sort_by: event.target.value })
    }

    handleTopics = (event) => {
        this.setState({ topic: event.target.value })
    }

    componentDidMount = () => {
        this.findTopics()
    }

    findTopics = () => {
        getTopics().then(topics => {
            this.setState({ topics })
        })
    }

    submitter = () => {
        this.props.handleSubmit(this.state.sort_by, this.state.topic)
    }

    render() {
        let { topics } = this.state;
        const { user } = this.props;
        if (!topics) return <h2>Loading...</h2>
        return (
            <div className="navigation">
                <div className="dropdown">
                    <button className="dropbtn">SortBy</button>
                    <div className="dropdown-content">
                        <label onChange={this.handleChange}><input className="dropdown" type="radio" name="sort" value="created_at" />date</label><br />
                        <label onChange={this.handleChange}><input className="dropdown" type="radio" name="sort" value="comment_count" />comments</label><br />
                        <label onChange={this.handleChange}><input className="dropdown" type="radio" name="sort" value="votes" />votes</label>< br />
                    </div>
                </div>
                <div className="dropdown">
                    <button className="dropbtn">Topics</button>
                    <div className="dropdown-content">
                        {topics.map(topic => {
                            return (
                                <div key={topic.slug}>
                                    <label onChange={this.handleTopics}><input className="dropdown" name="topic" type="radio" value={topic.slug} />{topic.slug}</label>
                                </div>
                            )
                        })}
                        <div key="seperator">
                            <label>____________</label>
                        </div>
                        <div key="all">
                            <label onChange={this.handleTopics}><input className="dropdown" name="topic" type="radio" value="" />All Topics</label>
                        </div>
                    </div>
                </div>
                <div className="dropdown">
                    <button onClick={this.submitter} className="pagebtn-large">Search</button>
                </div>
            </div>
        );
    }
}

export default ArticlesNav;