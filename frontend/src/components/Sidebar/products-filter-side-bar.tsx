"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const ProductsFilterSidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`dark:text-white absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-slate-300 duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-lg font-semibold text-slate-600 dark:text-white">
              FILTER OPTIONS
            </h3>

            <h3 className="mb-4 ml-4 text-md font-semibold text-slate-700 dark:text-white">
              CATEGORIES
            </h3>
            <div className="ml-2 mb-4">
            {["Exercise Equipment", "Outdoor Gear", "Sports Apparel", "Cycling Gear", "Fishing Equipment"].map((category, index) => (
              <div key={index} className="inline-flex items-center">
                <label className="relative flex items-center px-2 rounded-full cursor-pointer" htmlFor={`check-${index}`}>
                  <input
                    type="checkbox"
                    className="bg-white before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-600 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-white before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-slate-800 checked:before:bg-white hover:before:opacity-10"
                    id={`check-${index}`}
                  />
                  <span
                    className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                      stroke="currentColor" strokeWidth="1">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                  </span>
                </label>
                <label className="mt-px cursor-pointer select-none" htmlFor={`check-${index}`}>
                  {category}
                </label>
              </div>
            ))}
          </div>


            <h3 className="mb-4 ml-4 text-md font-semibold text-slate-700 dark:text-white">
              BRANDS
            </h3>
            <div className="ml-2 mb-4">
            {["Nike", "Adidas", "Puma", "Reebok", "Under Armour"].map((brand, index) => (
              <div key={index} className="flex items-center">
                <label className="relative flex items-center px-2 rounded-full cursor-pointer" htmlFor={`check-${index}`}>
                  <input
                    type="checkbox"
                    className="bg-white before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-600 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-white before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-slate-800 checked:before:bg-white hover:before:opacity-10"
                    id={`check-${index}`}
                  />
                  <span
                    className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                      stroke="currentColor" strokeWidth="1">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                  </span>
                </label>
                <label className="mt-px cursor-pointer select-none" htmlFor={`check-${index}`}>
                  {brand}
                </label>
              </div>
            ))}
          </div>

            <h3 className="mb-4 ml-4 text-md font-semibold text-slate-700 dark:text-white">
              PRICE
            </h3>
            <div className="ml-2 mb-4">
            {["$0 - $50", "$50 - $100", "$100 - $200", "$200 - $500", "$500+"].map((price, index) => (
              <div key={index} className="flex items-center">
                <label className="relative flex items-center px-2 rounded-full cursor-pointer" htmlFor={`check-${index}`}>
                  <input
                    type="checkbox"
                    className="bg-white before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-600 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-white before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-slate-800 checked:before:bg-white hover:before:opacity-10"
                    id={`check-${index}`}
                  />
                  <span
                    className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                      stroke="currentColor" strokeWidth="1">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                  </span>
                </label>
                <label className="mt-px cursor-pointer select-none" htmlFor={`check-${index}`}>
                  {price}
                </label>
              </div>
            ))}
          </div>

            <h3 className="mb-4 ml-4 text-md font-semibold text-slate-700 dark:text-white">
              COLOR
            </h3>
            <div className="ml-2 mb-4">
            {["Red", "Blue", "Green", "Black", "White"].map((color, index) => (
              <div key={index} className="flex items-center">
                <label className="relative flex items-center px-2 rounded-full cursor-pointer" htmlFor={`check-${index}`}>
                  <input
                    type="checkbox"
                    className="bg-white before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-600 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-white before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-slate-800 checked:before:bg-white hover:before:opacity-10"
                    id={`check-${index}`}
                  />
                  <span
                    className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                      stroke="currentColor" strokeWidth="1">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                  </span>
                </label>
                <label className="mt-px cursor-pointer select-none" htmlFor={`check-${index}`}>
                  {color}
                </label>
              </div>
            ))}
          </div>
          </div>

          {/* <!-- Others Group --> */}
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default ProductsFilterSidebar;
