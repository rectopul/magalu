import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { UserByToken } from 'src/session/auth';
import { JsonWebToken } from 'src/modules/JsonWebToken';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, UserByToken, JsonWebToken, PrismaService]
})
export class ProductsModule {}
