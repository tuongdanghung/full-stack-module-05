import { AddressEntity } from 'src/modules/address/entities/address.entity';
import { CartEntity } from 'src/modules/cart/entities/cart.entity';
import { OrderEntity } from 'src/modules/order/entities/order.entity';
import { RoleEntity } from 'src/modules/role/entities/role.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'true' })
  status: string;

  @Column()
  card_id: string;

  @Column({
    default:
      'https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg',
  })
  avatar: string;

  @ManyToOne(() => RoleEntity, (role) => role.user, { eager: true })
  role: RoleEntity;
  RoleID: number;

  @OneToMany(() => AddressEntity, (address) => address.user)
  addresses: AddressEntity[];

  @OneToMany(() => CartEntity, (cart) => cart.user)
  carts: CartEntity[];

  @OneToMany(() => OrderEntity, (cart) => cart.user)
  orders: OrderEntity[];

  @Column({
    select: false,
    name: 'createdAt',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public createdAt: string;

  @Column({
    select: false,
    name: 'updatedAt',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public updatedAt: string;
}
