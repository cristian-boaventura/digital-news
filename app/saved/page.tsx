"use client";

import ArticleCard from "@/components/Articles/ArticleCard";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

const Saved = () => {
  const favorites = useSelector((state: RootState) => state.favorites);

  return (
    <div className="xl mx-4 mt-4 grid max-w-6xl gap-x-4 gap-y-4 sm:mx-8 md:mx-16 lg:grid-cols-2 xl:mx-auto">
      <h2 className="col-span-full text-xl font-medium ">Saved News</h2>
      {favorites[0]
        ? favorites.map((article, i) => (
            <ArticleCard key={i} article={article} />
          ))
        : "No saved news"}
    </div>
  );
};

export default Saved;
