import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

interface DeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(private questioncommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionCommentId,
    authorId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questioncomment =
      await this.questioncommentsRepository.findById(questionCommentId)

    if (!questioncomment) {
      throw new Error('Question comment not found.')
    }

    if (authorId !== questioncomment.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    await this.questioncommentsRepository.delete(questioncomment)

    return {}
  }
}
