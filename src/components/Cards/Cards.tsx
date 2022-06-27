import React, { useCallback, useState } from "react";
import { selectors } from "../../store/features/cards";

import { fetchAllCards } from "../../store/features/cards/slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Button } from "../Button";
import { Navigation } from "../Navigation";
import { Card } from "./Card/Card";
import css from "./style.module.scss";

export const Cards = () => {
  const dispatch = useAppDispatch();
  const [limit, setLimit] = useState(9);
  const [stateId, setStateId] = useState(0);

  const { items, loading, error, total } = useAppSelector(
    (state: AppState) => ({
      items: selectors.items(state),
      loading: selectors.loading(state),
      error: selectors.error(state),
      total: selectors.total(state),
    })
  );

  const setActive = useCallback((id: number) => {
    setStateId(id);
  }, []);

  const showMore = useCallback(() => {
    if (items.length <= total) {
      setLimit((prev) => prev + 9);
    }
  }, [items.length, total]);

  React.useEffect(() => {
    dispatch(fetchAllCards({ limit, stateId }));
  }, [dispatch, limit, stateId]);

  return (
    <>
      <Navigation state={stateId} setActive={setActive} />

      <div className={css.cards__wrapper}>
        {items &&
          !error &&
          items.map((item: CardItem) => (
            <Card
              {...item}
              key={item.id}
              stateId={stateId}
              setLimit={setLimit}
            />
          ))}
      </div>

      {items.length < total ? (
        <Button text={"Load more"} onClick={showMore} />
      ) : (
        <p className={css.cards__footer_text}>You have seen all cards!</p>
      )}
    </>
  );
};
