import { Link } from "@reach/router";
import React, { Component } from 'react';
import { getTopics } from './Apis'

class Header extends Component {
    state = {
        topics: [],
        username: "",
        isLoggedIn: false,
        page: 1
    }

    componentDidMount = () => {
        this.findTopics();
    }

    findTopics = () => {
        getTopics().then(topics => {
            this.setState({ topics })
        })
    }

    changePage = (event) => {
        const { id } = event.target;
        console.dir(event.target)
        this.setState((currentState) => {
            const newPage = parseInt(currentState.page) + parseInt(id);
            if (newPage > 0) return { page: newPage }
            else return {}
        })
    }

    render() {
        console.log(this.state.page)
        let { topics } = this.state
        return (
            <div>
                <img alt="news-logo" className="logo" src="https://storiesflistgv2.blob.core.windows.net/stories/2017/10/newsbanner_24Aug_b.jpg" />
                <div className="navigation">
                    <div className="dropdown">
                        <button className="dropbtn">
                            <Link to="/">
                                <p >Home</p>
                            </Link>
                        </button>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">Topics</button>
                        <div className="dropdown-content">
                            {topics.map(topic => {
                                return (
                                    <div key={topic.slug}>
                                        <Link to={`/articles/topics/${topic.slug}`}>
                                            <p >{topic.slug}</p>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="flexRow">
                        <Link to={`/articles/pages/${this.state.page - 1}`}>
                            <button id={-1} onClick={this.changePage} className="pagebtn">
                                Previous
                            </button></Link>
                        <h3>Page: {this.state.page} </h3>
                        <Link to={`/articles/pages/${this.state.page + 1}`}>
                            <button id={1} onClick={this.changePage} className="pagebtn">
                                Next
                            </button></Link>
                    </div>
                </div>
            </div >
        );
    }
}

export default Header;