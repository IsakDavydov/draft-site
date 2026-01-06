import { describe, it, expect } from 'vitest';
import { 
  formatDate, 
  formatTime, 
  formatRecord, 
  calculateWinPercentage,
  formatOdds,
  calculateROI,
  getTeamColors,
  getPositionAbbreviation,
  getScoringLabel,
  debounce,
  generateSlug,
  truncateText
} from '../utils';

describe('Utils', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = '2024-01-15';
      const result = formatDate(date);
      expect(result).toContain('January 15, 2024');
    });
  });

  describe('formatTime', () => {
    it('should format time correctly', () => {
      const date = '2024-01-15T20:00:00';
      const result = formatTime(date);
      expect(result).toContain('8:00');
    });
  });

  describe('formatRecord', () => {
    it('should format record without ties', () => {
      expect(formatRecord(10, 6)).toBe('10-6');
    });

    it('should format record with ties', () => {
      expect(formatRecord(10, 6, 1)).toBe('10-6-1');
    });
  });

  describe('calculateWinPercentage', () => {
    it('should calculate win percentage correctly', () => {
      expect(calculateWinPercentage(10, 6)).toBe(0.625);
    });

    it('should handle ties correctly', () => {
      expect(calculateWinPercentage(10, 6, 1)).toBe(0.625);
    });

    it('should return 0 for no games', () => {
      expect(calculateWinPercentage(0, 0)).toBe(0);
    });
  });

  describe('formatOdds', () => {
    it('should format positive odds', () => {
      expect(formatOdds(150)).toBe('+150');
    });

    it('should format negative odds', () => {
      expect(formatOdds(-110)).toBe('-110');
    });
  });

  describe('calculateROI', () => {
    it('should calculate ROI correctly', () => {
      expect(calculateROI(10, 6, 16)).toBe(25);
    });

    it('should return 0 for no units', () => {
      expect(calculateROI(10, 6, 0)).toBe(0);
    });
  });

  describe('getTeamColors', () => {
    it('should return team colors for valid team', () => {
      const colors = getTeamColors('chiefs');
      expect(colors.primary).toBe('#E31837');
      expect(colors.secondary).toBe('#FFB81C');
      expect(colors.accent).toBe('#000000');
    });

    it('should return default colors for invalid team', () => {
      const colors = getTeamColors('invalid');
      expect(colors.primary).toBe('#6B7280');
    });
  });

  describe('getPositionAbbreviation', () => {
    it('should return correct abbreviations', () => {
      expect(getPositionAbbreviation('Quarterback')).toBe('QB');
      expect(getPositionAbbreviation('Running Back')).toBe('RB');
      expect(getPositionAbbreviation('Unknown Position')).toBe('Unknown Position');
    });
  });

  describe('getScoringLabel', () => {
    it('should return correct labels', () => {
      expect(getScoringLabel('standard')).toBe('Standard');
      expect(getScoringLabel('half-ppr')).toBe('Half PPR');
      expect(getScoringLabel('full-ppr')).toBe('Full PPR');
      expect(getScoringLabel('unknown')).toBe('unknown');
    });
  });

  describe('debounce', () => {
    it('should debounce function calls', async () => {
      let callCount = 0;
      const debouncedFn = debounce(() => callCount++, 100);
      
      debouncedFn();
      debouncedFn();
      debouncedFn();
      
      expect(callCount).toBe(0);
      
      await new Promise(resolve => setTimeout(resolve, 150));
      expect(callCount).toBe(1);
    });
  });

  describe('generateSlug', () => {
    it('should generate valid slugs', () => {
      expect(generateSlug('Hello World!')).toBe('hello-world');
      expect(generateSlug('NFL 2024 Season')).toBe('nfl-2024-season');
      expect(generateSlug('Special@#$%Characters')).toBe('special-characters');
    });
  });

  describe('truncateText', () => {
    it('should truncate long text', () => {
      expect(truncateText('This is a very long text that needs truncation', 20)).toBe('This is a very long...');
    });

    it('should not truncate short text', () => {
      expect(truncateText('Short text', 20)).toBe('Short text');
    });
  });
});
