import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '../../../../core/errors/not-allowed-error'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let deleteAnswerComment: DeleteAnswerCommentUseCase

describe('Delete Answer Comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    deleteAnswerComment = new DeleteAnswerCommentUseCase(
      inMemoryAnswerCommentsRepository,
    )
  })

  it('should be able to delete a answer comment', async () => {
    const newAnswerComment = makeAnswerComment(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-comment-1'),
    )

    inMemoryAnswerCommentsRepository.create(newAnswerComment)

    await deleteAnswerComment.execute({
      answerCommentId: 'answer-comment-1',
      authorId: 'author-1',
    })

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
  })

  it('should be able to delete a answer comment from another user', async () => {
    const newAnswerComment = makeAnswerComment(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-comment-1'),
    )

    inMemoryAnswerCommentsRepository.create(newAnswerComment)

    const result = deleteAnswerComment.execute({
      answerCommentId: 'answer-comment-1',
      authorId: 'author-2',
    })

    expect((await result).isLeft()).toBe(true)
    expect((await result).value).toBeInstanceOf(NotAllowedError)
  })
})
