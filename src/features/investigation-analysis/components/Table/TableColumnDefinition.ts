import dayjs from "dayjs";
import type { Column, InterceptionEvent } from "../../types/tableTypes";
import { DEFAULT_TEXT_COLOR, GREEN, RED } from "./consts";

export const columns: Column<InterceptionEvent>[] = [
    {
      key: "time",
      display: "זמן",
      render: (subject) =>
        subject.time ? dayjs(subject.time).format("DD.MM, HH:mm") : "-",
    },
    {
      key: "interceptionStatus",
      display: "סטטוס",
  
      render: (subject) => subject.interceptionStatus ?? "-",
  
      color: (subject) =>
        subject.interceptionStatus === "יורט"
          ? GREEN
          : subject.interceptionStatus === "לא יורט"
            ? RED
            : DEFAULT_TEXT_COLOR,
    },
  
    {
      key: "droneInjuryCount",
      display: "נפגעים",
  
      render: (subject) => subject.droneInjuryCount ?? "-",
  
      color: (subject) =>
      subject.droneInjuryCount === 0
        ? GREEN
        : RED,
    },
  
    {
      key: "financialDamage",
      display: "נזק כספי",
  
      render: (subject) => {
        const interceptorPrice = subject.interceptor?.price;
        const dronePrice = subject.drone?.price;
  
        if (interceptorPrice == null || dronePrice == null) {
          return "-";
        }
  
        const damage = subject.interceptor.price - subject.drone.price;
    
        if (damage >= 1_000_000) {
          return `${(damage / 1_000_000).toFixed(1).replace(/\.0$/, "")}M$`;
        }
    
        if (damage >= 1_000) {
          return `${(damage / 1_000).toFixed(1).replace(/\.0$/, "")}K$`;
        }
    
        return `${damage.toLocaleString()} ₪`;
      },
    },
    {
      key: "interceptor.type",
      display: "מערכת",
  
      render: (subject) => subject.interceptor?.type ?? "-",
    },
  
    {
      key: "attackingBody",
      display: "מקור הרחפן",
  
      render: (subject) => subject.attackingBody ?? "-",
    },
  ];