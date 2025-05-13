import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';

@Injectable()
export class ValidateCategoriesOwnershipService {
  constructor(private readonly categoriesRepo: CategoriesRepository) {}

  async validate(userId: string, categoriesId: string) {
    const isOwner = await this.categoriesRepo.FindFirst({
      where: {
        id: categoriesId,
        userId,
      },
    });

    if (!isOwner) {
      throw new NotFoundException('Categories not found');
    }
  }
}
