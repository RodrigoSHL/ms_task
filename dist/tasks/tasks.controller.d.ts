import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    getAll(): Promise<Task[]>;
    create(createTaskDto: CreateTaskDto): Promise<Task>;
    findOne(id: string): Promise<Task>;
    update(id: string, updateTaskDto: UpdateTaskDto): string;
    remove(id: string): string;
}
