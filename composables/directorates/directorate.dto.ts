import { ArchitectureBaseDto, ArchitectureClientBaseDto } from "../architectures/architecture.dto";
import { FileDto,} from "../file.dto";
import { Exclude, Expose, Transform, Type } from "class-transformer";
import { DepartmentTreeStructDto } from "../departments/department.dto";
import {UserBaseDto} from "../users/user.dto"
export class DirectorateBaseDto {
  @Expose()
  id: number;
  @Expose()
  title: string;
  @Expose()
  occupied: number;
  @Expose()
  architecture_id: number;
}

export class DirectorateDto extends DirectorateBaseDto {
  @Expose()
  slug: string;
  @Expose()
  @Type(()=>FileDto)
  files: FileDto[];
  @Expose()
  status: number;
  @Expose()
  office_manager_count: string;
  @Expose()
  description: string;
  @Expose()
  created_at: string;
  @Expose()
  @Type(()=>ArchitectureBaseDto)
  architecture: ArchitectureBaseDto
  @Expose()
  @Type(() => UserBaseDto)
  user: UserBaseDto;
}
export class DirectorateBaseClientDto {
  @Expose()
  title: string;
}
export class DirectorateClientDto extends DirectorateBaseClientDto {
  @Expose()
  type: string;
  @Expose()
  slug: string;
  @Expose()
  occupied: number;
  @Expose()
  created_at: string;
  @Expose()
  @Type(()=>ArchitectureClientBaseDto)
  architecture: ArchitectureClientBaseDto
  @Expose()
  rowNumber?: number
  @Expose()
  @Transform(({ value }) => {
    return String(value);
  })
  notification_date:string;
}
export class DirectorateDetailsClientDto extends DirectorateClientDto {
  @Expose()
  @Type(()=>FileDto)
  files: FileDto[];
  @Expose()
  description: string;
}
export class DirectorateDtoPagination {
  @Expose()
  @Type(()=>DirectorateDetailAdminDto)
  directorates: DirectorateDetailAdminDto[];
  @Expose()
  links: LinksDto;
  @Expose()
  meta: MetaDto
  
}
export class DirectorateClientDtoPagination {
  @Expose()
  @Type(()=>DirectorateClientDto)
  directorates: DirectorateClientDto[];
  @Expose()
  links: LinksDto;
  @Expose()
  meta: MetaDto
  
}
export class LinksDto{
  @Expose()
  first:string;
  @Expose()
  last:string;
  @Expose()
  prev:string;
  @Expose()
  next:string;
}
export class MetaDto{
  @Expose()
  current_page:number;
  @Expose()
  last_page	: number;
  @Expose()
  path: string;
  @Expose()
  per_page: number;
  @Expose()
  total:number
}
export class DirectorateTreeStructDto{
  @Expose()
  title: string;
  @Expose()
  occupied: string;
  @Expose()
  office_manager_count: number;
  @Expose()
  slug: string;
  @Expose()
  @Type(() => DepartmentTreeStructDto)
  @Transform(({value, obj})=>{
       let positions = 0
       let experts_count = 0
       let departments_count = 0
       const departments = value.map((department)=>{
        positions += department.positions
        departments_count += 1
        experts_count += (Number(department.positions) - 1)
           return {
               ...department, 
           }
       })
       obj.positions = positions + obj.office_manager_count + 1
       obj.departments_count = departments_count
       obj.experts_count = experts_count + obj.office_manager_count
       return departments
       
    },{toClassOnly:true})
  departments: DepartmentTreeStructDto[];
  @Expose()
  positions: number
  @Expose()
  departments_count: number
  @Expose()
  experts_count: number
}
export class DirectorateDetailAdminDto{
  @Expose()
  id: number;
  @Expose()
  title: string;
  @Expose()
  occupied: string;
  @Expose()
  slug: string;
  @Expose()
  @Type(() => DepartmentTreeStructDto)
  @Transform(({value, obj})=>{
       let positions = 0
       let experts_count = 0
       let departments_count = 0
       const departments = value.map((department)=>{
        positions += department.positions
        departments_count += 1
        experts_count += (Number(department.positions) - 1)
           return {
               ...department, 
           }
       })
       obj.positions = positions + obj.office_manager_count + 1
       obj.departments_count = departments_count
       obj.experts_count = experts_count + obj.office_manager_count
       return departments
       
    },{toClassOnly:true})
  departments: DepartmentTreeStructDto[];
  @Expose()
  positions: number
  @Expose()
  departments_count: number
  @Expose()
  experts_count: number
  @Expose()
  @Type(() => UserBaseDto)
  user: UserBaseDto;
  @Expose()
  status: number;
  @Expose()
  office_manager_count: string;
  @Expose()
  @Type(()=>ArchitectureBaseDto)
  architecture: ArchitectureBaseDto
}