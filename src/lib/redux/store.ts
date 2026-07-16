import { configureStore } from "@reduxjs/toolkit";
import { coinsApi } from "./api/coinsApi";
import portfolioReducer, { persistPortfolioState } from "./slices/portfolioSlice";

let shouldPersistPortfolio = false;

export const store = configureStore({
  reducer: {
    [coinsApi.reducerPath]: coinsApi.reducer,
    portfolio: portfolioReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coinsApi.middleware),
});

store.subscribe(() => {
  persistPortfolioState({ holdings: store.getState().portfolio.holdings }, shouldPersistPortfolio);
});

export function setPortfolioPersistenceReady() {
  shouldPersistPortfolio = true;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
