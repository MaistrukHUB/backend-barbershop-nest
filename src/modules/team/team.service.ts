import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Team } from './models';
import { TeamDTO } from './dto';
import { AppError } from 'src/common/errors/errors';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team) private readonly teamRepository: typeof Team,
  ) {}

  async findTeammateByEmail(name: string) {
    return this.teamRepository.findOne({ where: { name } });
  }
  async findTeammateById(id: string) {
    return this.teamRepository.findOne({ where: { id } });
  }

  async createTeammate(dto: TeamDTO): Promise<TeamDTO> {
    try {
      const newTeammate = { ...dto };
      const existTeammate = await this.findTeammateByEmail(newTeammate.name);
      if (existTeammate) throw new BadRequestException(AppError.TEAMMATE_EXIST);
      await this.teamRepository.create(newTeammate);
      return dto;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(error);
    }
  }

  async deleteTeammate(id: string): Promise<boolean> {
    try {
      const existTeammate = await this.findTeammateById(id);
      if (!existTeammate)
        throw new BadRequestException(AppError.TEAMMATE_ID_NOT_EXIST);
      await this.teamRepository.destroy({ where: { id } });
      return true;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(error);
    }
  }

  async getAllTeammates(): Promise<Team[]> {
    try {
      const allTeam = await this.teamRepository.findAll();
      if (!allTeam) throw new BadRequestException(AppError.TEAMMATE_NOT_EXIST);
      return allTeam;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(error);
    }
  }

  async getTeammate(id: string): Promise<Team> {
    try {
      const teammate = await this.findTeammateById(id);
      if (!teammate)
        throw new BadRequestException(AppError.TEAMMATE_ID_NOT_EXIST);
      return teammate;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(error);
    }
  }

  async updateTeammate(id: string, dto: TeamDTO): Promise<Team> {
    const sequelize = this.teamRepository.sequelize;
    await sequelize.transaction(async t => {
      const checkTeammateExist = await this.teamRepository.findOne({
        where: { id },
        transaction: t,
      });
      if (!checkTeammateExist) {
        throw new BadRequestException(AppError.TEAMMATE_ID_NOT_EXIST);
      }
      const { dataStart, ...updateFields } = dto;
      const originalTeammate = await this.teamRepository.findOne({
        where: { id },
        transaction: t,
      });
      await this.teamRepository.update(updateFields, { where: { id }, transaction: t });
      const existTeammate = await this.teamRepository.findAll({
        where: { name: dto.name },
        transaction: t,
      });
      if (existTeammate.length > 1) {
        throw new BadRequestException(AppError.PRODUCT_EXIST);
      }
      return checkTeammateExist;
    });
    return ;
  }
  
}
