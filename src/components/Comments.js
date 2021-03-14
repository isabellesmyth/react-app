import React from 'react';

import css from './Comments.module.css';

class Comments extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={css.comment}>
                <span className={css.username}>{this.props.username}</span>
                <span className={css.text}>{this.props.text}</span>
            </div>
        );
    }
}

export default Comments;