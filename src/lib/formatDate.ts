export const formatDate = (date: Date | string) => {
  console.log("DATE LI", date);
  const formattedDate = new Intl.DateTimeFormat("en-us", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));

  return formattedDate;
};
