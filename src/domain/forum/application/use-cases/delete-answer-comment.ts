import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

interface DeleteAnswerCommentUseCaseResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(private answercommentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerCommentId,
    authorId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answercomment =
      await this.answercommentsRepository.findById(answerCommentId)

    if (!answercomment) {
      throw new Error('Answer comment not found.')
    }

    if (authorId !== answercomment.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    await this.answercommentsRepository.delete(answercomment)

    return {}
  }
}
