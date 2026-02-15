"use client";
import React, { useActionState, useEffect, useRef } from "react";
import CustumImage from "./Image";
import Image from "next/image";
import ImageEditor from "./ImageEditor";
import CustomVideo from "./CustomVideo";
import { useUser } from "@clerk/nextjs";
import { addPost } from "@/interaction.actions";

function Share() {
  const { user } = useUser();
  const formRef = useRef<HTMLFormElement>(null);

  // media state
  const [media, setMedia] = React.useState<File | null>(null);
  const [isEditorOpen, setIsEditorOpen] = React.useState<boolean>(false);
  const [settings, setSettings] = React.useState<{
    type: "original" | "wide" | "square";
    sensitive: boolean;
  }>({
    type: "original",
    sensitive: false,
  });

  // 1. Setup useActionState
  // addPost is your server action. The second argument is the initial state.
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      // Manually add the file from React state to the formData
      if (media) {
        formData.append("file", media);
      }
      return await addPost(prevState, formData);
    },
    { success: false, error: false },
  );

  // 2. Clear form and memory on success
  useEffect(() => {
    if (state.success) {
      // 1. If we had a preview URL, revoke it to save memory
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      // 2. Reset React states
      setMedia(null);
      setSettings({ type: "original", sensitive: false });

      // 3. Reset the HTML form (clears the text input)
      formRef.current?.reset();
    }
  }, [state.success]); // This triggers whenever 'state' is updated by formAction

  const handelMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMedia(e.target.files[0]);
    }
  };

  const previewUrl = media ? URL.createObjectURL(media) : null;

  return (
    <form
      className="p-4 flex gap-4"
      action={formAction} // 3. Bind the formAction here
      ref={formRef}
      id="share-form">
      <div className="relative w-10 h-10 overflow-hidden rounded-full ">
        <CustumImage
          src={user?.imageUrl || "/general/avatar.png"}
          width={100}
          height={100}
          alt="share"
          className="cursor-pointer rounded-full "
        />
      </div>

      <div className="flex flex-1 flex-col gap-4">
        {/* Hidden Settings Inputs */}
        <input type="hidden" name="imgType" value={settings?.type} />
        <input
          type="hidden"
          name="isSensitive"
          value={settings?.sensitive ? "true" : "false"}
        />

        <input
          type="text"
          name="desc"
          placeholder="What is happening?!"
          className="bg-transparent p-2 w-full outline-none placeholder:text-textGray text-xl"
          required
        />

        {/* MEDIA PREVIEW */}
        {media?.type.includes("image") && previewUrl && (
          <div className="flex flex-col gap-2">
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
              <div
                className="capitalize absolute top-2 left-2 text-white text-sm cursor-pointer bg-black/60 p-2 rounded-md font-bold"
                onClick={() => setIsEditorOpen(true)}>
                edit
              </div>
              <div
                className="capitalize absolute top-2 right-4 text-white text-sm cursor-pointer bg-black/60 p-2 rounded-full w-8 h-8 flex items-center justify-center font-bold"
                onClick={() => setMedia(null)}>
                ✕
              </div>
            </div>
          </div>
        )}

        {media?.type.includes("video") && previewUrl && (
          <div className=" relative">
            <CustomVideo videoSrc={previewUrl} />
            <span
              onClick={() => setMedia(null)}
              className="absolute top-4 right-4 bg-iconBleu text-white hover:opacity-70 h-8 w-8 flex items-center justify-center rounded-full cursor-pointer">
              X
            </span>
          </div>
        )}

        {isEditorOpen && previewUrl && (
          <ImageEditor
            onClose={() => setIsEditorOpen(false)}
            previewUrl={previewUrl}
            settings={settings}
            setSettings={setSettings}
          />
        )}

        <div className="flex gap-4 items-center mb-4 justify-between flex-wrap">
          <div className="flex gap-4 items-center flex-wrap">
            <input
              type="file"
              onChange={handelMediaChange}
              className="hidden"
              id="file"
              accept="image/*,video/*"
            />
            <label
              htmlFor="file"
              className="flex gap-4 items-center flex-wrap cursor-pointer">
              <CustumImage
                src={"/icons/image.svg"}
                alt={"icon"}
                width={20}
                height={20}
              />
              <CustumImage
                src={"/icons/gif.svg"}
                alt={"icon"}
                width={20}
                height={20}
              />
              <CustumImage
                src={"/icons/poll.svg"}
                alt={"icon"}
                width={20}
                height={20}
              />
              <CustumImage
                src={"/icons/emoji.svg"}
                alt={"icon"}
                width={20}
                height={20}
              />
              <CustumImage
                src={"/icons/schedule.svg"}
                alt={"icon"}
                width={20}
                height={20}
              />
              <CustumImage
                src={"/icons/location.svg"}
                alt={"icon"}
                width={20}
                height={20}
              />
            </label>
          </div>

          <button
            className="px-4 py-2 bg-iconBleu text-white capitalize rounded-full hover:opacity-70 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isPending} // 4. Use isPending to prevent double submission
          >
            {isPending ? "Posting..." : "Post"}
          </button>
        </div>

        {/* Optional: Show error message */}
        {state.error && (
          <p className="text-red-500 text-sm">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </form>
  );
}

export default Share;
