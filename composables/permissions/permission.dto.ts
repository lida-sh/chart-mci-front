import { Expose } from "class-transformer"
export class PermissionDto {
    @Expose()
    name:string;
    @Expose()
    display_name: string
}