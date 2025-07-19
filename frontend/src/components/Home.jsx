import CategoryList from "./CategoryList";
import BannerProduct from "./BannerProduct";
import HorizontalCardProduct from "./HorizontalCardProduct";
import VerticalCardProduct from "./VerticalCardProduct";

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />

      <HorizontalCardProduct category="airpodes" heading="🎧 AirPods" />
      <HorizontalCardProduct category="watches" heading="⌚ Smart Watches" />

      <VerticalCardProduct category="mobiles" heading="📱 Smartphones" />
      <VerticalCardProduct category="Mouse" heading="🖱️ Mouse Devices" />
      <VerticalCardProduct category="televisions" heading="📺 Televisions" />
      <VerticalCardProduct
        category="camera"
        heading="📷 Camera & Photography"
      />
      <VerticalCardProduct category="earphones" heading="🎧 Wired Earphones" />
      <VerticalCardProduct
        category="speakers"
        heading="🔊 Bluetooth Speakers"
      />
      <VerticalCardProduct category="refrigerator" heading="🧊 Refrigerator" />
      <VerticalCardProduct category="trimmers" heading="✂️ Grooming Trimmers" />
    </div>
  );
};

export default Home;
