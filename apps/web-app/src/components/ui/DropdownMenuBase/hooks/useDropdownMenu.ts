'use client'
import { useState } from 'react'

export const useDropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleIsOpen = () => {
    setIsOpen(prev => !prev)
  }

  return { isOpen, toggleIsOpen }
}
