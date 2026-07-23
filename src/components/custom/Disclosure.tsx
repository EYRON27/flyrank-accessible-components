import React from "react";
import { ChevronDown } from "lucide-react";

interface DisclosureProps {
  id: string;
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const Disclosure: React.FC<DisclosureProps> = ({
  id,
  title,
  isExpanded,
  onToggle,
  children,
}) => {
  return (
    <div className="flex flex-col border border-border-color rounded-2xl overflow-hidden glass-panel">
      {/* Trigger Button */}
      <button
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={`disclosure-panel-${id}`}
        className="w-full flex items-center justify-between px-5 py-4 font-bold text-sm text-white hover:bg-card-hover transition duration-200 text-left outline-none"
      >
        <span>{title}</span>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${
            isExpanded ? "transform rotate-180 text-accent" : ""
          }`}
        />
      </button>

      {/* Expandable Panel */}
      <div
        id={`disclosure-panel-${id}`}
        hidden={!isExpanded}
        className="px-5 py-4 border-t border-border-color bg-background/30 text-xs sm:text-sm text-gray-400 leading-relaxed leading-relaxed animate-in slide-in-from-top-2 duration-200"
      >
        {children}
      </div>
    </div>
  );
};
