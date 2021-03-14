import React from 'react';
import css from './NavBar.module.css';
import publicUrl from 'utils/publicUrl';
import { ReactComponent as Home }  from './assets/home.svg';
import { ReactComponent as Explore }  from './assets/explore.svg';
import { ReactComponent as NewPost }  from './assets/newpost.svg';
import { ReactComponent as Profile }  from './assets/profile.svg';
import { ReactComponent as Activity }  from './assets/like.svg';


function Navbar(props) {
    function handleNavChange(page){
        if (props.onNavChange){
            props.onNavChange(page);
        }
    }
    return (
        <nav className={css.navbar}>
            <div className={css.navItem}>
        
                <button onClick={e=>handleNavChange('home')}>
                    <Home/>
                </button>
            </div>
            <div className={css.navItem}>
              
                <button onClick={e=>handleNavChange('explore')}>
                    <Explore/>
                </button>
            </div>
            <div className={css.navItem}>
               
                <button onClick={e=>handleNavChange('newPost')}>
                    <NewPost/>
                </button>
            </div>
            <div className={css.navItem}>
                
                <button onClick={e=>handleNavChange('like')}>
                    <Activity/>
                </button>
            </div>
            <div className={css.navItem}>
                <button onClick={e=>handleNavChange('profile')}>
                    <Profile/>
                </button>
            </div>
			
        </nav>
    );
}

export default Navbar;