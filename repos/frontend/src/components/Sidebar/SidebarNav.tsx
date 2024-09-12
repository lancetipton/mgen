import { SidebarNavItem } from '@MG/components/Sidebar/SidebarNavItem'
import { 
  HomeIcon,
  DashIcon,
  ListIcon,
  TaskIcon,
  PieIcon,
  UsersIcon,
} from '@MG/components/Icons'


export type TSidebarNav = {}

export const SidebarNav = (props:TSidebarNav) => {

  return (
    <nav className="-mx-3 space-y-3 ">
      <SidebarNavItem
        text='Home'
        icon={(<HomeIcon />)}
      />
      <SidebarNavItem
        text='Dashboard'
        icon={(<DashIcon />)}
      />
      <SidebarNavItem
        text='Projects'
        icon={(<ListIcon />)}
      />
      <SidebarNavItem
        text='Tasks'
        icon={(<TaskIcon />)}
      />
      <SidebarNavItem
        text='Reporting'
        icon={(<PieIcon />)}
      />
      <SidebarNavItem
        text='Users'
        icon={(<UsersIcon />)}
      />
    </nav>
  )

}