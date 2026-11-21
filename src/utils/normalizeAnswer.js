
export function normalizeAnswer(value) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    // Los apóstrofes no deben cambiar el nombre.
    .replace(/['’‘´`]/g, "")
    // Otros signos de puntuación se convierten en espacios.
    .replace(/\p{P}+/gu, " ")
    // Eliminar espacios repetidos.
    .replace(/\s+/g, " ")
    .trim();
}
