const {v4: uuidv4} = require('uuid');

const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    

function getFormatedDate(){
    let dateObj = new Date();
    let month = monthNames[dateObj.getMonth()];
    let day = String(dateObj.getDate()).padStart(2, '0');
    let year = dateObj.getFullYear();
    let output = month  + '\n'+ day  + ',' + year;
    return output;
}

const posts = {
    '123': 
    {
        '31258423': 
        {
            'title': 'React Tutorial',
            'username': 'Admin',
            'userId': '123',
            'postId': '31258423hsadwa',
            'timeStamp': 'August 04,2020',
            'img': 'https://mildaintrainings.com/wp-content/uploads/2017/11/react-logo.png'
        },
        '125523fg': 
        {
            'title': 'Porn',
            'username': 'Admin',
            'userId': '123',
            'postId': '125523fg',
            'timeStamp': 'August 04,2020',
            'img': 'http://tongle78.com/pic/2617/e910045730c585d54130afe000bab57b.jpg?imageView2/4/w/900/h/900'
        },
        '21412421': 
        {
            'title': 'Porn',
            'username': 'Admin',
            'userId': '123',
            'postId': '21412421',
            'timeStamp': 'August 04,2020',
            'img': 'http://www.14tv.com//upload/2020-06-02/44d582936d4044977f411bbd5e1dbb08.jpg'
        },
        'djk2190': 
        {
            'title': 'Porn',
            'username': 'Admin',
            'userId': '123',
            'postId': 'djk2190',
            'timeStamp': 'August 04,2020',
            'img': 'http://www.acgnhy.com/wp-content/uploads/2020/02/18b03ba6be5f5c.jpg'
        },
        '2189djio2': 
        {
            'title': 'Porn',
            'username': 'Admin',
            'userId': '123',
            'postId': '2189djio2',
            'timeStamp': 'August 04,2020',
            'img': 'http://up.mm8mm88.com/pic/b0/09/8d/b0098d5bce1bb7a18c5582f41be931c0.jpg'
        }
    }
};

const addPost = ({userId, post}) => {
    posts.userId = posts[userId] || {};
    const postId = uuidv4();
    posts[userId][postId] = {...post, userId, postId, timeStamp: new Date()};
    return posts[userId][postId];
};

const readPost = ({userId, postId}) => {
    if(!posts[userId]){
        return {};
    }
    return posts[userId][postId];
};

const readFromAllUsers = () => {
    //return an array of posts
    const temp = [];
    for(let i of Object.keys(posts)){
        for(let j of Object.keys(posts[i])){
            temp.push(posts[i][j]);
        }
    }
    return temp;
}

//read all posts from a single user:
const readAll = (userId) => {
    if(!posts[userId]){
        return [];
    }
    const temp = [];
    for(let i = 0; i < Object.keys(posts[userId]).length; i++){
        temp.push(posts[userId][i]);
    }
    return temp;
};

const removePost = ({userId, postId}) => {
    if(!posts[userId]){
        return;
    }
    const post = posts[userId][postId];
    delete posts[userId][postId];
    return post;
};

module.exports = {
    addPost,
    readPost,
    readAll,
    removePost,
    readFromAllUsers
}