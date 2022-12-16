import { EpochPipe } from './epoch.pipe';

describe('EpochPipe', () => {
  it('create an instance', () => {
    const pipe = new EpochPipe();
    expect(pipe).toBeTruthy();
  });
  1671043526000

  it('transforms 1671043526000 to ', () => {
    const pipe = new EpochPipe()
    expect(pipe.transform(1671043526000).toString()).toBe('Wed Dec 14 2022 13:45:26 GMT-0500 (Eastern Standard Time)');
  });

  it('transforms 1672006706000 to ', () => {
    const pipe = new EpochPipe()
    expect(pipe.transform(1672006706000).toString()).toBe('Sun Dec 25 2022 17:18:26 GMT-0500 (Eastern Standard Time)');
  });

  it('transforms 1672006706000 to ', () => {
    const pipe = new EpochPipe()
    expect(pipe.transform(1672006706000).toString()).not.toBe('Sun Dec 25 2022');
  });
});
