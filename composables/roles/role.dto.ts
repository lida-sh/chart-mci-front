import { Expose, Type } from "class-transformer";
import {PermissionDto} from "~/composables/permissions/permission.dto"
export class RoleBaseDto {
  @Expose()
  name: string;
  @Expose()
  display_name: string;
}
export class RoleAndPermissions {
  @Expose()
  @Type(() => RoleBaseDto)
  roles: RoleBaseDto[];
  @Expose()
  @Type(() => PermissionDto)
  permissions: PermissionDto[];
}
