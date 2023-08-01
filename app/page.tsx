"use client";
import { redirect } from "next/navigation";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

const Home = () => {
  const country = useSelector((state: RootState) => state.country);
  redirect(`${country.code}/general`);
};

export default Home;
