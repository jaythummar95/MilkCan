import Realm from 'realm';
import moment from 'moment/moment';
import {Animated} from 'react-native';

const SchemaName = 'MilkEntry';
const Path = 'realmmilkentry';

const MilkEntrySchema = {
  name: 'MilkEntry',
  properties: {
    id: 'int',
    date: 'string',
    liter: 'string',
    fat: 'string',
    prize: 'string',
    total: 'int',
  },
  primaryKey: 'id',
};

export const addMilkEntry = (
  date: string,
  liter: string,
  fat: string,
  prize: string,
  total: number,
) => {
  const realm = new Realm({
    path: Path,
    schema: [MilkEntrySchema],
  });
  realm.write(() => {
    const milkEntryObj = realm.create(SchemaName, {
      id: new Date().getMilliseconds(),
      date: date,
      liter: liter,
      prize: prize,
      fat: fat,
      total: total,
    });
    console.log('milkEntryObj', milkEntryObj);
  });
};

export const getAppointments = () => {
  const realm = new Realm({
    path: Path,
    schema: [MilkEntrySchema],
  });
  return realm.objects(SchemaName)!.sorted('date', true);
};

export const getMilkEntryByDate = (date: Date) => {
  const realm = new Realm({
    path: Path,
    schema: [MilkEntrySchema],
  });
  let list = realm.objects(SchemaName);
  if (list.length > 0) {
    list = list.filtered(
      `date CONTAINS '${moment(date).format('YYYY-MM-DD')}'`,
    );
  }
  return list;
};

export const getMilkEntry = () => {
  const realm = new Realm({
    path: Path,
  });
  let list = realm.objects(SchemaName);
  console.log('data', list);
  return list;
};

export const getMilkEntryByFilter = (date: string) => {
  const realm = new Realm({
    path: Path,
  });
  let list = realm.objects(SchemaName);
  if (list.length > 0) {
    list = list.filtered(
      `date CONTAINS '${moment(date).format('YYYY-MM-DD')}'`,
    );
  }
  console.log('data', list);
  return list;
};
