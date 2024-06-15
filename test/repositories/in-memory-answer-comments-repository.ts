import { PaginationParams } from '@/core/entities/repositories/pagination-params'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = []

  async findById(id: string): Promise<AnswerComment | null> {
    const answercomment = this.items.find((item) => item.id.toString() === id)

    if (!answercomment) {
      return null
    }

    return answercomment
  }

  async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
    const answercommentcomments = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return answercommentcomments
  }

  async create(answercomment: AnswerComment) {
    this.items.push(answercomment)
  }

  async delete(answercomment: AnswerComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === answercomment.id,
    )
    this.items.splice(itemIndex, 1)
  }

  // async save(answercomment: AnswerComment) {
  //   const itemIndex = this.items.findIndex((item) => item.id === answercomment.id)
  //   this.items[itemIndex] = answercomment
  // }
}
