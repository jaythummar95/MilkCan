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
import {DateRenderPickers} from '../component/DateRenderPicker/DateRenderPickers';
import {ScrollView} from 'react-native';
import {Text} from '../component/Text';
import {showErrorMessage, showSuccessMessage} from '../core/Utisl';
import {Milk} from '../model/Milk';
import {fonts} from '../style/Fonts';
import {Storage} from '../core/Storage';
import {
  refSideMenu,
  showSideMenu,
  SideMenu,
} from '../component/SideMenu/SideMenu';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../navigation/AppNavigation';
import {Pressable} from '../component/Pressable';
import {addHistory} from '../RealmDatabase/HistoryRealm';

export const DashboardScreen: React.FC = observer(() => {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
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
    if (prize && fat && liter && date) {
      const totals = parseInt(prize) * parseInt(fat) * parseInt(liter);
      addMilkEntry(date, liter, prize, fat, totals);
      setTimeout(() => {
        fetchMilkList();
      }, 100);
    } else {
      showErrorMessage('Please enter all required values');
    }
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

  useEffect(() => {}, [milkListItems]);

  const getDateYYYMMDD = (dateString: string) => {
    return moment(moment(dateString).format('YYYY-MM-DD')).toDate();
  };

  const startEndDateFilter = () => {
    const data = milkListItems.getFilteredList(
      (item: Milk) =>
        getDateYYYMMDD(item.dateEntry) >= getDateYYYMMDD(startDate) &&
        getDateYYYMMDD(item.dateEntry) <= getDateYYYMMDD(endDate),
      new MilkEntryList(),
    );

    let sum = 0;
    data.map(item => (sum += item.totalEntry));

    setTotal(sum);
    setFilter(data);
  };
  return (
    <Screen>
      <Box flex={1}>
        <HomeHeader
          isMenu={true}
          onMenuPress={() => showSideMenu()}
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
                setStartDate(moment(dat).format('YYYY-MM-DD hh:mm:ss'));
                setOpenStart(false);
              }}
              onEndConfirm={dat => {
                setEndDate(moment(dat).format('YYYY-MM-DD hh:mm:ss'));
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
            Storage.setItemAsync(Storage.keys.fatPrice, text);
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
          onDismiss={() => {
            setDate('');
            setFat('');
            setLiter('');
            setPrize('');
          }}
        />
        {!filterDataView && (
          <Box>
            <Box
              backgroundColor={'primary'}
              alignItems={'center'}
              marginBottom={'sr'}
              height={48}
              borderRadius={5}
              justifyContent={'center'}
              marginHorizontal={'sr'}>
              <Text color={'bgColor'} fontSize={20} fontFamily={fonts.regular}>
                {`Total : ${total} `}
              </Text>
            </Box>
            <Box flexDirection={'row'}>
              <Pressable
                flex={1}
                onPress={() => {
                  addHistory(
                    moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
                    startDate,
                    endDate,
                    total,
                  );
                  showSuccessMessage('History added successfully');
                }}
                backgroundColor={'primary'}
                alignItems={'center'}
                marginBottom={'sr'}
                height={48}
                borderRadius={5}
                justifyContent={'center'}
                marginStart={'sr'}
                marginRight={'es'}>
                <Text
                  color={'bgColor'}
                  fontSize={16}
                  fontFamily={fonts.regular}>
                  {'Save to history'}
                </Text>
              </Pressable>
              <Pressable
                flex={1}
                onPress={() => {
                  //TODO: Export
                }}
                backgroundColor={'primary'}
                alignItems={'center'}
                marginBottom={'sr'}
                height={48}
                borderRadius={5}
                justifyContent={'center'}
                marginEnd={'sr'}
                marginStart={'es'}>
                <Text
                  color={'bgColor'}
                  fontSize={16}
                  fontFamily={fonts.regular}>
                  {'Export'}
                </Text>
              </Pressable>
            </Box>
          </Box>
        )}
      </Box>
      <SideMenu ref={refSideMenu} navigation={navigation} />
    </Screen>
  );
});
