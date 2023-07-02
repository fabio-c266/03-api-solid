import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'
import { prisma } from '@/lib/prisma'

import dayjs from 'dayjs'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async countByUserId(userId: string) {
    const userCheckIns = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    })

    return userCheckIns
  }

  async save(checkIn: CheckIn) {
    const data = await prisma.checkIn.update({
      where: {
        id: checkIn.id,
      },
      data: checkIn,
    })

    return data
  }

  async findById(checkInId: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id: checkInId,
      },
    })

    return checkIn
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const userCheckIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return userCheckIns
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const startOfTheday = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheday.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })

    return checkInOnSameDate
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.create({
      data,
    })

    return checkIn
  }
}
