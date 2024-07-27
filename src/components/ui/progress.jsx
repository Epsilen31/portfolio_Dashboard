"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

// Define solid colors for the progress bar based on proficiency
const getColor = (value) => {
  if (value >= 75) return "#8e24aa"; // Expert: Purple
  if (value >= 50) return "#4caf50"; // Advanced: Green
  if (value >= 25) return "#2196f3"; // Intermediate: Blue
  return "#ffeb3b"; // Beginner: Yellow
};

const Progress = React.forwardRef(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-8 w-full overflow-hidden rounded-full bg-gray-200",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full flex-1 rounded-full transition-all duration-500 ease-in-out"
      style={{
        width: `${value || 0}%`,
        background: getColor(value), // Use solid color based on value
        boxShadow: "0 6px 10px rgba(0, 0, 0, 0.2)",
      }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
