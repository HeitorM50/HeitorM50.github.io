import type { CSSProperties } from 'react'

export interface ProfileCardProps {
  avatarUrl: string
  avatarAvifUrl?: string
  iconUrl?: string
  innerGradient?: string
  behindGlowEnabled?: boolean
  behindGlowColor?: string
  behindGlowSize?: string
  className?: string
  enableTilt?: boolean
  name?: string
  title?: string
  handle?: string
  status?: string
  showUserInfo?: boolean
}

const DEFAULT_INNER_GRADIENT =
  'linear-gradient(145deg, rgba(190,155,255,.22) 0%, rgba(73,211,156,.12) 48%, rgba(4,5,8,.82) 100%)'

export default function ProfileCard({
  avatarUrl,
  avatarAvifUrl,
  iconUrl = '/media/logo-metal-mask.svg',
  innerGradient,
  behindGlowEnabled = true,
  behindGlowColor = 'rgba(190, 155, 255, .52)',
  behindGlowSize = '58%',
  className = '',
  enableTilt = true,
  name = 'Heitor Ricardo',
  title = 'Software Engineer',
  handle = 'heitorm50',
  status = 'Open to work',
  showUserInfo = false,
}: ProfileCardProps) {
  const style = {
    '--pc-icon': `url(${iconUrl})`,
    '--pc-inner-gradient': innerGradient ?? DEFAULT_INNER_GRADIENT,
    '--pc-behind-glow-color': behindGlowColor,
    '--pc-behind-glow-size': behindGlowSize,
  } as CSSProperties

  return (
    <>
      {/* Loaded as a static asset because the site removes the Next.js client runtime after export. */}
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link rel="stylesheet" href="/vendor/profile-card.css" precedence="low" />
      <div
      className={`pc-card-wrapper ${className}`.trim()}
      data-profile-card
      data-enable-tilt={String(enableTilt)}
      style={style}
    >
      {behindGlowEnabled && <div className="pc-behind" aria-hidden="true" />}
      <div className="pc-card-shell">
        <figure className="pc-card" aria-label={`${name} — ${title}`}>
          <div className="pc-inside" aria-hidden="true" />
          <picture className="pc-avatar-content">
            {avatarAvifUrl && <source srcSet={avatarAvifUrl} type="image/avif" />}
            <img className="pc-avatar" src={avatarUrl} alt={name} width={1024} height={1024} loading="lazy" decoding="async" />
          </picture>
          <div className="pc-tone" aria-hidden="true" />
          <div className="pc-shine" aria-hidden="true" />
          <div className="pc-glare" aria-hidden="true" />

          <figcaption className="pc-details">
            <span className="pc-details__index">PROFILE · 01</span>
            <strong>{name}</strong>
            <span>{title}</span>
          </figcaption>

          {showUserInfo && (
            <div className="pc-user-info">
              <div>
                <strong>@{handle}</strong>
                <span>{status}</span>
              </div>
            </div>
          )}
        </figure>
      </div>
      </div>
    </>
  )
}
