"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

interface StyledSearchProps {
  value: string;
  placeholder: string;
  fetch: () => Promise<string[]>;
}

function debounce<Params extends any[]>(
  func: (...args: Params) => any,
  timeout: number
): (...args: Params) => void {
  let timer: NodeJS.Timeout;
  return (...args: Params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

const StyledSearch = ({ value, placeholder, fetch }: StyledSearchProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [options, setOptions] = useState<string[]>([]);

  const handleRenderInput = (params: any) => (
    <TextField
      {...params}
      label={
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={4}
        >
          <SearchIcon /> Buscar
        </Stack>
      }
      placeholder={placeholder}
    />
  );

  const handleOnChange = (_event: any, newValue: string | null) => {
    const query = newValue || "";
    const params = new URLSearchParams(searchParams);
    params.set("query", query.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const handleInputChange = async (_event: unknown, newInputValue: string) => {
    const newOptions = await fetch();
    setOptions(newOptions);
  };

  const responsiveSize = () => {
    if (isSmallScreen) return "small";
    return "medium";
  };

  const size = responsiveSize();

  return (
    <Autocomplete
      id="search"
      options={options}
      renderInput={handleRenderInput}
      filterOptions={(x) => x}
      freeSolo
      fullWidth
      value={value}
      onChange={handleOnChange}
      onInputChange={debounce(handleInputChange, 300)}
      size={size}
    />
  );
};

export default StyledSearch;
