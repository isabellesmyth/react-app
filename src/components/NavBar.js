import React from 'react';
import css from './App.module.css';
import publicUrl from 'utils/publicUrl';
import { ReactComponent as Home }  from './assets/home.svg';
import { ReactComponent as Explore }  from './assets/explore.svg';
import { ReactComponent as NewPost }  from './assets/newpost.svg';
import { ReactComponent as Profile }  from './assets/profile.svg';
import { ReactComponent as Like }  from './assets/like.svg';
function Navbar() {

    return (
        <nav className={css.navbar}>
            <div className={css.navItem}>
                <button>
                    <Home/>
                </button>
            </div>
            <div className={css.navItem}>
                <button>
                    <Explore/>
                </button>
            </div>
            <div className={css.navItem}>
                <button>
                    <NewPost/>
                </button>
            </div>
            <div className={css.navItem}>
                <button>
                    <Like/>
                </button>
            </div>
            <div className={css.navItem}>
                <button>
                    <Profile/>
                </button>
            </div>
			
        </nav>
    );
}

export default Navbar;