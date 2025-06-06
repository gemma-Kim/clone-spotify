export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const monthYear = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
  return `${day} ${monthYear}`;
};
