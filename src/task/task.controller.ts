import { Body, Controller, Delete, Get, HttpException, Param, Post, Put } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/CreateTaskDto";
import { promises } from "dns";
import { Task } from "./entities/task.entity";
import { updateTaskDto } from "./dto/updateTaskDto";


@Controller("api/task")
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Get()
    public async list(): Promise<Task[]> {
        const result = await this.taskService.task();
        if (!result) {
            throw new Error("No tasks found");
        }
        return result as Task[];
    }

    @Post("create")
    public async create(@Body() task: CreateTaskDto): Promise<string> {
        const result = await this.taskService.create(task);
        if (!result) {
            throw new Error("Failed to create task");
        }
        return result;
    }

   
    @Delete("delete/:id")
    public async delete(@Param("id") id:number): Promise<any> {
       const result = await this.taskService.delete(id);
       if (!result) {
        throw new HttpException(`Failed to delete task with id ${id}`, 404);
       }    
         return result ;
    }

    @Put("update/:id")
    public  async update(@Param("id") id:number, @Body() task:updateTaskDto): Promise<string> {
        const result = await this.taskService.update(id, task);
        if (!result) {
            throw new HttpException(`Failed to update task with id ${id}`, 404);
        }   
        return result;
        
    }   
          
    @Get(":id")
    public async findById(@Param("id") id:String): Promise<Task> {
        const result = await this.taskService.findById(Number(id));
        if (!result) {
            throw new HttpException(`Task with id ${id} not found`, 404);
        }
        return result;
    
    }

    
}   