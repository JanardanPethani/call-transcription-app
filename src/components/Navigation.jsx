import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const items = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
  { title: "Transcribe", href: "/transcribe" },
];

export default function Navigation() {
  return (
    <nav className="border-b flex">
      <div className="flex w-full justify-between h-16 items-center px-4">
        <Link href="/" className="text-2xl font-bold mr-6">
          Call Transcription App
        </Link>
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {items.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex md:hidden ml-auto">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  Navigate to different sections of the app.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                {items.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="block px-2 py-1 text-lg"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
