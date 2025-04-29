import HeroSlideshow from "@/components/hero/hero-section";
import ProductGrid from "@/components/product/product-grid";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <HeroSlideshow />
        <section className="mx-auto py-16 container">
          <h2>Featured Products</h2>
          <ProductGrid />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
