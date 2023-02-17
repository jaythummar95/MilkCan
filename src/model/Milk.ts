import {MilkEntryDto} from '../api/DTOs/MilkEntryDto';
import {Entity} from './core/entity';

export class Milk extends Entity<MilkEntryDto> {
  constructor(dto: MilkEntryDto) {
    super(dto, 'id');
  }
  get dateEntry(): string {
    return this.dto.date ?? '';
  }
  get literEntry(): string {
    return this.dto.liter ?? '';
  }
  get fatEntry(): string {
    return this.dto.fat ?? '';
  }
  get prizeEntry(): string {
    return this.dto.prize ?? '';
  }
  get totalEntry(): number {
    return this.dto.total ?? 0;
  }
}
