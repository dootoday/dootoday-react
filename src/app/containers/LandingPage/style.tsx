import styled from 'styled-components/macro';

export const Div = styled.div`
  font-family: 'Roboto', sans-serif;
  display: inline-block;
  width: 100%;
  margin: 0 !important;
  font-size: 20px;
  line-height: normal;

  .header {
    width: 100%;
    height: 10vh;
    position: fixed;
    background-color: white;
    z-index: 10;
    left: 0;
    top: 0;
  }

  .nav {
    height: 100%;
    width: 95vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: auto;
  }
  .nav .desktop-links {
    display: flex;
    padding-inline-start: 0;
  }
  .nav .desktop-links .list-item {
    border-bottom: 2px solid #ffffff;
    transition: all 0.4s linear;
    list-style: none;
    margin: 0px 20px;
  }
  .nav .desktop-links .list-item:hover {
    border-color: #0d6c8c;
  }
  .nav .desktop-links .list-item a {
    color: #02335a;
    text-decoration: none;
    text-transform: uppercase;
  }

  .nav .mobile-links {
    position: absolute;
    height: 90vh;
    z-index: 12;
    background: #ffffff;
    top: 0;
    margin-top: 10vh;
    width: 100%;
    display: none;
    margin-left: 0px;
    margin-right: 0px;
    padding: 0px;
  }

  .nav .mobile-links .list-item {
    list-style: none;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .nav .mobile-links .list-item a {
    text-decoration: none;
    text-transform: uppercase;
    color: #02335a;
    margin: auto;
    font-size: 1.8em;
  }

  .logo {
    height: 50%;
  }
  .logo-img {
    height: 100%;
  }

  #nav-toggle {
    position: absolute;
    top: -100px;
  }
  .nav .icon-burger {
    display: none;
    position: absolute;
    right: 15px;
  }
  .nav .icon-burger .line {
    width: 20px;
    height: 3px;
    background-color: #0d6c8c;
    margin: 3px;
    border-radius: 3px;
    transition: all 0.3s ease-in-out;
  }

  .container {
    margin-top: 10vh;
    display: block;
    height: 90vh;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  .heading {
    font-weight: 200;
    font-size: 4em;
    margin: 5px 0px;
  }

  .meta {
    font-weight: 100;
    font-size: 2em;
    margin: 5px 0px;
  }

  .sub-meta {
    font-size: 0.9em;
    font-weight: 100;
  }

  .alignr {
    text-align: right;
  }

  .sameline {
    display: flex;
    justify-content: flex-end;
  }

  .suffix-spcl-case {
    align-self: flex-end;
    margin-bottom: 15px;
    margin-right: 5px;
  }

  /* Image*/
  .responsive-image {
    width: 90%;
  }

  .section {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 95vw;
    margin: auto;
  }

  .forth {
    min-width: 280px;
  }

  /* ---------------------------------1st section-------------------------------- */

  .subscribe-card {
    width: 55%;
    max-width: 500px;
    height: 31rem;
    background: #0d6c8c;
    border-radius: 2rem;
    margin-top: 7rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-left: 30px;
    color: #fff;

    .line1 {
      font-size: 2.8em;
      font-weight: 100;
      margin: 10px 0px;
    }

    .line2 {
      font-size: 1.8em;
      font-weight: 100;
      margin: 10px 0px;
    }

    .line3 {
      font-size: 1.4em;
      font-weight: 100;
      margin: 10px 0px;
      text-align: left;
    }
  }

  /* join button */
  .join {
    margin-top: 2.25px;
    text-decoration: none;
    font-size: 2rem;
    padding: 1px 30px;
    border: 1px solid #0d6c8c;
    color: black;
    position: relative;
    z-index: 1;
    float: right;
  }
  .join::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    background-color: #0d6c8c;
    width: 100%;
    height: 100%;
    transform: translateX(100%);
    transition: all 0.18s linear;
  }
  .join:hover:before {
    transform: translateX(0);
    z-index: -1;
  }
  .join:hover {
    color: white;
  }
  .joinus {
    overflow: hidden;
  }

  /* -------------------------------Footer------------------------------------- */

  .para {
    margin-top: 1rem;
  }

  /* ----------------------------2nd Nav Section------------------------------- */

  .last-img {
    width: 100%;
    text-decoration: none;
  }
  .foot-nav {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 20px;
  }

  .foot-nav .foot-nav-item {
    text-decoration: none;
    font-size: 0.7em;
    color: black;
  }

  @media (max-width: 735px) {
    text-align: center;
    .nav {
      justify-content: center;
    }

    .nav .desktop-links {
      display: none;
    }

    .nav .mobile-links {
      display: none;
      margin-top: 7vh;
      height: 93vh;
    }

    .header {
      height: 7vh;
    }

    .container {
      margin-top: 7vh;
      height: 93vh;
    }
    .section {
      flex-direction: column;
    }
    .alignr {
      text-align: center;
    }
    .third {
      order: 4;
    }
    .forth {
      order: 3;
    }
    .subscribe-card {
      order: 8;
      width: 80%;
      height: 400px;
      margin-top: 20px;
      margin-bottom: 40px;
    }
    .joinus {
      order: 7;
    }
    .responsive-image {
      width: 100%;
      height: auto;
    }

    .nav .icon-burger {
      display: block;
    }
  }

  /* Font sizes */
  @media (max-width: 900px) {
    font-size: 14px;
  }

  @media (max-width: 390px) {
    font-size: 11px;
  }
`;
