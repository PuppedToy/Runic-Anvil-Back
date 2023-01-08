const mockCronJob = jest.fn();
jest.mock('cron', () => ({
  CronJob: mockCronJob,
}));

require('../jobs');

const createCardJob = require('../jobs/createCardJob');

describe('Jobs', () => {
  it('Should have created CronJobs', () => {
    expect(mockCronJob).toHaveBeenCalled();
  });

  describe('Create card job', () => {
    it('Should be a function', () => {
      expect(createCardJob).toBeInstanceOf(Function);
    });
  });
});
