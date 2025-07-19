import {
  RiDeviceLine,
  RiFacebookBoxFill,
  RiInstagramFill,
  RiTwitterXFill,
} from "@remixicon/react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="bg-base-200 text-base-content pt-10 pb-6 px-6 sm:px-10"
      data-theme="night"
    >
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-8 max-w-6xl mx-auto">
        {/* Brand Info */}
        <div className="flex flex-col gap-2 max-w-xs">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-primary"
          >
            <RiDeviceLine className="w-6 h-6 text-accent" />
            SonicBay
          </Link>
          <p className="text-sm text-base-content/70 leading-relaxed">
            Your one-stop shop for all things electronics – from the latest
            gadgets to trusted tech essentials.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-base-content">Company</span>
            <Link className="link-hover">Home</Link>
            <Link className="link-hover">Shop</Link>
            <Link className="link-hover">About Us</Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-base-content">Support</span>
            <Link className="link-hover">FAQ</Link>
            <Link className="link-hover">Contact</Link>
            <Link className="link-hover">Privacy</Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-base-content">Social</span>
            
            <a href="https://github.com/naeemashhar" className="link-hover">
              Github
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="divider my-6"></div>

      {/* Bottion */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-sm max-w-6xl mx-auto gap-4">
        <p className="text-base-content/60 text-center sm:text-left">
          © {new Date().getFullYear()} SonicBay. All rights reserved.
        </p>
        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="#" className="text-accent hover:text-primary">
            <RiFacebookBoxFill className="w-5 h-5" />
          </a>
          <a href="#" className="text-accent hover:text-primary">
            <RiTwitterXFill className="w-5 h-5" />
          </a>
          <a href="#" className="text-accent hover:text-primary">
            <RiInstagramFill className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
