import { Trip } from './trip';

describe('Trip', () => {
  it('should create an instance', () => {
    expect(new Trip("0", '', '', new Date("00/00/000"), new Date("00/00/000"), 0, 0, '', [])).toBeTruthy();
  });
});
