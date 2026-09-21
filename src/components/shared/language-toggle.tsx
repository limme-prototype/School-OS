import React, { useState } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type SupportedLanguage = "en" | "kh" | "fr";

interface LanguageToggleProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  className?: string;
  size?: "sm" | "md";
  variant?: "full" | "compact" | "dropdown";
}

export function LanguageToggle({
  currentLanguage,
  onLanguageChange,
  className,
  size = "sm",
  variant = "compact",
}: LanguageToggleProps) {
  const [open, setOpen] = useState(false);

  const languages: { code: SupportedLanguage; label: string; flag: string; short: string }[] = [
    { code: "en", label: "English", flag: "🇬🇧", short: "EN" },
    { code: "kh", label: "ភាសាខ្មែរ", flag: "🇰🇭", short: "ខ្មែរ" },
    { code: "fr", label: "Français", flag: "🇫🇷", short: "FR" },
  ];

  const current = languages.find((l) => l.code === currentLanguage) || languages[0]!;

  if (variant === "full") {
    return (
      <div
        className={cn(
          "inline-flex items-center rounded-lg border border-border/70 bg-muted/50 p-0.5 text-xs font-semibold select-none",
          className,
        )}
      >
        <div className="flex items-center gap-1 pl-1.5 pr-1 text-muted-foreground">
          <Globe className="size-3" />
        </div>
        {languages.map((lang) => {
          const active = currentLanguage === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => onLanguageChange(lang.code)}
              className={cn(
                "rounded-md px-2 py-0.5 transition-all text-[11px] cursor-pointer",
                active
                  ? "bg-card text-foreground font-bold shadow-xs border border-border/60"
                  : "text-muted-foreground hover:text-foreground",
                size === "sm" ? "text-[10px] py-0.5" : "text-xs py-1",
              )}
              title={lang.label}
            >
              <span>{lang.flag} </span>
              <span>{lang.short}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Compact dropdown trigger - highly polished for mobile headers
  return (
    <div className={cn("relative inline-block text-left select-none", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card/80 px-2.5 py-1 text-xs font-semibold text-foreground shadow-xs backdrop-blur-sm transition-colors hover:bg-muted cursor-pointer active:scale-95",
          size === "sm" ? "h-7 text-[11px] px-2" : "h-8 text-xs px-2.5"
        )}
        aria-label="Change language"
        aria-expanded={open}
      >
        <span className="text-xs">{current.flag}</span>
        <span className="font-medium">{current.short}</span>
        <ChevronDown className={cn("size-3 opacity-60 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1.5 z-50 w-36 rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-xl animate-in fade-in zoom-in-95 duration-100">
            <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/50 mb-0.5">
              Select Language
            </div>
            {languages.map((l) => {
              const isSelected = l.code === currentLanguage;
              return (
                <button
                  key={l.code}
                  onClick={() => {
                    onLanguageChange(l.code);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-xs text-left transition-colors cursor-pointer",
                    isSelected
                      ? "bg-primary/10 font-bold text-primary"
                      : "hover:bg-muted text-foreground"
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </span>
                  {isSelected && <Check className="size-3.5 text-primary" />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
