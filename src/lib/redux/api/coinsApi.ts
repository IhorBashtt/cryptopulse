import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CoinChartData, CoinDetail, CoinMarketData } from "@/lib/types/coingecko";

export const coinsApi = createApi({
  reducerPath: "coinsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getCoins: builder.query<CoinMarketData[], void>({
      query: () => "/coins",
    }),
    getCoinDetail: builder.query<CoinDetail, string>({
      query: (id) => `/coins/${id}`,
    }),
    getCoinChart: builder.query<CoinChartData, { id: string; days: number }>({
      query: ({ id, days }) => `/coins/${id}/chart?days=${days}`,
    }),
  }),
});

export const { useGetCoinsQuery, useGetCoinDetailQuery, useGetCoinChartQuery } = coinsApi;
