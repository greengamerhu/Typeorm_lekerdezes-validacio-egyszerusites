import { Body, Controller, Get, NotFoundException, Param, Post, Query, Render } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { DataSource, EntityNotFoundError } from 'typeorm';
import Alkalmazott from './alkamazott.entity';
import { AppService } from './app.service';
import newAlkalmazott from './NewAlkalmazott.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }

  @Get('alkalmazott/search') 
  async searchAlakalmazott(@Query('email') email: string) {
    const alkalmazottRepo = this.dataSource.getRepository(Alkalmazott)
    const  [adat, darab] = await alkalmazottRepo.createQueryBuilder().
    where("hivatalosEmail LIKE :email", {email: '%' +  email + '%'}).
    getManyAndCount()

    return {
      alkalmazottak : adat,
      count : darab
    }
    // return await alkalmazottRepo.findOneByOrFail({hivatalosEmail : email})
  }
  @Get('/alkalmazott/bersav')
  async getBersav(@Query('min') min : number,  @Query('max') max : number) {
    const alkamazottRepo = this.dataSource.getRepository(Alkalmazott) 
    const  [adat, darab] = await alkamazottRepo.createQueryBuilder().
    where("haviBer >= :minn AND haviBer <= :maxx", {minn: min, maxx: max})
    .orderBy('haviBer').getManyAndCount()
    return {
      alkalmazottak : adat,
      count : darab
    }
  }

  @Get('/alkalmazott/:id') 
  async getAlkalmazott(@Param('id') id : number) {
    try {
      const alkamazottRepo = this.dataSource.getRepository(Alkalmazott) 
      return await alkamazottRepo.findOneByOrFail({id: id});
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException("Az alkalmazott nem létezik")
      } else {
        throw e;
      }
    }
  }
  @Post('/alkalmazott')
  async newAlkalmazott(@Body() alkalmazott : newAlkalmazott) {

  }
}
