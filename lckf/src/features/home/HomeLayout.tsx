import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeSearch from "./HomeSearch";
import HomeFeatures from "./HomeFeatures";
import TestApi from "@/features/test/TestApi";

export default function HomeLayout() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header showNav={true} />
      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-4 py-8 w-full">
          <HomeSearch />
          <HomeFeatures />
          <div className="mt-8">
            <TestApi />
          </div>
        </div>
      </main>
      <Footer show={true} />
    </div>
  );
}
