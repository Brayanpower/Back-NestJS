import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/CreateTaskDto";


@Controller("api/task")
export class TaskController {
    constructor(private taskService: TaskService) {}
    @Get()
    public list(): string {
        return this.taskService.task();
    }

    @Post("create")
    public create(@Body() task: CreateTaskDto): string {
        console.log(task);
        return this.taskService.create(task);
    }

   
    @Delete("delete/:id")
    public delete(id:number): string {
        return this.taskService.delete(id);
    }

    @Put("update/:id")
    public update(@Param("id") id:number, @Body() task:any): string {
        console.log(task);
        return this.taskService.update(task, id);
    }   
          
    @Get(":id")
    public findById(@Param("id") id:String): string {
        return this.taskService.findById(Number(id));
    }

    
}   