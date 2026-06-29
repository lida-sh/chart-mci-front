import {
  ArchitectureBaseDto,
  ArchitectureClientBaseDto,
} from "../architectures/architecture.dto";
import { FileDto } from "../file.dto";
import { Exclude, Expose, Transform, Type } from "class-transformer";
import {
  DirectorateBaseDto,
  DirectorateBaseClientDto,
} from "~/composables/directorates/directorate.dto";
import { UserBaseDto } from "../users/user.dto";
export class DepartmentBaseDto {
  @Expose()
  id: number;
  @Expose()
  title: string;
  @Expose()
  architecture_id: number;
  @Expose()
  directorate_id: number;
}

export class DepartmentDto extends DepartmentBaseDto {
  @Expose()
  slug: string;
  @Expose()
  @Type(() => FileDto)
  files: FileDto[];
  @Expose()
  status: number;
  @Expose()
  description: string;
  @Expose()
  occupied: string;
  @Expose()
  evaluated_expert_positions_count: string;
  @Expose()
  old_permanent_experts_count: string;
  @Expose()
  old_contracting_experts_count: string;
  @Expose()
  old_below_expert_count: string;
  @Expose()
  created_at: string;
  @Expose()
  @Type(() => ArchitectureBaseDto)
  architecture: ArchitectureBaseDto;
  @Expose()
  @Type(() => DirectorateBaseDto)
  directorate: DirectorateBaseDto;
  @Expose()
    @Type(() => UserBaseDto)
    user: UserBaseDto;
}
export class DepartmentClientDto {
  @Expose()
  title: string;
  @Expose()
  slug: string;
  @Expose()
  code: string;
  @Expose()
  type: string;
  @Expose()
  created_at: string;
  @Expose()
  @Type(() => ArchitectureClientBaseDto)
  architecture: ArchitectureClientBaseDto;
  @Expose()
  @Type(() => DirectorateBaseClientDto)
  directorate: DirectorateBaseClientDto;
  @Expose()
  rowNumber?: number;
  @Expose()
  @Transform(({ value }) => {
    return String(value);
  })
  notification_date:string;
}
export class DepartmentDetailsClientDto extends DepartmentClientDto {
  @Expose()
  @Type(() => FileDto)
  files: FileDto[];
  @Expose()
  description: string;
}
export class DepartmentDtoPagination {
  @Expose()
  @Type(() => DepartmentDto)
  departments: DepartmentDto[];
  @Expose()
  links: LinksDto;
  @Expose()
  meta: MetaDto;
}
export class DepartmentClientDtoPagination {
  @Expose()
  @Type(() => DepartmentClientDto)
  departmentes: DepartmentClientDto[];
  @Expose()
  links: LinksDto;
  @Expose()
  meta: MetaDto;
}
export class LinksDto {
  @Expose()
  first: string;
  @Expose()
  last: string;
  @Expose()
  prev: string;
  @Expose()
  next: string;
}
export class MetaDto {
  @Expose()
  current_page: number;
  @Expose()
  last_page: number;
  @Expose()
  path: string;
  @Expose()
  per_page: number;
  @Expose()
  total: number;
}
export class DepartmentTreeStructDto {
  @Expose()
  title: string;
  @Expose()
  slug: string;
  @Expose()
  positions: number;
}
