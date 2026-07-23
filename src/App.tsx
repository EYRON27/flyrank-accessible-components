import { useState, useRef } from "react";
import { Sparkles, ShieldAlert, HeartPulse, Code2 } from "lucide-react";
import { Modal } from "./components/custom/Modal";
import { Tabs } from "./components/custom/Tabs";
import { Disclosure } from "./components/custom/Disclosure";

// shadcn components
import {
  Dialog as ShadcnDialog,
  DialogContent as ShadcnDialogContent,
  DialogDescription as ShadcnDialogDescription,
  DialogHeader as ShadcnDialogHeader,
  DialogTitle as ShadcnDialogTitle,
  DialogTrigger as ShadcnDialogTrigger,
} from "./components/ui/dialog";

import {
  Tabs as ShadcnTabs,
  TabsContent as ShadcnTabsContent,
  TabsList as ShadcnTabsList,
  TabsTrigger as ShadcnTabsTrigger,
} from "./components/ui/tabs";

export default function App() {
  // State for Custom components
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [customActiveTab, setCustomActiveTab] = useState("tab-one");
  const [disclosureExpanded, setDisclosureExpanded] = useState(false);
  const customModalTriggerRef = useRef<HTMLButtonElement>(null);

  // State for shadcn trigger focus simulation
  const shadcnDialogTriggerRef = useRef<HTMLButtonElement>(null);

  const customTabItems = [
    {
      id: "tab-one",
      label: "Component Goals",
      content: "This tab displays custom-built ARIA tab items. Use Left/Right Arrow keys to switch focus between selectors, and Home/End to hop between extremities.",
    },
    {
      id: "tab-two",
      label: "Accessibility Rules",
      content: "Focus management is critical. Elements must be selectable via Enter/Space and focus outlines must remain visible for keyboard-only navigators.",
    },
    {
      id: "tab-three",
      label: "TypeScript Strictness",
      content: "All custom props are strictly typed to guarantee type-safety. Zero 'any' escapes were utilized throughout this playground.",
    },
  ];

  return (
    <div className="min-h-screen py-10 px-6 max-w-5xl mx-auto flex flex-col gap-10 bg-background text-foreground">
      {/* Title Header */}
      <header className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center shadow-lg shadow-accent-glow">
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white tracking-tight m-0">
              W3C ARIA Component Playground
            </h1>
            <p className="text-xs text-gray-500 font-semibold">
              Frontend AI Engineering • Week 4 Assignment (FE-05)
            </p>
          </div>
        </div>
        <span className="badge self-start md:self-auto py-1 px-3 text-xs">
          Interactive Keyboard Testing
        </span>
      </header>

      {/* Grid containing Modal Dialog Compare */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Custom Hand-Built Modal */}
        <section className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-border-color pb-3">
            <Code2 size={18} className="text-accent" />
            <h2 className="text-base font-extrabold text-white m-0">1. Custom Accessible Modal</h2>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            W3C compliant. Traps focus within modal content elements, closes on <kbd className="bg-code-bg px-1 py-0.5 rounded text-white text-[10px] font-mono">Esc</kbd>, and restores focus to the trigger element on close.
          </p>

          <div>
            <button
              ref={customModalTriggerRef}
              onClick={() => setCustomModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-bold transition duration-200 shadow-md shadow-accent-glow"
            >
              Open Custom Modal
            </button>
          </div>

          <Modal
            isOpen={customModalOpen}
            onClose={() => setCustomModalOpen(false)}
            title="Custom ARIA Dialog"
            triggerRef={customModalTriggerRef}
          >
            <p className="text-xs text-gray-400 mb-4">
              Try pressing <kbd className="bg-code-bg px-1 py-0.5 rounded text-white font-mono text-[10px]">Tab</kbd> or <kbd className="bg-code-bg px-1 py-0.5 rounded text-white font-mono text-[10px]">Shift + Tab</kbd> to ensure focus cycles strictly between the action buttons below and does not leak back to the parent page.
            </p>
            <input
              type="text"
              placeholder="Focusable test input..."
              className="w-full px-3 py-2 rounded-xl bg-background/50 border border-border-color text-xs text-white outline-none focus:border-accent"
            />
          </Modal>
        </section>

        {/* shadcn Dialog Component */}
        <section className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-border-color pb-3">
            <HeartPulse size={18} className="text-accent" />
            <h2 className="text-base font-extrabold text-white m-0">2. shadcn/ui Dialog</h2>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Library-controlled dialog utilizing Radix primitives. Provides automatic screen-reader portals, scroll locking, and aria-describedby definitions.
          </p>

          <div>
            <ShadcnDialog>
              <ShadcnDialogTrigger asChild>
                <button
                  ref={shadcnDialogTriggerRef}
                  className="px-4 py-2.5 rounded-xl border border-border-color bg-card-bg text-gray-400 hover:text-white hover:bg-card-hover text-xs font-bold transition duration-200"
                >
                  Open shadcn Dialog
                </button>
              </ShadcnDialogTrigger>
              <ShadcnDialogContent className="glass-panel text-gray-400 max-w-md p-6 rounded-2xl border-accent border">
                <ShadcnDialogHeader>
                  <ShadcnDialogTitle className="text-white font-bold text-lg">shadcn Dialog Primitive</ShadcnDialogTitle>
                  <ShadcnDialogDescription className="text-xs text-gray-400">
                    This component renders into a React Portal body outside the root div.
                  </ShadcnDialogDescription>
                </ShadcnDialogHeader>
                <p className="text-xs leading-relaxed my-4">
                  Radix handles overlay locks, portals, focus-trapping using focus-guards, and dismiss animations out-of-the-box.
                </p>
              </ShadcnDialogContent>
            </ShadcnDialog>
          </div>
        </section>
      </div>

      {/* Grid containing Tab components */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Custom Hand-Built Tabs */}
        <section className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-border-color pb-3">
            <Code2 size={18} className="text-accent" />
            <h2 className="text-base font-extrabold text-white m-0">3. Custom Arrow-Key Tabs</h2>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            W3C ARIA TabList pattern. Click inside a tab and navigate using <kbd className="bg-code-bg px-1 py-0.5 rounded text-white text-[10px] font-mono">← / →</kbd> arrow keys, or <kbd className="bg-code-bg px-1 py-0.5 rounded text-white text-[10px] font-mono">Home/End</kbd>.
          </p>

          <Tabs
            items={customTabItems}
            activeTabId={customActiveTab}
            onTabChange={setCustomActiveTab}
          />
        </section>

        {/* shadcn Tabs */}
        <section className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-border-color pb-3">
            <HeartPulse size={18} className="text-accent" />
            <h2 className="text-base font-extrabold text-white m-0">4. shadcn/ui Tabs</h2>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Standard Radix Tabs component. Implements selection-follows-focus automatically with keyboard routing.
          </p>

          <ShadcnTabs defaultValue="tab-one" className="w-full flex flex-col gap-4">
            <ShadcnTabsList className="flex gap-2 border-b border-border-color pb-1.5 bg-transparent">
              <ShadcnTabsTrigger
                value="tab-one"
                className="px-4 py-2.5 text-sm font-semibold rounded-xl text-gray-400 hover:text-white data-[state=active]:bg-accent-light data-[state=active]:border-accent data-[state=active]:text-accent border border-transparent transition outline-none"
              >
                Goals
              </ShadcnTabsTrigger>
              <ShadcnTabsTrigger
                value="tab-two"
                className="px-4 py-2.5 text-sm font-semibold rounded-xl text-gray-400 hover:text-white data-[state=active]:bg-accent-light data-[state=active]:border-accent data-[state=active]:text-accent border border-transparent transition outline-none"
              >
                Rules
              </ShadcnTabsTrigger>
            </ShadcnTabsList>
            <ShadcnTabsContent
              value="tab-one"
              className="p-5 rounded-2xl glass-panel text-sm text-gray-400 outline-none"
            >
              shadcn tabs manage focus tracking via a separate client-side context state.
            </ShadcnTabsContent>
            <ShadcnTabsContent
              value="tab-two"
              className="p-5 rounded-2xl glass-panel text-sm text-gray-400 outline-none"
            >
              Radix handles orientation parameters automatically for screen readers.
            </ShadcnTabsContent>
          </ShadcnTabs>
        </section>
      </div>

      {/* Grid containing Custom Disclosure accordion */}
      <div className="grid grid-cols-1 gap-8">
        <section className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-border-color pb-3">
            <Code2 size={18} className="text-accent" />
            <h2 className="text-base font-extrabold text-white m-0">5. Custom Disclosure Component</h2>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Accessible details/disclosure panel pattern. Press <kbd className="bg-code-bg px-1 py-0.5 rounded text-white text-[10px] font-mono">Tab</kbd> to focus the header and hit <kbd className="bg-code-bg px-1 py-0.5 rounded text-white text-[10px] font-mono">Space/Enter</kbd> to toggle content.
          </p>

          <Disclosure
            id="disclosure-sample"
            title="Expandable ARIA Disclosure Panel Guide"
            isExpanded={disclosureExpanded}
            onToggle={() => setDisclosureExpanded(!disclosureExpanded)}
          >
            <p className="text-xs text-gray-400 leading-relaxed">
              This panel controls state using standard React hooks. The button contains the necessary <kbd className="bg-code-bg px-1.5 py-0.5 rounded text-white font-mono text-[10px]">aria-expanded="true/false"</kbd> properties synced dynamically. The container is hidden from screen readers when collapsed by utilizing the HTML <kbd className="bg-code-bg px-1.5 py-0.5 rounded text-white font-mono text-[10px]">hidden</kbd> attribute.
            </p>
          </Disclosure>
        </section>
      </div>

      {/* ARIA Specs checklist details */}
      <footer className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
        <div className="flex items-center gap-2 text-yellow-500 font-bold text-sm">
          <ShieldAlert size={18} />
          W3C ARIA Key Guidelines Met
        </div>
        <ul className="text-xs text-gray-400 leading-relaxed flex flex-col gap-2.5 list-disc pl-5">
          <li><strong>Keyboard Operability:</strong> Focus visible indicators are enabled natively using CSS focus-visible.</li>
          <li><strong>Tab Trapping:</strong> Modal traps keyboard navigation via keydown callbacks and prevents DOM leakages.</li>
          <li><strong>Semantic Attributes:</strong> Correct mapping of roles and dynamic state sync attributes (e.g. controls, selected, expanded).</li>
        </ul>
      </footer>
    </div>
  );
}
