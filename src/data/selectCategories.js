
export function selectGameCategories(categories) {
  const finalCategory = categories.find(
    (category) => category.id === "love"
  );

  if (!finalCategory) {
    throw new Error('No se encontró la categoría "love".');
  }

  const availableCategories = categories.filter(
    (category) => category.id !== "love"
  );

  const shuffledCategories = [...availableCategories];

  // Mezclar las categorías usando Fisher-Yates
  for (let i = shuffledCategories.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [shuffledCategories[i], shuffledCategories[randomIndex]] = [
      shuffledCategories[randomIndex],
      shuffledCategories[i],
    ];
  }

  // Elegir seis categorías y colocar la romántica al final
  return [...shuffledCategories.slice(0, 6), finalCategory];
}
