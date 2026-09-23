import { useEffect, useState } from 'react';

function format(tz: string) {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: tz,
  }).format(new Date());
}

/** "3:42 PM" in a given time zone, refreshed every 20s. */
export function useLocalTime(tz: string) {
  const [time, setTime] = useState(() => format(tz));
  useEffect(() => {
    const id = window.setInterval(() => setTime(format(tz)), 20_000);
    return () => window.clearInterval(id);
  }, [tz]);
  return time;
}
