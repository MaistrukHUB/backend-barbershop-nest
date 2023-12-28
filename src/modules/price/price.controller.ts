import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PriceService } from './price.service';
import { Price } from './models';
import { ApiResponse } from '@nestjs/swagger';
import { JwtAdminGuard } from 'src/guards/role-guard';
import { PriceDTO } from './dto';

@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @ApiResponse({ status: 200, type: PriceDTO })
  @UseGuards(JwtAdminGuard)
  @Post('create')
  create(@Body() priceDTO: PriceDTO, @Req() request): Promise<PriceDTO> {
    const user = request.user;
    return this.priceService.createPriceItem(priceDTO);
  }

  @ApiResponse({ status: 200, type: Price })
  @Get('get/:id')
  getPrice(@Param('id') id: string) {
    return this.priceService.getPrice(id);
  }

  @ApiResponse({ status: 200, type: Price, isArray: true })
  @Get('getAllPrice')
  getAll(): Promise<Price[]> {
    return this.priceService.getAllPrice();
  }

  @ApiResponse({ status: 200, type: PriceDTO })
  @UseGuards(JwtAdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() priceDTO: PriceDTO,
  ): Promise<PriceDTO> {
    return this.priceService.updatePrice(id, priceDTO);
  }

  @ApiResponse({ status: 201, type: Boolean })
  @UseGuards(JwtAdminGuard)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<boolean> {
    return this.priceService.deletePriceItem(id);
  }
}
