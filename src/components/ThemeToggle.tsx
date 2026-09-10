export function ThemeToggle({ label }: { label: string }) {
  return (
    <button className="theme-toggle" type="button" data-theme-toggle aria-label={label}>
      <span className="theme-toggle__sun" aria-hidden="true" />
      <span className="theme-toggle__moon" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </button>
  )
}
