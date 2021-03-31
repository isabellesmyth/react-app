import React from 'react';
import css from './Header.module.css';
import publicUrl from 'utils/publicUrl';


function Header() {
    return (
       

    <header className={css.header}>
    <div>
      <button>
      <img src={publicUrl('/assets/message.svg')}/>
      </button>
    </div>
    <div>
    <img src={publicUrl('/assets/logo.png')}/>
    </div>
    <div>
      <button>
      <img src={publicUrl('/assets/message.svg')}/>
      </button>
    </div>
    
</header>
);
}

export default Header;