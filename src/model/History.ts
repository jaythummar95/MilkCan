import {Entity} from './core/entity';
import {HistoryDto} from '../api/DTOs/HistoryDto';

export class History extends Entity<HistoryDto> {
  constructor(dto: HistoryDto) {
    super(dto, 'id');
  }
  get date(): string {
    return this.dto.date ?? '';
  }
  get startDate(): string {
    return this.dto.start_date ?? '';
  }
  get endDate(): string {
    return this.dto.end_date ?? '';
  }
  get total(): number {
    return this.dto.total ?? 0;
  }
}
