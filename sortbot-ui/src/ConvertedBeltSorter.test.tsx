// ConvertedBeltSorter.test.tsx
import { describe, expect, test } from '@jest/globals';

interface SortFunction {
    (width: number, height: number, length: number, mass: number): string;
}

describe('Package Sorting Logic', () => {
    const sort: SortFunction = (width, height, length, mass) => {
        const volume = width * height * length;
        const isBulky =
            volume >= 1000000 || width >= 150 || height >= 150 || length >= 150;
        const isHeavy = mass >= 20;

        if (isHeavy && isBulky) return "REJECTED";
        if (isHeavy || isBulky) return "SPECIAL";
        return "STANDARD";
    };

    describe('REJECTED cases', () => {
        test('should return REJECTED when package is both heavy and bulky (by volume)', () => {
            expect(sort(100, 100, 100, 20)).toBe('REJECTED');
        });

        test('should return REJECTED when package is heavy and has one dimension >= 150', () => {
            expect(sort(150, 50, 50, 20)).toBe('REJECTED');
            expect(sort(50, 150, 50, 20)).toBe('REJECTED');
            expect(sort(50, 50, 150, 20)).toBe('REJECTED');
        });
    });

    describe('SPECIAL cases', () => {
        test('should return SPECIAL when package is only heavy (mass >= 20)', () => {
            expect(sort(100, 100, 99, 20)).toBe('SPECIAL');
        });

        test('should return SPECIAL when package is only bulky by volume', () => {
            expect(sort(100, 100, 100, 19)).toBe('SPECIAL');
        });

        test('should return SPECIAL when package is only bulky by one dimension', () => {
            expect(sort(150, 50, 50, 19)).toBe('SPECIAL');
            expect(sort(50, 150, 50, 19)).toBe('SPECIAL');
            expect(sort(50, 50, 150, 19)).toBe('SPECIAL');
        });
    });

    describe('STANDARD cases', () => {
        test('should return STANDARD when package is neither heavy nor bulky', () => {
            expect(sort(100, 100, 99, 19)).toBe('STANDARD');
        });

        test('should return STANDARD for minimum values', () => {
            expect(sort(1, 1, 1, 1)).toBe('STANDARD');
        });

        test('should return STANDARD for values just below thresholds', () => {
            expect(sort(149, 149, 44, 19)).toBe('STANDARD');
        });
    });

    describe('Edge cases', () => {
        test('should handle zero values', () => {
            expect(sort(0, 0, 0, 0)).toBe('STANDARD');
        });

        test('should handle decimal values', () => {
            expect(sort(149.9, 149.9, 44.5, 19.9)).toBe('STANDARD');
            expect(sort(150.1, 100, 100, 20.1)).toBe('REJECTED');
        });
    });
});