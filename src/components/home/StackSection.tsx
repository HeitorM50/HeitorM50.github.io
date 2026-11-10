import type { CSSProperties } from 'react'
import { experiences, projects, stackGroups, type Locale } from '@/data/portfolio'
import { SectionHeader } from '../hud/SectionHeader'

const stackIcons: Record<string, string> = {
  Python: 'python', TypeScript: 'typescript', 'C++': 'cplusplus', Rust: 'rust', Java: 'openjdk',
  React: 'react', SvelteKit: 'svelte', 'Node.js': 'nodedotjs', 'D3.js': 'd3dotjs', PostgreSQL: 'postgresql', Supabase: 'supabase',
  Docker: 'docker', 'GitHub Actions': 'githubactions', pytest: 'pytest', Vitest: 'vitest', Git: 'git', Linux: 'linux',
  ESP32: 'espressif', Arduino: 'arduino', Godot: 'godotengine', NumPy: 'numpy'
}

// "USADO EM": projetos cujo stack cita a tecnologia; se nenhum citar, as experiências.
function usedIn(item: string) {
  const fromProjects = projects.filter(project => project.stack.includes(item)).map(project => project.title)
  if (fromProjects.length) return fromProjects
  return experiences.filter(experience => experience.stack.includes(item)).map(experience => experience.company.split(/ [—·] /)[0])
}

// 06 Stack // loadout // vertical. Sem barras nem porcentagens de habilidade.
export function StackSection({ locale }: { locale: Locale }) {
  const pt = locale === 'pt'
  return <section className="section stack" id="stack" aria-labelledby="stack-title" data-section data-bg="neon" data-bg-word="LOADOUT">
    <div className="container">
      <SectionHeader id="stack" locale={locale} titleId="stack-title" title="Loadout"
        lead={pt ? 'Tecnologias usadas nos projetos e experiências acima, com onde cada uma aparece.' : 'Technologies used in the projects and experiences above, and where each one appears.'} />
      <div className="loadout" data-stagger>{stackGroups.map((group, index) => <section className="loadout__group" key={group.en} aria-labelledby={`loadout-${index}`}>
        <h3 id={`loadout-${index}`} className="mono"><span>0{index + 1}</span> {group[locale].toUpperCase()}</h3>
        <ul className="loadout__slots">{group.items.map(item => {
          const uses = usedIn(item)
          return <li className="slot chamfer-md" key={item} data-slot={item}>
            <span className="slot__icon" aria-hidden="true" style={stackIcons[item] ? { '--icon': `url(/assets/icons/ic_${stackIcons[item]}.svg)` } as CSSProperties : undefined} data-icon={stackIcons[item] ? 'true' : undefined}>{stackIcons[item] ? null : item.slice(0, 2).toUpperCase()}</span>
            <strong className="slot__name">{item}</strong>
            {uses.length > 0 && <span className="slot__uses mono" title={uses.join(', ')}>{pt ? 'USADO EM' : 'USED IN'} {'//'} {uses.slice(0, 3).join(', ')}{uses.length > 3 ? ` +${uses.length - 3}` : ''}</span>}
          </li>
        })}</ul>
      </section>)}</div>
    </div>
  </section>
}
