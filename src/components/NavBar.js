import React from 'react';
import css from './NavBar.module.css';
import publicUrl from 'utils/publicUrl';
import {
    Link
  } from "react-router-dom";




function Navbar(props) {
    function handleNavChange(page){
        if (props.onNavChange){
            props.onNavChange(page);
        }
    }
    return (
        <nav className={css.navbar}>
            <div className={css.navItem}>
            <Link to="/">
    <img src={publicUrl('/assets/home.svg')} alt="Home"/>
        </Link>
            </div>
            <div className={css.navItem}>
              
            <Link to="/explore">
  <img src={publicUrl('/assets/explore.svg')} alt="explore"/>
</Link>
            </div>
            <div className={css.navItem}>
            <Link to="/newPost">
  <img src={publicUrl('/assets/newpost.svg')} alt="newpost"/>
</Link>
            </div>
            <div className={css.navItem}>
                
            <Link to="/like">
  <img src={publicUrl('/assets/like.svg')} alt="like"/>
</Link>
            </div>
            <div className={css.navItem}>
            <Link to="/profile">
  <img src={publicUrl('/assets/profile.svg')} alt="profile"/>
</Link>
            </div>
			
        </nav>
    );
}

export default Navbar;