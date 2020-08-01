const {v4: uuidv4} = require('uuid');

const posts = {};

const addPost = ({username, post}) => {
    posts[username] = posts[username] || {};
    const postId = uuidv4();
    posts[username][postId] = {...post, postId};
    return posts[username][postId];
};

const readPost = ({username, postId}) => {
    if(!posts[username]){
        return {};
    }
    return posts[username][postId];
};

const readAll = (username) => {
    if(!posts[username]){
        return {};
    }
    return posts[username];
};

const removePost = ({username, postId}) => {
    if(!posts[username]){
        return;
    }
    const post = posts[username][postId];
    delete posts[username][postId];
    return post;
};

module.exports = {
    addPost,
    readPost,
    readAll,
    removePost
}