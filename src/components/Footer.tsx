const Footer = () => {
  return (
    <footer className="w-full py-8 px-6 md:px-12 lg:px-20 border-t border-border/30">
      <p className="text-xs text-muted-foreground tracking-wider">
        © {new Date().getFullYear()} SIDHARTH M
      </p>
    </footer>
  );
};

export default Footer;
