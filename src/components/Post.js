import timespan from 'utils/timespan';
import React from 'react';
import css from './Post.module.css';
import publicUrl from 'utils/publicUrl';
import Comments from './Comments'





class Post extends React.Component {
    constructor(props) {
        super(props);
    }

 

    render() {
        return (      
            <section className={css.post}>

            <header className={css.Header}>
                <img className={css.profilePhoto} src={publicUrl(this.props.user.photo)} alt={this.props.user.id}/>
                <span className={css.bold}>{this.props.post.userId}</span>
            </header>
            <img className={css.postPhoto} src={publicUrl(this.props.post.photo)} alt={this.props.post.desc}/>
            
            <div className={css.activityBar}>
                <button >
                    <img src={this.props.likes.self ? publicUrl('/assets/like.svg') : publicUrl('/assets/unlike.svg')}/>
                    <img src={publicUrl('/assets/comment.svg')}/>
                </button>
                <div className={`${css.bold} ${css.item}`}>{this.props.likes.count} likes</div>
            </div>

            <div className={css.item}>
                <Comments username={this.props.user.id} text={this.props.post.desc}/>
                {this.props.comments.map((c, i) => (
                    <Comments key={i} username={c.userId} text={c.text}/>
                ))}
            </div>

            <div className={`${css.item} ${css.postTimestamp}`}>{timespan(this.props.post.datetime)}</div>
        </section>
);
    }
}
export default Post;