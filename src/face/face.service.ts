import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateFaceDto } from './dto/create-face.dto';
import { UpdateFaceDto } from './dto/update-face.dto';

@Injectable()
export class FaceService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createFaceDto: CreateFaceDto) {
    try {
      const facebook = await this.prisma.facebook.create({ data: createFaceDto })

      return facebook
    } catch (error) {
      throw new Error(error?.message)
    }
  }

  findAll() {
    return `This action returns all face`;
  }

  findOne(id: number) {
    return `This action returns a #${id} face`;
  }

  update(id: number, updateFaceDto: UpdateFaceDto) {
    return `This action updates a #${id} face`;
  }

  async remove(id: string) {
    try {
      const facebook = await this.prisma.facebook.delete({ where: { id }})
      return facebook
    } catch (error) {
      throw new Error(error?.message)
    }
  }
}
