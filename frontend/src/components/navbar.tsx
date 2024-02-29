import useToggle from '@/hooks/useToogle';
import { Menu, Close } from '@mui/icons-material';
import { type Theme, styled, useTheme } from '@mui/material/styles';
import Link from 'next/link';

interface StyledProps {
  theme: Theme;
  isOpen: boolean;
}

const Header = styled('header')(({ theme, isOpen }: StyledProps) => ({
  position: 'fixed',
  left: 0,
  top: 0,
  zIndex: 10,
  display: 'flex',
  padding: '1rem',
  width: '100%',
  alignItems: 'center',
  justifyContent: isOpen ? 'center' : 'end',
  height: isOpen ? '100%' : '4rem',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    padding: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    padding: '2.5rem 2rem 2.5rem 2rem',
    height: isOpen ? '100%' : '80px',
  },
}));

// const LeftSide = styled('div')(({ theme, isOpen }: StyledProps) => ({
//   position: 'fixed',
//   left: '1rem',
//   top: '1rem',
//   display: 'flex',
//   alignItems: 'center',
//   [theme.breakpoints.up('sm')]: {
//     left: '1.5rem',
//     top: '1.5rem',
//   },
//   [theme.breakpoints.up('md')]: {
//     position: isOpen ? 'fixed' : 'static',
//   },
// }));

// const Name = styled('span')(({ theme }) => ({
//   paddingLeft: '0.5rem',
//   [theme.breakpoints.up('md')]: {
//     paddingLeft: '1rem',
//   },
// }));

const Navigation = styled('nav')(({ theme, isOpen }: StyledProps) => ({
  display: isOpen ? 'block' : 'none',
  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
}));

const CloseToogle = styled(Close)(({ theme, isOpen }: StyledProps) => ({
  display: 'block',
  position: 'fixed',
  right: '1rem',
  top: '1rem',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontSize: '2rem',
  [theme.breakpoints.up('md')]: {
    display: isOpen ? 'fixed' : 'none',
  },
}));

const OpenToogle = styled(Menu)(({ theme, isOpen }: StyledProps) => ({
  display: 'block',
  position: 'fixed',
  right: '1rem',
  top: '1rem',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontSize: '2rem',
  [theme.breakpoints.up('md')]: {
    display: isOpen ? 'fixed' : 'none',
  },
}));

const List = styled('ul')(({ theme }) => ({
  display: 'grid',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    gridAutoFlow: 'column',
    gap: '1rem',
    fontSize: '1.25rem',
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
  //   fontSize: { xs: '1.25rem', md: '1.5rem', lg: '1.875rem' },
  //   lineHeight: { xs: '1.75rem', md: '2rem', lg: '2.25rem' },
  //   letterSpacing: { xs: '0' },
  fontSize: '1.25rem',
  lineHeight: '1.75rem',
  letterSpacing: '0',
  [theme.breakpoints.up('md')]: {
    fontSize: '1.5rem',
    lineHeight: '2rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '1.875rem',
    lineHeight: '2.25rem',
  },

  '&:hover': {
    color: theme.palette.primary.main,
    // space between text and underline
    borderBottom: `2px solid ${theme.palette.primary.main}`,
  },
}));

const Navbar = () => {
  const theme = useTheme();
  const [isOpen, toggle] = useToggle();

  const handleToggle = () => {
    toggle();
  };

  return (
    <Header theme={theme} isOpen={isOpen}>
      {/* <LeftSide theme={theme} isOpen={isOpen}>
        <LogoDev aria-label="Developer Logo" className="h-12 w-12" />
        <Name>Fernando González</Name>
      </LeftSide> */}
      {isOpen ? (
        <CloseToogle theme={theme} aria-label="Cerrar" onClick={handleToggle} isOpen={isOpen} />
      ) : (
        <OpenToogle theme={theme} aria-label="Abrir" onClick={handleToggle} isOpen={isOpen} />
      )}
      <Navigation theme={theme} isOpen={isOpen}>
        <List>
          <li>
            <StyledLink href="/">Inicio</StyledLink>
          </li>
          <li>
            <StyledLink href="/orientation">Orientación</StyledLink>
          </li>
          <li>
            <StyledLink href="/careers">Carreras</StyledLink>
          </li>
          <li>
            <StyledLink href="/scholarships">Becas</StyledLink>
          </li>
        </List>
      </Navigation>
    </Header>
  );
};

export default Navbar;
