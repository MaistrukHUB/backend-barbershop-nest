import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
  Delete,
  Post
} from '@nestjs/common';
import { TeamService } from './team.service';
import { ApiResponse } from '@nestjs/swagger';
import { JwtAdminGuard } from 'src/guards/role-guard';
import { Team } from './models';
import { TeamDTO } from './dto';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @ApiResponse({ status: 200, type: Team, isArray: true })
  @Get('get-all')
  getAll(): Promise<Team[]> {
    return this.teamService.getAllTeammates();
  }

  @ApiResponse({ status: 200, type: Team })
  @Get('get/:id')
  getProduct(@Param('id') id: string) {
    return this.teamService.getTeammate(id);
  }

  @ApiResponse({ status: 200, type: TeamDTO })
  @UseGuards(JwtAdminGuard)
  @Post('create')
  create(@Body() productDTO: TeamDTO, @Req() request): Promise<TeamDTO> {
    const user = request.user;
    console.log(user);
    return this.teamService.createTeammate(productDTO);
  }

  @ApiResponse({ status: 201, type: Boolean })
  @UseGuards(JwtAdminGuard)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<boolean> {
    return this.teamService.deleteTeammate(id);
  }

  @ApiResponse({ status: 200, type: TeamDTO })
  @UseGuards(JwtAdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() teamDTO: TeamDTO): Promise<Team> {
    return this.teamService.updateTeammate(id, teamDTO);
  }
}
