"use client";

import PropTypes from "prop-types";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdCategory } from "react-icons/md";

import ThemeToggle from "../ThemeToggle";
import Branding from "../header/Branding";
import MainMenu from "./MainMenu";
import CategoryDrawer from "../ui/CategoryDrawer";
import CommandSearchButton from "../ui/CommandSearchButton";

export default function Navbar({ showSearch = true, showCategories = false }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDrawerOpen, setCategoryDrawerOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const openCategoryDrawer = () => setCategoryDrawerOpen(true);
  const closeCategoryDrawer = () => setCategoryDrawerOpen(false);

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main Navigation"
        className="bg-white px-8 py-2 shadow-md sticky top-0 z-[9999] border-b border-gray-200"
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* Branding + Explore Button */}
          <div className="flex items-center gap-4 md:gap-8">
            <Branding />
            {showCategories && (
              <button
                onClick={openCategoryDrawer}
                className="group flex items-center gap-2 text-gray-700 hover:text-orange-500 transition-colors font-medium"
                aria-label="Explore categories"
              >
                <span className="p-1 rounded-full bg-gray-100 group-hover:bg-orange-100 transition">
                  <MdCategory size={22} />
                </span>
                <span className="hidden md:inline-block font-semibold">
                  Explore
                </span>
              </button>
            )}
          </div>

          {/* Center Search */}
          {showSearch && (
            <div className="hidden md:flex flex-1 justify-center max-w-3xl mx-6">
              <CommandSearchButton />
            </div>
          )}

          {/* Right Options */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <MainMenu />
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className="text-gray-700 hover:text-orange-500 transition-colors"
            >
              {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden mt-3 px-4 space-y-4 transition-all duration-300"
          >
            {showSearch && <CommandSearchButton />}
            <ThemeToggle />
            <MainMenu />
          </div>
        )}
      </nav>

      {/* Category Drawer */}
      {showCategories && (
        <CategoryDrawer
          open={categoryDrawerOpen}
          onClose={closeCategoryDrawer}
        />
      )}
    </>
  );
}

Navbar.propTypes = {
  showSearch: PropTypes.bool,
  showCategories: PropTypes.bool,
};
