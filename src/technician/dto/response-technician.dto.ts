import { Expose } from 'class-transformer';

export class ResponseTechnicianDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  specialty: string;

  @Expose()
  availability: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
