import { ExpandableCardDemo } from "../card/expandableCard";
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
        title="Crafting Digital Excellence"
        desc="A boutique design studio focusing on high-end interactions and classic typography."
        showPrimary={true}
        primaryText="Start Project"
        showSecondary={true}
        secondaryText="View Pricing"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
        <ExpandableCardDemo />
        <ExpandableCardDemo />
        <ExpandableCardDemo />
        <ExpandableCardDemo />
      </div>

      <FeatureNine />

      <Pricing />

      <MarqueeDemo />
      
      <FAQ />
    </>
  );
};

export default HeroSection;
