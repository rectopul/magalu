import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Req, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UserByToken } from 'src/session/auth';
import { JsonWebToken } from 'src/modules/JsonWebToken';
import { PrismaService } from 'src/database/prisma.service';

@Controller('admin/products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly auth: UserByToken,
    private readonly jsonToken: JsonWebToken,
    private readonly prisma: PrismaService
  ) {}

  @Get('create')
  @Render('pages/create-product')
  async register(@Req() req, @Res() res): Promise<object>{
    try {
            
      const token = req.cookies.token || ''

      if (!token) return res.redirect('/panel/login')

      const { id: jti } = await this.auth.checkToken(token)

      if(! await this.jsonToken.checkToken(jti)) return res.redirect('/panel/login')

      const refreshToken = await this.prisma.refreshToken.findFirst({
          where: {id: jti},
          include: { User: { include: { UserImage: true } } }
      })

      const clients = await this.prisma.client.findMany()


      return {
          pageClasses: `dashboard bg-default g-sidenav-show g-sidenav-pinned`,
          page: 'product',
          title: `Dashboard Magalu`,
          user: refreshToken.User,
          panel: true,
          userImage: refreshToken.User.UserImage?.name,
          clients
      }
    } catch (error) {
        console.log(error)
        return res.redirect('/panel/login')
    }
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
