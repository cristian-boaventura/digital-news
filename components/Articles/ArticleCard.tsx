"use client";

import { Article } from "@/models";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "@/store/states/favorites";
import { setStore } from "@/utils/firebase.utils";
import { RootState } from "@/store";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import moment from "moment";
import { setCurrentArticle } from "@/store/states/currentArticle";
import Image from "next/image";
import { useRouter } from "next/navigation";

const imageLoader = ({ src }: { src: string }) => {
  return `${src}`;
};

const ArticleCard = ({ article }: { article: Article }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites);
  const user = useSelector((state: RootState) => state.user);
  const [bookmarked, setBookmarked] = useState(false);
  const router = useRouter();

  let { source, title, publishedAt, urlToImage } = article;
  const date = moment(publishedAt).fromNow();

  if (!urlToImage) {
    urlToImage =
      "https://gumlet.assettype.com/quintype-website%2F2018-08%2F973e3cef-6730-4e80-af93-6851ec9d7ef0%2F6277209256_198cdbea86_o.jpg?rect=0%2C0%2C1279%2C719&auto=format%2Ccompress&fit=max&w=400&dpr=2.6";
  }

  const handleLink = () => {
    dispatch(setCurrentArticle(article));
    router.push(`/articles/${title}`);
  };

  const handleBookmark = () => {
    if (bookmarked) {
      dispatch(removeFavorite(article));
      setStore(user, { favorites: arrayRemove(article) });
      setBookmarked(false);
    } else {
      dispatch(addFavorite(article));
      setStore(user, { favorites: arrayUnion(article) });
      setBookmarked(true);
    }
  };

  useEffect(() => {
    if (favorites.some((fav) => fav.url === article.url)) {
      setBookmarked(true);
    }
  }, [favorites, article]);

  return (
    <article className="grid min-h-[132px] grid-cols-[1fr_16px_auto] grid-rows-[repeat(4,minmax(0px,auto))] rounded-lg bg-white p-5 dark:bg-[#242424]">
      <p className="text-xs">{source.name}</p>
      <h4 className="col-start-1 col-end-2 row-start-2 row-end-2 mt-2 font-medium">
        <a onClick={handleLink} className="text-black dark:text-white">
          {title}
        </a>
      </h4>
      <figure className="col-start-3 col-end-3 row-start-1 row-end-4 h-20 w-20 overflow-hidden rounded-lg sm:h-24 sm:w-24">
        <Image
          className="h-full max-h-[175px] w-full max-w-[175px] object-cover"
          loader={imageLoader}
          src={`${urlToImage}`}
          alt={title}
          width={175}
          height={175}
          unoptimized
        />
      </figure>
      <div className="col-span-full row-start-4 flex justify-between pt-4">
        <span className="text-gray-400">{date}</span>
        {user &&
          (bookmarked ? (
            <BsBookmarkFill className="h-5 w-5" onClick={handleBookmark} />
          ) : (
            <BsBookmark className="h-5 w-5" onClick={handleBookmark} />
          ))}
      </div>
    </article>
  );
};

export default ArticleCard;
