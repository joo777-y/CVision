import { useEffect, useRef } from "react";
const WS_URL = import.meta.env?.VITE_WS_URL || "ws://localhost:8000/ws";


export function useWebSocket(onMessage) {
  const wsRef = useRef(null);
  useEffect(() => {
    try {
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;
      ws.onmessage = (e) => {
        try { onMessage(JSON.parse(e.data)); } catch {}
      };
      ws.onerror = () => {};
    } catch {}
    return () => wsRef.current?.close();
  }, []);
  return wsRef;
}