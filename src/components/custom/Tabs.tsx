import React, { useRef } from "react";

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  activeTabId: string;
  onTabChange: (id: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeTabId,
  onTabChange,
}) => {
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const activeIndex = items.findIndex((item) => item.id === activeTabId);

  // Keyboard navigation helpers
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let targetIndex = -1;

    switch (e.key) {
      case "ArrowRight":
        targetIndex = (index + 1) % items.length;
        break;
      case "ArrowLeft":
        targetIndex = (index - 1 + items.length) % items.length;
        break;
      case "Home":
        targetIndex = 0;
        break;
      case "End":
        targetIndex = items.length - 1;
        break;
      default:
        return; // Don't prevent default key actions
    }

    if (targetIndex !== -1) {
      e.preventDefault();
      const targetId = items[targetIndex].id;
      onTabChange(targetId);
      
      // Focus target element
      setTimeout(() => {
        tabRefs.current[targetId]?.focus();
      }, 0);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Tab List */}
      <div
        role="tablist"
        aria-label="Accessible Custom Tabs"
        className="flex gap-2 border-b border-border-color pb-1.5"
      >
        {items.map((item, idx) => {
          const isSelected = item.id === activeTabId;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[item.id] = el;
              }}
              role="tab"
              id={`tab-btn-${item.id}`}
              aria-selected={isSelected}
              aria-controls={`tab-panel-${item.id}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => onTabChange(item.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`px-4 py-2.5 text-sm font-semibold rounded-xl border transition duration-200 outline-none ${
                isSelected
                  ? "bg-accent-light border-accent text-accent"
                  : "border-transparent text-gray-400 hover:text-white hover:bg-card-hover"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      {items.map((item) => {
        const isSelected = item.id === activeTabId;
        return (
          <div
            key={item.id}
            role="tabpanel"
            id={`tab-panel-${item.id}`}
            aria-labelledby={`tab-btn-${item.id}`}
            hidden={!isSelected}
            tabIndex={0}
            className="p-5 rounded-2xl glass-panel text-sm text-gray-400 leading-relaxed outline-none focus-visible:outline-2 focus-visible:outline-accent"
          >
            {item.content}
          </div>
        );
      })}
    </div>
  );
};
