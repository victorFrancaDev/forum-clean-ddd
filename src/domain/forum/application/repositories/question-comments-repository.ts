import { PaginationParams } from '@/core/entities/repositories/pagination-params'
import { QuestionComment } from '../../enterprise/entities/question-comment'

export interface QuestionCommentsRepository {
  findById(id: string): Promise<QuestionComment | null>
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]>
  create(comment: QuestionComment): Promise<void>
  delete(comment: QuestionComment): Promise<void>
  // save(comment: QuestionComment): Promise<void>
}
