"use client";

import { RootState } from "@/store";
import Image from "next/image";
import { useSelector } from "react-redux";

const imageLoader = ({ src }: { src: string }) => {
  return `${src}`;
};

const Article = () => {
  const article = useSelector((state: RootState) => state.currentArticle);
  let { title, urlToImage, content, description, source, url } = article;

  if (!urlToImage) {
    urlToImage =
      "https://gumlet.assettype.com/quintype-website%2F2018-08%2F973e3cef-6730-4e80-af93-6851ec9d7ef0%2F6277209256_198cdbea86_o.jpg?rect=0%2C0%2C1279%2C719&auto=format%2Ccompress&fit=max&w=400&dpr=2.6";
  }

  return (
    <div>
      <div className=" mx-auto my-16 px-10">
        <section className="mb-32 text-gray-800">
          <div className="block rounded-lg bg-white shadow-lg">
            <div className="flex flex-wrap items-center">
              <div className="w-full shrink-0 grow-0 basis-auto lg:flex lg:w-6/12 xl:w-4/12">
                <Image
                  loader={imageLoader}
                  src={urlToImage}
                  alt={title}
                  width={500}
                  height={500}
                  className="w-full rounded-t-lg lg:rounded-bl-lg lg:rounded-tr-none"
                />
              </div>
              <div className="w-full shrink-0 grow-0 basis-auto lg:w-6/12 xl:w-8/12">
                <div className="px-6 py-12 md:px-12">
                  <h2 className="mb-4 text-2xl font-bold" data-test="art-title">
                    {title}
                  </h2>
                  <p className="mb-6 flex items-center font-bold uppercase text-red-600">
                    {source.name}
                  </p>
                  <p className="mb-6 text-gray-500">{description}</p>
                  <p className="mb-6 text-gray-500">{content}</p>
                  <a href={url} target="_blank">
                    View on it&apos;s original source
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Article;
