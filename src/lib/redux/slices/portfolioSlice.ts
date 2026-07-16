import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Holding {
  id: string;
  coinId: string;
  coinName: string;
  coinSymbol: string;
  coinImage: string;
  amount: number;
  addedAt: string;
}

interface PortfolioState {
  holdings: Holding[];
}

const STORAGE_KEY = "cryptopulse:portfolio";

const initialState: PortfolioState = {
  holdings: [],
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addHolding: (state, action: PayloadAction<Omit<Holding, "id" | "addedAt">>) => {
      const holding: Holding = {
        id: `${action.payload.coinId}-${Date.now()}`,
        addedAt: new Date().toISOString(),
        ...action.payload,
      };

      state.holdings.push(holding);
    },
    updateHolding: (state, action: PayloadAction<{ id: string; amount: number }>) => {
      const target = state.holdings.find((holding) => holding.id === action.payload.id);

      if (target) {
        target.amount = action.payload.amount;
      }
    },
    removeHolding: (state, action: PayloadAction<string>) => {
      state.holdings = state.holdings.filter((holding) => holding.id !== action.payload);
    },
    setHoldings: (state, action: PayloadAction<Holding[]>) => {
      state.holdings = action.payload;
    },
  },
});

export const { addHolding, updateHolding, removeHolding, setHoldings } = portfolioSlice.actions;
export default portfolioSlice.reducer;

export function persistPortfolioState(state: PortfolioState, shouldPersist = true) {
  if (typeof window === "undefined" || !shouldPersist) {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage failures.
  }
}
