import React, { useState } from "react";

import logo from "../../assets/logo.png";
import classNames from "classnames";
import css from "./style.module.scss";

export const Header = () => {
  const [state, setState] = useState(false);

  const setActive = () => {
    setState((prev) => !prev);
  };

  if (state) {
    document.body.classList.add("active");
  } else {
    document.body.classList.remove("active");
  }

  return (
    <div className={css.header}>
      <div className={classNames(css.header__container, css.container)}>
        <div className={css.header__logo}>
          <img src={logo} alt='' />
          Agency
        </div>
        <nav
          className={classNames(css.header__nav, {
            [css.active]: state,
          })}
        >
          <span className={css.header__nav_item}>
            <span>About</span>
          </span>
          <span className={css.header__nav_item}>
            <span>Services</span>
          </span>
          <span className={css.header__nav_item}>
            <span>Pricing</span>
          </span>
          <span className={css.header__nav_item}>
            <span>Blog</span>
          </span>
          <span className={css.header__nav_item}>
            <span>Contact</span>
          </span>
        </nav>
        <button className={css.header__button}>Contact</button>
        <div
          className={classNames(css.header__burger, {
            [css.active]: state,
          })}
          onClick={setActive}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div
        className={classNames(
          css.header__container,
          css.container,
          css.header__container_title
        )}
      >
        <h1 className={css.header__title}>Portfolio</h1>
        <h3 className={css.header__subtitle}>
          Agency provides a full service range including technical skills,
          designs, buisness understanding.
        </h3>
      </div>
    </div>
  );
};
