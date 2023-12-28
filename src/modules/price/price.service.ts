import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Price } from './models';
import { AppError } from 'src/common/errors/errors';
import { PriceDTO } from './dto';

@Injectable()
export class PriceService {
  constructor(
    @InjectModel(Price) private readonly priceRepository: typeof Price,
  ) {}

  async findPriceByName(name: string) {
    return this.priceRepository.findOne({ where: { name } });
  }
  async findPriceById(id: string) {
    return this.priceRepository.findOne({ where: { id } });
  }

  async createPriceItem(dto: PriceDTO): Promise<PriceDTO> {
    try {
      const newPrice = { ...dto };
      const existPrice = await this.findPriceByName(newPrice.name);
      if (existPrice) throw new BadRequestException(AppError.PRICE_EXIST);
      if (!newPrice.name || !newPrice.cost) {
        throw new BadRequestException(AppError.COST_PRICE_EMPTY);
      }

      await this.priceRepository.create(newPrice);
      return newPrice;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(error);
    }
  }

  async getPrice(id: string): Promise<Price> {
    try {
      const price = await this.findPriceById(id);
      if (!price) throw new BadRequestException(AppError.PRICE_NOT_EXIST);
      return price;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(error);
    }
  }

  async getAllPrice(): Promise<Price[]> {
    try {
      const allPrice = await this.priceRepository.findAll();
      if (!allPrice) throw new BadRequestException(AppError.PRICE_IS_EMPTY);
      return allPrice;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(error);
    }
  }

  async updatePrice(id: string, dto: PriceDTO): Promise<PriceDTO> {
    const sequelize = this.priceRepository.sequelize;
    await sequelize.transaction(async (t) => {
      const checkPriceExist = await this.priceRepository.findOne({
        where: { id },
        transaction: t,
      });
      if (!checkPriceExist) {
        throw new BadRequestException(AppError.PRICE_NOT_EXIST);
      }
      const originalPrice = await this.priceRepository.findOne({
        where: { id },
        transaction: t,
      });
      await this.priceRepository.update(dto, { where: { id }, transaction: t });
      const existPrices = await this.priceRepository.findAll({
        where: { name: dto.name },
        transaction: t,
      });
      if (existPrices.length > 1) {
        throw new BadRequestException(AppError.PRICE_EXIST);
      }
    });
    return dto;
  }

  async deletePriceItem(id: string): Promise<boolean> {
    try {
      const existPrice = await this.findPriceById(id);
      if (!existPrice) throw new BadRequestException(AppError.PRICE_NOT_EXIST);
      await this.priceRepository.destroy({ where: { id } });
      return true;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(error);
    }
  }
}
