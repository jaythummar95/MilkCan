import Realm from 'realm';

const SchemaName = 'History';
const Path = 'realmhistory';

const HistoryScheme = {
  name: 'History',
  properties: {
    id: 'int',
    date: 'string',
    start_date: 'string',
    end_date: 'string',
    total: 'int',
  },
  primaryKey: 'id',
};

export const addHistory = (
  date: string,
  start_date: string,
  end_date: string,
  total: number,
) => {
  const realm = new Realm({
    path: Path,
    schema: [HistoryScheme],
  });
  realm.write(() => {
    const milkHistoryObj = realm.create(SchemaName, {
      id: new Date().getMilliseconds(),
      date: date,
      start_date: start_date,
      end_date: end_date,
      total: total,
    });
    console.log('milkHistoryObj', milkHistoryObj);
  });
};

export const getHistory = () => {
  const realm = new Realm({
    path: Path,
  });
  let list = realm.objects(SchemaName);
  console.log('data', list);
  return list;
};
