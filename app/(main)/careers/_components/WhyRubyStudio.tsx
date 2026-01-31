import { Container, Section } from "@/components/ds";
import { Card } from "@/components/ui/card";
import {
  Award,
  Globe,
  Heart,
  Rocket,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

export function WhyRubyStudio() {
  return (
    <Section>
      <Container>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Heart className="h-4 w-4" />
            <span className="text-sm font-medium">Why Ruby Studio</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            More Than Just a Job
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            At Ruby Studio, you&apos;ll work on cutting-edge projects,
            collaborate with talented people, and grow your career in a
            supportive environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-muted/60 text-center p-8">
            <div className="h-14 w-14 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
              <Rocket className="h-7 w-7 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Impactful Work</h3>
            <p className="text-muted-foreground">
              Work on projects that matter for clients you&apos;ll be proud to
              showcase
            </p>
          </Card>

          <Card className="border-muted/60 text-center p-8">
            <div className="h-14 w-14 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-7 w-7 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Career Growth</h3>
            <p className="text-muted-foreground">
              Continuous learning opportunities and clear paths for advancement
            </p>
          </Card>

          <Card className="border-muted/60 text-center p-8">
            <div className="h-14 w-14 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
              <Users className="h-7 w-7 text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Amazing Team</h3>
            <p className="text-muted-foreground">
              Collaborate with talented, passionate people who love what they
              do
            </p>
          </Card>

          <Card className="border-muted/60 text-center p-8">
            <div className="h-14 w-14 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-4">
              <Globe className="h-7 w-7 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Flexible Work</h3>
            <p className="text-muted-foreground">
              Remote options, flexible hours, and work-life balance that works
              for you
            </p>
          </Card>

          <Card className="border-muted/60 text-center p-8">
            <div className="h-14 w-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
              <Award className="h-7 w-7 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Recognition</h3>
            <p className="text-muted-foreground">
              Your contributions are valued and celebrated with rewards and
              recognition
            </p>
          </Card>

          <Card className="border-muted/60 text-center p-8">
            <div className="h-14 w-14 rounded-full bg-pink-500/10 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-7 w-7 text-pink-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Innovation</h3>
            <p className="text-muted-foreground">
              Work with the latest technologies and push the boundaries of
              what&apos;s possible
            </p>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
