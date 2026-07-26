import { NextRequest, NextResponse } from 'next/server'
import redis from '@/lib/redis'
import { getUserFromRequest } from '@/lib/getUser'

const SERVICES = ['service-a', 'service-b']

export async function GET(req: NextRequest) {
  const userId = getUserFromRequest(req)

  if (!userId) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const statuses = await Promise.all(
    SERVICES.map(async (service) => {
      const state = (await redis.get(`cb:state:${service}`)) || 'CLOSED'
      const failures = (await redis.get(`cb:failures:${service}`)) || '0'
      return { service, state, failures: parseInt(failures) }
    })
  )

  return NextResponse.json({ statuses })
}