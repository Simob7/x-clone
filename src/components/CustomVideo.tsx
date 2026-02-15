"use client";
import React, { useRef, useState } from "react";
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

export default function CustomVideo({
  videoSrc,
}: {
  videoSrc: string;
  // className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Helper to format seconds into MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentT = videoRef.current.currentTime;
      const totalT = videoRef.current.duration;

      // Only calculate if totalT is a valid number and greater than 0
      if (!isNaN(totalT) && totalT > 0) {
        const currentProgress = (currentT / totalT) * 100;
        setProgress(currentProgress);
        setCurrentTime(currentT);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Handle clicking/dragging on the progress bar
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime =
        (Number(e.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setProgress(Number(e.target.value));
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative group w-full rounded-xl overflow-hidden bg-black shadow-lg border border-gray-800 flex items-center justify-center 
                 fullscreen:rounded-none fullscreen:w-screen fullscreen:h-screen">
      <video
        ref={videoRef}
        src={`${urlEndpoint}/${videoSrc}`}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={handlePlayPause}
        className="w-full max-h-[450px] cursor-pointer fullscreen:max-h-none fullscreen:object-contain"
        playsInline
      />

      {/* CENTER PLAY BUTTON (Overlay) */}
      {!isPlaying && (
        <div
          onClick={handlePlayPause}
          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors cursor-pointer">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#1d9bf0] text-white shadow-xl transform transition-transform hover:scale-110">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      {/* CONTROLS BAR */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {/* INTERACTIVE SEEK BAR */}
        <div className="relative w-full h-1.5 mb-4 group/slider flex items-center">
          {/* Visual Blue Fill */}
          <div
            className="absolute top-0 left-0 h-full bg-[#1d9bf0] rounded-full pointer-events-none z-10"
            style={{ width: `${progress}%` }}
          />
          {/* Actual Input Range */}
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={progress}
            onChange={handleSeek}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-20"
          />
          {/* Background Track */}
          <div className="w-full h-full bg-white/20 rounded-full" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            {/* Play/Pause */}
            <button
              type="button"
              onClick={handlePlayPause}
              className="text-white hover:text-[#1d9bf0] transition-colors">
              {isPlaying ? (
                <svg
                  width="22"
                  height="22"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg
                  width="22"
                  height="22"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Mute/Unmute */}
            <button
              type="button"
              onClick={toggleMute}
              className="text-white hover:text-[#1d9bf0] transition-colors">
              {isMuted ? (
                <svg
                  width="22"
                  height="22"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM19 12c0 3.12-1.66 5.85-4.12 7.35l1.06 1.06C18.81 18.51 21 15.52 21 12s-2.19-6.51-5.06-8.41l-1.06 1.06C17.34 6.15 19 8.88 19 12zM3 9v6h4l5 5V4L7 9H3z" />
                </svg>
              ) : (
                <svg
                  width="22"
                  height="22"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                </svg>
              )}
            </button>

            {/* Time Display */}
            <span className="text-white text-xs font-medium font-mono tabular-nums">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={toggleFullScreen}
            className="text-white hover:text-[#1d9bf0] transition-colors">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5">
              <path d="M15 3h6v6M9 21H3v-6M21 15v6h-6M3 9V3h6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
