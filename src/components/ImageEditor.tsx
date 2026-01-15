import Image from "next/image";
import React from "react";
import CustumImage from "./Image";

function ImageEditor({
  onClose,
  previewUrl,
  settings,
  setSettings,
}: {
  onClose: () => void;
  previewUrl: string;
  settings: { type: "original" | "wide" | "square"; sensitive: boolean };
  setSettings: React.Dispatch<
    React.SetStateAction<{
      type: "original" | "wide" | "square";
      sensitive: boolean;
    }>
  >;
}) {
  return (
    /* BACKDROP: 
       - fixed: stays in place during scroll
       - inset-0: shorthand for top/bottom/left/right 0
       - p-4: adds padding so the modal doesn't touch screen edges on mobile
    */
    /* MODAL CONTAINER: - w-full: takes up full width on small screens -
      max-w-[640px]: stops growing once it hits 640px (desktop) - max-h-[90vh]:
      prevents the modal from being taller than the screen */
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-20 p-4 transition-opacity animate-fadeIn">
      <div className="bg-black/85 rounded-xl p-6 md:p-12 flex flex-col gap-4 animate-scaleIn shadow-2xl w-full max-w-[640px] overflow-y-auto">
        {/* HEADER SECTION */}
        <div className="relative flex justify-between items-center p-5 mb-2">
          {/* Back Button: positioned top-left */}
          <span
            className="cursor-pointer absolute left-0 top-0 items-center justify-center flex text-white bg-textGray p-2 rounded-full w-8 h-8 transition-colors hover:bg-blue-600"
            onClick={onClose}>
            <CustumImage src={"/icons/back.svg"} width={20} height={20} />
          </span>

          {/* Title: positioned top-right */}
          <h1 className="absolute right-0 top-0 text-white text-lg capitalize font-bold">
            Crop the Image
          </h1>
        </div>

        {/* SAVE BUTTON: Placed at the top for easy access */}
        <button
          onClick={onClose}
          type="button"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors font-bold">
          Save
        </button>

        {/* IMAGE VIEWPORT:
           - aspect-square: keeps the container a perfect square
           - w-full: expands to the width of the modal
           - overflow-hidden: clips images that don't fit the aspect ratio
        */}
        <div
          className={`w-full flex items-center justify-center overflow-hidden relative rounded-lg bg-black/20 transition-all duration-300 ${
            settings.type === "original"
              ? "aspect-square"
              : settings.type === "square"
              ? "aspect-square"
              : "aspect-video" // This makes the container wide
          }`}>
          <Image
            src={previewUrl}
            /* fill: tells Next.js to fill the parent container instead of fixed px */
            fill
            alt="media preview"
            /* DYNAMIC CLASSES:
               - transition-all: animates the change when switching modes
               - object-contain: shows whole image (original)
               - object-cover: crops image to fill the square/wide box
            */
            className={`transition-all duration-300 ease-in-out ${
              settings.type === "original"
                ? "object-contain"
                : settings.type === "square"
                ? "object-cover"
                : settings.type === "wide"
                ? "aspect-video object-cover"
                : ""
            }`}
          />
        </div>

        {/* CONTROL PANEL: Aspect ratio toggles */}
        <div className="flex flex-col gap-4 mt-2">
          <p className="text-textGray text-xs uppercase tracking-widest font-bold">
            Aspect Ratio
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {/* Button Component Logic: checks current setting to highlight blue */}
            {/* ORIGINAL SECTION BUTTON *********************** */}
            <button
              className={`flex-1 flex px-4 py-2 rounded-md items-center justify-center text-sm transition-all ${
                settings.type === "original"
                  ? "bg-blue-500 text-white"
                  : "bg-textGray text-white hover:bg-gray-700"
              }`}
              type="button"
              onClick={() => setSettings({ ...settings, type: "original" })}>
              <span className="flex items-center ">
                <svg width={24} viewBox="0 0 24 24" className="fill-white">
                  <path d="M3 7.5C3 6.119 4.119 5 5.5 5h13C19.881 5 21 6.119 21 7.5v9c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 19 3 17.881 3 16.5v-9zM5.5 7c-.276 0-.5.224-.5.5v9c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-9c0-.276-.224-.5-.5-.5h-13z" />
                </svg>
              </span>
              Original
            </button>
            {/* SQUARE SECTION BUTTON *********************** */}
            <button
              className={`flex items-center justify-center flex-1 px-4 py-2 rounded-md text-sm transition-all ${
                settings.type === "square"
                  ? "bg-blue-500 text-white"
                  : "bg-textGray text-white hover:bg-gray-700"
              }`}
              type="button"
              onClick={() => setSettings({ ...settings, type: "square" })}>
              <span>
                <svg width={24} viewBox="0 0 24 24" className="fill-white">
                  <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v13c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-13c0-.276-.224-.5-.5-.5h-13z" />
                </svg>
              </span>
              Square
            </button>
            {/* WIDE SECTION BUTTON *********************** */}
            <button
              className={`flex items-center justify-center flex-1 px-4 py-2 rounded-md text-sm transition-all ${
                settings.type === "wide"
                  ? "bg-blue-500 text-white"
                  : "bg-textGray text-white hover:bg-gray-700"
              }`}
              type="button"
              onClick={() => setSettings({ ...settings, type: "wide" })}>
              <span>
                <svg width={24} viewBox="0 0 24 24" className="fill-white">
                  <path d="M3 9.5C3 8.119 4.119 7 5.5 7h13C19.881 7 21 8.119 21 9.5v5c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 17 3 15.881 3 14.5v-5zM5.5 9c-.276 0-.5.224-.5.5v5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-5c0-.276-.224-.5-.5-.5h-13z" />
                </svg>
              </span>
              Wide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageEditor;
