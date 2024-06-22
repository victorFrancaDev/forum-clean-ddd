import { FetchQuestionCommentsUseCase } from './fetch-question-comments'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { UniqueEntityId } from '@/core/entities/types/unique-entity-id'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let fetchQuestionComments: FetchQuestionCommentsUseCase

describe('Fetch Question Comments', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    fetchQuestionComments = new FetchQuestionCommentsUseCase(
      inMemoryQuestionCommentsRepository,
    )
  })

  it('should be able to fetch question comments', async () => {
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId('question-1'),
        createdAt: new Date(2022, 1, 20),
      }),
    )
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId('question-1'),
        createdAt: new Date(2022, 1, 18),
      }),
    )
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId('question-1'),
        createdAt: new Date(2022, 1, 23),
      }),
    )

    const result = await fetchQuestionComments.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(result.value?.questionComments).toEqual([
      expect.objectContaining({
        questionId: new UniqueEntityId('question-1'),
        createdAt: new Date(2022, 1, 23),
      }),
      expect.objectContaining({
        questionId: new UniqueEntityId('question-1'),
        createdAt: new Date(2022, 1, 20),
      }),
      expect.objectContaining({
        questionId: new UniqueEntityId('question-1'),
        createdAt: new Date(2022, 1, 18),
      }),
    ])
  })

  it('should be able to fetch paginated question comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({ questionId: new UniqueEntityId('question-1') }),
      )
    }

    const result = await fetchQuestionComments.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.value?.questionComments.length).toEqual(2)
  })
})
