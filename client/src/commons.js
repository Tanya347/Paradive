export const handleChange = (e, setInfo) => {
    setInfo((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

export const formatDate = (date) => {
  const newDate = new Date(date);
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(newDate);
  return formattedDate
}