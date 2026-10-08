import { useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function useFloatingBlobAnimation() {
  const blobOneControls = useAnimation();
  const blobTwoControls = useAnimation();

  useEffect(() => {
    blobOneControls.start({
      x: [0, 40, -40, 0],
      y: [0, -30, 30, 0],
      transition: { duration: 15, repeat: Infinity, ease: "easeInOut" },
    });

    blobTwoControls.start({
      x: [0, -50, 50, 0],
      y: [0, 20, -20, 0],
      transition: { duration: 20, repeat: Infinity, ease: "easeInOut" },
    });
  }, [blobOneControls, blobTwoControls]);

  const blobs = [
    {
      key: "blob-1",
      size: "w-64 h-64",
      color: "bg-blue-200",
      position: "-top-32 -left-32",
      opacity: "opacity-20",
      customClass: "mix-blend-multiply ",
      animate: blobOneControls,
    },
    {
      key: "blob-2",
      size: "w-96 h-96",
      color: "bg-green-500",
      position: "-bottom-32 -right-32",
      opacity: "opacity-20",
      customClass: "mix-blend-multiply animation-delay-2000",
      animate: blobTwoControls,
    },
  ];

  return { blobs };
}
