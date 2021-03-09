
import React from 'react';
import Home from './Home';
import css from './App.module.css';
import Header from './Header';
import NavBar from './NavBar';


function App() {
 
  return (
<div className={css.container}>
	
  <Header/>

	<main className={css.content}>
	  <Home/>
  </main>
  <NavBar/>
</div>
  );
}

export default App;