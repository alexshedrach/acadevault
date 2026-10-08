"use client";

import { useState, useEffect, useMemo } from "react";
import { useController } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { WORDS_PER_PAGE } from "@/config/priceConfiguration";
import { MINIMUM_TOTALS } from "@/constants/enums";
import { calculateWordCountFeedback } from "@/utils/priceUtils";
import RangeSlider from "@/components/ui/RangeSlider";
import SectionHeader from "@/components/common/SectionHeader";
import WordCalculator from "@/components/common/WordCalculator";
import UnitToggle from "@/components/common/UnitToggle";
import { Button } from "@/components/ui/Button";
import {
  ChevronDown,
  ChevronUp,
  Clipboard,
  RefreshCw,
  TextCursorInput,
} from "lucide-react";
import { toast } from "react-toastify";

export default function WordCountStep({
  control,
  setValue,
  getValues,
  formData,
  handleUnitTypeChange,
  isSubmitting,
  variant,
}) {
  const [sampleText, setSampleText] = useState(formData?.sampleText || "");
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(true);
  const [isPasting, setIsPasting] = useState(false);
  const { mode, wordCount, pageCount } = formData || {};
  const isPlanMode = mode === "plan";
  const isWriterMode = mode === "writer";

  const unitType = isPlanMode ? "pages" : formData?.unitType || "pages";
  const min =
    MINIMUM_TOTALS[unitType] ?? (unitType === "pages" ? 1 : WORDS_PER_PAGE);
  const softMax = unitType === "pages" ? 100 : 100 * WORDS_PER_PAGE;

  const {
    field: { value: count = min, onChange: setCount, ref },
  } = useController({
    name: "unitCount",
    control,
    defaultValue: min,
    rules: {
      required: "Quantity is required.",
      min: { value: min, message: `Minimum is ${min} ${unitType}.` },
    },
  });

  const showSoftWarning = count > softMax;

  useEffect(() => {
    if (isPlanMode && (wordCount || pageCount)) {
      const newCount = unitType === "pages" ? pageCount : wordCount;
      if (newCount && newCount !== count) {
        setCount(Number(newCount) || min);
        setValue("unitType", "pages", { shouldValidate: true });
      }
    }
  }, [
    isPlanMode,
    wordCount,
    pageCount,
    unitType,
    setCount,
    min,
    setValue,
    count,
  ]);

  const handleClear = () => {
    if (isPlanMode) {
      toast.info("Cannot reset word count in plan mode.");
      return;
    }
    setSampleText("");
    setValue("sampleText", "");
    setValue("unitCount", min, { shouldValidate: true });
    setIsCalculatorOpen(false);
    toast.info("Word count reset.");
  };

  const handlePasteFromClipboard = async () => {
    if (isPlanMode) {
      toast.info("Cannot paste text in plan mode.");
      return;
    }
    try {
      setIsPasting(true);
      const text = await navigator.clipboard.readText();
      handleSampleTextChange(text);
    } catch (err) {
      toast.error("Failed to paste from clipboard.");
    } finally {
      setIsPasting(false);
    }
  };

  const handleSampleTextChange = (text) => {
    if (isPlanMode) return;
    setSampleText(text);
    setValue("sampleText", text, { shouldValidate: true });
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const newCount =
      words > 0
        ? unitType === "pages"
          ? Math.ceil(words / WORDS_PER_PAGE)
          : words
        : min;
    if (newCount >= min) {
      setValue("unitCount", newCount, { shouldValidate: true });
    } else {
      toast.error(`Count must be at least ${min} ${unitType}.`);
    }
  };

  const textStats = useMemo(() => {
    const words = sampleText.trim().split(/\s+/).filter(Boolean).length;
    const characters = sampleText.length;
    const sentences = sampleText.split(/[.!?]+/).filter((s) => s.trim()).length;
    const pages = Math.ceil(words / WORDS_PER_PAGE);
    return { words, characters, sentences, pages };
  }, [sampleText]);

  const wordsCount = unitType === "pages" ? count * WORDS_PER_PAGE : count;
  const pagesCount =
    unitType === "pages" ? count : Math.ceil(count / WORDS_PER_PAGE);
  const { text: feedbackText, color: feedbackColor } =
    calculateWordCountFeedback(count, unitType);

  return (
    <motion.section
      className="bg-white rounded-xl border border-gray-200 shadow-md px-6 py-8 space-y-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <SectionHeader
        title="Word Count Assistant"
        description={
          isPlanMode
            ? "Word count is prefilled based on your plan."
            : "Enter any number of pages or words; we’ll handle the rest."
        }
        icon={<TextCursorInput className="text-blue-500" />}
      />

      <div
        className={
          variant === "stacked"
            ? "grid grid-cols-1 gap-6"
            : "grid grid-cols-1 md:grid-cols-2 gap-6"
        }
      >
        <div className="border-2 border-blue-100 bg-blue-50/30 p-6 rounded-xl shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="unitCount"
              className="text-sm font-medium text-gray-800"
            >
              Estimated {unitType === "pages" ? "Pages" : "Words"}
            </label>
            {!isPlanMode && (
              <UnitToggle
                currentUnit={unitType}
                onToggle={(newUnit) => {
                  const current = getValues("unitCount");
                  const updatedCount =
                    newUnit === "words"
                      ? current * WORDS_PER_PAGE
                      : Math.ceil(current / WORDS_PER_PAGE);
                  setValue("unitType", newUnit);
                  setValue("unitCount", updatedCount, { shouldValidate: true });
                  localStorage.setItem("unitType", newUnit);
                }}
              />
            )}
          </div>

          <input
            type="number"
            id="unitCount"
            ref={ref}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring focus:ring-blue-200 focus:outline-none"
            placeholder={`Enter ${unitType}`}
            min={min}
            step={unitType === "pages" ? 1 : 100}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            disabled={isPlanMode || isSubmitting}
          />

          <RangeSlider
            value={count}
            onChange={(val) => setCount(val)}
            min={min}
            step={unitType === "pages" ? 1 : 100}
            unit={unitType}
            id="unitCount-slider"
            tooltipVisibleOn="drag"
            tooltipSize="sm"
            tooltipColor="bg-gray-800"
            disabled={isPlanMode || isSubmitting}
          />

          {showSoftWarning && (
            <p className="text-xs text-yellow-600">
              For very large projects ({softMax.toLocaleString()} {unitType}),
              turnaround times may be longer than usual.
            </p>
          )}

          <AnimatePresence>
            <motion.div
              key="feedback"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-xs text-gray-700"
              aria-live="polite"
            >
              <span className={feedbackColor}>{feedbackText}</span>{" "}
              <span className="text-gray-500">
                ({wordsCount.toLocaleString()} words ≈ {pagesCount} pages)
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {!isPlanMode && (
          <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-inner space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold text-gray-700">
                Word Count Calculator
              </h3>
              <Button
                onClick={() => setIsCalculatorOpen(!isCalculatorOpen)}
                variant="ghost"
                size="sm"
                className="text-sm text-blue-600 hover:underline"
                disabled={isSubmitting}
              >
                {isCalculatorOpen ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-1" /> Hide
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 mr-1" /> Show
                  </>
                )}
              </Button>
            </div>

            <AnimatePresence>
              {isCalculatorOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <WordCalculator
                    control={control}
                    sampleText={sampleText}
                    onSampleTextChange={handleSampleTextChange}
                    setValue={setValue}
                    unitType={unitType}
                    disabled={isPlanMode || isSubmitting}
                  />

                  <div className="flex flex-wrap gap-3 mt-2">
                    <Button
                      onClick={handlePasteFromClipboard}
                      variant="secondary"
                      size="sm"
                      disabled={isPasting || isPlanMode || isSubmitting}
                    >
                      <Clipboard className="w-4 h-4 mr-2" />
                      {isPasting ? "Pasting..." : "Paste Text"}
                    </Button>

                    <Button
                      onClick={handleClear}
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-red-500"
                      disabled={isPlanMode || isSubmitting}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" /> Reset
                    </Button>
                  </div>

                  {sampleText && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid grid-cols-2 gap-4 mt-4"
                    >
                      {[
                        ["Words", textStats.words],
                        ["Pages", textStats.pages],
                        ["Characters", textStats.characters],
                        ["Sentences", textStats.sentences],
                      ].map(([label, val]) => (
                        <div
                          key={label}
                          className="text-center border bg-white p-3 rounded-lg"
                        >
                          <p className="text-xs text-gray-500">{label}</p>
                          <p className="text-lg font-semibold text-blue-700">
                            {val}
                          </p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.section>
  );
}
