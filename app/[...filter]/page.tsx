import { ArticlesList } from "@/components";

const Category = ({ params }: { params: { filter: string[] } }) => {
  const country = params.filter[0];
  const category = params.filter[1];

  if (country === "wd") {
    return <ArticlesList category={category} />;
  } else {
    return <ArticlesList country={country} category={category} />;
  }
};

export default Category;
