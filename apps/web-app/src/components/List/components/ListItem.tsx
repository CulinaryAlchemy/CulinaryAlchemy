import DefaultListItem from '@mui/joy/ListItem'

interface IProps {
  children: React.ReactNode
}

export const ListItem: React.FC<IProps> = ({ children }) => {
  return (
    <DefaultListItem>
      {children}
    </DefaultListItem>)
}
