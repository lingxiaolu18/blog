const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const posts = require('./posts');
const session = require('./session');
const PORT = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('./build'));

const web = (res) => {
    return ({ message, status, data }={}) => {
      if(!message && !data) {
        data = 'OK';
      }
      res.status(status || 200).json({ message, data });
    };
  };

  //session
app.get('./session', (req, res) => {
    const sid = req.cookies.sid;
    const validSession = session.validateSession(sid);
    if(!validSession){
        res.clearCookie('sid');
        web(res)({status: 401, message: 'invalid session'});
        return;
    }
    web(res)({ data: session.getSession(sid) } );
});

app.post('./session', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const sessionInfo = session.attemptCreate(username, password);
    if(!sessionInfo) {
        web(res)({ status: 403, message: 'login denied' });
        return;
    }
    res.cookie('sid', sessionInfo.sid, { MaxAge: 1000*60*60*24 } );
    web(res)({data: sessionInfo});
});

//posts
app.get('/posts/:username', (req, res) => {
    const sid = req.cookies.sid;
    const validSession = session.validateSession(sid);
    if(!validSession) {
        res.clearCookie('sid');
        web(res)({status: 401, message: 'no valid session' });
        return;
    }
    const username = req.params.username;
    const isAllowed = session.canReadUser({ sid, username });
    if(!isAllowed) {
        web(res)({status: 403, message: 'action not permitted' });
        return;
    }
    web(res)({ data: posts.readAll(username) } );
});

//get a post
app.get('/posts/:username/:postId', (req, res) => {
    const sid = req.cookies.sid;
    const validSession = session.validateSession(sid);
    if(!validSession) {
        res.clearCookie('sid');
        web(res)({status: 401, message: 'no valid session' });
        return;
    }

    const username = req.params.username;
    const isAllowed = session.canReadUser({ sid, username });
    if(!isAllowed) {
        web(res)({status: 403, message: 'action not permitted' });
        return;
    }

    const postId = req.params.postId;
    const post = posts.readPost({ username, postId });
    if(!post) {
        web(res)({ status: 404, message: 'no such postId' });
        return;
    }
    web(res)({ data: post } );
});

//add a new post
app.post('/posts/:username', (req, res) => {
    const sid = req.cookies.sid;
    const validSession = session.validateSession(sid);
    if(!validSession) {
      res.clearCookie('sid');
      web(res)({status: 401, message: 'no valid session' });
      return;
    }
  
    const username = req.params.username;
    const isAllowed = session.canReadUser({ sid, username });
    if(!isAllowed) {
      web(res)({status: 403, message: 'action not permitted' });
      return;
    }
  
    const post = req.body.post;
  
    web(res)({ data: posts.addPost({ username, post })});
});

//update a post
app.put('/posts/:username/:postId', (req, res) => {
    const sid = req.cookies.sid;
    const validSession = session.validateSession(sid);
    if(!validSession) {
        res.clearCookie('sid');
        web(res)({status: 401, message: 'no valid session' });
        return;
    }

    const username = req.params.username;
    const isAllowed = session.canReadUser({ sid, username });
    if(!isAllowed) {
        web(res)({status: 403, message: 'action not permitted' });
        return;
    }

    const postId = req.params.postId;
    const post = req.body.post;

    const newPost = posts.replaceTask({ username, postId, post });
    if(!newPost) {
        web(res)({ status: 400, message: 'failed to update' });
        return;
    }
    web(res)({ data: newPost } );

});

//delete a post
app.delete('/posts/:username/:postId', (req, res) => {
    const sid = req.cookies.sid;
    const validSession = session.validateSession(sid);
    if(!validSession) {
      res.clearCookie('sid');
      web(res)({status: 401, message: 'no valid session' });
      return;
    }
  
    const username = req.params.username;
    const isAllowed = session.canReadUser({ sid, username });
    if(!isAllowed) {
      web(res)({status: 403, message: 'action not permitted' });
      return;
    }
  
    const postId = req.params.postId;
    const post = posts.removeTask({ username, postId });
    if(!post) {
      web(res)({ status: 404, message: 'no such taskId' });
      return;
    }
    web(res)({ data: post } );
})




app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`) );