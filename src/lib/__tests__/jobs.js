const mockCronJob = jest.fn();

jest.mock('../../db');
jest.mock('cron', () => ({
  CronJob: mockCronJob,
}));

const mockGenerateCard = jest.fn();
jest.mock('../generateCard', () => ({
  generateCard: mockGenerateCard,
}));

require('../jobs');

const createCardJob = require('../jobs/createCardJob');
const db = require('../../db');

describe('Jobs', () => {
  it('Should have created CronJobs', () => {
    expect(mockCronJob).toHaveBeenCalled();
  });

  describe('Create card job', () => {
    it('Should be a function', () => {
      expect(createCardJob).toBeInstanceOf(Function);
    });

    it('Should have called generateCard on generateCardJob', async () => {
      mockGenerateCard.mockClear();
      await createCardJob();
      expect(mockGenerateCard).toHaveBeenCalled();
    });

    it('Should have called db.cards.create on generateCardJob', async () => {
      db.cards.create.mockClear();
      await createCardJob();
      expect(db.cards.create).toHaveBeenCalled();
    });
  });
});
