import Balancer from "react-wrap-balancer";
import { Container, Section } from "@/components/ds";
import { Button } from "../ui/button";

// 1. Define the base props common to all headers
interface BaseHeaderProps {
  title: string;
  desc: string;
}

// 2. Define the primary button logic: 
// If showPrimary is true, primaryText is REQUIRED. Otherwise, both are optional/never.
type PrimaryButtonProps = 
  | { showPrimary: true; primaryText: string; onPrimaryClick?: () => void }
  | { showPrimary?: false; primaryText?: never; onPrimaryClick?: never };

// 3. Define the secondary button logic independently
type SecondaryButtonProps = 
  | { showSecondary: true; secondaryText: string; onSecondaryClick?: () => void }
  | { showSecondary?: false; secondaryText?: never; onSecondaryClick?: never };

// 4. Combine them into the final Props type
type PageHeaderProps = BaseHeaderProps & PrimaryButtonProps & SecondaryButtonProps;

const PageHeader = ({ 
  title, 
  desc, 
  showPrimary, 
  primaryText, 
  onPrimaryClick,
  showSecondary, 
  secondaryText,
  onSecondaryClick 
}: PageHeaderProps) => {
  return (
    <Section>
      <Container className="flex flex-col text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">{title}</h1>
        <h3 className="text-xl text-muted-foreground max-w-2xl mx-auto">
          <Balancer>{desc}</Balancer>
        </h3>
        
        {/* Render the button group only if at least one button is toggled on */}
        {(showPrimary || showSecondary) && (
          <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-4">
            {showPrimary && (
              <Button onClick={onPrimaryClick}>
                {primaryText}
              </Button>
            )}
            
            {showSecondary && (
              <Button variant="outline" onClick={onSecondaryClick}>
                {secondaryText}
              </Button>
            )}
          </div>
        )}
      </Container>
    </Section>
  );
};

export default PageHeader;