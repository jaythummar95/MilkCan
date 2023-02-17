import Realm from 'realm';
import moment from 'moment/moment';

const SchemaName = 'Notes';

const NotesSchema = {
  name: 'Notes',
  properties: {
    id: 'int',
    name: 'string',
    date: 'string',
  },
  primaryKey: 'id',
};

export const addNotes = (note: string, date: string) => {
  const realm = new Realm({
    path: 'myrealm',
    schema: [NotesSchema],
  });
  realm.write(() => {
    const noteObj = realm.create(SchemaName, {
      id: new Date().getMilliseconds(),
      name: note,
      date: date,
    });
    console.log(noteObj);
  });
};

export const getNotes = () => {
  const realm = new Realm({
    path: 'myrealm',
    schema: [NotesSchema],
  });
  return realm.objects(SchemaName)!.sorted('date', true);
};

export const getNotesByDate = (date: Date) => {
  const realm = new Realm({
    path: 'myrealm',
    schema: [NotesSchema],
  });
  let list = realm.objects(SchemaName);
  if (list.length > 0) {
    list = list.filtered(
      `date CONTAINS '${moment(date).format('YYYY-MM-DD')}'`,
    );
  }
  return list;
};
