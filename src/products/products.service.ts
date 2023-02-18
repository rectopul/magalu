import { Injectable } from '@nestjs/common';
import { Products } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UserByToken } from 'src/session/auth';
import { Attributes, CreateProductAttributesDto, CreateProductDto, productImages } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService, private readonly auth: UserByToken){}
  async create(createProductDto: CreateProductDto): Promise<Products> {
    try {
      const product = await this.prisma.products.create({ data: {name: createProductDto.name, description: createProductDto.description}})

      return product;
    } catch (error) {
      console.log(error)
      throw new Error(error?.message)
    }
  }

  async attributes(attributesProductDto: CreateProductAttributesDto): Promise<Products> {
    try {
      const images = await this.prisma.productImages.createMany({ data: attributesProductDto.productImages })
      const attributes = await this.prisma.attributes.createMany({ data: attributesProductDto.Attributes })

      const product = await this.prisma.products.findFirst({ 
        where: { id: attributesProductDto.productImages[0].productsId }, 
        include: { ProductImages: true, Attributes: true}
      })

      return product;
    } catch (error) {
      throw new Error(error?.message)
    }
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
