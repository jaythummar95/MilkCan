import {getMilkEntry} from '../RealmDatabase/MilkEntryRealm';
import {getDefaultError} from '../core/Utisl';
import {Result} from '../core/Result';
import {MilkEntryList} from '../model/MilkEntryList';

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
}
export const userFactory = new UserFactory();
