import React, { useEffect, createContext, useState } from 'react';
import uniqueId from 'utils/uniqueId.js';
import initialStore from 'utils/initialStore.js';

// export the context so that other components can import
export const StoreContext = createContext();


function StoreContextProvider(props){
    const [page, setPage] = useState('home');
    //const [store, setStore] = useState(initialStore);

    let temp = JSON.parse(window.localStorage.getItem('store')) || initialStore;
   
    const [store, setStore] = useState(()=>{
        return JSON.parse(window.localStorage.getItem('store')) || initialStore;
    });
    useEffect(()=>{
        window.localStorage.setItem('store', JSON.stringify(store));
    }, [store]);

    function addComment(postId, text) {
        const comment = {
            userId: store.currentUserId,
            postId,
            text,
            datetime: new Date().toISOString()
        };
        setStore({
            ...store,
            comments: store.comments.concat(comment)
        });

        console.log("added comment to store");
    }

    function addPost(photo, desc) {
        const newPost = {
            id: uniqueId('post'),
            userId: store.currentUserId,
            photo,
            desc,
            datetime: new Date().toISOString()
        };
        setStore({
            ...store,
            posts: store.posts.concat(newPost)
        });
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
            followerId: store.currentUserId
        }
        setStore({
            ...store,
            followers: store.followers.concat(newFollower)
        });
        console.log("followed")
    }
    function removeFollower(userId, followerId) {
        // use filter
        console.log("unfollowed")
        setStore({
            ...store,// spread props. make sure you understand this
            followers: store.followers.filter(follower => !(follower.followerId === store.currentUserId && follower.userId === userId))

        });
    }
    function cancelPost() {
        setPage('home');
        // TODO:
        // 1. Call setPage to come back to the home page (we will use Router to improve this)
    }

    function addLike(postId) {
        const like = {
            userId: store.currentUserId,
            postId,
            datetime: new Date().toISOString()
        };

        setStore({
            ...store,
            likes: store.likes.concat(like)
        });

        console.log("added like to store");
    }

    function removeLike(postId) {
        const like = {
            userId: store.currentUserId,
            postId, // make sure you understand this shorthand syntax

        };

        setStore({
            ...store,// spread props. make sure you understand this
            likes: store.likes.filter(like => !(like.userId === store.currentUserId && like.postId === postId))

        });

    }
	return (
		<StoreContext.Provider value = {{...store, cancelPost, addComment, addLike, removeLike, addPost, addFollower, removeFollower}}>
			{props.children}
		</StoreContext.Provider>
	);
}

    

       



   


export default StoreContextProvider; // export this component as default