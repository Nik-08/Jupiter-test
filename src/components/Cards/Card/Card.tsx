import React, { FC, useCallback, useRef } from "react";
import { limit } from "../../../store/features/cards/selectors";
import { deleteCard } from "../../../store/features/cards/slice";
import { useAppDispatch } from "../../../store/hooks";
import css from "./style.module.scss";

interface Props {
  name: string;
  imageUrl: string;
  category: string;
  id: number;
  stateId: number;
  setLimit: (limit: number) => void;
}

export const Card: FC<Props> = ({
  name,
  imageUrl,
  category,
  id,
  stateId,
  setLimit,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const dispath = useAppDispatch();

  const removeCard = useCallback(() => {
    dispath(deleteCard({ id, limit: 9, stateId }));
    setLimit(9);
  }, []);

  const setActiveCard = () => {
    if (null !== ref.current) {
      ref.current.classList.toggle(css.activeCard);
    }
  };
  return (
    <div className={css.card__wrapper} ref={ref} onClick={setActiveCard}>
      <div className={css.card__cross} onClick={removeCard}>
        ✕
      </div>
      <img src={imageUrl} alt='' />
      <div className={css.card__text}>
        <span className={css.card__brand}>{category}</span>
        <span className={css.card__name}>{name}</span>
      </div>
    </div>
  );
};
