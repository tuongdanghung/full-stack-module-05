import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MysqlModule } from './database/config.module';
import { CategoryModule } from './modules/category/category.module';
import { BrandModule } from './modules/brand/brand.module';
import { RoleModule } from './modules/role/role.module';
import { ColorModule } from './modules/color/color.module';
import { CapacityModule } from './modules/capacity/capacity.module';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerMiddleware } from './shared/middlewares/logger.middleware';
import { GenerateToken } from './shared/middlewares/generateToken';
import * as dotenv from 'dotenv';
import { UserModule } from './modules/user/user.module';
import { CheckAuthenGuard } from './shared/guards/auth.guard';
import { CheckAuthorGuard } from './shared/guards/verify_role.guard';
import { SharedDataService } from './shared/middlewares/shareData.service';
import { AddressModule } from './modules/address/address.module';
import { ProductModule } from './modules/product/product.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { FavoriteModule } from './modules/favorite/favorite.module';
dotenv.config();
const PORT = process.env.API_KEY;

@Module({
  imports: [
    MysqlModule,
    CategoryModule,
    BrandModule,
    RoleModule,
    ColorModule,
    CapacityModule,
    AuthModule,
    UserModule,
    AddressModule,
    ProductModule,
    CartModule,
    OrderModule,
    FavoriteModule,
  ],
  providers: [
    CheckAuthenGuard,
    GenerateToken,
    CheckAuthorGuard,
    SharedDataService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: `${PORT}/roles`, method: RequestMethod.GET });
  }
}
