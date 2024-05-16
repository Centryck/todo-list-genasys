import React, {useEffect, useState} from 'react';
import { GetAllTodoTasksUseCase } from '../../use-case/get-all-todo-tasks/get-all-todo-tasks';
import { TodoTaskRepositoryImpl } from '../../data/repository/todo-task-repository-impl';
import { TodoTask } from '../../domain/entity/todo-task';

const todoTaskRepositoryImpl = new TodoTaskRepositoryImpl
const getTodoTasksUseCase = new GetAllTodoTasksUseCase(todoTaskRepositoryImpl)

interface UseGetTodoTasksReturn {
  tasks: TodoTask[],
  isLoading: boolean,
  error?: string
}

export const useGetTodoTasks = (): UseGetTodoTasksReturn => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | undefined>(undefined)
  const [tasks, setTasks] = useState<TodoTask[]>([])

  useEffect(() => {
    const getTodoTasks = async () => {
      getTodoTasksUseCase.execute().then((todoTasks) => {
        setTasks(todoTasks)
      }).catch(err => {
        setError('Error on getTodoTasks')
      }).finally(() => {
        setIsLoading(false)
      })
    }
    getTodoTasks()
  })
  
  return {
    tasks,
    isLoading,
    error,
  }
}