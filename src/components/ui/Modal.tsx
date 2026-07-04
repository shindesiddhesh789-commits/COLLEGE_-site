import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-dark/40 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={cn("w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl pointer-events-auto", className)}
            >
              <div className="flex items-center justify-between mb-6">
                {title && <h2 className="text-2xl font-bold text-dark">{title}</h2>}
                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-dark-secondary hover:bg-hover transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div>{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
