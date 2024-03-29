/**
 *
 * LandingPage
 *
 */

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Div } from './style';
import logo from 'assets/logo1.png';
import pic1 from 'assets/pic1.png';
import pic2 from 'assets/pic2.png';
import pic3 from 'assets/pic3.png';
// import pic4 from 'assets/pic4.png';
// import todo from 'assets/todo.png';
import clr from 'assets/colors.png';
import { Link } from 'react-router-dom';
import { AppFooter } from 'app/components/AppFooter';
import { themepresets } from 'utils/theme';
import { createMuiTheme } from '@material-ui/core';

interface Props {}

export function LandingPage(props: Props) {
  const [mobileMenu, setMobileMenue] = useState<boolean>(false);
  const theme = createMuiTheme(themepresets.default);
  return (
    <>
      <Helmet>
        <title>LandingPage</title>
        <meta name="description" content="Description of LandingPage" />
      </Helmet>
      <Div mobileMenuOpen={mobileMenu}>
        <header className="header">
          <nav className="nav">
            <div className="logo">
              <img src={logo} alt="" className="logo-img" />
            </div>
            <ul className="desktop-links">
              <li className="list-item">
                <a href="#home">Home</a>
              </li>
              <li className="list-item">
                <a href="#pricing">Pricing</a>
              </li>
              <li className="list-item">
                <a href="#pricing">Join</a>
              </li>
              {/* <li className="list-item">
                <a href="#ping_us">Ping Us</a>
              </li> */}
            </ul>
            <ul
              id="mobile-links"
              className="mobile-links"
              onClick={() => setMobileMenue(!mobileMenu)}
            >
              <li className="list-item">
                <a href="#home">Home</a>
              </li>
              <li className="list-item">
                <a href="#pricing">Pricing</a>
              </li>
              <li className="list-item">
                <a href="#pricing">Join</a>
              </li>
              {/* <li className="list-item">
                <a href="#ping_us">Ping Us</a>
              </li> */}
            </ul>
            <label
              className="icon-burger"
              onClick={() => setMobileMenue(!mobileMenu)}
            >
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </label>
          </nav>
        </header>
        <main className="container">
          <section className="section" id="home">
            <div>
              <h1 className="heading">What do</h1>
              <h3 className="meta" id="youwant">
                You want to accomplish today?
              </h3>
              <p className="sub-meta">
                Get organised &nbsp; &nbsp; Get determined &nbsp; &nbsp; Get
                going
              </p>
            </div>
            <img src={pic1} alt="" className="responsive-image" />
          </section>

          <section className="section">
            <img src={pic2} alt="" className="responsive-image third" />
            <div className="forth">
              <h1 className="heading alignr">Simple</h1>
              <h3 className="meta alignr">as pen on papper</h3>
              <p className="sub-meta alignr">Got something on your mind?</p>
              <p className="sub-meta alignr">
                Start writing it down. No new section, no new <br />
                page. Pen it and move on.
              </p>
            </div>
          </section>

          <section className="section">
            <div>
              <h3 className="meta">We got colors to match your mood</h3>
              <h3 className="meta">Take your pick!</h3>
              <p className="sub-meta">
                Or, Let us your diary for a refresh look
              </p>
            </div>
            <img className="responsive-image" src={clr} alt="" />
          </section>

          <section className="section" id="pricing">
            <div className="subscribe-card">
              <h2 className="line1">Join for free</h2>
              <h3 className="line2">Your first month is on us</h3>
              <h3 className="line3">
                Subscription starts from as small as 10 rupees
              </h3>
            </div>

            <div className="joinus">
              <h3 className="meta alignr">Less then</h3>
              <div className="alignr sameline">
                <h3 className="meta suffix-spcl-case">a</h3>
                <h1 className="heading">buck</h1>
              </div>
              <h3 className="meta alignr">when you subscribe</h3>
              <Link to="/login" className="alignr join">
                JOIN NOW
              </Link>
            </div>
          </section>

          <section className="section">
            <div>
              <h3 className="meta">Put a</h3>
              <h1 className="heading">Stop</h1>
              <h3 className="meta">to forgetting your deadline.</h3>
              <h3 className="meta">Come join us today</h3>
            </div>

            <img src={pic3} alt="" className="responsive-image" />
          </section>

          <footer id="ping_us" style={{ marginTop: '40px' }}>
            <section>
              <AppFooter theme={theme} />
            </section>
          </footer>
        </main>
      </Div>
    </>
  );
}
