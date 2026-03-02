import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class updateTaskDto  {

      @IsString()
      @IsOptional()
      @MinLength(3)
      @MaxLength(50)
      name: string;
    
      @IsString()
       @IsOptional()
      @MinLength(3)
      @MaxLength(200)
      description: string;
    
       @IsOptional()
      @IsBoolean()
      priority: boolean;
}