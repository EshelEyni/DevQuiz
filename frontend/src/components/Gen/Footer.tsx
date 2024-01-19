type FooterProps = {
  children: React.ReactNode;
  className?: string;
};

export const Footer = ({ children, className }: FooterProps) => {
  return <footer className={className}>{children}</footer>;
};
