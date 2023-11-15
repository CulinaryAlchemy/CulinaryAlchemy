import { Item } from '@radix-ui/react-dropdown-menu'
import styles from '../dropdownMenu.module.css'

interface Props {
  children: React.ReactNode
  onClick?: () => void
}

export const DropdownMenuItem: React.FC<Props> = ({ children, onClick }) => {
  return (
    <Item onClick={onClick} className={styles.DropdownMenuItem}>
      {children}
    </Item>
  )
}
