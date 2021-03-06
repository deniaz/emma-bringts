import React, { FC, useState } from 'react';
import Link from 'next/link';
import classname from '../utils/classname';

export const Navigation: FC = () => {
  const [menu, setMenu] = useState(false);

  function handleClick(e) {
    e.preventDefault();
    setMenu((menu) => !menu);
  }

  return (
    <nav id="menuicon" className={classname(['container', 'emma-container', 'navi', menu ? 'open' : 'close'])}>
      <Link href="/" passHref>
        <a className="logo">
          <img src="/img/logo-close.svg" alt="Workcation" />
        </a>
      </Link>
      <button className="menu-icon" onClick={handleClick}></button>
      <div className="menu">
        <Link href="/unternehmen" passHref>
          <a className="navi-item">Für Unternehmen</a>
        </Link>
        <Link href="/kontakt" passHref>
          <a className="navi-item">Kontakt</a>
        </Link>
      </div>
    </nav>
  );
};
