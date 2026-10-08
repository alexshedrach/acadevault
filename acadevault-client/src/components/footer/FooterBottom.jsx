import {
    FaFacebookF,
    FaInstagram,
    FaTiktok,
    FaTwitter,
    FaYoutube,
} from "react-icons/fa";
import { SiMastercard, SiPaypal, SiVisa } from "react-icons/si";
import FooterSocial from "./FooterSocial";

export default function FooterBottom() {
  return (
    <>
      <section className="flex flex-col md:flex-row justify-between items-center border-t border-gray-300 dark:border-gray-700 pt-6 gap-6">
        <div className="flex space-x-4" aria-label="Social media">
          <FooterSocial icon={<FaFacebookF />} label="Facebook" />
          <FooterSocial icon={<FaTwitter />} label="Twitter" />
          <FooterSocial icon={<FaInstagram />} label="Instagram" />
          <FooterSocial icon={<FaTiktok />} label="TikTok" />
          <FooterSocial icon={<FaYoutube />} label="YouTube" />
        </div>
        <div className="flex space-x-6" aria-label="Payment methods">
          <SiVisa className="text-3xl" />
          <SiMastercard className="text-3xl" />
          <SiPaypal className="text-3xl" />
        </div>
      </section>
      <section className="text-center text-xs text-gray-500 dark:text-gray-400 pt-4">
        <p>
          &copy; {new Date().getFullYear()} AcadeVault. All rights reserved. A
          product of Alexdegreat Computer Tech & Solutions.
        </p>
      </section>
    </>
  );
}
