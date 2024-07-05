import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notification-repository'
import { ReadNotificationUseCase } from './read-notification'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let ReadNotification: ReadNotificationUseCase

describe('Read Notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    ReadNotification = new ReadNotificationUseCase(
      inMemoryNotificationsRepository,
    )
  })

  it('read a notification', async () => {
    const result = await ReadNotification.execute({
      recipientId: '1',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationsRepository.items[0]).toEqual(
      result.value?.notification,
    )
  })
})
