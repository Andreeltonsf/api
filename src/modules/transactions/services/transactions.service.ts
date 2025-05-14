import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories.ts';
import { ValidateBankAccountOwnershipService } from '../../bank-accounts/services/validate-bank-account-owner-ship.service';
import { ValidateCategoriesOwnershipService } from '../../categories/services/validate-categories-owner-ship.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { ValidateTransactionsOwnershipService } from './validate-categories-owner-ship.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepo: TransactionsRepository,
    private readonly validateBankAccountOwnership: ValidateBankAccountOwnershipService,
    private readonly validateCategoryOwnership: ValidateCategoriesOwnershipService,
    private readonly validateTransactionOwnership: ValidateTransactionsOwnershipService,
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { bankAccountId, categoryId, date, name, value, type } =
      createTransactionDto;

    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      categoryId,
    });

    return this.transactionsRepo.create({
      data: {
        userId,
        bankAccountId,
        categoryId,
        date,
        name,
        value,
        type,
      },
    });
  }

  findAllByUserId(
    userId: string,
    filters: { month: number; year: number; bankAccountId: string },
  ) {
    return this.transactionsRepo.findMany({
      where: {
        userId,
        date: {
          gte: new Date(Date.UTC(filters.year, filters.month)),
          lt: new Date(Date.UTC(filters.year, filters.month + 1)),
        },
      },
    });
  }

  async update(
    userId: string,
    transactionsId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const { bankAccountId, categoryId, date, name, value, type } =
      updateTransactionDto;

    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      categoryId,
      transactionsId,
    });

    return this.transactionsRepo.update({
      where: {
        id: transactionsId,
      },
      data: {
        bankAccountId,
        categoryId,
        date,
        name,
        value,
        type,
      },
    });
  }

  async remove(userId: string, transactionsId: string) {
    this.validateEntitiesOwnership({ userId, transactionsId });
    await this.transactionsRepo.delete({
      where: {
        id: transactionsId,
      },
    });

    return null;
  }

  private async validateEntitiesOwnership({
    userId,
    bankAccountId,
    categoryId,
    transactionsId,
  }: {
    userId: string;
    bankAccountId?: string;
    categoryId?: string;
    transactionsId?: string;
  }) {
    await Promise.all([
      transactionsId &&
        this.validateTransactionOwnership.validate(userId, transactionsId),
      bankAccountId &&
        this.validateBankAccountOwnership.validate(userId, bankAccountId),
      categoryId && this.validateCategoryOwnership.validate(userId, categoryId),
    ]);
  }
}
