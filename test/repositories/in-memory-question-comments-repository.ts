import { PaginationParams } from '@/core/entities/repositories/pagination-params'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = []

  async findById(id: string): Promise<QuestionComment | null> {
    const questioncomment = this.items.find((item) => item.id.toString() === id)

    if (!questioncomment) {
      return null
    }

    return questioncomment
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const questioncommentcomments = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return questioncommentcomments
  }

  async create(questioncomment: QuestionComment) {
    this.items.push(questioncomment)
  }

  async delete(questioncomment: QuestionComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === questioncomment.id,
    )
    this.items.splice(itemIndex, 1)
  }

  // async save(questioncomment: QuestionComment) {
  //   const itemIndex = this.items.findIndex((item) => item.id === questioncomment.id)
  //   this.items[itemIndex] = questioncomment
  // }
}
