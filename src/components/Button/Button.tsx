import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import css from "./style.module.scss";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text: string;
}

export const Button: FC<Props> = ({ text, ...rest }) => {
  return (
    <button className={css.footer__button} {...rest}>
      {text}
    </button>
  );
};
