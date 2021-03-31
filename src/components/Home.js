import React from 'react';
import css from './App.module.css';
import Post from './Post';
import {findLikes, findComments} from 'utils/find';
import { useParams } from 'react-router-dom';


function Home(props) {
  let {postId} = useParams(); // the variable name has to match the parameter name
  const {store} = props; // retrieve store

  function findUser(post, store){
    return store.users.find(user=>user.id===post.userId);
  }

  return (		
    <div>
 {store.posts.filter(post => (
                postId ? post.id === postId : true
            )).sort((a, b) => (
                new Date(b.datetime) - new Date(a.datetime)
            )).map(post => (
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