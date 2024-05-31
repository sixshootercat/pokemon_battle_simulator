import { Metadata } from "next";
import { MainSection } from "./components/MainSection";

export const metadata: Metadata = {
  title: "Pokemon Battle Simulator | Home",
  description: "battle against your favorite pokemon",
};

export default async function HomePage() {
  return (
    <main className="flex justify-center items-center w-100 my-20 px-20">
      <div id="modal-root"></div>
      <MainSection />
    </main>
  );
}
