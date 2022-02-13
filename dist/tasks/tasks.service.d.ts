import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
export declare class TasksService {
    private taskRepository;
    constructor(taskRepository: Repository<Task>);
    getAll(): Promise<Task[]>;
    create(createTaskDto: CreateTaskDto): Promise<Task>;
    findById(id: string): Promise<Task>;
    update(id: number, updateTaskDto: UpdateTaskDto): string;
    remove(id: number): string;
}
