import { Expose } from 'class-transformer';

export class ResponseClientDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  company: string;

  @Expose()
  contactEmail: string;

  @Expose()
  isActive: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
