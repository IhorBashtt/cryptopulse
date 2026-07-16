import { NextResponse } from "next/server";
import { getCoinChart } from "@/lib/coingecko";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const url = new URL(request.url);
  const days = Number.parseInt(url.searchParams.get("days") ?? "7", 10);

  try {
    const data = await getCoinChart(id, Number.isFinite(days) ? days : 7);

    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        error: `Failed to fetch chart data: ${message}`,
      },
      { status: 502 },
    );
  }
}
