"use client";

const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("theme")||"dark";var r=t;if(t==="system"){r=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}var e=document.documentElement;e.classList.remove("light","dark");e.classList.add(r);e.style.colorScheme=r}catch(n){}})();`;

/**
 * Blocking theme init for SSR only.
 * React 19 rejects <script> in the client tree — skip rendering on the client;
 * the tag from SSR stays in the document and runs before paint.
 */
export function ThemeScript() {
  if (typeof window !== "undefined") {
    return null;
  }

  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
    />
  );
}
