import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let answerQuestion: AnswerQuestionUseCase

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    answerQuestion = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should ve able to create an answer', async () => {
    const result = await answerQuestion.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Nova resposta',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer)
  })
})
