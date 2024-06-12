import { Sample1Component } from './sample-1.component';
import { Spectator, byTestId, createComponentFactory } from '@ngneat/spectator';

describe('Sample1Component', () => {
  let spectator: Spectator<Sample1Component>;

  const createComponent = createComponentFactory({
    component: Sample1Component,
    shallow: true,
  })

  beforeEach(() => {
    spectator = createComponent({
      props: {
        testCount: 5,
      }
    })
  })

  it('測試 spectator 有正確的 testCount @Input 初始值', () => {
    console.log(spectator.component.testCount)
    expect(spectator.component.testCount).toBe(5);
  })

  it('測試 spectator 正確顯示初始計數值', () => {
    console.log(spectator.query(byTestId('count')));
    expect(spectator.query(byTestId('count'))).toHaveText('count: 0');
  })
});
