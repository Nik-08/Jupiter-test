import classNames from "classnames";
import React, { FC } from "react";

import css from "./style.module.scss";

interface Props {
  state: number;
  setActive: (id: number) => void;
}

export const Navigation: FC<Props> = ({ state, setActive }) => {
  const breadcrumbs = [
    "Show All",
    "Design",
    "Branding",
    "Illustration",
    "Motion",
  ];

  return (
    <ul className={css.navigation}>
      {breadcrumbs.map((item, id) => (
        <li
          className={classNames(css.navigation__item, {
            [css.active]: id === state,
          })}
          key={id}
        >
          <span onClick={() => setActive(id)}>{item}</span>
        </li>
      ))}
    </ul>
  );
};
