import React from 'react';
import css from './App.module.css';
import Post from './Post';
import {findLikes, findComments} from 'utils/find';

function Home(props) {

  const {store} = props; // retrieve store

  function findUser(post, store){
    return store.users.find(user=>user.id===post.userId);
  }

  return (		
    <div>
    {store.posts.sort((a, b) => new Date(b.datetime) - new Date(a.datetime)).map(post => (
        <Post
        key={post.id}
        user={findUser(post, store)}
        post={post}
        comments={findComments(post, store)}
        likes={findLikes(post, store)}
        onLike={props.onLike} 
        onUnlike={props.onUnlike}
        onComment={props.onComment} 
        />
    ))}
</div>
  );

}



export default Home;