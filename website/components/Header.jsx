"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { tel } from "@/lib/utils";

const NAV = [
  ["Home", "/"],
  ["Departments", "/#departments"],
  ["Doctors", "/doctors"],
  ["About", "/#about"],
  ["Contact", "/#contact"],
];

export default function Header({ name, tagline, landline }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site">
      <div className="wrap">
        <Link className="brand" href="/" aria-label={`${name} home`}>
          <span className="crest logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="" />
          </span>
          <span>
            <b>{name}</b>
            <small>{tagline}</small>
          </span>
        </Link>
        <nav id="nav" aria-label="Main" className={open ? "open" : ""}>
          <ul>
            {NAV.map(([label, href]) => {
              const current = (href === "/" && pathname === "/") || (href === "/doctors" && pathname === "/doctors");
              return (
                <li key={href}>
                  <Link href={href} aria-current={current ? "page" : undefined} onClick={() => setOpen(false)}>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <a className="head-call" href={tel(landline)}>
          {landline}
        </a>
        <Link className="btn btn-red btn-sm" href="/doctors">
          Book appointment
        </Link>
        <button className="menu-btn" type="button" aria-expanded={open} aria-controls="nav" onClick={() => setOpen((o) => !o)}>
          Menu
        </button>
      </div>
    </header>
  );
}
