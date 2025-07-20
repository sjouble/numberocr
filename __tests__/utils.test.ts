// 유틸리티 함수 테스트
describe('Utility Functions', () => {
  it('should format data correctly', () => {
    const mockItems = [
      { partNumber: '12345', quantity: 10, unit: '카톤', expiryDate: '20241231' },
      { partNumber: '67890', quantity: 5, unit: '박스', expiryDate: '' }
    ];

    const formatData = (items: any[]) => {
      return items.map(item => 
        `${item.partNumber} | ${item.quantity} | ${item.unit} | ${item.expiryDate || ''}`
      ).join('\n');
    };

    const result = formatData(mockItems);
    expect(result).toContain('12345 | 10 | 카톤 | 20241231');
    expect(result).toContain('67890 | 5 | 박스 | ');
  });

  it('should validate part number', () => {
    const isValidPartNumber = (partNumber: string) => {
      return partNumber.length > 0 && /^[0-9]+$/.test(partNumber);
    };

    expect(isValidPartNumber('12345')).toBe(true);
    expect(isValidPartNumber('')).toBe(false);
    expect(isValidPartNumber('abc123')).toBe(false);
  });

  it('should validate quantity', () => {
    const isValidQuantity = (quantity: number) => {
      return quantity > 0 && Number.isInteger(quantity);
    };

    expect(isValidQuantity(10)).toBe(true);
    expect(isValidQuantity(0)).toBe(false);
    expect(isValidQuantity(-1)).toBe(false);
    expect(isValidQuantity(1.5)).toBe(false);
  });
}); 