"use client";
import React from "react";
import CustumImage from "./Image";
import { sharePost } from "@/actions";
import Image from "next/image";
import ImageEditor from "./ImageEditor";
import CustomVideo from "./CustomVideo";

function Share() {
  // media state
  const [media, setMedia] = React.useState<File | null>(null);
  // editor state
  const [isEditorOpen, setIsEditorOpen] = React.useState<boolean>(false);
  // setting editor open when media changes
  const [settings, setSettings] = React.useState<{
    type: "original" | "wide" | "square";
    sensitive: boolean;
  }>({
    type: "original",
    sensitive: false,
  });
  // handle media change
  const handelMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMedia(e.target.files[0]);
    }
  };
  // preview url
  const previewUrl = media ? URL.createObjectURL(media) : null;
  return (
    <form
      className="p-4 flex gap-4"
      action={async (formData) => {
        // Manually add the file from state to the formData
        if (media) {
          formData.append("file", media);
        }

        // settings is already a hidden input, so it will be there automatically
        try {
          const result = await sharePost(formData);
          if (result.success) {
            setMedia(null); // Clear preview on success
            (document.getElementById("share-form") as HTMLFormElement).reset();
          }
        } catch (e) {
          console.error(e);
        }
      }}
      id="share-form">
      {/* AVATAR */}
      <div className="relative w-10 h-10 overflow-hidden rounded-full ">
        <CustumImage
          src={"/general/avatar.png"}
          width={100}
          height={100}
          alt="share"
          className="cursor-pointer rounded-full "
        />
      </div>
      {/* OTHERS */}
      <div className="flex flex-1 flex-col gap-4">
        <input
          type="text"
          name="desc"
          placeholder="what is happning?!"
          className="bg-transparent p-2 w-full outline-none placeholder:text-textGray text-xl"
        />
        {/* MEDIA PREVIEW */}
        {/* MEDIA PREVIEW */}
        {media?.type.includes("image") && previewUrl && (
          <div className="flex flex-col gap-2">
            {/* CONTAINER: 
        - w-full: takes full width
        - transition-all: makes the size change smooth
        - aspect ratios: ensures the box actually changes shape
    */}
            <div
              className={`relative w-full overflow-hidden rounded-lg bg-black/5 transition-all duration-300 ${
                settings.type === "original"
                  ? "h-auto"
                  : settings.type === "square"
                    ? "aspect-square"
                    : "aspect-video"
              }`}>
              <Image
                src={previewUrl}
                // Use fixed width for stability, but height auto for 'original'
                width={600}
                height={
                  settings.type === "square"
                    ? 600
                    : settings.type === "wide"
                      ? 337
                      : 600
                }
                alt="media preview"
                className={`transition-all duration-300 ease-in-out w-full h-full ${
                  settings.type === "original"
                    ? "object-contain max-h-[500px]"
                    : "object-cover"
                }`}
              />

              {/* EDIT BUTTON */}
              <div
                className="capitalize absolute top-2 left-2 text-white text-sm cursor-pointer bg-black/60 p-2 rounded-md font-bold"
                onClick={() => setIsEditorOpen(true)}>
                edit
              </div>

              {/* CLOSE BUTTON */}
              <div
                className="capitalize absolute top-2 right-4 text-white text-sm cursor-pointer bg-black/60 p-2 rounded-full w-8 h-8 flex items-center justify-center font-bold"
                onClick={() => setMedia(null)}>
                ✕
              </div>
            </div>

            {/* HIDDEN INPUT: Sends settings to your Server Action */}
            <input
              type="hidden"
              name="settings"
              value={JSON.stringify(settings)}
            />
          </div>
        )}
        {media?.type.includes("video") && previewUrl && (
          <div className=" relative">
            <CustomVideo previewUrl={previewUrl} />
            <span
              onClick={() => setMedia(null)}
              className="absolute top-4 right-4 bg-iconBleu text-white hover:opacity-70 h-8 w-8 flex items-center justify-center rounded-full cursor-pointer">
              X
            </span>
          </div>
        )}
        {/* resize the preview image before upload */}
        {isEditorOpen && previewUrl && (
          <ImageEditor
            onClose={() => setIsEditorOpen(false)}
            previewUrl={previewUrl}
            settings={settings}
            setSettings={setSettings}
          />
        )}
        {/* MEDIA AND POST BUTTON */}
        <div className="flex gap-4 items-center mb-4 justify-between flex-wrap">
          <div className="flex gap-4 items-center  flex-wrap">
            <input
              type="file"
              name="file"
              onChange={handelMediaChange}
              className="hidden"
              id="file"
              accept="image/*,video/*"
            />
            <label
              htmlFor="file"
              className="flex gap-4 items-center  flex-wrap">
              <CustumImage
                src={"/icons/image.svg"}
                alt={"icon"}
                width={20}
                height={20}
                className="cursor-pointer"
              />
              <CustumImage
                src={"icons/gif.svg"}
                alt={"icon"}
                width={20}
                height={20}
                className="cursor-pointer"
              />
              <CustumImage
                src={"icons/poll.svg"}
                alt={"icon"}
                width={20}
                height={20}
                className="cursor-pointer"
              />
              <CustumImage
                src={"icons/emoji.svg"}
                alt={"icon"}
                width={20}
                height={20}
                className="cursor-pointer"
              />
              <CustumImage
                src={"icons/schedule.svg"}
                alt={"icon"}
                width={20}
                height={20}
                className="cursor-pointer"
              />
              <CustumImage
                src={"/icons/location.svg"}
                alt={"icon"}
                width={20}
                height={20}
                className="cursor-pointer"
              />
            </label>
          </div>
          <button
            className="px-4 py-2 bg-iconBleu text-white capitalize rounded-full hover:opacity-70 "
            type="submit">
            post
          </button>
        </div>
      </div>
    </form>
  );
}

export default Share;
