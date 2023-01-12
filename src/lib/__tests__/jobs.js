const mockCronJob = jest.fn();

jest.mock('../../db');
jest.mock('cron', () => ({
  CronJob: mockCronJob,
}));

const mockGenerateCard = jest.fn();
jest.mock('../generateCard', () => ({
  generateCard: mockGenerateCard,
}));
const mockGenerateCardImage = jest.fn(() => Promise.resolve({
  generationData: {},
  result: ['foo'],
}));
jest.mock('../generateCardImage', () => ({
  generateImage: mockGenerateCardImage,
}));

require('../jobs');

const createCardJob = require('../jobs/createCardJob');
const cardImageJob = require('../jobs/cardImageJob');
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

  describe('Generate card image job', () => {
    it('Should be a function', () => {
      expect(cardImageJob).toBeInstanceOf(Function);
    });

    it('Should have called generateCard on cardImageJob', async () => {
      mockGenerateCardImage.mockClear();
      await cardImageJob();
      expect(mockGenerateCardImage).toHaveBeenCalled();
    });

    it('Should have called db.cards.findOneWithoutImage on cardImageJob', async () => {
      db.cards.findOneWithoutImage.mockClear();
      await cardImageJob();
      expect(db.cards.findOneWithoutImage).toHaveBeenCalled();
    });

    it('Should have called db.cards.update on cardImageJob', async () => {
      db.cards.update.mockClear();
      await cardImageJob();
      expect(db.cards.update).toHaveBeenCalled();
    });

    it('Should return null if no card is available', async () => {
      db.cards.findOneWithoutImage.mockClear();
      db.cards.findOneWithoutImage.mockReturnValueOnce(null);
      const result = await cardImageJob();
      expect(result).toBeNull();
    });
  });
});
