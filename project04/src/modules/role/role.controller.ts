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
import { RoleServices } from './role.service';
import { RoleDTO } from './dto/role.dto';
import { IsRoleInterface } from './interface/role.interface';
import { GlobalInterface } from '../../shared/interface/global.interface';
import { CheckAuthenGuard } from 'src/shared/guards/auth.guard';
import { CheckAuthorGuard } from 'src/shared/guards/verify_role.guard';
dotenv.config();
@Controller(`${process.env.API_KEY}/roles`)
@UseGuards(CheckAuthenGuard)
@UseGuards(CheckAuthorGuard)
export class RoleController {
  constructor(private readonly roleService: RoleServices) {}
  @Get()
  async getAllRoles(
    @Query('code') code: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ): Promise<{ data: IsRoleInterface[]; currentPage: number }> {
    if (!page && !limit) {
      page = 1;
      limit = 5;
    }
    return this.roleService.getAllRoles(code, page, limit);
  }
  // get all role

  @Get('/:id')
  getDetailRole(@Param('id') id: number): Promise<IsRoleInterface> {
    return this.roleService.getOneRole(id);
  }
  // get one role

  @Post()
  createRole(@Body() roleDTO: RoleDTO): Promise<GlobalInterface> {
    return this.roleService.createRole(roleDTO);
  }
  // create role

  @Put('/:id')
  updateRole(
    @Body() roleDTO: RoleDTO,
    @Param('id') id: number,
  ): Promise<GlobalInterface> {
    return this.roleService.updateRole(roleDTO, id);
  }
  // update role

  @Delete('/:id')
  deleteRole(@Param('id') id: number): Promise<GlobalInterface> {
    return this.roleService.deleteRole(id);
  }
  // delete role
}
