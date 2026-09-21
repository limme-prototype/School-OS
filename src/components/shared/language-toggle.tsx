import React from "react";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export type SupportedLanguage = "en" | "kh" | "fr";

interface LanguageToggleProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  className?: string;
  size?: "sm" | "md";
}

export function LanguageToggle({
  currentLanguage,
  onLanguageChange,
  className,
  size = "sm",
}: LanguageToggleProps) {
  const languages: { code: SupportedLanguage; label: string; flag: string }[] = [
    { code: "en", label: "EN", flag: "🇬🇧" },
    { code: "kh", label: "ខ្មែរ", flag: "🇰🇭" },
    { code: "fr", label: "FR", flag: "🇫🇷" },
  ];

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border border-border bg-muted/60 p-0.5 text-xs font-semibold select-none",
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
              "rounded-md px-2 py-0.5 transition-all text-[11px]",
              active
                ? "bg-card text-foreground font-bold shadow-xs border border-border/60"
                : "text-muted-foreground hover:text-foreground",
              size === "sm" ? "text-[10px] py-0.5" : "text-xs py-1",
            )}
            title={lang.label}
          >
            <span>{lang.flag} </span>
            <span>{lang.label}</span>
          </button>
        );
      })}
    </div>
  );
}
