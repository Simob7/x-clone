import React from "react";
import Link from "next/link";

const footerLinks = [
  { name: "Terms of Service", link: "/" },
  { name: "Privacy Policy", link: "/" },
  { name: "Cookie Policy", link: "/" },
  { name: "Accessibility", link: "/" },
  { name: "Ads info", link: "/" },
  { name: "More", link: "/" },
];

function Footer() {
  return (
    <div className="flex flex-wrap gap-y-1 gap-x-3 px-4 text-[13px] text-textGray">
      {footerLinks.map((item) => (
        <Link key={item.name} href={item.link} className="hover:underline">
          {item.name}
        </Link>
      ))}
      <span className="">© 2026 X Corp.</span> 
    </div>
  );
}

export default Footer;
