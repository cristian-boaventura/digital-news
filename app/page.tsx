"use client";
import { useEffect } from "react";
import { getSearch } from "./utils/getData";

export default function Home() {
  useEffect(() => {
    getSearch("bitcoin").then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>News Digital</h1>
    </main>
  );
}
