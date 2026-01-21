import FAQ from "../parts/faq";
import PageHeader from "../parts/pageHeader";

import FeatureNine from "./features";
import Pricing from "./pricing";
import { MarqueeDemo } from "./testimonial";

const HeroSection = () => {
  return (
    <>
      <PageHeader
        align="center"
        title="We Architect Digital Dreams"
        desc="Ruby Studio is a premier creative agency. We merge art with technology to create stunning, high-performance digital experiences that captivate and convert."
        showPrimary={true}
        primaryText="Start Your Project"
        showSecondary={true}
        secondaryText="Explore Our Work"
      />

      <FeatureNine />

      <Pricing />

      <MarqueeDemo />

      <FAQ />
    </>
  );
};

export default HeroSection;
