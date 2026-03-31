let currentId = 0;

export function resetId() {
  currentId = 0;
}

export function validateTitle(title) {
  if (typeof title !== 'string') {
    return false;
  }

  const trimmed = title.trim();
  return trimmed.length >= 3;
}

export function createTask(title) {
  // opcional, mas boa prática no TDD
  if (!validateTitle(title)) {
    throw new Error('Título inválido');
  }

  currentId++;

  return {
    id: currentId,
    title: title.trim(),
    completed: false
  };
}