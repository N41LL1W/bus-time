import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex items-center p-4 bg-gray-500">
      <span className="text-sm pr-1">BUSONTIME</span>
      <span className="text-sm pr-4">&copy; {currentYear}</span>
      <span className="text-sm">
        Desenvolvido por{" "}
        <Link href="https://github.com/N41LL1W" target="_blank" className="underline">
          Willian Gomes
        </Link>
      </span>
    </footer>
  );
};

export default Footer;
