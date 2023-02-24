import {List} from './List';
import {HistoryDto} from '../api/DTOs/HistoryDto';
import {History} from './History';

export class HistoryList extends List<History> {
  constructor(dto?: HistoryDto[]) {
    super(dto, History, false);
  }
}
