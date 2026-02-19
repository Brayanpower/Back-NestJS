import { IsBoolean, IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(200)
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  priority: boolean;
  
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}