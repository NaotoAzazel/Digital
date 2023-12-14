"use client"

import { PRODUCT_CATEGORIES } from "@/config"
import { useEffect, useRef, useState } from "react"
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

function NavItems() {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const isAnyOpen = activeIndex !== null;

  const navRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(navRef, () => setActiveIndex(null));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if(e.key === "Escape") {
        setActiveIndex(null);
      }
    }

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    }
  }, [])

  return (
    <div className="flex gap-4 h-full" ref={navRef}>
      {PRODUCT_CATEGORIES.map((category, index) => {
        const handleOpen = () => setActiveIndex(activeIndex == index ? null : index);
        const isOpen = index === activeIndex;

        return (
          <NavItem 
            category={category} 
            handleOpen={handleOpen} 
            isOpen={isOpen} 
            isAnyOpen={isAnyOpen} 
            key={category.value} 
          />
        ) 
      })}
    </div>
  )
}

export default NavItems