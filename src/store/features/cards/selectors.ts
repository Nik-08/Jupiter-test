import { createSelector, Selector } from "reselect";

export const state: Selector<AppState, AppState["cards"]> = ($state) =>
  $state.cards;

export const loading = createSelector([state], ($state) => $state.loading);
export const items = createSelector([state], ($state) => $state.items);
export const error = createSelector([state], ($state) => $state.error);
export const limit = createSelector([state], ($state) => $state.limit);
export const total = createSelector([state], ($state) => $state.total);
