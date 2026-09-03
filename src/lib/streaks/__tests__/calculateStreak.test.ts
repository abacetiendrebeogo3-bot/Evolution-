import { calculateStreak, LogEntry } from '../calculateStreak';

describe('calculateStreak logic', () => {
  it('should return 0 for empty logs', () => {
    expect(calculateStreak([])).toEqual({ currentStreak: 0, bestStreak: 0 });
  });

  it('should increment streak on consecutive done days', () => {
    const logs: LogEntry[] = [
      { log_date: '2026-05-01', status: 'done' },
      { log_date: '2026-05-02', status: 'done' },
      { log_date: '2026-05-03', status: 'done' },
    ];
    expect(calculateStreak(logs)).toEqual({ currentStreak: 3, bestStreak: 3 });
  });

  it('should count minimum_mode as full success for streak', () => {
    const logs: LogEntry[] = [
      { log_date: '2026-05-01', status: 'done' },
      { log_date: '2026-05-02', status: 'minimum_mode' },
      { log_date: '2026-05-03', status: 'done' },
    ];
    expect(calculateStreak(logs)).toEqual({ currentStreak: 3, bestStreak: 3 });
  });

  it('should preserve streak on a single isolated missed day', () => {
    const logs: LogEntry[] = [
      { log_date: '2026-05-01', status: 'done' },
      { log_date: '2026-05-02', status: 'done' },
      { log_date: '2026-05-03', status: 'missed' }, // Off day tolerated
      { log_date: '2026-05-04', status: 'done' },
    ];
    expect(calculateStreak(logs)).toEqual({ currentStreak: 3, bestStreak: 3 });
  });

  it('should reset streak to 0 on two consecutive missed days', () => {
    const logs: LogEntry[] = [
      { log_date: '2026-05-01', status: 'done' },
      { log_date: '2026-05-02', status: 'done' },
      { log_date: '2026-05-03', status: 'missed' },
      { log_date: '2026-05-04', status: 'missed' }, // 2 consecutive missed
    ];
    expect(calculateStreak(logs)).toEqual({ currentStreak: 0, bestStreak: 2 });
  });
});
