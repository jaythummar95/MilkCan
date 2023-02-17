import Realm from 'realm';
import moment from 'moment/moment';

const SchemaName = 'Reminders';
const Path = 'realmReminder';

const RemindersSchema = {
  name: 'Reminders',
  properties: {
    id: 'int',
    reminder: 'string',
    date: 'string',
  },
  primaryKey: 'id',
};

export const addReminders = (reminder: string, date: string) => {
  const realm = new Realm({
    path: Path,
    schema: [RemindersSchema],
  });
  realm.write(() => {
    const reminderObj = realm.create(SchemaName, {
      id: new Date().getMilliseconds(),
      reminder: reminder,
      date: date,
    });
    console.log(reminderObj);
  });
};

export const getReminders = () => {
  const realm = new Realm({
    path: Path,
    schema: [RemindersSchema],
  });
  return realm.objects(SchemaName)!.sorted('date', true);
};

export const getRemindersByDate = (date: Date) => {
  const realm = new Realm({
    path: Path,
    schema: [RemindersSchema],
  });
  let list = realm.objects(SchemaName);
  if (list.length > 0) {
    list = list.filtered(
      `date CONTAINS '${moment(date).format('YYYY-MM-DD')}'`,
    );
  }
  return list;
};
