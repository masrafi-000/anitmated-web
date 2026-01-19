import { Container, Section } from "@/components/ds";
import Image from "next/image";
// In a real app, use next/image. Placeholder div for now.

export function Story() {
  return (
    <Section className="py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div className="relative aspect-square md:aspect-4/3 rounded-2xl overflow-hidden bg-muted group">
            <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
             {/* Abstract placholder visual */}
            <div className="absolute inset-4 border border-primary/20 rounded-xl" />
            <div className="flex items-center justify-center h-full w-full text-muted-foreground/50 font-medium">
               <Image src="/images/story.png" alt="Story" fill className="object-cover" />
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              From a small room to <br />
              <span className="text-primary italic font-serif">global impact.</span>
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                {`Founded in 2020, Ruby Studio began with a simple idea: that business software doesn't have to be boring. We believed that B2B applications deserved the same level of polish and user experience as the best consumer apps.`}
              </p>
              <p>
               {` What started as two designers in a shared workspace has grown into a diverse team of strategists, developers, and creatives. We've weathered market shifts and technology revolutions, always staying ahead of the curve.`}
              </p>
              <p>
                Today, we partner with ambitious startups and Fortune 500 companies alike, helping them tell their stories and build products that people actually want to use.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
