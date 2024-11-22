import { DarkThemeToggle } from "flowbite-react";
import Banner from "../components/HomePage/Banner";
import Card from "../components/HomePage/Card";
import Advantages from "../components/HomePage/Advantages";
import Introductions from "../components/HomePage/Introductions";

export default function Home() {
  return (
    <>
      <Banner />
      <Card />
      <Advantages />
      <Introductions />
    </>
  );
}
