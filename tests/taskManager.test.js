import {
  createTask,
  resetId,
  validateTitle,
  getTasks,
  getTaskById,
  toggleTask,
  deleteTask
} from '../src/taskManager.js';

import { describe, it, expect, beforeEach } from 'vitest';

describe('validateTitle', () => {
  it('deve retornar true para título válido', () => {
    expect(validateTitle('abc')).toBe(true);
  });

  it('deve retornar false para string vazia', () => {
    expect(validateTitle('')).toBe(false);
  });

  it('deve retornar false para espaços', () => {
    expect(validateTitle('   ')).toBe(false);
  });

  it('deve retornar false para menos de 3 caracteres', () => {
    expect(validateTitle('ab')).toBe(false);
  });

  it('deve retornar false para tipos inválidos', () => {
    expect(validateTitle(null)).toBe(false);
    expect(validateTitle(undefined)).toBe(false);
    expect(validateTitle(123)).toBe(false);
  });
});

describe('createTask', () => {
  beforeEach(() => {
    resetId();
  });

  it('deve criar uma tarefa corretamente', () => {
    const task = createTask('Estudar');

    expect(task).toHaveProperty('id');
    expect(task.title).toBe('Estudar');
    expect(task.completed).toBe(false);
  });

  it('deve gerar IDs incrementais', () => {
    const t1 = createTask('Tarefa 1');
    const t2 = createTask('Tarefa 2');

    expect(t2.id).toBe(t1.id + 1);
  });

  it('deve aplicar trim', () => {
    const task = createTask('  teste  ');
    expect(task.title).toBe('teste');
  });
});

describe('CRUD de tarefas', () => {
  beforeEach(() => {
    resetId();
  });

  it('deve armazenar tarefas', () => {
    createTask('Tarefa 1');
    createTask('Tarefa 2');

    expect(getTasks().length).toBe(2);
  });

  it('deve buscar por ID', () => {
    const task = createTask('Teste válido');
    const found = getTaskById(task.id);

    expect(found.title).toBe('Teste válido');
  });

  it('deve alternar status', () => {
    const task = createTask('Teste válido');

    toggleTask(task.id);
    expect(task.completed).toBe(true);

    toggleTask(task.id);
    expect(task.completed).toBe(false);
  });

  it('deve deletar tarefa', () => {
    const task = createTask('Teste válido');

    const result = deleteTask(task.id);

    expect(result).toBe(true);
    expect(getTasks().length).toBe(0);
  });
});