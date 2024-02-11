'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ToggleButton from '@mui/material/ToggleButton';
import TuneIcon from '@mui/icons-material/Tune';

interface StyledFiltersToogleButtonProps {
  selected: string;
}

const StyledFiltersToogleButton = ({ selected }: StyledFiltersToogleButtonProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSelect = () => {
    const params = new URLSearchParams(searchParams);
    params.set('filters', selected === 'true' ? 'false' : 'true');
    replace(`${pathname}?${params.toString()}`);
  };

  const responsiveSize = () => {
    if (isSmallScreen) return 'small';
    return 'large';
  };

  const size = responsiveSize();

  return (
    <ToggleButton
      value="check"
      selected={selected === 'true'}
      onChange={handleSelect}
      color="primary"
      size={size}
    >
      <TuneIcon />
    </ToggleButton>
  );
};

export default StyledFiltersToogleButton;
