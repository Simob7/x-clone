"use client";
import CustumImage from "@/components/Image";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function PostModal() {
  console.log("🚀 MODAL PAGE RENDERING"); // ← Add this at the top

  useEffect(() => {
    // Prevent scrolling and account for scrollbar width to stop the "jump"
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const router = useRouter();

  const closeModal = () => {
    router.back();
  };
  const { user } = useUser();
  return (
    // 1. Changed to fixed and inset-0 for full coverage
    // 2. Added backdrop-blur for a premium feel
    <div className="fixed inset-0 z-50 bg-[#293139a6] backdrop-blur-sm flex justify-center items-start overflow-y-auto pt-20">
      {/* Clicking the backdrop closes the modal */}
      <div className="absolute inset-0 -z-10" onClick={closeModal} />

      <div className="py-4 px-6 rounded-2xl bg-black w-full max-w-[600px] h-max mx-4 flex flex-col gap-4 shadow-2xl border border-borderGray">
        {/* TOP */}
        <div className="flex items-center justify-between">
          <button
            onClick={closeModal}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-900 transition-colors text-white font-bold">
            ✕
          </button>
          <div className="text-iconBleu font-bold cursor-pointer hover:underline">
            Draft
          </div>
        </div>

        {/* CENTER */}
        <div className="py-4 flex items-start gap-4">
          <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            <CustumImage
              src={user?.imageUrl || "general/avatar.png"}
              width={40}
              height={40}
              alt="profil avatar"
              tr={true}
            />
          </div>
          <textarea
            className="flex-1 bg-transparent outline-none text-xl text-white placeholder-gray-500 resize-none min-h-[120px] pt-1"
            placeholder="What is happening?!"
            autoFocus
          />
        </div>

        {/* BOTTOM */}
        <div className="flex items-center justify-between gap-2 border-t border-borderGray pt-4">
          <div className="flex items-center gap-1">
            {["image", "gif", "poll", "emoji", "schedule", "location"].map(
              (icon) => (
                <div
                  key={icon}
                  className="p-2 rounded-full hover:bg-iconBleu/10 transition-colors cursor-pointer group">
                  <CustumImage
                    src={`/icons/${icon}.svg`}
                    alt={icon}
                    width={20}
                    height={20}
                    className="group-hover:brightness-110"
                  />
                </div>
              ),
            )}
          </div>
          <button
            className="px-6 py-2 bg-iconBleu text-white font-bold rounded-full hover:opacity-90 disabled:opacity-50 transition-opacity"
            type="submit">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostModal;
