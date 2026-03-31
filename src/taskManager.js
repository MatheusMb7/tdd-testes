let currentId = 0;
let tasks = [];

// Reset para testes
export function resetId() {
  currentId = 0;
  tasks = [];
}

// Validação
export function validateTitle(title) {
  if (typeof title !== 'string') return false;

  const trimmed = title.trim();
  return trimmed.length >= 3;
}

// Criar tarefa
export function createTask(title) {
  if (!validateTitle(title)) {
    throw new Error('Título inválido');
  }

  const task = {
    id: ++currentId,
    title: title.trim(),
    completed: false
  };

  tasks.push(task);
  return task;
}

// Listar tarefas
export function getTasks() {
  return tasks;
}

// Buscar por ID
export function getTaskById(id) {
  return tasks.find(t => t.id === id);
}

// Alternar status
export function toggleTask(id) {
  const task = getTaskById(id);
  if (!task) return null;

  task.completed = !task.completed;
  return task;
}

// Deletar tarefa
export function deleteTask(id) {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return false;

  tasks.splice(index, 1);
  return true;
}