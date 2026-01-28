import Link from "next/link";
import React from "react";
import CustumImage from "./Image";

const menuList = [
  { id: 1, name: "Homepage", link: "/", icon: "home.svg" },
  { id: 2, name: "Explore", link: "/", icon: "explore.svg" },
  { id: 3, name: "Notification", link: "/", icon: "notification.svg" },
  { id: 4, name: "Messages", link: "/", icon: "message.svg" },
  { id: 5, name: "Bookmarks", link: "/", icon: "bookmark.svg" },
  { id: 6, name: "Jobs", link: "/", icon: "job.svg" },
  { id: 7, name: "Communities", link: "/", icon: "community.svg" },
  { id: 8, name: "Premium", link: "/", icon: "logo.svg" },
  { id: 9, name: "Profile", link: "/", icon: "profile.svg" },
  { id: 10, name: "More", link: "/", icon: "more.svg" },
];

function LeftBar({ onClose }: { onClose?: () => void }) {
  return (
    // h-screen sticky prevents the bar from scrolling away.
    // overflow-y-auto allows scrolling inside the menu if it's too long.
    <div className="h-[100] sm:h-screen sticky top-0 flex flex-col justify-between py-4 overflow-y-hidden  bg-black">
      <div className="flex flex-col gap-2 items-start sm:items-center xl:items-start px-4 sm:px-0">
        {/* LOGO */}
        <Link
          href="/"
          onClick={onClose}
          className="p-3 rounded-full hover:bg-[#181818] transition-colors inline-flex items-center justify-center mb-2">
          <CustumImage src="icons/logo.svg" alt="logo" width={28} height={28} />
        </Link>

        {/* USER PROFILE SECTION (Visible on Mobile Drawer) */}
        <div className="flex items-center gap-3 mb-4 sm:hidden xl:flex">
          <div className="w-10 h-10 relative rounded-full overflow-hidden flex-shrink-0">
            <CustumImage
              src="/general/avatar.png"
              alt="profile"
              width={40}
              height={40}
              tr={true}
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-sm text-white truncate w-32">
              mohamed bouayaben
            </span>
            <span className="text-sm text-textGray">@bouayaben9</span>
          </div>
        </div>

        {/* MENU LIST */}
        <nav className="flex flex-col gap-1 w-full">
          {menuList.map((item) => (
            <Link
              href={item.link}
              onClick={onClose} // Closes drawer on mobile
              className="p-3 rounded-full hover:bg-[#181818] flex items-center gap-4 transition-colors w-full sm:w-max xl:w-full"
              key={item.id}>
              <div className="w-6 h-6 relative flex-shrink-0">
                <CustumImage
                  alt={item.name}
                  src={`icons/${item.icon}`}
                  width={24}
                  height={24}
                />
              </div>
              <span className="text-xl font-medium flex sm:hidden xl:block">
                {item.name}
              </span>
            </Link>
          ))}
        </nav>

        {/* POST BUTTONS */}
        <div className="mt-4 w-full">
          {/* Mobile/Tablet Circle */}
          <Link
            href="/compose/post"
            onClick={onClose}
            className="bg-white text-black rounded-full font-bold w-12 h-12 flex items-center justify-center xl:hidden mx-auto sm:mx-0 hover:bg-gray-200 transition-colors shadow-md">
            <CustumImage
              src="icons/post.svg"
              alt="post"
              width={20}
              height={20}
            />
          </Link>

          {/* Desktop Pill */}
          <Link
            href="/compose/post"
            onClick={onClose}
            className="hidden xl:flex bg-white text-black rounded-full font-bold py-3 w-full items-center justify-center hover:bg-gray-200 transition-colors text-lg">
            Post
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LeftBar;
