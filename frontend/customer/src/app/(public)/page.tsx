import HeroBanner from '@/components/home/HeroBanner';
import FeaturedServices from '@/components/home/FeaturedServices';
import FeaturedTherapists from '@/components/home/FeaturedTherapists';
import Testimonials from '@/components/home/Testimonials';
import Promotions from '@/components/home/Promotions';

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <FeaturedServices />
      <Promotions />
      <FeaturedTherapists />
      <Testimonials />
    </>
  );
}
