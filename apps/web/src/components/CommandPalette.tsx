"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Moon, Sun, Keyboard } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Kbd } from "@/components/ui/Kbd";
import { useTheme } from "next-themes";

interface Command {
  id: string;
  label: string;
  shortcut?: string;
  icon?: React.ReactNode;
  action: () => void;
  category?: string;
}

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = [
    {
      id: "home",
      label: "Go to Home",
      shortcut: "H",
      icon: <ArrowRight className="w-4 h-4" />,
      action: () => router.push("/"),
      category: "Navigation",
    },
    {
      id: "projects",
      label: "Go to Projects",
      shortcut: "P",
      icon: <ArrowRight className="w-4 h-4" />,
      action: () => router.push("/projects"),
      category: "Navigation",
    },
    {
      id: "blog",
      label: "Go to Blog",
      shortcut: "B",
      icon: <ArrowRight className="w-4 h-4" />,
      action: () => router.push("/blog"),
      category: "Navigation",
    },
    {
      id: "contact",
      label: "Go to Contact",
      shortcut: "C",
      icon: <ArrowRight className="w-4 h-4" />,
      action: () => router.push("/contact"),
      category: "Navigation",
    },
    {
      id: "theme",
      label: `Switch to ${theme === "dark" ? "Light" : "Dark"} mode`,
      shortcut: "D",
      icon: theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />,
      action: () => setTheme(theme === "dark" ? "light" : "dark"),
      category: "Actions",
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  // Group by category
  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    const category = cmd.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(cmd);
    return acc;
  }, {} as Record<string, Command[]>);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
    setQuery("");
    setSelectedIndex(0);
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const totalItems = Object.values(groupedCommands).flat().length;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % totalItems);
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + totalItems) % totalItems);
        break;
      case "Enter":
        e.preventDefault();
        const allCommands = Object.values(groupedCommands).flat();
        if (allCommands[selectedIndex]) {
          allCommands[selectedIndex].action();
          onOpenChange(false);
        }
        break;
    }
  };

  // Calculate flat index to scroll into view
  useEffect(() => {
    const items = document.querySelectorAll("[data-command-item]");
    const item = items[selectedIndex] as HTMLElement;
    item?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex, groupedCommands]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            onClick={() => onOpenChange(false)}
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className={cn(
                "w-full max-w-lg bg-card rounded-xl border border-card-border",
                "shadow-lg overflow-hidden"
              )}
            >
              {/* Search Input */}
              <div className="flex items-center px-4 py-3 border-b border-border">
                <Search className="w-5 h-5 text-muted-foreground mr-3" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command or search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none text-base placeholder:text-muted-foreground"
                />
                <div className="flex items-center gap-1">
                  <Kbd>ESC</Kbd>
                </div>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto py-2">
                {Object.keys(groupedCommands).length === 0 ? (
                  <div className="px-4 py-8 text-center text-muted-foreground text-sm">
                    No results found for "{query}"
                  </div>
                ) : (
                  Object.entries(groupedCommands).map(([category, cmds]) => (
                    <div key={category} className="mb-2">
                      <div className="px-4 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {category}
                      </div>
                      {cmds.map((cmd, index) => {
                        const flatIndex = Object.values(groupedCommands)
                          .flat()
                          .findIndex((c) => c.id === cmd.id);
                        const isSelected = flatIndex === selectedIndex;

                        return (
                          <button
                            key={cmd.id}
                            data-command-item
                            className={cn(
                              "w-full flex items-center justify-between px-4 py-2.5 text-left",
                              "transition-colors",
                              isSelected
                                ? "bg-primary/10 text-primary"
                                : "hover:bg-muted text-foreground"
                            )}
                            onClick={() => {
                              cmd.action();
                              onOpenChange(false);
                            }}
                            onMouseEnter={() => setSelectedIndex(flatIndex)}
                          >
                            <div className="flex items-center gap-3">
                              <span className={cn(isSelected ? "text-primary" : "text-muted-foreground")}>
                                {cmd.icon}
                              </span>
                              <span className="text-sm">{cmd.label}</span>
                            </div>
                            {cmd.shortcut && (
                              <Kbd className="text-xs">{cmd.shortcut}</Kbd>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-muted/30">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Keyboard className="w-3.5 h-3.5" />
                  <span>Navigate with arrow keys</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Press</span>
                  <Kbd>↵</Kbd>
                  <span>to select</span>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
