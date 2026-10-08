import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { BsGithub, BsLinkedin, BsTwitterX } from "react-icons/bs";

export default function SocialLinks() {
  const socials = [
    {
      href: "https://x.com/acadevault",
      label: "Follow us on X",
      icon: BsTwitterX,
    },
    {
      href: "https://linkedin.com/company/acadevault",
      label: "Connect on LinkedIn",
      icon: BsLinkedin,
    },
    {
      href: "https://github.com/acadevault",
      label: "Star us on GitHub",
      icon: BsGithub,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="absolute bottom-8 left-0 right-0 flex justify-center space-x-4"
    >
      {socials.map(({ href, label, icon: Icon }) => (
        <Button
          key={href}
          as="a"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          variant="ghost"
          size="lg"
          className="p-3 rounded-full hover:bg-white/20 focus:ring-2 focus:ring-offset-2 focus:ring-white"
          aria-label={label}
        >
          <Icon className="h-6 w-6 text-white" />
        </Button>
      ))}
    </motion.div>
  );
}
