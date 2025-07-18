"use client";
import { SelectionCard } from "@/components/selection-card";
import { CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Component() {
  return (
    <>
      <CardContent className="space-y-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <SelectionCard title="Inscription individuelle" isMember />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <SelectionCard title="Inscription groupée" />
        </motion.div>

      </CardContent>
    </>
  );
}
