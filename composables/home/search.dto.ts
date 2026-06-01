import { Expose, Transform, Type } from "class-transformer";
import { ProcessClientDto } from "../processes/process.dto";
import { SubProcessClientDto } from "../sub-processes/subProcess.dto";
import { ProcedureClientDto } from "../procetures/procedure.dto";

export class resultSearchDtoPagination {
  @Expose()
  @Transform(({value})=>{
    let i=0
    const processes = value.processes.map((process)=>{
      i++
      return {...process, rowNumber: i}
    })
    const subProcesses = value.subProcesses.map((subProcess)=>{
      i++
      return {...subProcess, rowNumber: i}
    })
    const procedures = value.procedures.map((procedure)=>{
      i++
      return {...procedure, rowNumber: i}
    })
    return {processes, subProcesses, procedures}
  })
  data: DataDto
  @Expose()
  links: LinksDto;
  @Expose()
  meta: MetaDto;
}
export class DataDto{
  @Expose()
  @Type(() => ProcessClientDto)
  processes?: ProcessClientDto[];
  @Expose()
  @Type(() => SubProcessClientDto)
  subProcesses?: SubProcessClientDto[];
  @Expose()
  @Type(() => ProcedureClientDto)
  procedures?: ProcedureClientDto[];
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
