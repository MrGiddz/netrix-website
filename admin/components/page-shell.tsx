type PageShellProps = {
  children: React.ReactNode;
};

const PageShell = ({ children }: PageShellProps) => (
  <div className="space-y-6 pb-8">{children}</div>
);

export default PageShell;
