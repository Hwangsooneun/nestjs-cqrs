import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export interface IAbstractEntity {
  createdAt: Date;

  updatedAt: Date;
}

export abstract class AbstractEntity implements IAbstractEntity {
  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;
}
