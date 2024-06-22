import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeQuestion } from 'test/factories/make-question'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let feachQuestionAnswers: FetchQuestionAnswersUseCase

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    feachQuestionAnswers = new FetchQuestionAnswersUseCase(
      inMemoryAnswersRepository,
    )
  })

  it('should be able to fetch question answers', async () => {
    const question = makeQuestion()
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: question.id,
        createdAt: new Date(2022, 1, 20),
      }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: question.id,
        createdAt: new Date(2022, 1, 18),
      }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: question.id,
        createdAt: new Date(2022, 1, 23),
      }),
    )

    const result = await feachQuestionAnswers.execute({
      questionId: question.id.toString(),
      page: 1,
    })

    expect(result.value?.answers).toEqual([
      expect.objectContaining({
        questionId: question.id,
        createdAt: new Date(2022, 1, 23),
      }),
      expect.objectContaining({
        questionId: question.id,
        createdAt: new Date(2022, 1, 20),
      }),
      expect.objectContaining({
        questionId: question.id,
        createdAt: new Date(2022, 1, 18),
      }),
    ])
  })

  it('should be able to fetch paginated question answers', async () => {
    const question = makeQuestion()

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({ questionId: question.id }),
      )
    }

    const result = await feachQuestionAnswers.execute({
      questionId: question.id.toString(),
      page: 2,
    })

    expect(result.value?.answers.length).toEqual(2)
  })
})
