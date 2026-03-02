import { Inject, Injectable } from "@nestjs/common";
import { Task } from "./entities/task.entity";
import { CreateTaskDto } from "./dto/CreateTaskDto";
import { updateTaskDto } from "./dto/updateTaskDto";

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

    public async create(task: CreateTaskDto): Promise<string> {
        const query = 'INSERT INTO task (name, description, priority, user_id) VALUES (?, ?, ?, ?)';
        const [result] = await this.mysqlConnection.query(query, [task.name, task.description, task.priority,task.userId]);
        return 'Created task: ' + task.name;
    }

    public async update(id: number, task: updateTaskDto): Promise<string> {
        const query = 'UPDATE task SET name = ?, description = ?, priority = ? WHERE id = ?';
        const result = await this.mysqlConnection.query(query, [task.name, task.description, task.priority, id]);
        return 'Updated task complete';
    }


    public async delete(id: number): Promise<Boolean> {
        const query = 'DELETE FROM task WHERE id = ?';
        const [result] = await this.mysqlConnection.query(query, [id]);
        return result.affectedRows > 0;
    }


    public async findById(id: number): Promise<Task> {
        const query = 'SELECT * FROM task WHERE id = ?';
        console.log(query);
        const [rows] = await this.mysqlConnection.query(query, [id]);

        return rows[0] as Task;
    }
} 