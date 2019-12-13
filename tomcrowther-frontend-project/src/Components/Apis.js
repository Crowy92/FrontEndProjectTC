import axios from "axios";

export const getArticles = (topic, p, sort_by) => {
    console.log(topic, p, sort_by)
    return axios.get('https://tom-crowthers-ncoders-project.herokuapp.com/api/articles', { params: { topic, p, sort_by } })
        .then(({ data }) => {
            return {
                articles: data.articles,
                total_count: data.total_count
            }
        })
}

export const getTopics = () => {
    return axios.get('https://tom-crowthers-ncoders-project.herokuapp.com/api/topics')
        .then(({ data }) => {
            return data.topics
        })
}

export const getUsers = () => {
    return axios.get('https://tom-crowthers-ncoders-project.herokuapp.com/api/users')
        .then(({ data }) => {
            return data.users
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

export const postComment = (artId, username, body) => {
    username = username.split(' ').join('_');
    return axios.post(`https://tom-crowthers-ncoders-project.herokuapp.com/api/articles/${artId}/comments`, { username, body })
        .then(({ data }) => {
            return data.comment
        })
}

export const deleteComment = (comment_id) => {
    return axios.delete(`https://tom-crowthers-ncoders-project.herokuapp.com/api/comments/${comment_id}`)
        .then(({ data }) => {
            return data;
        })
}

export const postArticle = (title, body, author, topic) => {
    author = author.split(' ').join('_');
    return axios.post(`https://tom-crowthers-ncoders-project.herokuapp.com/api/articles`, { title, body, author, topic })
        .then(({ data }) => {
            return data.article
        })
}