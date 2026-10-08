function getTimeLeft(expiry) {
  const total = Date.parse(expiry) - Date.now();
  if (total <= 0) return { total, formatted: "Expired" };
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);
  return {
    total,
    formatted: `${days}d ${hours}h ${minutes}m ${seconds}s`,
  };
}

export default getTimeLeft;
