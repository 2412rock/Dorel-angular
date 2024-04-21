import { TruncateServiciuNamePipe } from './truncate-serviciu-name.pipe';

describe('TruncateServiciuNamePipe', () => {
  it('create an instance', () => {
    const pipe = new TruncateServiciuNamePipe();
    expect(pipe).toBeTruthy();
  });
});
