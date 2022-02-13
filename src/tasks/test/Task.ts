import { CreateTaskDto } from "../dto/create-task.dto";
import { UpdateTaskDto } from "../dto/update-task.dto";
import { Task } from "../entities/task.entity";

export const mockUpdateTaskDto = (): UpdateTaskDto => ({
  name: 'anytitle',
  description: 'anydescription'
})

export const mockCreateTaskDto = (): CreateTaskDto => ({
    name: 'anytitle',
    description: 'anydescription',
    state: 1
})

export const mockTask = (): Task => ({
  id: '0C1A5EA8-23B0-4F3D-B2B0-191C3AA2C6B6',
  name: 'anytitle',
  description: 'anydescription',
  state: 1
})

export const mockTaskError = (): Task => undefined