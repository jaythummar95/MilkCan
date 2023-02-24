import {Box} from '../component/Box';
import {Text} from '../component/Text';
import {userFactory} from '../factory/UserFactory';
import {useEffect, useState} from 'react';
import {HistoryList} from '../model/HistoryList';

export const HistoryScreen = () => {
  const [historyList, setHistoryList] = useState(new HistoryList());

  const getHistoryFromDB = () => {
    userFactory.history().then(res => {
      console.log('response', res.data);
      setHistoryList(res.getValue());
    });
  };

  useEffect(() => {
    getHistoryFromDB();
  }, []);

  return (
    <Box>
      {historyList.map(() => {
        return <Text> History</Text>;
      })}
    </Box>
  );
};
