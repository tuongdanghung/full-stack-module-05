import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  UseGuards,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { ColorServices } from './color.service';
import { ColorDTO } from './dto/color.dto';
import { IsColorInterface } from './interface/color.interface';
import { GlobalInterface } from '../../shared/interface/global.interface';
dotenv.config();
@Controller(`${process.env.API_KEY}/colors`)
export class ColorController {
  constructor(private readonly colorService: ColorServices) {}
  @Get()
  async getAllRoles(
    @Query('color') color: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ): Promise<{ data: IsColorInterface[]; currentPage: number }> {
    if (!page && !limit) {
      page = 1;
      limit = 5;
    }
    return this.colorService.getAllColors(color, page, limit);
  }
  // get all color

  @Get('/:id')
  getDetailRole(@Param('id') id: number): Promise<IsColorInterface> {
    return this.colorService.getOneColor(id);
  }
  // get one color

  @Post()
  createRole(@Body() colorDTO: ColorDTO): Promise<GlobalInterface> {
    return this.colorService.createColor(colorDTO);
  }
  // create color

  @Put('/:id')
  updateRole(
    @Body() colorDTO: ColorDTO,
    @Param('id') id: number,
  ): Promise<GlobalInterface> {
    return this.colorService.updateColor(colorDTO, id);
  }
  // update color

  @Delete('/:id')
  deleteRole(@Param('id') id: number): Promise<GlobalInterface> {
    return this.colorService.deleteColor(id);
  }
  // delete color
}
