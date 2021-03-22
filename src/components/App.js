
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


  function renderMain(page) {
    switch (page) {
      case "home": return <Home
      store={store}
      onLike={addLike} 
      onUnlike={removeLike}
      onComment={addComment}
      
    />;
      case "explore": return <Explore />;
      case "newPost": return <NewPost 
      store={store}
      addPost={addPost}
      cancelPost={cancelPost}
      />;
      case "like": return <Activity />;
      case "profile": 
        
        return <Profile
        user={findUser(store.currentUserId, store)}
        posts={findPosts(store.currentUserId, store)}
      />;
      default: return <Home
      store={store}
      onLike={addLike}
      onUnlike={removeLike}
      onComment={addComment}

     
    />;
      
    }
    
  }



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
  }

 
  return(
    <div className={css.container}>
    <Header />
    <main className={css.content}>
      {renderMain(page)}
    </main>
    <NavBar onNavChange={setPage} />
  </div>
    );
  
}


export default App;