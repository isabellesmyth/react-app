

import React from 'react';
import publicUrl from 'utils/publicUrl';
import {findUser, findPosts} from 'utils/find';
import PostThumbnail from './PostThumbnail';
import { Link, useParams } from 'react-router-dom';
import css from './Profile.module.css';
import { useContext } from 'react';
import { StoreContext } from 'contexts/StoreContext';
import { Redirect } from "react-router-dom";



function Profile(props) {
    const params = useParams();
    console.log(params.userId);
    let {
       followers, users, addFollower, removeFollower, currentUserId
    } = useContext(StoreContext);
    const {posts:allPosts} = useContext(StoreContext);

    
    const userId = params.userId ? params.userId : currentUserId;
    const user = findUser(userId, users);
    const followers1 = followers.filter(f=> f.userId == userId);
    
    const following = followers.filter(f=> f.followerId == userId);
    
    const posts = findPosts(userId, allPosts);
    let follows= false;
    let user_followers= followers1.map(d=>d.followerId);
    if (user_followers.filter(d=>d===currentUserId).length>0){
        console.log(user_followers.filter(d=>d===currentUserId))
        follows = true;
      }
     

      function handleFollow(){
        addFollower(userId);
      }
      function handleUnfollow(){
        removeFollower(userId);
      }
    
    

    return(
       !user?<Redirect to="login"/>:  <div>
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
          {!follows && userId != currentUserId &&
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
          <span>{followers1.length}</span>
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
      {posts.map(p => (
                    <Link key={p.id} to={`/${p.id}`}>
                        <PostThumbnail post={p}/>
                    </Link>
                ))}
      </div>
    </div>
  );
}

export default Profile;