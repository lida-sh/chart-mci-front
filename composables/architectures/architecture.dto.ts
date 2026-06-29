import { Expose, Transform, Type } from "class-transformer";
import "reflect-metadata";
import { FileDto } from "../file.dto";
import type { InferType } from "yup";
import { DirectorateTreeStructDto } from "../directorates/directorate.dto";
import { DepartmentTreeStructDto } from "../departments/department.dto";
import {UserBaseDto} from "../users/user.dto"
export class ArchitectureBaseDto {
  @Expose()
  id: number;
  @Expose()
  title: string;
  @Expose()
  get displayTitle() {
    if (this.type === "deputy") {
      return "معاونت " + this.title;
    } else if (this.type === "directorate") {
      return "اداره کل " + this.title;
    }
  }
  set displayTitle(value) {}
  @Expose()
  type: string;
  
}
export class ArchitectureClientBaseDto {
  @Expose()
  title: string;
  @Expose({toClassOnly:true})
  get displayTitle() {
    if (this.type === "assistance") {
      return "معاونت " + this.title;
    } else if (this.type === "administration") {
      return "اداره کل " + this.title;
    }
  }
  set displayTitle(value) {}
  @Expose()
  type: string;
}
export class ArchitectureDto extends ArchitectureBaseDto {
  @Expose()
  slug: string;
  @Expose()
  status: string;
  @Expose()
  @Type(() => FileDto)
  files: FileDto[];
  @Expose()
  description: string;
  @Expose()
  @Type(() => UserBaseDto)
  user: UserBaseDto;
  @Expose()
  office_manager_count: string;
  @Expose()
  old_positions_count: string;
  @Expose()
  old_expert_positions_count: string;
  @Expose()
  old_directorates_count: string;
  @Expose()
  old_departments_count: string;
}
export class ArchitectureDetailsDtoPagination {
  @Expose()
  @Type(() => ArchitectureTreeStructDto2)
  architectures: ArchitectureTreeStructDto2[];
  @Expose()
  links: LinksDto;
  @Expose()
  meta: MetaDto;
}
export class ArchitectureDtoPagination {
  @Expose()
  @Type(() => ArchitectureDto)
  architectures: ArchitectureDto[];
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

export class ArchitectureTreeStructDto extends ArchitectureBaseDto {
  @Expose()
  old_positions_count: string
  @Expose()
  old_expert_positions_count: string
  @Expose()
  old_directorates_count: string
  @Expose()
  old_departments_count: string
  @Expose()
  office_manager_count: number
  @Expose()
  @Type(() => DirectorateTreeStructDto)
  @Transform(({value, obj})=>{
         let positions = 0
         let departments_count = 0
         let directorate_count = 0
         let experts_count = 0
         const directorates = value.map((directorate)=>{
          directorate_count += 1
          positions += directorate.positions
          experts_count += directorate.experts_count
          departments_count += directorate.departments_count
             return {
                 ...directorate, 
             }
         })
         obj.positions = positions + Number(obj.office_manager_count) + 1
         obj.departments_count = departments_count
         obj.directorate_count = (obj.type == "deputy") ? directorate_count : directorate_count + 1
         obj.experts_count = experts_count + obj.office_manager_count
         return directorates;
         
      },{toClassOnly:true})
  directorates: DirectorateTreeStructDto[];
  @Expose()
  @Type(() => DepartmentTreeStructDto)
  @Transform(({value, obj})=>{
         let positions = 0
         let departments_count = 0
         let experts_count = 0
         const rootDepartments = value.map((rootDepartment)=>{
          positions += rootDepartment.positions
          experts_count += (rootDepartment.positions-1)
          departments_count += 1
             return {
                 ...rootDepartment, 
             }
         })
         obj.positions_root = positions
         obj.departments_root_count = departments_count
         obj.experts_root_count = experts_count
         return rootDepartments;
         
      },{toClassOnly:true})
  rootDepartments: DepartmentTreeStructDto[];
  @Expose()
  positions: number
  @Expose()
  departments_count: number
  @Expose()
  directorate_count: number
  @Expose()
  experts_count: number
  @Expose()
  positions_root: number
  @Expose()
  departments_root_count: number
  @Expose()
  experts_root_count: number
  @Expose()
  @Type(() => SeniorExpertTreeStructDto)
  @Transform(({value, obj})=>{
         let senior_expert_positions = 0
         const senior_experts = value.map((senior_expert)=>{
          
          senior_expert_positions += senior_expert.positions_count
             return {
                 ...senior_expert, 
             }
         })
         obj.senior_expert_positions = senior_expert_positions
         return senior_experts;
         
      },{toClassOnly:true})
  senior_experts:SeniorExpertTreeStructDto[] 
  @Expose()
  senior_expert_positions: number
  
}
export class SeniorExpertTreeStructDto{
  @Expose()
  title: string
  @Expose()
  positions_count: number
 
}
export class ArchitectureTreeStructDto2 extends ArchitectureBaseDto {
  @Expose()
  old_positions_count: string
  @Expose()
  @Type(() => UserBaseDto)
  user: UserBaseDto;
  @Expose()
  old_expert_positions_count: string
  @Expose()
  old_directorates_count: string
  @Expose()
  old_departments_count: string
  @Expose()
  office_manager_count: string
  @Expose()
  @Type(() => DirectorateTreeStructDto)
  @Transform(({value, obj})=>{
         let positions = 0
         let departments_count = 0
         let directorate_count = 0
         let experts_count = 0
         const directorates = value.map((directorate)=>{
          directorate_count += 1
          positions += directorate.positions
          experts_count += directorate.experts_count
          departments_count += directorate.departments_count
             return {
                 ...directorate, 
             }
         })
         obj.positions = positions + Number(obj.office_manager_count) + 1
         obj.departments_count = departments_count
        //  obj.directorate_count = directorate_count
         obj.directorate_count = (obj.type == "deputy") ? directorate_count : directorate_count + 1
         obj.experts_count = experts_count + 1
         return directorates;
         
      },{toClassOnly:true})
  directorates: DirectorateTreeStructDto[];
  @Expose()
  @Type(() => DepartmentTreeStructDto)
  @Transform(({value, obj})=>{
         let positions = 0
         let departments_count = 0
         let experts_count = 0
         const rootDepartments = value.map((rootDepartment)=>{
          positions += rootDepartment.positions
          experts_count += (rootDepartment.positions-1)
          departments_count += 1
             return {
                 ...rootDepartment, 
             }
         })
         obj.positions_root = positions
         obj.departments_root_count = departments_count
         obj.experts_root_count = experts_count
         return rootDepartments;
         
      },{toClassOnly:true})
  rootDepartments: DepartmentTreeStructDto[];
  @Expose()
  positions: number
  @Expose()
  departments_count: number
  @Expose()
  directorate_count: number
  @Expose()
  experts_count: number
  @Expose()
  positions_root: number
  @Expose()
  departments_root_count: number
  @Expose()
  experts_root_count: number
  @Expose()
  @Type(() => SeniorExpertTreeStructDto)
  @Transform(({value, obj})=>{
         let senior_expert_positions = 0
         const senior_experts = value.map((senior_expert)=>{
          
          senior_expert_positions += senior_expert.positions_count
             return {
                 ...senior_expert, 
             }
         })
         obj.senior_expert_positions = senior_expert_positions
         return senior_experts;
         
      },{toClassOnly:true})
  senior_experts:SeniorExpertTreeStructDto[] 
  @Expose()
  senior_expert_positions: number
  @Expose()
  status: number
  @Expose()
  slug: string
  
}
export class ArchitectureTreeStructBaseDto extends ArchitectureBaseDto{
   @Expose()
   slug: string
}
export class TopChartDto {
  @Expose()
  @Type(() => ArchitectureTreeStructBaseDto)
  deputy_architectures: ArchitectureTreeStructBaseDto[]
  @Expose()
  @Type(() => ArchitectureTreeStructBaseDto)
  directorate_architectures: ArchitectureTreeStructBaseDto[]

}

