import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";

import { useEventsFilters } from "../../app/filters/FilterEventsContext";
import type { Region } from "../../types/Region";
import type { InterceptorType } from "../../types";
import type { AttackingBody } from "../../types/AttackingBody";
import type { interceptionStatus } from "../../types/InterceptionStatus";

const EventsFilters = () => {
  const {
    filters,
    setRegion,
    setInterceptorType,
    setAttackingBody,
    setInterceptionStatus,
  } = useEventsFilters();

  const handleRegionChange = (event: SelectChangeEvent) => {
    setRegion((event.target.value as unknown as Region) || null);
  };

  const handleInterceptorTypeChange = (event: SelectChangeEvent) => {
    setInterceptorType(
      (event.target.value as unknown as InterceptorType) || null
    );
  };

  const handleAttackingBodyChange = (event: SelectChangeEvent) => {
    setAttackingBody((event.target.value as unknown as AttackingBody) || null);
  };

  const handleInterceptionStatusChange = (event: SelectChangeEvent) => {
    setInterceptionStatus(
      (event.target.value as unknown as interceptionStatus) || null
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        padding: 2,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
    >
      <FormControl fullWidth size="small">
        <InputLabel>Region</InputLabel>
        <Select
          value={filters.region ? String(filters.region) : ""}
          label="Region"
          onChange={handleRegionChange}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value="North">North</MenuItem>
          <MenuItem value="South">South</MenuItem>
          <MenuItem value="Center">Center</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel>Interceptor Type</InputLabel>
        <Select
          value={filters.interceptorType ? String(filters.interceptorType) : ""}
          label="Interceptor Type"
          onChange={handleInterceptorTypeChange}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value="Iron Dome">Iron Dome</MenuItem>
          <MenuItem value="David's Sling">David's Sling</MenuItem>
          <MenuItem value="Arrow">Arrow</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel>Launch Source</InputLabel>
        <Select
          value={filters.attackingBody ? String(filters.attackingBody) : ""}
          label="Launch Source"
          onChange={handleAttackingBodyChange}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value="Radar">Radar</MenuItem>
          <MenuItem value="Satellite">Satellite</MenuItem>
          <MenuItem value="Visual">Visual</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel>Interception Status</InputLabel>
        <Select
          value={filters.interceptionStatus ? String(filters.interceptionStatus) : ""}
          label="Interception Status"
          onChange={handleInterceptionStatusChange}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value="Successful">Successful</MenuItem>
          <MenuItem value="Failed">Failed</MenuItem>
          <MenuItem value="Unknown">Unknown</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default EventsFilters;
