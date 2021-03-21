import timespan from 'utils/timespan';
import React from 'react';
import css from './Post.module.css';
import publicUrl from 'utils/publicUrl';
import Comments from './Comments'



function Post(props) {
   

    function handleLike(){
        props.onLike(props.post.id);

    }

    function handleUnlike(){
        props.onUnlike(props.post.id);
    }

    return (      
            <section className={css.post}>

            <header className={css.Header}>
                <img className={css.profilePhoto} src={publicUrl(props.user.photo)} alt={props.user.id}/>
                <span className={css.bold}>{props.post.userId}</span>
            </header>
            <img className={css.postPhoto} src={publicUrl(props.post.photo)} alt={props.post.desc}/>
            
            <div className={css.activityBar}>
                <button >
                    {props.likes.self?
                    <img src={ publicUrl('/assets/unlike.svg')} onClick={handleUnlike}/>:
                    <img src={ publicUrl('/assets/like.svg')} onClick={handleLike}/>
                    }
                </button>
                    <img src={publicUrl('/assets/comment.svg')}/>
                
                <div className={`${css.bold} ${css.item}`}>{props.likes.count} likes</div>
            </div>

            <div className={css.item}>
                <Comments username={props.user.id} text={props.post.desc}/>
                {props.comments.map((c, i) => (
                    <Comments key={i} username={c.userId} text={c.text}/>
                ))}
            </div>

            <div className={`${css.item} ${css.postTimestamp}`}>{timespan(props.post.datetime)}</div>
        </section>
);
    }

export default Post;