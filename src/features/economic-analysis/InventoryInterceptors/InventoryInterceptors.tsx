import type { ReactNode } from "react";

export interface StockLevelItem {
  id: string;
  name: string;
  detail?: string;
  current: number;
  total: number;
  minimum: number;
}

interface StockLevelsProps {
  icon?: ReactNode;
  title?: string;
  subtitle?: string;
  items: StockLevelItem[];
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
  item: StockLevelItem;
}) => {
  const currentPercent = toPercent(item.current, item.total);

  const minimumPercent = toPercent(item.minimum, item.total);

  return (
    <div
      style={{
        width: "100%",
        marginBottom: 22,
        direction: "rtl",
      }}
    >
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
            {item.name}
          </span>

          {item.detail && (
            <span
              style={{
                color: TEXT_MUTED,
                fontSize: 12,
              }}
            >
              {item.detail}
            </span>
          )}
        </div>

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
            {formatNumber(item.total)} / {formatNumber(item.current)}
          </span>
        </div>
      </div>

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

      <div
        style={{
          marginTop: 5,
          color: MIN_LINE,
          fontSize: 11,
          textAlign: "right",
          direction: "rtl",
        }}
      >
        מס׳ מינימלי: {formatNumber(item.minimum)}
      </div>
    </div>
  );
};

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
          key={item.id}
          item={item}
        />
      ))}
    </div>
  );
};

export const stockLevelsData: StockLevelItem[] = [
  {
    id: "iron-dome",
    name: "כיפת ברזל",
    detail: "(סטיר)",
    current: 3200,
    total: 5000,
    minimum: 1000,
  },
  {
    id: "davids-sling",
    name: "קלע דוד",
    detail: "(סטאבר)",
    current: 180,
    total: 300,
    minimum: 60,
  },
  {
    id: "arrow-2",
    name: "חץ 2",
    detail: "(חץ 2 בלוק 4)",
    current: 90,
    total: 150,
    minimum: 30,
  },
  {
    id: "arrow-3",
    name: "חץ 3",
    detail: "(חץ 3)",
    current: 48,
    total: 80,
    minimum: 16,
  },
];