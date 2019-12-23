import React, { Component } from 'react';
import { getTopics, postArticle } from './Apis';
import ErrorDisplay from './ErrorDisplay';
import { CarouselProvider, Slider, Slide, Image } from "pure-react-carousel"
import "pure-react-carousel/dist/react-carousel.es.css"

class ArticlePoster extends Component {
    state = {
        isLoading: true,
        topic: '',
        body: '',
        title: ''
    }

    handleTopics = (event) => {
        this.setState({ topic: event.target.value })
    }

    componentDidMount = () => {
        this.findTopics()
    }

    findTopics = () => {
        getTopics().then(topics => {
            this.setState({ topics, isLoading: false })
        })
    }

    handleText = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { body, title, topic } = this.state;
        this.setState({
            topic: '',
            body: '',
            title: '', post: true
        })
        postArticle(title, body, this.props.user, topic).catch(({ response }) => {
            this.setState({
                err: {
                    status: response.status || 500,
                    msg: response.msg || "Something went wrong"
                }

            })
        })
    }

    handleClick = (event) => {
        event.preventDefault()
    }

    render() {
        const { isLoading, topics, body, title, topic, post, err } = this.state;
        if (isLoading === true) return <h2>Loading...</h2>
        if (err) return (<ErrorDisplay err={err} />)
        if (post === true) return <h1>Article posted!</h1>
        return (
            <div>
                <form className="containerPostArticle">
                    <input className="postArticleInput" value={title} onChange={this.handleText} name='title' placeholder="article title" type="text"></input>
                    <textarea className="postArticleText" value={body} onChange={this.handleText} name='body' placeholder="article body"></textarea>
                    <div className="navigation">
                        <div className="dropdown">
                            <button onClick={this.handleClick} className="dropbtn">Topics</button>
                            <div className="dropdown-content">
                                {topics.map(topic => {
                                    return (
                                        <div key={topic.slug}>
                                            <label onChange={this.handleTopics}><input className="dropdown" name="topic" type="radio" value={topic.slug} />{topic.slug}</label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <button onClick={this.handleSubmit} disabled={!topic || !body || !title} className="pagebtn">
                        <p >Post</p>
                    </button>
                </form>
                <CarouselProvider
                    className="carousel"
                    naturalSlideWidth={3}
                    naturalSlideHeight={2}
                    totalSlides={5}
                    interval={5000}
                    isPlaying={true}
                    playDirection={"forward"}
                >
                    <Slider>
                        <Slide index={3}>
                            <Image src="https://images.pexels.com/photos/47354/the-ball-stadion-football-the-pitch-47354.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                        </Slide>
                        <Slide index={1}>
                            <Image src="https://images.pexels.com/photos/2284166/pexels-photo-2284166.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                        </Slide>
                        <Slide index={2}>
                            <Image src="https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                        </Slide>
                        <Slide index={4}>
                            <Image src="https://images.pexels.com/photos/2786744/pexels-photo-2786744.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
                        </Slide>
                        <Slide index={5}>
                            <Image src="https://images.pexels.com/photos/3361704/pexels-photo-3361704.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
                        </Slide>
                    </Slider>

                </CarouselProvider>
            </div>

        );
    }
}

export default ArticlePoster;