'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import FormControl from '@mui/material/FormControl/FormControl';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select/Select';

interface StyledFilterProps {
  id: string;
  label: string;
  value: string;
  items: string[];
}

const StyledFilter = ({ id, label, value, items }: StyledFilterProps) => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = (event: SelectChangeEvent) => {
    const params = new URLSearchParams(searchParams);
    if (event.target.value === 'none') params.delete(id.toLowerCase());
    else params.set(id.toLowerCase(), event.target.value);
    replace(`${pathname}?${params.toString()}`);
  };

  const responsiveSize = () => {
    if (isMediumScreen) return 'small';
    return 'medium';
  };

  const size = responsiveSize();

  return (
    <FormControl
      variant="outlined"
      sx={{ width: '100%', maxWidth: { xs: '100%', md: '25%' } }}
      size={size}
    >
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={`${id}`}
        value={value}
        label={label}
        onChange={handleChange}
      >
        <MenuItem value="none">
          {id === 'order' ? <em>No ordenar</em> : <em>No filtrar</em>}
        </MenuItem>
        {items.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default StyledFilter;
