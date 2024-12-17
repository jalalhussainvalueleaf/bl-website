import { DarkThemeToggle } from "flowbite-react";
import Banner from "../components/HomePage/Banner";
import Card from "../components/HomePage/Card";
import Advantages from "../components/HomePage/Advantages";
import Introductions from "../components/HomePage/Introductions";
import Header from "../components/Header/page";
import Footer from "../components/Footer/page";

export default function Home() {
  return (
    <>
      <Header />
      <Banner />
      <Card />
      <Advantages />
      <Introductions />
      <Footer />
    </>
  );
}
