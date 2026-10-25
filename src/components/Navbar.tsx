"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, Briefcase, Menu, Search } from "lucide-react";
import ProfileSidebar from "./ProfileSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SearchBar from "./SearchBar";
import { useSection } from "./SectionProvider";
import { sections, type SectionId } from "./sections";
import { siteConfig } from "@/lib/site-config";

export default function Navbar() {
  const { active, setActive } = useSection();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const puckRef = useRef<HTMLSpanElement>(null);

  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Sections are state, not routes, so picking one from another page has to
  // come back to "/" for the outlet to show it.
  function goToSection(id: SectionId) {
    setActive(id);
    if (pathname !== "/") router.push("/");
  }
  const firstPlacement = useRef(true);

  // The blue circle is one element that slides between tabs, so its position
  // is measured from the live DOM rather than guessed. Written straight to
  // style: this is layout, and routing it through state would re-render the
  // whole bar on every move.
  //
  // It stretches along the way — scaled out as it leaves, released part-way
  // so it settles back to a circle on arrival. The travel itself eases out
  // without overshooting.
  useLayoutEffect(() => {
    const puck = puckRef.current;
    const tab = tabRefs.current[sections.findIndex((s) => s.id === active)];
    if (!puck || !tab) return;

    function place(stretch: boolean) {
      if (!puck || !tab) return;
      puck.style.width = `${tab.offsetWidth}px`;
      puck.style.transform = `translateX(${tab.offsetLeft}px) scaleX(${
        stretch ? 1.35 : 1
      })`;
    }

    const settle = () => place(false);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer: number | undefined;

    if (firstPlacement.current || reduced) {
      firstPlacement.current = false;
      settle();
    } else {
      place(true);
      timer = window.setTimeout(settle, 160);
    }

    window.addEventListener("resize", settle);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", settle);
    };
  }, [active, pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-hairline bg-announce">
      {/* Same column template as the page, so the tabs line up with column two */}
      <div className="grid grid-cols-1 lg:h-16 lg:grid-cols-[289fr_622fr_289fr]">
        {/* Mobile: menu and logo left, search and photo right. */}
        <div className="flex h-16 items-center gap-3 px-4 lg:hidden">
          {searchOpen ? (
            <div className="flex flex-1 items-center gap-3 slide-in-from-right-2 fade-in fill-mode-both animation-duration-200 motion-safe:animate-in">
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
                className="shrink-0 cursor-pointer text-nav-ink"
              >
                <ArrowLeft aria-hidden size={22} strokeWidth={1.5} />
              </button>
              <SearchBar onNavigate={() => setSearchOpen(false)} />
            </div>
          ) : (
            <div className="flex flex-1 items-center gap-3 slide-in-from-left-2 fade-in fill-mode-both animation-duration-200 motion-safe:animate-in">
              <Sheet>
                <SheetTrigger
                  aria-label="Open menu"
                  className="shrink-0 cursor-pointer text-nav-ink"
                >
                  <Menu aria-hidden size={24} strokeWidth={1.5} />
                </SheetTrigger>
                <SheetContent side="left" className="w-[320px] p-4">
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                  <ProfileSidebar />
                </SheetContent>
              </Sheet>

              <LogoButton onClick={() => goToSection("home")} />

              <div className="flex-1" />

              <Link
                href="/experience"
                aria-label="Work experience"
                title="Work experience"
                aria-current={pathname === "/experience" ? "page" : undefined}
                className={`shrink-0 cursor-pointer transition duration-200 motion-safe:hover:scale-110 motion-safe:active:scale-90 ${
                  pathname === "/experience" ? "text-primary" : "text-nav-ink"
                }`}
              >
                <Briefcase aria-hidden size={22} strokeWidth={1.5} />
              </Link>

              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="shrink-0 cursor-pointer text-nav-ink transition duration-200 motion-safe:hover:scale-110 motion-safe:active:scale-90"
              >
                <Search aria-hidden size={22} strokeWidth={1.5} />
              </button>

              <button
                type="button"
                onClick={() => goToSection("home")}
                aria-label={siteConfig.name}
                className="shrink-0 cursor-pointer"
              >
                <Avatar className="size-8">
                  <AvatarImage src="/profile.jpg" alt={siteConfig.name} />
                  <AvatarFallback className="type-caption">MM</AvatarFallback>
                </Avatar>
              </button>
            </div>
          )}
        </div>

        {/* Desktop: logo beside the full search field, over the sidebar column */}
        <div className="hidden h-16 items-center gap-2 px-2 lg:flex">
          <LogoButton onClick={() => goToSection("home")} />
          <SearchBar />
        </div>

        <nav
          aria-label="Main"
          className="fixed inset-x-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-50 flex items-center justify-between gap-1 rounded-full border border-hairline bg-background p-2 shadow-[0_8px_16px_rgba(0,0,0,0.1)] lg:static lg:h-full lg:w-full lg:gap-0 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none"
        >
          <span
            ref={puckRef}
            aria-hidden
            className={`absolute top-2 left-0 size-11 rounded-full bg-primary transition-transform duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none lg:hidden ${
              pathname === "/" ? "" : "hidden"
            }`}
          />

          {sections.map(({ id, label, Icon }, index) => (
            <button
              key={id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              onClick={() => goToSection(id)}
              title={label}
              aria-label={label}
              aria-current={pathname === "/" && active === id ? "true" : undefined}
              className={`relative flex size-11 cursor-pointer items-center justify-center rounded-full transition-colors lg:size-auto lg:h-full lg:flex-1 lg:rounded-none ${
                pathname === "/" && active === id
                  ? "text-primary-foreground lg:text-primary"
                  : "text-nav-ink lg:hover:bg-fog lg:hover:text-primary"
              }`}
            >
              <Icon aria-hidden size={24} strokeWidth={1.5} />
              {pathname === "/" && active === id && (
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 hidden h-0.5 bg-primary lg:block"
                />
              )}
            </button>
          ))}
        </nav>
        <div className="hidden lg:block" />
      </div>
    </header>
  );
}

function LogoButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Home"
      title="Home"
      className="shrink-0 cursor-pointer rounded-full p-1 transition-opacity hover:opacity-80"
    >
      <Image
        src="/images/logo.webp"
        alt={`${siteConfig.name} logo`}
        width={80}
        height={80}
        priority
        className="size-10"
      />
    </button>
  );
}
