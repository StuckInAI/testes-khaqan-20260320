import { DataSource } from 'typeorm'
import { TestItem } from './entities/TestItem'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DATABASE_URL || './database.sqlite',
  entities: [TestItem],
  synchronize: true,
  logging: false,
})