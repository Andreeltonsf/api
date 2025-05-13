import { Module } from '@nestjs/common';
import { BankAccountsModule } from '../bank-accounts/bank-accounts.module';
import { CategoriesModule } from '../categories/categories.module';
import { ValidateCategoriesOwnershipService } from '../categories/services/validate-categories-owner-ship.service';
import { TransactionsService } from './services/transactions.service';
import { ValidateTransactionsOwnershipService } from './services/validate-categories-owner-ship.service';
import { TransactionsController } from './transactions.controller';

@Module({
  imports: [BankAccountsModule, CategoriesModule],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    ValidateCategoriesOwnershipService,
    ValidateTransactionsOwnershipService,
  ],
})
export class TransactionsModule {}
