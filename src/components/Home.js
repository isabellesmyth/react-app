
import css from './App.module.css';
import Post from './Post';
import { findLikes, findComments } from 'utils/find';
import { useParams } from 'react-router-dom';
import React, { useContext } from 'react';
import { StoreContext } from 'contexts/StoreContext';

function Home(props) {
 console.log(useContext(StoreContext));
  let {
    posts, users, comments, likes, currentUserId,
    addComment, addLike, removeLike
  } = useContext(StoreContext);

  let { postId } = useParams(); // the variable name has to match the parameter name
  const { store } = props; // retrieve store

  function findUser(post) {
    return users.find(user => user.id === post.userId);
  }

  return (
    <div>
      {posts.filter(post => (
        postId ? post.id === postId : true
      )).sort((a, b) => (
        new Date(b.datetime) - new Date(a.datetime)
      )).map(post => (
        <Post
          key={post.id}
          user={findUser(post, users)}
          post={post}
          comments={findComments(post, comments)}
          likes={findLikes(post, likes, currentUserId)}
          onLike={addLike}
          onUnlike={removeLike}
          onComment={addComment}
        />
      ))}
    </div>
  );

}



export default Home;