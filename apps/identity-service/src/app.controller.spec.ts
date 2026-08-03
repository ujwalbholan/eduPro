import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health/health.controller';

describe('HealthController', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    healthController = app.get<HealthController>(HealthController);
  });

  describe('health', () => {
    it('returns the infrastructure health response', () => {
      expect(healthController.getHealth()).toEqual({
        status: 'ok',
        service: 'identity-service',
      });
    });
  });
});
