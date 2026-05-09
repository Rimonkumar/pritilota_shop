import Banner from "@/components/Banner";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategoryList from "@/components/CategoryList";
import Gallery from "@/components/Gallery";

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <Banner />
      <CategoryList />
      <FeaturedProducts />
      <Gallery />
    </div>
  );
}
