'use client'

export function ThemeToggle({ label }: { label: string }) {
  function toggleTheme() {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    window.localStorage.setItem('portfolio-theme', next)
  }

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={label}>
      <span className="theme-toggle__sun" aria-hidden="true">☀</span>
      <span className="theme-toggle__moon" aria-hidden="true">☾</span>
      <span className="sr-only">{label}</span>
    </button>
  )
}
