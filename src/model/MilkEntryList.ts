import {Milk} from './Milk';
import {MilkEntryDto} from '../api/DTOs/MilkEntryDto';
import {List} from './List';

export class MilkEntryList extends List<Milk> {
  constructor(dto?: MilkEntryDto[]) {
    super(dto, Milk, false);
  }
}
