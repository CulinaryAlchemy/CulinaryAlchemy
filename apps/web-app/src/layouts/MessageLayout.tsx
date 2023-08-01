import Box from '@mui/joy/Box'
import React from 'react'

interface IProps {
  children: React.ReactNode
}

export const MessageLayout: React.FC<IProps> = ({ children }) => {
  return (
        <Box sx={{ position: 'absolute', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50%' }}>
            {children}
        </Box>
  )
}
