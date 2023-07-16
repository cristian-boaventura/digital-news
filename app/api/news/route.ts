import { NextResponse } from "next/server";
import axios from "axios";

const client = axios.create({
  baseURL: "https://newsapi.org",
  headers: { "X-Api-Key": `${process.env.NEWS_API_KEY}` },
});

export const POST = async (request: Request) => {
  const { query, country, category } = await request.json();
  if (query) {
    const { data } = await client.get(
      `/v2/everything?q=${encodeURIComponent(`${query}`)}`
    );
    return NextResponse.json({ data: data.articles });
  } else {
  const { data } = await client.get(
    `/v2/top-headlines?country=${country}&category=${category}`
  );
  return NextResponse.json({ data: data.articles });
  }
};
