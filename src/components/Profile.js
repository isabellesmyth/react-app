

import React from 'react';
import publicUrl from 'utils/publicUrl';
import {findUser, findPosts} from 'utils/find';
import PostThumbnail from './PostThumbnail';
import { Link, useParams } from 'react-router-dom';
import css from './Profile.module.css';



function Profile(props) {
    const params = useParams();
    console.log(params.userId);
    
    const { store } = props;
    const userId = params.userId ? params.userId : props.store.currentUserId;
    const user = findUser(userId, props.store);
    const followers = props.store.followers.filter(f=> f.userId == userId);
    const following = props.store.followers.filter(f=> f.followerId == userId);
    const posts = findPosts(userId, props.store);
    let follows= false;
    let user_followers= followers.map(d=>d.followerId);
    if (user_followers.filter(d=>d===store.currentUserId).length>0){
        console.log(user_followers.filter(d=>d===store.currentUserId))
        follows = true;
      }

      function handleFollow(){
        props.onFollow(userId);
      }
      function handleUnfollow(){
        props.onUnfollow(userId);
      }
    
    

    return(
        <div>
      <header className={css.header}>
        <div className={css.photo}>
          <img src={publicUrl(user.photo)} alt="Profile" />
        </div>
        <div className={css.id}>
          <span>{userId}</span>
          <br/>
          <div>
          {follows && 
        <div>
          <button className={css.unfollowBtn} onClick={handleUnfollow}>Unfollow</button>
          </div>}
          {!follows && userId != store.currentUserId &&
        <div>
          <button className={css.followBtn} onClick={handleFollow}>Follow</button>
          </div>}
</div>
        </div>
        
      </header>

      <div className={css.user}>
        <div className={css.name}>{user.name}</div>
        <div className={css.bio}>{user.bio}</div>
      </div>
      <ul className={css.activity}>
        <li>
          <span>{posts.length}</span>
          <br />
          posts
        </li>
        <li>
          <span>{followers.length}</span>
          <br />
          followers
        </li>
        <li>
          <span>{following.length}</span>
          <br />
          following
        </li>
      </ul>
      <div className={css.posts}>
        {posts.map(post => (
          <PostThumbnail post={post} />
        ))}
      </div>
    </div>
  );
}

export default Profile;