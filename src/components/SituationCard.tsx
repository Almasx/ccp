import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "~/utils";

export interface SituationData {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

interface SituationCardProps {
  situation: SituationData | null;
  onClose: () => void;
  tilePosition?: { x: number; y: number };
}

const SituationCard: React.FC<SituationCardProps> = ({
  situation,
  onClose,
  tilePosition,
}) => {
  if (!situation) return null;

  return (
    <AnimatePresence>
      {situation && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black"
            onClick={onClose}
            style={{ zIndex: 40 }}
          />

          {/* Card */}
          <motion.div
            initial={{
              opacity: 0,
              y: tilePosition ? tilePosition.y : 100,
              x: tilePosition ? tilePosition.x : 0,
              scale: 0.5,
            }}
            animate={{
              opacity: 1,
              y: 0,
              x: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: tilePosition ? tilePosition.y : 100,
              x: tilePosition ? tilePosition.x : 0,
              scale: 0.5,
            }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
              "w-80 max-w-[90vw] bg-white rounded-lg shadow-xl overflow-hidden",
              "flex flex-col"
            )}
            style={{ zIndex: 50 }}
          >
            {situation.imageUrl && (
              <div className="relative h-48 w-full bg-gray-100">
                <motion.img
                  src={situation.imageUrl}
                  alt={situation.title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                />
              </div>
            )}

            <div className="p-4">
              <motion.h3
                className="text-lg font-semibold mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {situation.title}
              </motion.h3>

              <motion.p
                className="text-gray-700 text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {situation.description}
              </motion.p>

              <motion.button
                className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm w-full transition-colors"
                onClick={onClose}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SituationCard;
