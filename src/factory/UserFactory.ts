import {getMilkEntry} from '../RealmDatabase/MilkEntryRealm';
import {getDefaultError} from '../core/Utisl';
import {Result} from '../core/Result';
import {MilkEntryList} from '../model/MilkEntryList';
import {HistoryList} from '../model/HistoryList';
import {getHistory} from '../RealmDatabase/HistoryRealm';

class UserFactory {
  async milkList(): Promise<Result<MilkEntryList>> {
    const response = await getMilkEntry();
    try {
      if (response) {
        const listOfMilk = response;
        console.log('RESPONSE', response);
        // @ts-ignore
        return Result.ok(
          new MilkEntryList(JSON.parse(JSON.stringify(listOfMilk))),
        );
      }
      return getDefaultError('response_error');
    } catch (e) {
      return getDefaultError(e, 'login');
    }
  }

  async history(): Promise<Result<HistoryList>> {
    const response = await getHistory();
    try {
      if (response) {
        const listOfHistory = response;
        console.log('RESPONSE', response);
        // @ts-ignore
        return Result.ok(
          new HistoryList(JSON.parse(JSON.stringify(listOfHistory))),
        );
      }
      return getDefaultError('history');
    } catch (e) {
      return getDefaultError(e, 'history');
    }
  }
}
export const userFactory = new UserFactory();
