import { Button } from '@material-ui/core';
import { db, storage } from '../firebase';
import firebase from 'firebase';
import React, { useState } from 'react';

function AddNewPost({ username }) {
    const [caption, setCatpion] = useState('');
    const [image, setImage] = useState('');
    const [progress, setProgress] = useState('');


    function handleChange(event) {
        if (event.target.files[0]) {
            setImage(event.target.files[0])
        }
    }

    function handleUpload() {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const currentProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(currentProgress);
            },
            (error) => { alert(error.message) },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            username: username,
                            caption: caption,
                            imageUrl: url
                        });

                        setProgress(0);
                        setImage(null);
                        setCatpion('');
                    });
            }
        )

    }

    return (
        <div className="imageupload">
            <progress className="imageupload_progressbar" max="100" value={progress} />
            <input className="imageupload__input" placeholder="Enter A Caption..." type="text" value={caption} onChange={(event) => setCatpion(event.target.value)} />
            <input type='file' onChange={handleChange} />
            <Button onClick={handleUpload}>Add New Post</Button>
        </div>
    )
}

export default AddNewPost;