import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "../store/features/cards";

export const store = configureStore({
  reducer: {
    cards: cardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
