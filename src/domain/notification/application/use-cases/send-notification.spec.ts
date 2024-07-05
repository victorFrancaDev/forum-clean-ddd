import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notification-repository'
import { SendNotificationUseCase } from './send-notification'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let SendNotification: SendNotificationUseCase

describe('Send Notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    SendNotification = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    )
  })

  it('send a notification', async () => {
    const result = await SendNotification.execute({
      recipientId: '1',
      title: 'Nova notification',
      content: 'Essa notificação é ....',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationsRepository.items[0]).toEqual(
      result.value?.notification,
    )
  })
})
