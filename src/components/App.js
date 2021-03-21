
import React from 'react';
import Home from './Home';
import css from './App.module.css';
import Header from './Header';
import NavBar from './NavBar';
import Activity from './Activity';
import NewPost from './NewPost';
import Explore from './Explore';
import Profile from './Profile';
import publicUrl from 'utils/publicUrl';
import initialStore from 'utils/initialStore';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 'home',
      store: initialStore // initialize the store as part of the state
    };
  }


  setPage(page) {
    this.setState({ page: page });
  }
  
  renderMain(page) {
    switch (page) {
      case "home": return <Home />;
      case "explore": return <Explore />;
      case "newPost": return <NewPost />;
      case "like": return <Activity />;
      case "profile": return <Profile />;
      default: return <Home 
      store={this.state.store} />;
      
    }
    
  }

 
  render() {
    return(
    <div className={css.container}>
    <Header />
    <main className={css.content}>
      {this.renderMain(this.state.page)}
    </main>
    <NavBar onNavChange={this.setPage} />
  </div>
    );
  }


}





export default App;