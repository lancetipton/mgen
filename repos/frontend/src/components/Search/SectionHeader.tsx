import type { TSearchSection } from '@MG/types'
import { cls } from '@keg-hub/jsutils/cls'


export type TSection = {
  isDark?:Boolean
  section:TSearchSection
}

export const SectionHeader = (props:TSection) => {

  const {
    isDark,
    section,
  } = props

  return (
    <li
      className={cls(
        `mg-search-section`,
        `w-full`,
        `overflow-hidden`,
      )}
    >
      <a
        className={cls(
          `mg-search-section-link`,
          `w-full`,
          `block`,
          `pb-0`,
          `overflow-hidden`,
          `hover:text-primary`,
        )}
        href={section.url}
      >
        <div
        className={cls(
          `mg-search-section-text`,
          `pb-1`,
          `w-full`,
          `text-sm`,
          `uppercase`,
          `overflow-hidden`,
          `border-b`,
          isDark ? `border-neutral` : `border-base-200`,
        )}
        >
          {section.title}
        </div>
      </a>
    </li>
  )
}
