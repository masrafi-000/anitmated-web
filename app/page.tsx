import { Container, Main, Section } from "@/components/ds";
import PageHeader from "@/components/parts/pageHeader";

export default function Page() {
  return (
    <Main>
      <Section>
        <Container>
          <PageHeader title="This is header Page" desc="ajsdfafi" />
        </Container>
      </Section>
    </Main>
  );
}
