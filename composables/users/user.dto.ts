import { Exclude, Expose, Transform, Type } from "class-transformer";
export class UserBaseDto {
    @Expose({toClassOnly:true})
    first_name: string
    @Expose({toClassOnly:true})
    last_name: string;
    @Expose()
    get fullName(){
        return `${this.first_name} ${this.last_name}`
    }
    set fullName(value){}


}