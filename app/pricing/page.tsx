"use client";

import { Container, Section } from "@/components/ds";
import Pricing from "@/components/landing/pricing";
import PageHeader from "@/components/parts/pageHeader";
import { PackageComparison } from "@/components/pricing/comparison-table";
import PricingQueryForm from "@/components/pricing/pricing-query-form";
import { Card, CardContent } from "@/components/ui/card";
import {
    Award,
    BarChart3,
    CheckCircle2,
    Rocket,
    Shield,
    Star,
    TrendingUp,
    Users,
    Zap,
} from "lucide-react";

export default function PricingPage() {
  return (
    <>
      {/* Section 1: Hero/Header */}
      <PageHeader
        title="Simple, Transparent Pricing"
        desc="Choose the perfect plan for your business. No hidden fees, no surprises. Just exceptional digital experiences delivered with excellence."
        align="center"
      />

      {/* Section 2: Pricing Cards */}
      <Pricing />

      {/* Section 3: Package Comparison Table */}
      <Section className="bg-muted/30">
        <Container>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Star className="h-4 w-4" />
              <span className="text-sm font-medium">Compare Plans</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Detailed Package Comparison
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See exactly what&apos;s included in each package and choose the one that fits your needs.
            </p>
          </div>

          <PackageComparison />
        </Container>
      </Section>

      {/* Section 4: Why Choose Our Services */}
      <Section className="bg-muted/30">
        <Container>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Star className="h-4 w-4" />
              <span className="text-sm font-medium">Why Ruby Studio</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Invest in Our Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We deliver exceptional value through proven expertise, innovative solutions, and unwavering commitment to your success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-muted/60">
              <CardContent className="p-8 text-center">
                <div className="h-14 w-14 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-7 w-7 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Proven Expertise</h3>
                <p className="text-muted-foreground">
                  8+ years of experience delivering exceptional digital products for 80+ satisfied clients
                </p>
              </CardContent>
            </Card>

            <Card className="border-muted/60">
              <CardContent className="p-8 text-center">
                <div className="h-14 w-14 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-7 w-7 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Measurable Results</h3>
                <p className="text-muted-foreground">
                  Average 45% increase in conversions and 60% improvement in user engagement
                </p>
              </CardContent>
            </Card>

            <Card className="border-muted/60">
              <CardContent className="p-8 text-center">
                <div className="h-14 w-14 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-7 w-7 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
                <p className="text-muted-foreground">
                  Efficient processes ensure your project launches on time without compromising quality
                </p>
              </CardContent>
            </Card>

            <Card className="border-muted/60">
              <CardContent className="p-8 text-center">
                <div className="h-14 w-14 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-7 w-7 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Quality Guaranteed</h3>
                <p className="text-muted-foreground">
                  Rigorous testing and quality assurance ensure flawless execution every time
                </p>
              </CardContent>
            </Card>

            <Card className="border-muted/60">
              <CardContent className="p-8 text-center">
                <div className="h-14 w-14 rounded-full bg-pink-500/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-7 w-7 text-pink-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Dedicated Support</h3>
                <p className="text-muted-foreground">
                  Your success is our priority with ongoing support and maintenance included
                </p>
              </CardContent>
            </Card>

            <Card className="border-muted/60">
              <CardContent className="p-8 text-center">
                <div className="h-14 w-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                  <Rocket className="h-7 w-7 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Future-Proof</h3>
                <p className="text-muted-foreground">
                  Built with scalability in mind using modern technologies and best practices
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Section 5: Who Are Our Customers */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Who Trusts Ruby Studio
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From ambitious startups to established enterprises, we partner with businesses ready to elevate their digital presence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                40%
              </div>
              <h3 className="text-xl font-semibold mb-2">Startups</h3>
              <p className="text-muted-foreground">
                Fast-growing companies building their brand from the ground up
              </p>
            </div>

            <div className="text-center">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                35%
              </div>
              <h3 className="text-xl font-semibold mb-2">Scale-ups</h3>
              <p className="text-muted-foreground">
                Growing businesses scaling their operations and digital infrastructure
              </p>
            </div>

            <div className="text-center">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                25%
              </div>
              <h3 className="text-xl font-semibold mb-2">Enterprises</h3>
              <p className="text-muted-foreground">
                Established companies seeking innovation and digital transformation
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Section 6: Why Customers Choose Our Packages */}
      <Section className="bg-muted/30">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Customers Choose Our Packages
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real results from real businesses that invested in exceptional digital experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-muted/60">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">ROI-Focused Approach</h3>
                    <p className="text-muted-foreground text-sm">
                      Our clients see an average 3x return on investment within the first year through increased conversions and brand value.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-muted/60">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">User-Centric Design</h3>
                    <p className="text-muted-foreground text-sm">
                      75% improvement in user satisfaction scores through research-driven design and intuitive interfaces.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-muted/60">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Performance Optimized</h3>
                    <p className="text-muted-foreground text-sm">
                      60% faster load times leading to better SEO rankings and reduced bounce rates for our clients.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-muted/60">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Long-term Partnership</h3>
                    <p className="text-muted-foreground text-sm">
                      85% client retention rate with ongoing support, updates, and continuous improvement.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Section 7: What's Included */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What&apos;s Included in Every Package
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              No matter which plan you choose, you get our commitment to excellence and these core benefits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              "Dedicated project manager",
              "Regular progress updates",
              "Unlimited revisions during development",
              "Source code ownership",
              "30-day post-launch support",
              "Performance optimization",
              "SEO best practices",
              "Responsive design",
              "Cross-browser compatibility",
              "Security best practices",
              "Documentation",
              "Training session",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      {/* Section 8: Query Form */}
      <Section className="bg-muted/30">
        <Container>
          <PricingQueryForm />
        </Container>
      </Section>
    </>
  );
}
