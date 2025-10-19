import { Test, TestingModule } from '@nestjs/testing';
import { StyleController } from './style.controller';
import { StyleService } from './style.service';

describe('StyleController', () => {
  let controller: StyleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StyleController],
      providers: [
        {
          provide: StyleService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findAllForUser: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<StyleController>(StyleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
