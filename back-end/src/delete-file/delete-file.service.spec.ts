import { Test, TestingModule } from '@nestjs/testing';
import { DeleteFileService } from './delete-file.service';

describe('DeleteFileService', () => {
  let service: DeleteFileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteFileService],
    }).compile();

    service = module.get<DeleteFileService>(DeleteFileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
