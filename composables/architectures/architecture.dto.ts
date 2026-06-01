import { Expose, Transform, Type } from "class-transformer";
import "reflect-metadata";
import { FileDto } from "../file.dto";
import type { InferType } from "yup";
import { ProcessTreeStructDto } from "../processes/process.dto";
import {UserBaseDto} from "../users/user.dto"
export class ArchitectureBaseDto {
  @Expose()
  id: number;
  @Expose()
  title: string;
  @Expose()
  get displayTitle() {
    if (this.type === "assistance") {
      return "معاونت " + this.title;
    } else if (this.type === "administration") {
      return "اداره کل " + this.title;
    }
  }
  set displayTitle(value) {}
  @Expose()
  code: string;
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
  // @Expose()
  // created_at: string;
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
  @Type(() => ProcessTreeStructDto)
  processes: ProcessTreeStructDto[];
}
