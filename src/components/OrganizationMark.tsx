import { organizations, type OrganizationId } from '@/data/organizations'

export function OrganizationMark({ id, context = 'default' }: { id: OrganizationId; context?: 'default' | 'timeline' }) {
  const organization = organizations[id]
  return <span className={`organization-mark organization-mark--${organization.surface}${context === 'timeline' && organization.wide ? ' organization-mark--wide' : ''}`}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={`/media/organizations/${organization.image}`} alt={organization.name} width={96} height={96} loading="lazy" decoding="async" />
  </span>
}
