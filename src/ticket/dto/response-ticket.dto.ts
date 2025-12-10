import { Expose, Transform } from "class-transformer";

export class ResponseTicketDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  status: string;

  @Expose()
  priority: string;

  @Expose()
  @Transform(({ obj }) => obj.category?.name)
  category: string;

  @Expose()
  @Transform(({ obj }) => obj.customer?.name)
  customer: string;

  @Expose()
  @Transform(({ obj }) => obj.technician?.name)
  technician: string;

  @Expose()
  @Transform(({ obj }) => obj.client?.company)
  client: string;

  @Expose()
  @Transform(({ obj }) => obj.technicianExternal?.name)
  technicianExternal: string;

  @Expose()
  @Transform(({ value }) =>
    value ? new Date(value).toLocaleDateString("es-CO") : null,
  )
  createdAt: string;

  @Expose()
  @Transform(({ value }) =>
    value ? new Date(value).toLocaleDateString("es-CO") : null,
  )
  updatedAt: string;
}
