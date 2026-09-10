import type { InventoryType } from "../types";

export interface StockLevelItem {
  id: string;
  name: string;
  detail?: string;
  current: number;
  total: number;
  minimum: number;
}

interface StockLevelsProps {
  items: InventoryType[];
}

// -----------------------------------------------------------------------------
// Colors
// -----------------------------------------------------------------------------

const TRACK_BG = "#293a24";
const FILL_START = "#4c7d38";
const FILL_END = "#6ca847";
const MIN_LINE = "#ed0202";

const TEXT_MAIN = "#eef2ec";
const TEXT_MUTED = "#718092";
const TEXT_PERCENT = "#6ca847";

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const toPercent = (value: number, total: number): number => {
  if (total <= 0) {
    return 0;
  }

  return Math.min(100, Math.max(0, (value / total) * 100));
};

const formatNumber = (value: number): string => {
  return value.toLocaleString("he-IL");
};

// -----------------------------------------------------------------------------
// One inventory row
// -----------------------------------------------------------------------------

const StockLevelRow = ({
  item,
}: {
  item: InventoryType;
}) => {
  // Percentage of the maximum that we currently have
  const currentPercent = toPercent(item.current, item.max);

  // Percentage of the maximum that represents the minimum required amount
  //
  // Example:
  // max = 5000
  // min = 1000
  //
  // 1000 / 5000 * 100 = 20%
  //
  // So the red line will be positioned at 20% from the right side.
  const minimumPercent = toPercent(item.min, item.max);

  return (
    <div
      style={{
        width: "100%",
        marginBottom: 22,
        direction: "rtl",
      }}
    >
      {/* -----------------------------------------------------------------
          Header
          ----------------------------------------------------------------- */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          width: "100%",
          marginBottom: 8,
        }}
      >
        {/* RIGHT SIDE - system name */}

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 6,
            direction: "rtl",
          }}
        >
          <span
            style={{
              color: TEXT_MAIN,
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            {item.type}
          </span>
        </div>

        {/* LEFT SIDE - percentage + numbers */}

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 8,
            direction: "ltr",
          }}
        >
          <span
            style={{
              color: TEXT_PERCENT,
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            {Math.round(currentPercent)}%
          </span>

          <span
            style={{
              color: TEXT_MAIN,
              fontSize: 13,
            }}
          >
            {formatNumber(item.max)} / {formatNumber(item.current)}
          </span>
        </div>
      </div>

      {/* -----------------------------------------------------------------
          Stock bar
          ----------------------------------------------------------------- */}

      <div
        style={{
          position: "relative",
          width: "100%",
          height: 10,
          borderRadius: 999,
          background: TRACK_BG,
          overflow: "visible",
        }}
      >
        {/* Current stock fill */}

        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            height: "100%",
            width: `${currentPercent}%`,
            borderRadius: 999,
            background: `linear-gradient(
              90deg,
              ${FILL_START},
              ${FILL_END}
            )`,
            transition: "width 0.3s ease",
          }}
        />

        {/* -----------------------------------------------------------------
            Minimum stock marker

            The important part is:

            right: `${minimumPercent}%`

            If:
              max = 5000
              min = 1000

            minimumPercent = 20

            Therefore:
              right: "20%"

            This puts the red line at the correct position relative
            to the maximum amount.
            ----------------------------------------------------------------- */}

        <div
          style={{
            position: "absolute",
            top: -2,
            right: `${minimumPercent}%`,
            width: 2,
            height: 14,
            backgroundColor: MIN_LINE,
            borderRadius: 1,
            transform: "translateX(50%)",
            zIndex: 2,
          }}
        />
      </div>

      {/* -----------------------------------------------------------------
          Minimum amount label
          ----------------------------------------------------------------- */}

      <div
        style={{
          marginTop: 5,
          color: MIN_LINE,
          fontSize: 11,
          textAlign: "right",
          direction: "rtl",
        }}
      >
        מס׳ מינימלי: {formatNumber(item.min)}
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// Inventory chart
// -----------------------------------------------------------------------------

export const StockLevels = ({
  items,
}: StockLevelsProps) => {
  if (items.length === 0) {
    return (
      <div
        dir="rtl"
        style={{
          width: "100%",
          minHeight: 330,
          display: "grid",
          placeItems: "center",
          color: TEXT_MUTED,
          fontSize: 14,
        }}
      >
        לא נמצאו נתוני מלאי לטווח שנבחר
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      style={{
        width: "100%",
        minHeight: 330,
        boxSizing: "border-box",
        padding: "4px 10px 0",
      }}
    >
      {items.map((item) => (
        <StockLevelRow
          key={item.type}
          item={item}
        />
      ))}
    </div>
  );
};