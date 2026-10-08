import { Clock, Flag, Link as LinkIcon, XCircle } from "lucide-react";

export const getDefaultContextMenuItems = (id, slug) => [
  {
    label: "Report",
    icon: <Flag />,
    onClick: () => console.log("Report", id),
  },
  {
    label: "Not Interested",
    icon: <XCircle />,
    onClick: () => console.log("Not Interested", id),
  },
  {
    label: "Copy Link",
    icon: <LinkIcon />,
    onClick: () =>
      navigator.clipboard.writeText(
        `${window.location.origin}/materials/${slug}`
      ),
  },
  {
    label: "Save for Later",
    icon: <Clock />,
    onClick: () => console.log("Saved", id),
  },
];
