"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store, setPortfolioPersistenceReady } from "@/lib/redux/store";
import { setHoldings } from "@/lib/redux/slices/portfolioSlice";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("cryptopulse:portfolio");

      if (!raw) {
        setPortfolioPersistenceReady();
        return;
      }

      const parsed = JSON.parse(raw) as { holdings?: unknown };
      if (Array.isArray(parsed.holdings)) {
        store.dispatch(setHoldings(parsed.holdings as Array<{
          id: string;
          coinId: string;
          coinName: string;
          coinSymbol: string;
          coinImage: string;
          amount: number;
          addedAt: string;
        }>));
      }
    } catch {
      // Ignore invalid persisted data.
    } finally {
      setPortfolioPersistenceReady();
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
