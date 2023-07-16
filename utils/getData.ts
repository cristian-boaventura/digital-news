const createURL = (path: string) => {
  return window.location.origin + path;
};

export const getNews = async (
  query: string,
  country: string,
  category: string
) => {
  const res = await fetch(
    new Request(createURL(`/api/news`), {
      method: "POST",
      body: JSON.stringify({
        query: query,
        country: country,
        category: category,
      }),
    }),
    { next: { revalidate: 0 } }
  );

  const { data } = await res.json();
  return data;
};
