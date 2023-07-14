type FooterProps = {
  children: React.ReactNode;
};

function Footer({ children }: FooterProps) {
  return <footer>{children}</footer>;
}

export default Footer;
