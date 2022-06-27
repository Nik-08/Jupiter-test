import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../../store";

export interface CardState {
  items: [] | null;
  loading: boolean;
  error: null;
  total: number | null;
}

const initialState: CardState = {
  items: [],
  loading: false,
  error: null,
  total: null,
};

interface PayloadState {
  limit: number;
  stateId?: number;
  id?: number;
}

export const fetchAllCards = createAsyncThunk<
  number,
  PayloadState,
  {
    rejectValue: string;
  }
>(
  "cards/getAll",

  async (body, { rejectWithValue }): Promise<any> => {
    try {
      let categoryName;
      switch (body.stateId) {
        case 1:
          categoryName = "Design";
          break;
        case 2:
          categoryName = "Branding";
          break;
        case 3:
          categoryName = "Illustration";
          break;
        case 4:
          categoryName = "Motion";
          break;

        default:
          body.stateId = 0;
      }
      const response = await axios.get(
        `http://localhost:3001/cards?_limit=${body.limit}${
          body.stateId === 0 ? "" : `&category=${categoryName}`
        }`
      );
      if (!response) throw new Error("Server Error!");
      return response;
    } catch (e) {
      return rejectWithValue(String(e));
    }
  }
);

export const deleteCard = createAsyncThunk<
  number,
  PayloadState,
  { rejectValue: string; dispatch: AppDispatch }
>(
  "cards/deleteCard",
  async (body, { rejectWithValue, dispatch }): Promise<any> => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/cards/${body.id}`
      );
      if (!response) throw new Error("Server Error!");
      await dispatch(fetchAllCards(body));
      return response.data;
    } catch (e) {
      return rejectWithValue(String(e));
    }
  }
);

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCards.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCards.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.items = action.payload.data;
        state.total = action.payload.headers["x-total-count"];
      })
      .addCase(fetchAllCards.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCard.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCard.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
      })
      .addCase(deleteCard.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = cardsSlice.actions;

export default cardsSlice.reducer;
