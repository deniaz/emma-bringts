import React, { FC } from 'react';
import Link from 'next/link';


let menustate = 'close';

function handleClick(e) {
  e.preventDefault();

  if (menustate == 'open') {
    menustate = 'close';
    console.log(menustate);
    document.getElementById("menuicon").classList.add("close");
    document.getElementById("menuicon").classList.remove("open");
  } else {
    menustate = 'open';
    console.log(menustate);
    document.getElementById("menuicon").classList.add("open");
    document.getElementById("menuicon").classList.remove("close");
  }
}

export const Navigation: FC = () => (
  <nav id="menuicon" className="container emma-container navi">
    <Link href="/" passHref>
      <a className="logo">
        <img src="/img/logo-black.svg" alt="Workcation" />
      </a>
    </Link>
    <button className="menu-icon" onClick={handleClick}></button>
    <div className="menu">
      <Link href="/initiative" passHref>
        <a className="navi-item">Helft Emma</a>
      </Link>
      {/* <Link href="/partner" passHref>
        <a className="navi-item">Partner</a>
      </Link> */}
      <Link href="/unternehmen" passHref>
        <a className="navi-item">Für Unternehmen</a>
      </Link>
      <Link href="/kontakt" passHref>
        <a className="navi-item">Kontakt</a>
      </Link>
      <Link href="/mitmachen" passHref>
        <a className="btn">Anbieter hinzufügen</a>
      </Link>
    </div>
  </nav>
);
