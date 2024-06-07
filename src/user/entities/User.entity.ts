import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("uuid", ["uuid"], { unique: true }) //设置唯一索引
@Entity("user", { schema: "financial-system" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "主键id" })
  id: number;

  @Column("varchar", {
    name: "uuid",
    unique: true,
    comment: "uuid主键",
    length: 150,
  })
  uuid: string;

  @Column("varchar", {
    name: "username",
    comment: "姓名",
    length: 100,
  })
  username: string;

  @Column("varchar", { name: "password", comment: "密码", length: 255 })
  password: string;

  @Column("varchar", {
    name: "email",
    nullable: true,
    comment: "邮箱",
    length: 100,
  })
  email: string | null;

  @Column("varchar", {
    name: "mobile",
    nullable: true,
    comment: "手机号码",
    length: 11,
  })
  mobile: string | null;

  @Column("tinyint", {
    name: "gender",
    nullable: true,
    comment: "性别",
    default: () => "'0'",
  })
  gender: number | null;

  @Column("timestamp", {
    name: "create_at",
    comment: "创建时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  createAt: Date;

  @Column("timestamp", {
    name: "update_at",
    comment: "更新时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  updateAt: Date;
}
