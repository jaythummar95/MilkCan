import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Box} from '../component/Box';
import {Screen} from '../component/Screen';
import {HomeHeader} from '../HomeHeader/HomeHeader';
import {FloatingButton} from '../component/Dashboard/FloatingButton';
import {DashboardCell} from '../component/Dashboard/DashboardCell';
import {addMilkEntry} from '../RealmDatabase/MilkEntryRealm';
import moment from 'moment';
import {userFactory} from '../factory/UserFactory';
import {MilkEntryList} from '../model/MilkEntryList';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../navigation/AppNavigation';
import {DateRenderPickers} from '../component/DateRenderPicker/DateRenderPickers';
import {ScrollView} from 'react-native';
import {Text} from '../component/Text';

export const DashboardScreen: React.FC = observer(() => {
  const {navigation} = useNavigation<StackNavigationProp<StackParamList>>();
  const {goBack} = useNavigation<StackNavigationProp<StackParamList>>();
  const [dateView, setDateViewVisible] = useState(false);
  const [date, setDate] = useState('');
  const [fat, setFat] = useState('');
  const [prize, setPrize] = useState('');
  const [liter, setLiter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);
  const [filterDataView, setfilterDataView] = useState(true);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState<MilkEntryList>(new MilkEntryList());
  const [milkListItems, setmilkListItems] = useState<MilkEntryList>(
    new MilkEntryList(),
  );

  console.log(
    'milkListItems',
    milkListItems.map(item => item.dateEntry),
  );
  const dataBaseOfMilkEntry = () => {
    const totals = parseInt(prize) * parseInt(fat) * parseInt(liter);
    addMilkEntry(date, liter, prize, fat, totals);
    setTimeout(() => {
      fetchMilkList();
    }, 100);
  };

  const fetchMilkList = () => {
    userFactory.milkList().then(res => {
      console.log('response', res.data);
      setmilkListItems(res.getValue());
    });
  };

  useEffect(() => {
    fetchMilkList();
  }, []);

  useEffect(() => {
    milkListItems;
  }, []);

  setTimeout(() => {
    totalMultiplay();
  }, 1000);

  const startEndDateFilter = () => {
    const data = milkListItems.filter(
      (item: any) =>
        moment(item.dateEntry).format('YYYY-MM-DD') >=
          moment(startDate).format('YYYY-MM-DD') &&
        moment(item.dateEntry).format('YYYY-MM-DD') <=
          moment(endDate).format('YYYY-MM-DD'),
    );
    setFilter(data);
    return data;
  };
  const totalMultiplay = () => {
    let sum = 0;
    console.log(
      'filter',
      filter.map(item => item.dateEntry),
    );
    filter.map(item => (sum += item.totalEntry));
    setTotal(sum);
  };

  return (
    <Screen>
      <Box flex={1}>
        <HomeHeader
          isMenu={true}
          label2={'MilkCan'}
          onFilterPress={() => {
            setDateViewVisible(!dateView);
          }}
        />
        <ScrollView>
          {dateView && (
            <DateRenderPickers
              startDate={startDate}
              endDate={endDate}
              openEnd={openEnd}
              openStart={openStart}
              onStartConfirm={dat => {
                const formattedTime = moment(dat).format('YYYY-MM-DD');
                setStartDate(formattedTime);
                setOpenStart(false);
              }}
              onEndConfirm={dat => {
                const formattedTime = moment(dat).format('YYYY-MM-DD');
                setEndDate(formattedTime);
                setOpenEnd(false);
              }}
              onPressCalanderEnd={() => {
                setOpenEnd(true);
              }}
              onPressCalanderStart={() => {
                setOpenStart(true);
              }}
              onCancelEnd={() => {
                setOpenEnd(true);
              }}
              onCancelStart={() => {
                setOpenStart(true);
              }}
              onFilter={() => {
                setDateViewVisible(false);
                if (startDate === '' && endDate === '') {
                  setfilterDataView(true);
                } else {
                  setfilterDataView(false);
                  startEndDateFilter();
                }
              }}
              onClear={() => {
                setStartDate('');
                setEndDate('');
                setfilterDataView(true);
                setDateViewVisible(false);
              }}
            />
          )}

          <DashboardCell
            milkList={milkListItems}
            ismilkList={filterDataView}
            filterList={filter}
          />
          <Box marginVertical={'s'} />
        </ScrollView>
        <FloatingButton
          fatValue={fat}
          literValue={liter}
          prizeValue={prize}
          dateValue={date}
          onChangeDate={text => {
            setDate(text);
          }}
          onChangeFat={text => {
            setFat(text);
          }}
          onChangeLiter={text => {
            setLiter(text);
          }}
          onChangePrize={text => {
            setPrize(text);
          }}
          onConfirm={dat => {
            const formattedTime = moment(dat).format('YYYY-MM-DD hh:mm:ss');
            setDate(formattedTime);
          }}
          onAddPress={() => {
            dataBaseOfMilkEntry();
            console.log('data');
            setDate('');
            setFat('');
            setLiter('');
            setPrize('');
          }}
        />
        {!filterDataView && (
          <Box backgroundColor={'primary'} alignItems={'center'}>
            <Text color={'bgColor'} fontSize={30}>
              Total:{total}
            </Text>
          </Box>
        )}
      </Box>
    </Screen>
  );
});
