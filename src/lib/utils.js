import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"


const COLORS = [
  "#DC2626", 
  "#D97706", 
  "#059669", 
  "#7C3AED", 
  "#DB2777"
];

export function connectionIdToColor(connectionId) {
  return COLORS[connectionId % COLORS.length];
}

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}


