const createURL = (path: string) => {
  return window.location.origin + path;
};

export const getSearch = async (query: string) => {
  const res = await fetch(
    new Request(createURL(`/api/news`), {
      method: "POST",
      body: JSON.stringify({ query }),
    })
  );

  if (res.ok) {
    const { data } = await res.json();
    return data;
  }
};

export const getTopHeadlines = async (country: string, category: string) => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}`,
      {
        headers: { "X-Api-Key": `${process.env.NEWS_API_KEY}` },
      }
    );
    const { articles } = await response.json();

    return articles;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
