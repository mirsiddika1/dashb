import * as React from 'react';
import { useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './App.css';
import Drawer from '@mui/material/Drawer';
import { ChevronLeft, ExpandMore, ExpandLess } from '@mui/icons-material';
import RackView from './components/RackView/RackView';
import Login from './components/Login/Login';

const dummyData = [
  {
    model: 'WAIPOUA1816',
    ssCode: 'SS-AMZ012-1234',
    serverN: '23093438',
    currentTest: 'IP: 127:0:0:1',
    location: 'Row A, Slot 23, Blade 40, Position 2',
    customer: 'FinalZCONFORM',
    operator: 'Matt S',
    status: 'pass',
    indicator: 'on',
    publishedBy: '2021-12-16'
  },
  {
    model: 'WAIPOUA1817',
    ssCode: 'SS-AMZ012-1255',
    serverN: '23093439',
    currentTest: 'IP: 127:0:0:1',
    location: 'Row A, Slot 23, Blade 40, Position 2',
    customer: 'CTCS',
    operator: 'MDaas',
    status: 'running',
    indicator: 'on',
    publishedBy: '2021-12-16'
  },
  {
    model: 'WAIPOUA1818',
    ssCode: 'SS-AMZ012-1235',
    serverN: '23093440',
    currentTest: 'IP: 127:0:0:1',
    location: 'Row A, Slot 23, Blade 40, Position 2',
    customer: 'ZT20',
    operator: 'Ketti',
    status: 'fail',
    indicator: 'on',
    publishedBy: '2021-12-17'
  },
  {
    model: 'WAIPOUA1816',
    ssCode: 'SS-AMZ012-1234',
    serverN: '23093438',
    currentTest: 'IP: 127:0:0:1',
    location: 'Row A, Slot 23, Blade 40, Position 2',
    customer: 'Nick',
    operator: 'Matt N',
    status: 'pass',
    indicator: 'off',
    publishedBy: '2021-12-18'
  },
  {
    model: 'WAIPOUA1820',
    ssCode: 'SS-AMZ012-1234',
    serverN: '23094418',
    currentTest: 'IP: 127:0:0:1',
    location: 'Row A, Slot 23, Blade 40, Position 2',
    customer: 'MDaas',
    operator: 'Devid',
    status: 'fail',
    indicator: 'off',
    publishedBy: '2021-12-18'
  },
  {
    model: 'WAIPOUA1816',
    ssCode: 'SS-AMZ012-1234',
    serverN: '23093438',
    currentTest: 'IP: 127:0:0:1',
    location: 'Row A, Slot 23, Blade 40, Position 2',
    customer: 'FinalZCONFORM',
    operator: 'Matt S',
    status: 'running',
    indicator: 'on',
    publishedBy: '2021-12-19'
  },
  {
    model: 'WAIPOUA1820',
    ssCode: 'SS-AMZ012-1234',
    serverN: '23094411',
    currentTest: 'IP: 127:0:0:1',
    location: 'Row A, Slot 23, Blade 40, Position 2',
    customer: 'MDaas',
    operator: 'Devid',
    status: 'fail',
    indicator: 'on',
    publishedBy: '2021-12-19'
  },
  {
    model: 'WAIPOUA1816',
    ssCode: 'SS-AMZ012-1234',
    serverN: '23093438',
    currentTest: 'IP: 127:0:0:1',
    location: 'Row A, Slot 23, Blade 40, Position 2',
    customer: 'FinalZCONFORM',
    operator: 'Matt S',
    status: 'running',
    indicator: 'on',
    publishedBy: '2021-12-19'
  },
]

function App() {
  const [server, setServer] = useState('server');
  const [isLoggedIn, setLogin] = useState(false);

  const onLogin = (values: any) => {
    console.log('vals', values);
    setLogin(true);
  }

  const handleChange = (event: SelectChangeEvent) => {
    setServer(event.target.value);
  };
  const [cardsData, setData] = useState(dummyData);

  const onFilter = (searchObj: any) => {
    // console.log('---', searchObj)
    const { model, status, ssCode, serverN, currentTest, location, operator, customer, indicator, sortBy } = searchObj;
    const filtered = dummyData.filter(item => {
      return (
        item.model.toLowerCase().indexOf(model.toLowerCase()) >= 0 &&
        item.status.toLowerCase().indexOf(status.toLowerCase()) >= 0 &&
        item.ssCode.toLowerCase().indexOf(ssCode.toLowerCase()) >= 0 &&
        item.serverN.toLowerCase().indexOf(serverN.toLowerCase()) >= 0 &&
        item.currentTest.toLowerCase().indexOf(currentTest.toLowerCase()) >= 0 &&
        item.location.toLowerCase().indexOf(location.toLowerCase()) >= 0 &&
        item.customer.toLowerCase().indexOf(customer.toLowerCase()) >= 0 &&
        item.indicator.toLowerCase().indexOf(indicator.toLowerCase()) >= 0 &&
        item.operator.toLowerCase().indexOf(operator.toLowerCase()) >= 0
      )
    });
    if (sortBy !== 'latest') {
      filtered.sort((a, b) => new Date(b.publishedBy) < new Date(a.publishedBy) ? 1 : -1);
    } else {
      filtered.sort((a, b) => new Date(b.publishedBy) > new Date(a.publishedBy) ? 1 : -1);
    }
    setData(filtered)
  }

  const [anchorState, setState] = React.useState(false);

  const toggleDrawer =
    (anchor: string, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState(open);
      };

  const [anchorStateHeader, setStateHeader] = React.useState(false);

  const toggleDrawerHeader =
    (anchor: string, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setStateHeader(open);
      };
  const [anchorStateFooter, setStateFooter] = React.useState(false);

  const toggleDrawerFooter =
    (anchor: string, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setStateFooter(open);
      };
  return (
    <>{
      !isLoggedIn ? <Login onLogin={onLogin} /> :

        (<div className="App">
          <>
            <div style={{ position: 'absolute', top: '0', left: '50%' }}>
              <ExpandMore onClick={toggleDrawerHeader('top', true)} style={{ cursor: 'pointer' }} />
            </div>
            <Drawer
              anchor={'top'}
              open={anchorStateHeader}
              onClose={toggleDrawerHeader('top', false)}
              hideBackdrop
              classes={{paper: 'drawer-paper'}}
            >
              <Header data={cardsData} toggleDrawerHeader={toggleDrawerHeader} setLogin={setLogin} />
            </Drawer>
          </>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: anchorStateHeader ? 70: 10 }}>
            {
              server === 'server' && (<Dashboard cardsData={cardsData} />)
            }
            {
              server === 'racks' && (<RackView />)
            }
            <>
              <div style={{ position: 'absolute', right: 0, top: '50%' }}>
                <ChevronLeft onClick={toggleDrawer('right', true)} style={{ cursor: 'pointer' }} />
              </div>
              <Drawer
                anchor={'right'}
                open={anchorState}
                onClose={toggleDrawer('right', false)}
              >
                <Sidebar toggleDrawer={toggleDrawer} onFilter={onFilter} />
              </Drawer>
            </>
          </div>
          <>
            <div style={{ position: 'absolute', bottom: '0', left: '50%' }}>
              <ExpandLess onClick={toggleDrawerFooter('bottom', true)} style={{ cursor: 'pointer' }} />
            </div>
            <Drawer
              anchor={'bottom'}
              open={anchorStateFooter}
              onClose={toggleDrawerFooter('bottom', false)}
              hideBackdrop
              classes={{paper: 'drawer-paper'}}
              // style={{backgroundColor: '#f4f4f4', boxShadow: 'none'}}
            >
              <>
              <div style={{ position: 'absolute', left: '50%', top: 0 }}>
                    <ExpandMore onClick={toggleDrawerFooter('bottom', false)} style={{ cursor: 'pointer' }} />
                </div>
              <div className="bottom-sec">
                <div className="bottom-title">WORLDWIDE | NJ | 4050 | </div>
                <FormControl sx={{ m: 1, minWidth: 120, ml: '5px !important' }}>
                  <Select
                    value={server}
                    onChange={handleChange}
                    displayEmpty
                    // style={{ padding: '10px 0 5px' }}
                    className="bottom-select"
                    classes={{ select: 'select-cls' }}
                  >
                    <MenuItem value={'server'}>SERVER ROOM Server</MenuItem>
                    <MenuItem value={'racks'}>SERVER ROOM Racks</MenuItem>
                    <MenuItem value={'row'}>SERVER ROOM Row</MenuItem>
                  </Select>
                </FormControl>
              </div>
              </>
            </Drawer>
          </>

        </div>)
    }
    </>
  );
}

export default App;
