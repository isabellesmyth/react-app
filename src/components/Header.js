import React from 'react';
import css from './App.module.css';
import logo from './assets/logo.png';
import publicUrl from 'utils/publicUrl';
import { ReactComponent as Camera }  from './assets/camera.svg';
import { ReactComponent as Message }  from './assets/message.svg';

function Header() {
    return (
        <nav className={css.header}>
            <div className={css.navItem}>
                <button>
                    <Camera/>
                </button>
            </div>
            <div className={css.navItem}>
                <button>
                <img src={logo} alt="logo"/>
                </button>
            </div>
            <div className={css.navItem}>
                <button>
                    <Message/>
                </button>
            </div>

        </nav>
    );
}

export default Header;