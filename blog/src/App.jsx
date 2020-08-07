import React, {useState, useEffect, useReducer} from 'react';
import './App.css';
import * as services from './services';
import LoginPane from './LoginPane';
import Posts from './Posts';
import Error from './Error';
import SignupPane from './SignupPane';

export const StateContext = React.createContext();

const initialState = {
  isLoggedIn: false,
  showSignup: false,
  userName: '',
  error: '',
  posts: []
};

const reducer = (state, action) => {
  switch(action.type){
    case 'REGISTER_SUCCESS':
      return {...state, showSignup: false}
    case 'REGISTER_FAILED':
      return {...state, showSignup: true, error: action.payload}
    case 'LOGIN_SUCCESS':
      return {...state, isLoggedIn: true, userName: action.payload};
    case 'LOGIN_FAILED':
      return {...state, isLoggedIn: false, error: action.payload};
    case 'POSTS_FETCHED':
      return {...state, posts: action.payload.data}
    case 'ERR_FOUND':
      return {...state, error: action.payload}
    case 'TOGGLE_SIGNUP':
      return {...state, showSignup: action.payload}
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const callRegister = (username, password) => {
  services.fetchRegister(username, password)
  .then((response) => {
    dispatch({type: 'REGISTER_SUCCESS', payload: username});
  })
  .catch((e) => {
    dispatch({type: 'REGISTER_FAILED', payload: false});
    // dispatch({type: 'LOGIN_FAILED', payload: e})
  })
}

const callLogin = (username, password) => {
  services.fetchLogin(username, password)
  .then((response) => {
    dispatch({type: 'LOGIN_SUCCESS', payload: username});
    fetchAllPosts();
  })
  .catch((e) => {
    dispatch({type: 'ERR_FOUND', payload: e.message});
  })
}

const fetchAllPosts = () => {
  services.fetchAllUserPosts()
  .then(response => {
    // setPosts(response.data);
    dispatch({type: 'POSTS_FETCHED', payload: response})
    dispatch({type: 'ERR_FOUND', payload: ''})
  })
  .catch(err => {
    console.log(err);
    //set error message
    dispatch({type: 'ERROR_FOUND', payload: err.message})
  });
};

  useEffect(() => {
    services.fetchLoginStatus()
    .then((response) => {
      dispatch({type: 'LOGIN_SUCCESS', payload: response})
      fetchAllPosts();
    })
    .catch((err) => {
      dispatch({type: 'ERR_FOUND', payload: err.message});
    });
  }, []);

  return (
    <StateContext.Provider value = {{Context: state, Dispatch: dispatch, callRegister: callRegister, callLogin: callLogin}}>
    <div className="App">
      <div className = "Content">
        {state.error? <Error err = {state.error}/> : ''}
        {state.showSignup? <SignupPane/> : state.isLoggedIn? '' : <LoginPane dispatch = {dispatch}/>}
        {state.isLoggedIn? <Posts postsToDisplay = {state.posts}/> : ''}
      </div>
    </div>
    </StateContext.Provider>
  );
}

export default App;
