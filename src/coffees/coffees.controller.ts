import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';


@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeeService: CoffeesService){

    }

    @Get()
    findAll(
        // @Res() response: Response, 
        @Query() paginationQuery){
        const {limit, offset} = paginationQuery 
        // return `this action returns all coffees`
        // response.status(200).json({msg: "great", limit, offset})
        return this.coffeeService.findAll()
    }


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
    update(@Param("id") id: string, @Body() updateCoffeeDto: UpdateCoffeeDto){
        console.log(updateCoffeeDto instanceof UpdateCoffeeDto)
        return this.coffeeService.update(id, updateCoffeeDto)
    }


    @Delete(":id")
    remove(@Param("id") id: string){
        return this.coffeeService.remove(id)
    }

}
