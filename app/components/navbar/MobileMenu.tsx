"use client";

import { useState } from "react";
import Link from "next/link";
import { NavItem } from "./data";
import { ChevronDownIcon } from "./icons";

interface MobileMenuProps {
  items: NavItem[];
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ items, isOpen, onClose }: MobileMenuProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggle = (label: string) =>
    setOpenDropdown(openDropdown === label ? null : label);

  return (
    <>
      {/* Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`lg:hidden fixed top-0 right-0 w-[80vw] max-w-[340px] h-dvh z-50 flex flex-col shadow-2xl bg-white transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        dir="rtl"
      >
        {/* Header */}
        <div className="px-5 py-5 flex items-center justify-between shrink-0 border-b border-gray-100">
          <div>
            <p className="text-gray-900 font-black text-xl tracking-tight">مدار</p>
            <p className="text-gray-400 text-xs">للأجهزة الإلكترونية</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav items */}
        <div className="flex-1 overflow-y-auto py-2">
          {items.map((item) => {
            const hasChildren = item.children || item.groups;
            const isExpanded = openDropdown === item.label;
            return (
              <div key={item.label} className="border-b border-gray-100 last:border-0">
                {hasChildren ? (
                  <button
                    onClick={() => toggle(item.label)}
                    className="w-full flex items-center justify-between px-5 py-3.5 text-sm font-semibold text-gray-800 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  >
                    {item.label}
                    <span className={`text-gray-400 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>
                      <ChevronDownIcon />
                    </span>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center px-5 py-3.5 text-sm font-semibold text-gray-800 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  >
                    {item.label}
                  </Link>
                )}

                {/* Sub items */}
                <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-[50vh] overflow-y-auto" : "max-h-0"}`}>
                  <div className="pb-2 bg-gray-50">
                    {item.groups?.map((group, gi) => (
                      <div key={gi}>
                        <p className="px-5 pt-3 pb-1 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          {group.groupLabel}
                        </p>
                        {group.items.map((child, ci) => (
                          <Link
                            key={`${child.href}-${ci}`}
                            href={child.href}
                            onClick={onClose}
                            className="flex items-center gap-2 px-5 py-2.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                    {item.children?.map((child, ci) => (
                      <Link
                        key={`${child.href}-${ci}`}
                        href={child.href}
                        onClick={onClose}
                        className="flex items-center gap-2 px-5 py-2.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="shrink-0 px-5 py-4 border-t border-gray-100 bg-white">
          <p className="text-xs text-gray-400 text-center">مدار للأجهزة الإلكترونية</p>
        </div>
      </div>
    </>
  );
}
