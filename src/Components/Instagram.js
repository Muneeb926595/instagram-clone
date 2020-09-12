import React, { useState, useEffect } from 'react';
import Post from './Post';
import { db } from '../firebase';
import InstagramEmbed from 'react-instagram-embed';


function Instagram({ logedInUser }) {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({ id: doc.id, post: doc.data() })))
        })
    }, [])
    return (
        <div className="instagram__body">
            <div className="instagram__postLeft">
                {
                    posts.map(({ id, post }) => {
                        return (
                            <Post key={id} logedInUser={logedInUser} postId={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
                        )
                    })
                }
            </div>
            <div className="instagram__postRight">
                <InstagramEmbed
                    url='https://www.instagram.com/p/B704oKHD6k-/'
                    maxWidth={320}
                    hideCaption={false}
                    containerTagName='div'
                    protocol=''
                    injectScript
                    onLoading={() => { }}
                    onSuccess={() => { }}
                    onAfterRender={() => { }}
                    onFailure={() => { }}
                />
            </div>
        </div>
    )
}

export default Instagram;