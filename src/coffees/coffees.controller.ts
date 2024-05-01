import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, Query, Res, SetMetadata, UsePipes, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto.ts/pagination-query.dto';
import { Public } from 'src/common/decorators/public.decorator';

// @UsePipes(ValidationPipe)
// @UsePipes(new ValidationPipe({})) //if we need to pass config option for this controller validation, we have to instantiate the class
@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeeService: CoffeesService){

    }



    @Public()
    @Get()
    findAll(
        // @Res() response: Response, 
        @Query() paginationQuery: PaginationQueryDto
    ){
        const {limit, offset} = paginationQuery 
        // return `this action returns all coffees`
        // response.status(200).json({msg: "great", limit, offset})
        return this.coffeeService.findAll(paginationQuery)
    }


    //@UsePipes(ValidationPipe)    only applied to this route
    @Get(":id")
    findOne(@Param("id") id: number){
        // throw `A random error`  ==> catched by exception handling layer of nest.js 
        console.log(typeof id)
        const coffee = this.coffeeService.findOne(id.toString())
        if(!coffee){
            // throw new HttpException(`coffee #${id} not found`, HttpStatus.NOT_FOUND)
            throw new NotFoundException(`coffee #${id} not found`)
        }
        return coffee
    }


    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createCoffeeDto: CreateCoffeeDto){
        console.log(createCoffeeDto instanceof CreateCoffeeDto)
        return this.coffeeService.create(createCoffeeDto)
    }


    @Patch(":id")
    //by passing validationPipe to @Body() or any param decorator we apply validation to that only
    //so in this case param("id") wont be affected
    update(@Param("id") id: string, @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto){  
        console.log(updateCoffeeDto instanceof UpdateCoffeeDto)
        return this.coffeeService.update(id, updateCoffeeDto)
    }


    @Delete(":id")
    remove(@Param("id") id: string){
        return this.coffeeService.remove(id)
    }

}
