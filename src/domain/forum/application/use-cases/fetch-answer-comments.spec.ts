import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { UniqueEntityId } from '@/core/entities/types/unique-entity-id'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let fetchAnswerComments: FetchAnswerCommentsUseCase

describe('Fetch Answer Comments', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    fetchAnswerComments = new FetchAnswerCommentsUseCase(
      inMemoryAnswerCommentsRepository,
    )
  })

  it('should be able to fetch answer comments', async () => {
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('answer-1'),
        createdAt: new Date(2022, 1, 20),
      }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('answer-1'),
        createdAt: new Date(2022, 1, 18),
      }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('answer-1'),
        createdAt: new Date(2022, 1, 23),
      }),
    )

    const { answerComments } = await fetchAnswerComments.execute({
      answerId: 'answer-1',
      page: 1,
    })

    expect(answerComments).toEqual([
      expect.objectContaining({
        answerId: new UniqueEntityId('answer-1'),
        createdAt: new Date(2022, 1, 23),
      }),
      expect.objectContaining({
        answerId: new UniqueEntityId('answer-1'),
        createdAt: new Date(2022, 1, 20),
      }),
      expect.objectContaining({
        answerId: new UniqueEntityId('answer-1'),
        createdAt: new Date(2022, 1, 18),
      }),
    ])
  })

  it('should be able to fetch paginated answer comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
      )
    }

    const { answerComments } = await fetchAnswerComments.execute({
      answerId: 'answer-1',
      page: 2,
    })

    expect(answerComments.length).toEqual(2)
  })
})
