
import React, {useState} from 'react';
import StoreContextProvider from 'contexts/StoreContext';
import Home from './Home';
import css from './App.module.css';
import Header from './Header';
import Signup from './Signup';
import NavBar from './NavBar';
import Login from './Login';
import Activity from './Activity';
import NewPost from './NewPost';
import Explore from './Explore';
import Profile from './Profile';
import publicUrl from 'utils/publicUrl';
import initialStore from 'utils/initialStore';
import {findUser, findPosts} from 'utils/find';
import uniqueId from 'utils/uniqueId';
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {


    


  return (
    <Router basename={process.env.PUBLIC_URL}>
      <StoreContextProvider>
      <div className={css.container}>
        <Header/>
        <main className={css.content}>
    <Switch>
    <Route path="/login">
	<Login />
</Route>
<Route path="/signup">
    <Signup />
</Route>
<Route path="/home">
<Home 
    />
  </Route>
  <Route path="/newPost">
  <NewPost 
      />
  </Route>
  <Route path="/like">
  <Activity />
  </Route>
  <Route path="/profile/:userId?">
  <Profile  />
</Route>
  <Route path="/explore">
      <Explore />
  </Route>
	<Route path="/profile">
  <Profile 
      />
  </Route>
  <Route path="/:postId?">
  <Home />
</Route>

  <Route path="/">
    <Home />
  </Route>
</Switch>
        </main>
        <NavBar/>
      </div>
      </StoreContextProvider>
    </Router>
  );

  




 
 
}


export default App;