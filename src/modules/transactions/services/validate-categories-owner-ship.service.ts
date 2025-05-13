import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories.ts';

@Injectable()
export class ValidateTransactionsOwnershipService {
  constructor(private readonly transactionsRepo: TransactionsRepository) {}

  async validate(userId: string, transactionsId: string) {
    const isOwner = await this.transactionsRepo.findFirst({
      where: {
        id: transactionsId,
        userId,
      },
    });

    if (!isOwner) {
      throw new NotFoundException('Transactions not found');
    }
  }
}
