import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';

export type InterceptionStatsProps = {
  title: string;
  intercepted: number;
  missed: number;
  size?: number;
  onSelect?: (title: string) => void;
};

const COLOR_HIT = '#8cb85c';
const COLOR_MISS = '#c0392b';

type CenterLabelProps = { value: string; caption: string };

const CenterLabel = ({ value, caption }: CenterLabelProps) => {
  const { width, height, left, top } = useDrawingArea();
  const cx = left + width / 2;
  const cy = top + height / 2;

  return (
    <g pointerEvents="none">
      <text
        x={cx}
        y={cy - 6}
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fill: COLOR_HIT, fontSize: 26, fontWeight: 700 }}
      >
        {value}
      </text>
      <text
        x={cx}
        y={cy + 20}
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fill: 'rgba(255,255,255,0.55)', fontSize: 12 }}
      >
        {caption}
      </text>
    </g>
  );
}

export const InterceptionStats = ({
  title,
  intercepted,
  missed,
  size = 220,
  onSelect,
}: InterceptionStatsProps) => {
  const total = intercepted + missed;
  const accuracy = total > 0 ? (intercepted / total) * 100 : 0;
  const missedLabel = 'החטיא';
  const accuracyLabel = 'דיוק';
  const interceptedLabel = 'יורט';

  const data = [
    { id: 'intercepted', value: intercepted, label: interceptedLabel, color: COLOR_HIT },
    { id: 'missed', value: missed, label: missedLabel, color: COLOR_MISS },
  ].filter((d) => d.value > 0);

  const isClickable = Boolean(onSelect);

  const handleActivate = () => {
    onSelect?.(title);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleActivate();
    }
  };

  return (
    <Box
      dir="rtl"
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={isClickable ? title : undefined}
      onClick={isClickable ? handleActivate : undefined}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      sx={{
        p: 3,
        borderRadius: 3,
        bgcolor: '#1a2118',
        border: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        width: 'fit-content',
        ...(isClickable && {
          cursor: 'pointer',
          transition: 'border-color 150ms ease, background-color 150ms ease',
          '&:hover': {
            bgcolor: '#202a1d',
            borderColor: 'rgba(255,255,255,0.24)',
          },
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'primary.main',
            outlineOffset: 2,
          },
        }),
      }}
    >
      <PieChart
        width={size}
        height={size}
        hideLegend
        series={[
          {
            data,
            innerRadius: size * 0.34,
            outerRadius: size * 0.46,
            paddingAngle: data.length > 1 ? 2 : 0,
            cornerRadius: 2,
            startAngle: 0,
            endAngle: 360,
            valueFormatter: (item) => `${item.value}`,
          },
        ]}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      >
        <CenterLabel
          value={total > 0 ? `${accuracy.toFixed(1)}%` : '—'}
          caption={accuracyLabel}
        />
      </PieChart>

      <Typography sx={{ color: 'rgba(255,255,255,0.92)', fontSize: 16, fontWeight: 600 }}>
        {title}
      </Typography>

      <Box sx={{ display: 'flex', gap: 1.5, fontSize: 13 }}>
        <Typography component="span" sx={{ color: COLOR_HIT, fontSize: 13 }}>
          {intercepted} {interceptedLabel}
        </Typography>
        <Typography component="span" sx={{ color: COLOR_MISS, fontSize: 13 }}>
          {missed} {missedLabel}
        </Typography>
      </Box>
    </Box>
  );
}