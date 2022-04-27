import { Test, TestingModule } from '@nestjs/testing';
import { GenDocsController } from './gen-docs.controller';

describe('GenDocsController', () => {
  let controller: GenDocsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenDocsController],
    }).compile();

    controller = module.get<GenDocsController>(GenDocsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
