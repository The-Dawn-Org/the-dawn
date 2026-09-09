// npm install @mui/x-charts @mui/material @emotion/react @emotion/styled

import * as React from 'react';
import { ChartsContainer } from '@mui/x-charts/ChartsContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';
import { ChartsLegend } from '@mui/x-charts/ChartsLegend';
import { ChartsGrid } from '@mui/x-charts/ChartsGrid';

// ---- 1. Data -----------------------------------------------------------
// Bars = cost of interception (in $K), Line = number of drones intercepted.
// These are two different units, which is exactly why we need two y-axes.

const days = ['יום א׳', 'יום ב׳', 'יום ג', 'יום ד׳', 'יום ה׳', 'יום ו׳', 'שבת׳'];
const cost = [25000, 47000, 43000, 63000, 29000, 40000, 0];
const intercepted = [17, 25, 31, 27, 21, 21, 0];

const data = [
    {
        date: new Date().getTime() - (1000 * 60 * 7),
        droneIntercepted: 17,
        totalCost: 25000,
    }, 
    {
        date: new Date().getTime() - (1000 * 60 * 6),
        droneIntercepted: 25,
        totalCost: 47000,
    },
    {
        date: new Date().getTime() - (1000 * 60 * 5),
        droneIntercepted: 31,
        totalCost: 43000,
    },
    {
        date: new Date().getTime() - (1000 * 60 * 4),
        droneIntercepted: 27,
        totalCost: 63000,
    },
    {
        date: new Date().getTime() - (1000 * 60 * 3),
        droneIntercepted: 21,
        totalCost: 29000,
    },
    {
        date: new Date().getTime() - (1000 * 60 * 2),
        droneIntercepted: 21,
        totalCost: 40000,
    },
    {
        date: new Date().getTime() - (1000 * 60 * 1),
        droneIntercepted: 0,
        totalCost: 0,
    }
]

// ---- 2. Colors (matching the dark dashboard look) -----------------------
const BG = '#1b2417';
const CARD_BORDER = '#2c3a26';
const GOLD = '#e0b04a';
const RED = '#c0392b';
const TEXT_MUTED = '#8a9482';
const TEXT = '#e8e6df';

export const DroneDashboardChart = () => {
  return (
    <div
      dir="rtl"
      style={{
        background: BG,
        border: `1px solid ${CARD_BORDER}`,
        borderRadius: 16,
        padding: '20px 24px',
        fontFamily: 'system-ui, sans-serif',
        // width: '50%',
        maxWidth: 760,
      }}
    >
      {/* ---- Header ---- */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{ color: TEXT, fontWeight: 600, fontSize: 40 }}>יחס עלות אסימטרי</span>
        <span style={{ color: TEXT_MUTED, fontSize: 13 }}>
          עלות מיירט מול שווי רחפן
        </span>
      </div>

      {/* ---- 3. The chart itself ---- */}
      <ChartsContainer
        height={360}
        series={[
          {
            type: 'bar',
            data: cost,
            yAxisId: 'costAxis',
            color: GOLD,
            label: 'עלות מיירט (K$)',
          },
          {
            type: 'line',
            data: intercepted,
            yAxisId: 'countAxis',
            color: RED,
            label: 'רחפנים מיורטים',
            curve: 'linear',
            // makes the dots on the line visible, like in the screenshot
            showMark: true,
          },
        ]}
        // The x-axis: 'band' scaleType is for categorical data (days),
        // as opposed to 'linear' which is for continuous numbers.
        xAxis={[
          {
            id: 'days',
            scaleType: 'band',
            data: days,
            tickLabelStyle: { fill: TEXT_MUTED, fontSize: 12 },
          },
        ]}
        // Two y-axes, one per unit. The `id` here is what series
        // reference via `yAxisId` above.
        yAxis={[
          {
            id: 'costAxis',
            position: 'right',
            scaleType: 'linear',
            min: 0,
            max: 80000,
            valueFormatter: (v) => `$${v / 1000}K`,
            tickLabelStyle: { fill: TEXT_MUTED, fontSize: 11 },
          },
          {
            id: 'countAxis',
            position: 'left',
            scaleType: 'linear',
            min: 0,
            max: 32,
            tickLabelStyle: { fill: TEXT_MUTED, fontSize: 11 },
          },
        ]}
        sx={{
          '.MuiChartsAxis-line': { stroke: CARD_BORDER },
          '.MuiChartsAxis-tick': { stroke: CARD_BORDER },
          '.MuiBarElement-root': { rx: 4 }, // rounded bar tops
        }}
      >
        {/* Order matters: grid first (background), then plots, then axes/tooltip on top */}
        <ChartsGrid horizontal vertical={false} />

        <BarPlot />
        <LinePlot />
        <MarkPlot />

        {/* Each axis component needs axisId matching the config above.
            position="left"/"right" — note that in dir="rtl", MUI mirrors
            this automatically to match reading direction; flip these two
            if your $ axis and count axis land on the wrong side. */}
        <ChartsXAxis axisId="days" />
        <ChartsYAxis axisId="costAxis"/>
        <ChartsYAxis axisId="countAxis"/>

        <ChartsTooltip trigger="axis" />
      </ChartsContainer>

      {/* Legend as a separate row (closer to the screenshot's bottom legend
          than the built-in <ChartsLegend />, which MUI also supports as a
          child of ChartContainer if you'd rather use that). */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 24,
          marginTop: 4,
          fontSize: 12,
          color: TEXT_MUTED,
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 10, height: 10, background: GOLD, borderRadius: 2 }} />
          עלות מיירט (K$)
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 10, height: 10, background: RED, borderRadius: '50%' }} />
          רחפנים מיורטים
        </span>
      </div>
    </div>
  );
}