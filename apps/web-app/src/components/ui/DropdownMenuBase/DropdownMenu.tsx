'use client'
import IconButton from '@mui/joy/IconButton'
import { Content, Portal, Root, Trigger } from '@radix-ui/react-dropdown-menu'
import { useState } from 'react'
import { DropdownMenuItem } from './components'
import styles from './dropdownMenu.module.css'

interface Props {
  triggerIcon: React.ReactNode
  children: React.ReactNode
  alignContent?: 'start' | 'center' | 'end'
}

export const DropdownMenuBase = ({ children, triggerIcon, alignContent = 'end' }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOnClick = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <Root open={isOpen} defaultOpen={isOpen} onOpenChange={handleOnClick}>
      <Trigger asChild>
        <IconButton
          variant='plain'
          color='neutral'
          onClick={handleOnClick}
        >
          {triggerIcon}
        </IconButton>
      </Trigger>

      <Portal>
        <Content align={alignContent} className={styles.DropdownMenuContent} sideOffset={5}>
          {children}
        </Content>
      </Portal>
    </Root>
  )
}

DropdownMenuBase.Item = DropdownMenuItem
