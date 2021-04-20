import React, { useEffect, createContext, useState } from 'react';
import uniqueId from 'utils/uniqueId.js';
import initialStore from 'utils/initialStore.js';
import firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';
import { useHistory } from 'react-router-dom'
// export the context so that other components can import
export const StoreContext = createContext();





// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyD_-qb8BhtseMA7I4RnkmAfvsF8iaEGQ5E",
    authDomain: "react-app-be7a3.firebaseapp.com",
    projectId: "react-app-be7a3",
    storageBucket: "react-app-be7a3.appspot.com",
    messagingSenderId: "213747839972",
    appId: "1:213747839972:web:0c4dcdeb27bc943e418df1"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

function StoreContextProvider(props) {




    const [currentUserId, setCurrentUserId] = useState(null); // or 'judy'
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [likes, setLikes] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [comments, setComments] = useState([]);

    const [page, setPage] = useState('home');
    //const [store, setStore] = useState(initialStore);

    let temp = JSON.parse(window.localStorage.getItem('store')) || initialStore;
    let history = useHistory();

    useEffect(() => {// initialization
        db.collection('users').get().then(snapshot => {
            const users = snapshot.docs.map(d => d.data());
            setUsers(users);
        });
        db.collection('posts').get().then(snapshot => {
            const posts = snapshot.docs.map(d => d.data());
            setPosts(posts);
        });
        db.collection('followers').get().then(snapshot => {
            const followers = snapshot.docs.map(d => d.data());
            setFollowers(followers);
        });
        db.collection('likes').get().then(snapshot => {
            const likes = snapshot.docs.map(d => d.data());
            setLikes(likes);
        });
        db.collection('comments').get().then(snapshot => {
            const comments = snapshot.docs.map(d => d.data());
            setComments(comments);
        });

    }, []);

    

    function login(email, password) {
        auth.signInWithEmailAndPassword(email, password).then((response) => {
            db.collection('users')
                .where('email','==', response.user.email)
                .get()
                .then(snapshot => {
                    setCurrentUserId(snapshot.docs[0].data().id);
                })
            history.push('/');
        }).catch(error => {
            setCurrentUserId(null);
        });
    }
    function addComment(postId, text) {
        const comment = {
            userId: currentUserId,
            postId,
            text,
            datetime: new Date().toISOString()
        };
        setComments(comments.concat(comment));
        db.collection('comments').add(comment)
        console.log("added comment to store");
    }

    function addPost(photo, desc) {
        const newPost = {
            id: uniqueId('post'),
            userId: currentUserId,
            photo,
            desc,
            datetime: new Date().toISOString()
        };
        setPosts(posts.concat(newPost));
        db.collection('posts').add(newPost)

        setPage('home');
        // TODO:
        // 1. Create a new post object (use uniqueId('post') to create an id)
        // 2. Update the store 
        // 3. Call setPage to come back to the home page
    }

    function addFollower(userId, followerId) {
        // use concat
        const newFollower = {
            userId,
            followerId: currentUserId
        }
        setFollowers(followers.concat(newFollower));
        console.log("followed")
        db.collection('followers').add(newFollower)
    }
    function removeFollower(userId) {
        // use filter

        console.log("unfollowed")
        setFollowers(followers.filter(follower => !(follower.followerId === currentUserId && follower.userId === userId)));
        db.collection('followers').where('userId', '==', userId).where('followerId', '==', currentUserId).get().then(snapshot => snapshot.forEach(doc => doc.ref.delete()));
    }
    function cancelPost() {
        setPage('home');
        // TODO:
        // 1. Call setPage to come back to the home page (we will use Router to improve this)
    }

    function addLike(postId) {
        const like = {
            userId: currentUserId,
            postId,
            datetime: new Date().toISOString()
        };


        setLikes(likes.concat(like));
        db.collection('likes').add(like);
        console.log("added like to store");
    }

    function removeLike(postId) {
        const like = {
            userId: currentUserId,
            postId, // make sure you understand this shorthand syntax

        };
        setLikes(likes.filter(like => !(like.userId === currentUserId && like.postId === postId)));
        db.collection('likes')
            .where('userId', '==', currentUserId)
            .where('postId', '==', postId)
            .get()
            .then(snapshot => snapshot.forEach(doc => doc.ref.delete()));

    }
    function signup(email, password, bio, id, name, photo) {
        const user = {
            email, id, name, bio, photo
        };
        auth.createUserWithEmailAndPassword(email, password).then(() => {
            // add a user to the firestore database
            console.log(user);
            db.collection('users').add(user);
            // add a user to the app state
            setUsers(users.concat(user));
            // set the user as a current user 
            setCurrentUserId(id);
            // route to home
            history.push('/');

        })
    }
    return (
        <StoreContext.Provider value={{ login, signup, posts, users, comments, likes, currentUserId, followers, cancelPost, addComment, addLike, removeLike, addPost, addFollower, removeFollower }}>
            {props.children}
        </StoreContext.Provider>
    );
}










export default StoreContextProvider; // export this component as default