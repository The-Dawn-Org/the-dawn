// src/components/EventMarker.tsx
import React from "react";

interface EventMarkerProps {
  eventId: number;
  interceptionStatus: string;
  droneInjuryCount: number;
  onClick: (eventId: number) => void;
  style?: React.CSSProperties;
}

export const EventMarker: React.FC<EventMarkerProps> = ({
  eventId,
  interceptionStatus,
  droneInjuryCount,
  onClick,
  style,
}) => {
  const isIntercepted = interceptionStatus === "intercepted";
  const hasInjuries = droneInjuryCount > 0;

  const markerStyle: React.CSSProperties = {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    backgroundColor: isIntercepted ? "#22c55e" : "#ef4444",
    border: hasInjuries ? "3px solid #eab308" : "2px solid #ffffff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
    cursor: "pointer",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    ...style,
  };

  return (
    <div
      style={markerStyle}
      onClick={() => onClick(eventId)}
      title={`Event #${eventId}`}
    />
  );
};
