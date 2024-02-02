"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Pagination from "@mui/material/Pagination";

interface StyledPaginationProps {
  count: number;
  page: number;
}

const StyledPagination = ({ count, page }: StyledPaginationProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", value.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const responsiveSize = () => {
    if (isSmallScreen) return "small";
    if (isMediumScreen) return "medium";
    return "large";
  };

  const size = responsiveSize();
  const siblingCount = size === "small" ? 1 : 2;

  return (
    <Pagination
      boundaryCount={0}
      count={count}
      page={page}
      onChange={handleChange}
      size={size}
      shape="circular"
      color="primary"
      siblingCount={siblingCount}
    />
  );
};

export default StyledPagination;
