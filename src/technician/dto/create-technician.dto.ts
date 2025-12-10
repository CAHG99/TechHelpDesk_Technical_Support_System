import { IsString, MaxLength, MinLength, IsBoolean } from "class-validator";

export class CreateTechnicianDto {
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  specialty: string;

  @IsBoolean()
  availability: boolean;
}
