import React from 'react';
import css from './NavBar.module.css';
import publicUrl from 'utils/publicUrl';





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
                <img src={publicUrl('/assets/home.svg')}/>
                </button>
            </div>
            <div className={css.navItem}>
              
                <button onClick={e=>handleNavChange('explore')}>
                <img src={publicUrl('/assets/explore.svg')}/>
                </button>
            </div>
            <div className={css.navItem}>
               
                <button onClick={e=>handleNavChange('newPost')}>
                <img src={publicUrl('/assets/newpost.svg')}/>
                </button>
            </div>
            <div className={css.navItem}>
                
                <button onClick={e=>handleNavChange('like')}>
                <img src={publicUrl('/assets/like.svg')}/>
                </button>
            </div>
            <div className={css.navItem}>
                <button onClick={e=>handleNavChange('profile')}>
                <img src={publicUrl('/assets/profile.svg')}/>
                </button>
            </div>
			
        </nav>
    );
}

export default Navbar;