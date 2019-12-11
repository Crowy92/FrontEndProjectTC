import axios from "axios";

export const getArticles = (topic, p) => {
    return axios.get('https://tom-crowthers-ncoders-project.herokuapp.com/api/articles', { params: { topic, p } })
        .then(({ data }) => {
            console.dir(data)
            return data.articles
        })
}

export const getTopics = () => {
    return axios.get('https://tom-crowthers-ncoders-project.herokuapp.com/api/topics')
        .then(({ data }) => {
            return data.topics
        })
}

export const getArticle = (article_id) => {
    return axios.get(`https://tom-crowthers-ncoders-project.herokuapp.com/api/articles/${article_id}`)
        .then(({ data }) => {
            return data.article
        })
}

export const getComments = (article_id) => {
    return axios.get(`https://tom-crowthers-ncoders-project.herokuapp.com/api/articles/${article_id}/comments`)
        .then(({ data }) => {
            return data.comments
        })
}

export const patchComment = (id, name) => {
    return axios.patch(`https://tom-crowthers-ncoders-project.herokuapp.com/api/comments/${id}`, { inc_votes: name })
        .then(({ data }) => {
            return data.comment
        })
}

export const patchArticle = (id, name) => {
    return axios.patch(`https://tom-crowthers-ncoders-project.herokuapp.com/api/articles/${id}`, { inc_votes: name })
        .then(({ data }) => {
            return data.article
        })
}
