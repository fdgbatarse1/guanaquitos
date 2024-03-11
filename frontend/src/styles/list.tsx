import { Box, ListItem, ListItemText, Typography } from '@mui/material';

interface ListProps {
  array: (string | null | undefined)[];
  type: 'ol' | 'ul';
  sx?: object;
}

const List = ({ array, type, sx }: ListProps) => (
  <Box
    component={type}
    sx={{
      padding: '0',
      listStyleType: type === 'ul' ? 'disc' : 'decimal',
      ...sx,
    }}
  >
    {array.map((element) => {
      if (!element) return null;
      return (
        <ListItem
          sx={{
            padding: '0',
            display: 'list-item',
          }}
          key={element}
        >
          <ListItemText
            sx={{
              padding: '0',
            }}
            primary={<Typography variant="body1">{element}</Typography>}
          />
        </ListItem>
      );
    })}
  </Box>
);

export default List;
