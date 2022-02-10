import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository : Repository<Task>
  ) {}

  async getAll() : Promise<Task[]> {
    const found = await this.taskRepository.find();
    if(!found){
      throw new NotFoundException(`Not tasks found`);
    }
    return found;
  }

  async create(createTaskDto: CreateTaskDto) : Promise<Task> {
    const {name, description, state} = createTaskDto;

    const client = this.taskRepository.create({
      name,
      description,
      state
    })

    const response = await this.taskRepository.save(client)
    return response;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
