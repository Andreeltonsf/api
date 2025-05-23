import { Injectable } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';

@Injectable()
export class ValidateBankAccountOwnershipService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
  ) {}

  async validate(userId: string, bankAccountId: string) {
    const bankAccount = await this.bankAccountsRepository.findFirst({
      where: {
        id: bankAccountId,
        userId,
      },
    });

    if (!bankAccount) {
      throw new Error('Bank account not found or not owned by user');
    }
  }
}
