"use client";

import { RootState } from "@/store";
import { getNews } from "@/utils";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ArticleCard from "@/components/Articles/ArticleCard";

const Search = () => {
  const searchInput = useSelector((state: RootState) => state.searchInput);
  const [articles, setArticles] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getSearchResults = async () => {
      try {
        const response = await getNews(searchInput, "", "");
        setArticles(response);
      } catch (e) {
        setIsError(true);
      }
    };

    getSearchResults();
  }, [searchInput]);

  return (
    <div className="xl mx-4 mt-4 grid max-w-6xl gap-x-4 gap-y-4 sm:mx-8 md:mx-16 lg:grid-cols-2 xl:mx-auto">
      <h2 className="col-span-full text-xl font-medium ">
        Results for {searchInput}
      </h2>
      {isError ? (
        <p>Sorry, an unexpected error has occurred.</p>
      ) : (
        articles.map((article, i) => <ArticleCard key={i} article={article} />)
      )}
    </div>
  );
};

export default Search;
