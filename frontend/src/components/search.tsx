'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

interface StyledSearchProps {
  value: string;
  placeholder: string;
  options: string[];
}

const StyledSearch = ({ value, placeholder, options }: StyledSearchProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleRenderInput = (params: any) => (
    <TextField
      {...params}
      label={
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={4}>
          <SearchIcon /> Buscar
        </Stack>
      }
      placeholder={placeholder}
    />
  );

  const handleOnChange = (_event: any, newValue: string | null) => {
    const query = newValue || '';
    const params = new URLSearchParams(searchParams);
    params.set('query', query.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const responsiveSize = () => {
    if (isSmallScreen) return 'small';
    return 'medium';
  };

  const size = responsiveSize();

  return (
    <Autocomplete
      id="search"
      options={options}
      renderInput={handleRenderInput}
      freeSolo
      fullWidth
      value={value}
      onChange={handleOnChange}
      size={size}
    />
  );
};

export default StyledSearch;
