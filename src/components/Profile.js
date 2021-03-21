

import React from 'react';
import publicUrl from 'utils/publicUrl';

import PostThumbnail from './PostThumbnail';

import css from './Profile.module.css';
function Profile(props) {
    return(
        <div>
        <section className={css.profileHeader}>
            <img className={css.profilePhoto} src={publicUrl(props.user.photo)} alt={props.user.id}/>
            <span className={css.profileName}>{props.user.id}</span>
        </section>
        <section className={css.bio}>
            <span className={css.bold}>{props.user.name}</span>
            <span>{props.user.bio}</span>
        </section>
        <hr/>
        
        <section className={css.posts}>
            {props.posts.map(p => (
                <PostThumbnail key={p.id} post={p}/>
            ))}
        </section>
    </div>
);
}

export default Profile;