type MainProps = {
  children: React.ReactNode;
};

function main({ children }: MainProps) {
  return <main className="main">{children}</main>;
}

export default main;
