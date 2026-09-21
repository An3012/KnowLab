/**
 * KnowLab — Comparison Engine
 * Pure logic for side-by-side criteria evaluation, delta calculation,
 * and transparent trade-off extraction without declaring biased winners.
 */

export class ComparisonEngine {
  /**
   * Compare 2 to 4 items against defined criteria.
   * @param {Array<Object>} items - List of items to compare
   * @param {Array<Object>} criteria - List of criteria { key, label, unit, type }
   * @returns {Object} Comparison matrix with differences and trade-offs
   */
  static compare(items, criteria) {
    if (!items || items.length === 0) {
      return { items: [], matrix: [], tradeOffs: [] };
    }

    const matrix = criteria.map(criterion => {
      const row = {
        key: criterion.key,
        label: criterion.label,
        unit: criterion.unit || '',
        values: items.map(item => {
          const val = item[criterion.key] !== undefined ? item[criterion.key] : (item.attributes && item.attributes[criterion.key]);
          return val !== undefined ? val : 'N/A';
        })
      };

      // Check if values differ
      const firstVal = JSON.stringify(row.values[0]);
      row.hasDifference = row.values.some(v => JSON.stringify(v) !== firstVal);

      return row;
    });

    const tradeOffs = items.map(item => {
      return {
        id: item.id,
        name: item.name || item.title,
        summary: item.tradeOffSummary || item.summary || 'Không có ghi chú trade-off.',
        pros: item.pros || [],
        cons: item.cons || []
      };
    });

    return {
      items: items.map(i => ({ id: i.id, name: i.name || i.title })),
      matrix,
      tradeOffs,
      assumptions: [
        'Dữ liệu so sánh được chuẩn hóa theo cùng đơn vị đo lường.',
        'Mỗi phương án đều có ưu và nhược điểm riêng phù hợp với từng mục tiêu sử dụng cụ thể.'
      ]
    };
  }
}
