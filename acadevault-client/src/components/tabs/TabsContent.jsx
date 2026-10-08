import { useTabsContext } from "./Tabs";
import { motion, AnimatePresence } from "framer-motion";

export function TabsContent({ value, children, className = "" }) {
  const { activeTab, lazy, loadedTabs } = useTabsContext();
  const isActive = activeTab === value;

  // If lazy, render only once it's visited
  const shouldRender = !lazy || loadedTabs.has(value);

  return (
    <AnimatePresence mode="wait">
      {isActive && shouldRender && (
        <motion.div
          key={value}
          role="tabpanel"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className={`mt-4 ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
