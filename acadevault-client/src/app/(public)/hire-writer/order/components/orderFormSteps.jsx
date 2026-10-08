import { FaCheckCircle, FaClipboardList, FaRegEye } from "react-icons/fa";
import WordCountStep from "../../pricing/components/CustomQuoteForm/WordCountStep";
import StepProjectDetails from "./StepProjectDetails";
import ReviewSpecsStep from "./StepReviewSpecs";
import ConfirmStep from "../../pricing/components/CustomQuoteForm/ConfirmStep";

export const orderFormSteps = (isWriterMode) => [
  {
    id: "project-details",
    title: "Project Details",
    icon: <FaClipboardList />,
    component: StepProjectDetails,
  },
  ...(isWriterMode
    ? [
        {
          id: "word-count",
          title: "Word / Page Count",
          icon: <FaClipboardList />,
          component: (props) => <WordCountStep {...props} variant="stacked" />,
        },
      ]
    : []),
  {
    id: "review-specs",
    title: "Review & Preferences",
    icon: <FaRegEye />,
    component: ReviewSpecsStep,
  },
  {
    id: "agreement",
    title: "Agreement & Submit",
    icon: <FaCheckCircle />,
    component: ConfirmStep,
  },
];
