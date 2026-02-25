import { Check, Info, Zap } from "lucide-react";
import type { Status } from "../constants";

interface StatusBarProps {
  status: Status;
}

export function StatusBar({ status }: StatusBarProps) {
  if (!status.message) return null;

  return (
    <div className={`status-bar ${status.type}`}>
      {status.type === "success" && <Check size={14} />}
      {status.type === "error" && <Info size={14} />}
      {status.type === "info" && <Zap size={14} />}
      <span>{status.message}</span>
    </div>
  );
}
