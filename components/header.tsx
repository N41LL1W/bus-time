import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Link from "next/link";

const Header = () => {
  return (
    <Card className="flex justify-between items-center p-2 bg-gray-900">
      {/* Logo e Nome da Empresa */}
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Image
            alt="busontime"
            src="/bustime_logo.png"
            height={80}
            width={80}
            className="mr-2"
          />
        </Link>
        <span className="text-xl font-extrabold">BUSONTIME</span>
      </div>

      {/* Botão de Menu à Direita */}
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <p>Conteúdo do menu aqui</p>
        </SheetContent>
      </Sheet>
    </Card>
  );
};

export default Header;
