import { Inject, Injectable } from "@nestjs/common";
import { Task } from "./entities/task.entity";

@Injectable()
export class TaskService {
    constructor(
        @Inject('MYSQL_CONNECTION') private readonly mysqlConnection: any,
        @Inject('PG_CONNECTION') private readonly pgConnection: any,
    ) { }
    public async task(): Promise<Task[]> {

        const query = 'SELECT * FROM task ORDER BY name ASC';

        const [rows] = await this.mysqlConnection.query(query);
        console.log(rows);
        //postgreSQL
        // const res = await this.pgConnection.query(query);
        // return res.rows as Task[];

        return rows as Task[];
    }

    public create(task: any): string {
        return task;
    }

    public update(id: number, task: any): string {
        return `tarea actualizada con id: ${id} y datos: ${task}`;
    }
    public delete(id: number): string {
        return `tarea eliminada con id: ${id}`;
    }
    public findById(id: number): string {
        return `tarea encontrada por id: ${id}`;
    }
} 