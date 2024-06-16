'use client';

import useToggle from '@/hooks/useToogle';
import { Menu, Close } from '@mui/icons-material';
import { type Theme, styled, useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/assets/pngs/navbar_logo.png';
import Image from 'next/image';

interface StyledProps {
  theme: Theme;
  isOpen: boolean;
}

const Header = styled('header', {
  shouldForwardProp: (prop) => prop !== 'isOpen',
})(({ theme, isOpen }: StyledProps) => ({
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
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up('sm')]: {
    padding: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    padding: '2.5rem 2rem 2.5rem 2rem',
    height: isOpen ? '100%' : '80px',
  },
}));

const IconContainer = styled('div')(() => ({
  position: 'absolute',
  left: '2rem',
  top: '1rem',
}));

const Navigation = styled('nav', {
  shouldForwardProp: (prop) => prop !== 'isOpen',
})(({ theme, isOpen }: StyledProps) => ({
  display: isOpen ? 'block' : 'none',
  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
}));

const CloseToogle = styled(Close, {
  shouldForwardProp: (prop) => prop !== 'isOpen',
})(({ theme, isOpen }: StyledProps) => ({
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

const OpenToogle = styled(Menu, {
  shouldForwardProp: (prop) => prop !== 'isOpen',
})(({ theme, isOpen }: StyledProps) => ({
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
  fontSize: '1.25rem',
  lineHeight: '1.75rem',
  letterSpacing: '0',
  fontWeight: 500,
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
    borderRadius: '0.5rem',
  },
}));

const Navbar = () => {
  const theme = useTheme();
  const [isOpen, toggle] = useToggle();
  const pathname = usePathname();

  const handleLink = () => {
    if (!isOpen) return;
    toggle();
  };

  const routes = [
    {
      name: 'Inicio',
      path: '/',
    },
    {
      name: 'Orientación',
      path: '/orientation',
    },
    {
      name: 'Carreras',
      path: '/careers',
    },
    {
      name: 'Becas',
      path: '/scholarships',
    },
    {
      name: 'Chat',
      path: '/chat',
    },
  ];

  return (
    <Header theme={theme} isOpen={isOpen}>
      {/* <IconContainer theme={theme}>
        <Image src={Logo} alt="Torogoz con birrete" width={48} height={48} />
      </IconContainer> */}
      {isOpen ? (
        <CloseToogle theme={theme} aria-label="Cerrar" onClick={toggle} isOpen={isOpen} />
      ) : (
        <OpenToogle theme={theme} aria-label="Abrir" onClick={toggle} isOpen={isOpen} />
      )}
      <Navigation theme={theme} isOpen={isOpen}>
        <List>
          {routes.map((route) => (
            <li key={route.path}>
              <StyledLink
                theme={theme}
                onClick={() => {
                  handleLink();
                }}
                style={{
                  color: (pathname === route.path && theme.palette.primary.main) || '',
                }}
                href={route.path}
              >
                {route.name}
              </StyledLink>
            </li>
          ))}
        </List>
      </Navigation>
    </Header>
  );
};

export default Navbar;
