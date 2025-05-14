import {
  ArgumentMetadata,
  Injectable,
  ParseEnumPipe,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class OptionalParseEnumPipe<T = any> implements PipeTransform {
  private readonly enumPipe: ParseEnumPipe<T>;

  constructor(enumType: T) {
    this.enumPipe = new ParseEnumPipe(enumType);
  }

  async transform(value: T | undefined, metadata: ArgumentMetadata) {
    if (value === undefined || value === null || value === '') {
      return undefined;
    }

    return this.enumPipe.transform(value, metadata);
  }
}
