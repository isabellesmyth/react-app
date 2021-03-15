import React from 'react';
import css from './Header.module.css';
import publicUrl from 'utils/publicUrl';


function Header() {
    return (
        <nav className={css.header}>
            <div className={css.navItem}>
                <button>
                <img src={publicUrl('/assets/message.svg')}/>
                </button>
            </div>
            <div className={css.navItem}>
                <button>
                <img src={publicUrl('/assets/logo.png')}/>
                </button>
            </div>
            <div className={css.navItem}>
                <button>
                <img src={publicUrl('/assets/message.svg')}/>
                </button>
            </div>

        </nav>
    );
}

export default Header;