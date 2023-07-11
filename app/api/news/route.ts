import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { query } = await request.json();
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(`${query}`)}`,
      {
        headers: { "X-Api-Key": `${process.env.NEWS_API_KEY}` },
      }
    );
    const { articles } = await response.json();

    return NextResponse.json({ data: articles });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
