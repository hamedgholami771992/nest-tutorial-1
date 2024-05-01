import { Type } from 'class-transformer'
import { IsOptional, IsPositive } from 'class-validator'

export class PaginationQueryDto {
    @IsOptional()
    @IsPositive()
    // @Type(() => Number)   //to convert string to number by setting transform: true on validationPipe config
    limit: number

    @IsOptional()
    @IsPositive()
    // @Type(() => Number)
    offset: number
}
