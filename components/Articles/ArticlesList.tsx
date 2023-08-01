"use client";

import { useEffect, useState } from "react";

import { Article } from "@/models";
import { getNews } from "@/utils/getData";
import ArticleCard from "./ArticleCard";
import countries from "@/data/countries.json";

const ArticlesList = ({
  query = "",
  country = "",
  category = "",
}: {
  query?: string;
  country?: string;
  category?: string;
}) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [countryName, setCountryName] = useState("");

  useEffect(() => {
    const getArticles = async () => {
      if (country === "wd") country = "";
      const articles = await getNews(query, country, category);
      setArticles(articles);
    };

    setCountryName(
      countries.filter((countryObj) => countryObj.alpha2 === country)[0].name
    );

    getArticles();
  }, [query, country, category]);

  const categoryUppercase =
    category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="xl mx-4 mt-4 grid max-w-6xl gap-x-4 gap-y-4 sm:mx-8 md:mx-16 lg:grid-cols-2 xl:mx-auto">
      <h2 className="col-span-full text-xl font-medium " data-test="heading">
        {countryName} {category === "general" ? "Top" : categoryUppercase}{" "}
        Headlines
      </h2>
      {articles?.map((article) => (
        <ArticleCard key={article.url} article={article} />
      ))}
    </div>
  );
};

export default ArticlesList;
