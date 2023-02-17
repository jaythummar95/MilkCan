import {MilkEntryList} from '../model/MilkEntryList';
import {makeAutoObservable} from 'mobx';

export class UserStore {
  milkList: MilkEntryList | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get listOfMilk(): MilkEntryList {
    return this.milkList ?? new MilkEntryList();
  }

  set setMilkList(milkList: MilkEntryList) {
    this.milkList = milkList;
  }
}

export const userStore = new UserStore();
