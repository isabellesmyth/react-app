
import React, {useState} from 'react';

import Home from './Home';
import css from './App.module.css';
import Header from './Header';
import NavBar from './NavBar';
import Activity from './Activity';
import NewPost from './NewPost';
import Explore from './Explore';
import Profile from './Profile';
import publicUrl from 'utils/publicUrl';
import initialStore from 'utils/initialStore';
import {findUser, findPosts} from 'utils/find';
import uniqueId from 'utils/uniqueId';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {

    const [page, setPage] = useState('home');
    const [store, setStore] = useState(initialStore); 

    function addPost(photo, desc){
      const newPost = {
        id: uniqueId('post'),
        userId: store.currentUserId,
        photo,
        desc,
        datetime: new Date().toISOString()
      };
      setStore({
        ...store,
        posts: store.posts.concat(newPost)
      });
      setPage('home');
      // TODO:
      // 1. Create a new post object (use uniqueId('post') to create an id)
      // 2. Update the store 
      // 3. Call setPage to come back to the home page
    }
    function cancelPost(){
      setPage('home');
      // TODO:
      // 1. Call setPage to come back to the home page (we will use Router to improve this)
    }
  
    function addFollower(userId, followerId){
      // use concat
      const newFollower = {
        userId,
        followerId: store.currentUserId
      }
      setStore({
        ...store,
        followers: store.followers.concat(newFollower)
      });
      console.log("followed")
    }
    function removeFollower(userId, followerId){
      // use filter
      console.log("unfollowed")
      setStore({
        ...store,// spread props. make sure you understand this
        followers: store.followers.filter(follower=>!(follower.followerId===store.currentUserId && follower.userId===userId))
      
    });
    }
    
    function addLike(postId){
      const like = {
          userId: store.currentUserId, 
          postId,
          datetime: new Date().toISOString()
      };
      
      setStore({
        ...store,
        likes: store.likes.concat(like)
      });

      console.log("added like to store");
    }
    
    function removeLike(postId){
      const like = {
        userId: store.currentUserId, 
        postId, // make sure you understand this shorthand syntax
       
    };
    
    setStore({
      ...store,// spread props. make sure you understand this
      likes: store.likes.filter(like=>!(like.userId===store.currentUserId && like.postId===postId))
    
  });
      
    }


  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className={css.container}>
        <Header/>
        <main className={css.content}>
    <Switch>
<Route path="/home">
<Home store={store}
      onLike={addLike}
      onUnlike={removeLike}
      onComment={addComment}
    />
  </Route>
  <Route path="/newPost">
  <NewPost store={store}
      addPost={addPost}
      cancelPost={cancelPost}
      />
  </Route>
  <Route path="/like">
  <Activity />
  </Route>
  <Route path="/profile/:userId?">
  <Profile store={store}
   onFollow={addFollower}
   onUnfollow={removeFollower} />
</Route>
  <Route path="/explore">
      <Explore store={store}/>
  </Route>
	<Route path="/profile">
  <Profile store={store}
  onFollow={addFollower}
  onUnfollow={removeFollower}
      />
  </Route>
  <Route path="/:postId?">
  <Home store={store}
        onLike={addLike}
        onUnlike={removeLike}
        onComment={addComment}/>
</Route>

  <Route path="/">
    <Home store={store}
          onLike={addLike}
          onUnlike={removeLike}
          onComment={addComment}/>
  </Route>
</Switch>
        </main>
        <NavBar/>
      </div>
    </Router>
  );

  


  function addComment(postId, text){
    const comment = {
      userId: store.currentUserId, 
      postId,
      text,
      datetime: new Date().toISOString()
    };
    setStore({
      ...store,
        comments:store.comments.concat(comment)
    });

    console.log("added comment to store");
  }

 
  return(

      <Router basename={process.env.PUBLIC_URL}>
        <div className={css.container}>
          ...
        </div>
      </Router>
    
    );
  
}


export default App;