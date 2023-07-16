export const getNews = async (
  query: string,
  country: string,
  category: string
) => {
  const res = await fetch(
    new Request(`http://localhost:3000/api/news`, {
      method: "POST",
      body: JSON.stringify({ query, country, category }),
    }),
    { next: { revalidate: 0 } }
  );

  if (res.ok) {
    const { data } = await res.json();
    return data;
  } else {
    throw new Error("Failed to fetch news");
  }
};
