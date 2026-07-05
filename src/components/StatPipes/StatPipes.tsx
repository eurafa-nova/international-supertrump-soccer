import { STAT_MAX } from "@/types/card";
import "./StatPipes.css";

interface StatPipesProps {
  value: number;
  max?: number;
  label: string;
}

export function StatPipes({ value, max = STAT_MAX, label }: StatPipesProps) {
  const clamped = Math.max(0, Math.min(max, value));

  return (
    <div
      className="stat-pipes"
      role="img"
      aria-label={`${label}: ${clamped} out of ${max}`}
    >
      {Array.from({ length: max }, (_, index) => (
        <span
          key={index}
          className={`stat-pipes__pipe${index < clamped ? " stat-pipes__pipe--on" : ""}`}
        />
      ))}
    </div>
  );
}
