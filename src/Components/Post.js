import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { db } from '../firebase';
import firebase from 'firebase';

function Post({ logedInUser, postId, username, caption, imageUrl }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection('posts')
                .doc(postId)
                .collection('comments')
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()))
                })
        }
        return () => {
            unsubscribe();
        }
    }, [postId])


    function postComment(event) {
        event.preventDefault();

        db.collection('posts').doc(postId).collection('comments').add({
            text: comment,
            username: logedInUser.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setComment('');
    }

    return (
        <div className="post">
            <div className="post__header">
                <Avatar className="post__avatar" alt={username} src="/static/images/avatar/1.jpg" />
                <h5>{username}</h5>
            </div>

            <img className="post__image" src={imageUrl} alt={username} />

            <p className="post__footer"><strong>{username}: </strong>{caption}</p>

            <div className="post__comments">
                {comments.map((newcomment) => {
                    return (
                        <p>
                            <strong>{newcomment.username}:</strong>{newcomment.text}
                        </p>)
                })}
            </div>

            {logedInUser && (
                <form className="post_newCommentBox">
                    <input
                        className="post_newCommentinput"
                        value={comment}
                        placeholder="Add a comment..."
                        type="text"
                        onChange={(event) => setComment(event.target.value)}
                    />
                    <button disabled={!comment} className="post_newCommentbutton" type="submit" onClick={postComment}>Post</button>
                </form>
            )}
        </div>
    )
}

export default Post;