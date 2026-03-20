import { NextResponse } from 'next/server'
import { AppDataSource } from '@/lib/data-source'
import { TestItem } from '@/lib/entities/TestItem'

async function initializeDatabase() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize()
  }
}

export async function GET() {
  await initializeDatabase()
  const testItems = await AppDataSource.getRepository(TestItem).find()
  return NextResponse.json(testItems)
}

export async function POST(request: Request) {
  await initializeDatabase()
  const { name } = await request.json()
  const testItem = new TestItem()
  testItem.name = name
  await AppDataSource.getRepository(TestItem).save(testItem)
  return NextResponse.json(testItem, { status: 201 })
}