import Link from "next/link";
import React from "react";
import CustumImage from "./Image";

const menuList = [
  {
    id: 1,
    name: "Homepage",
    link: "/",
    icon: "home.svg",
  },
  {
    id: 2,
    name: "Explore",
    link: "/",
    icon: "explore.svg",
  },
  {
    id: 3,
    name: "Notification",
    link: "/",
    icon: "notification.svg",
  },
  {
    id: 4,
    name: "Messages",
    link: "/",
    icon: "message.svg",
  },
  {
    id: 5,
    name: "Bookmarks",
    link: "/",
    icon: "bookmark.svg",
  },
  {
    id: 6,
    name: "Jobs",
    link: "/",
    icon: "job.svg",
  },
  {
    id: 7,
    name: "Communities",
    link: "/",
    icon: "community.svg",
  },
  {
    id: 8,
    name: "Premium",
    link: "/",
    icon: "logo.svg",
  },
  {
    id: 9,
    name: "Profile",
    link: "/",
    icon: "profile.svg",
  },
  {
    id: 10,
    name: "More",
    link: "/",
    icon: "more.svg",
  },
];

function LeftBar() {
  return (
    <div className="h-screen sticky top-0 flex flex-col justify-between pt-2 pb-8">
      {/* LOGO menu BUTTON */}
      <div className="flex flex-col gap-4 text-lg items-center ">
        {/* LOGO */}
        <Link
          href="/"
          className="pt-4 rounded-full hover:bg-[#181818] xl:items-start lg:items-center">
          <CustumImage src="icons/logo.svg" alt="logo" width={24} height={24} />
        </Link>
        {/* {/* /* MENU LIST */}
        <div className="flex flex-col gap-4">
          {menuList.map((item) => (
            <Link
              href={item.link}
              className="pt-2 rounded-full hover:bg-[#181818] flex items-center gap-4"
              key={item.id}>
              <CustumImage
                alt={item.name}
                src={`icons/${item.icon}`}
                width={24}
                height={24}
              />
              <span className="xl:inline hidden">{item.name}</span>
            </Link>
          ))}
        </div>
        {/* BUTTON  */}
        <Link
          href={"/"}
          className=" bg-white text-black rounded-full font-bold w-12 h-12 flex items-center justify-center xl:hidden">
          <CustumImage
            src="icons/post.svg"
            alt="new post"
            width={24}
            height={24}
          />
        </Link>
        <Link
          href={"/"}
          className="hidden xl:block bg-white text-black rounded-full font-bold py-2 px-20 ">
          post
        </Link>
      </div>
      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 relative rounded-full overflow-hidden">
            <CustumImage
              src="/general/avatar.png"
              alt="profile"
              width={100}
              height={100}
              tr={true}
            />
          </div>
          <div className="hidden xl:flex flex-col leading-tight">
            <span className="font-bold text-sm">mohamed bouayaben</span>
            <span className="text-sm text-textGray">@bouayaben9</span>
          </div>
        </div>
        <div className="hidden xl:block text-sm cursor-pointer font-bold">
          ...
        </div>
      </div>
    </div>
  );
}

export default LeftBar;
