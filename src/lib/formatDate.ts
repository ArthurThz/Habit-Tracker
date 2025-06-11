export const formatDate = (date: Date) => {
  const formattedDate = new Intl.DateTimeFormat("en-us", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));

  return formattedDate;
};
