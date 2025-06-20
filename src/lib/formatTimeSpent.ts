type Props = {
  transformTo: "minutes" | "hours";
  seconds: number;
};

export const formatTimeSpent = ({ transformTo, seconds }: Props) => {
  if (transformTo === "minutes") return Math.floor(seconds / 60);

  if ((transformTo = "hours")) return seconds / 3600;
};
