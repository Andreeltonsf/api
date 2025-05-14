import {
  ArgumentMetadata,
  Injectable,
  ParseUUIDPipe,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class OptionalParseUUIDPipe implements PipeTransform {
  private readonly uuidPipe = new ParseUUIDPipe();

  async transform(
    value: string | undefined,
    metadata: ArgumentMetadata,
  ): Promise<string | undefined> {
    if (value === undefined || value === null || value === '') {
      return undefined;
    }

    return this.uuidPipe.transform(value, metadata);
  }
}
