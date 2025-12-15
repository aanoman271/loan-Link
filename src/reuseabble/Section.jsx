import Container from "./Container";

const Section = ({ children, className = "" }) => {
  return (
    <section className={`w-full py-16 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
};

export default Section;
