import * as React from 'react';
import { Link, Switch, BrowserRouter as Router, Route, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import Header from './components/Header/Header';
// import MenuItem from '@mui/material/MenuItem';
import './App.css';
import Drawer from '@mui/material/Drawer';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import RackView from './components/RackView/RackView';
import RowView from './components/RowView/RowView';
import Login from './components/Login/Login';
import { DashboardAction } from './store/reducer';
import { Menu, MenuItem } from "@material-ui/core";
import NestedMenuItem from "material-ui-nested-menu-item";

// -------------------------------------------------------------------------------------------------------------------------------
//Global Summart Import
import GlobalSummaryComponent from 'components/GlobalSummary/Global_Sum';
//United States Summary Import
import UnitedStatesSummaryComponent from 'components/GlobalSummary/UnitedStatesSummary/US_Sum';

// -------------------------------------------------------------------------------------------------------------------------------
//US:4050 Factory Summary Import
import Factory4050SummaryComponent from 'components/GlobalSummary/UnitedStatesSummary/F4050Summary/Factory4050_Sum';

//US:4050 Factory L10 Imports
import Factory4050L10ServerComponent from 'components/GlobalSummary/UnitedStatesSummary/F4050Summary/F4050_L10Sum/F4050_L10Server';
import Factory4050L10RackComponent from 'components/GlobalSummary/UnitedStatesSummary/F4050Summary/F4050_L10Sum/F4050_L10Rack';
import Factory4050L10RowComponent from 'components/GlobalSummary/UnitedStatesSummary/F4050Summary/F4050_L10Sum/F4050_L10Row';
import Factory4050L10SummaryComponent from 'components/GlobalSummary/UnitedStatesSummary/F4050Summary/F4050_L10Sum/F4050_L10Summary';

//US:4050 Factory L11 Imports
import Factory4050L11ServerComponent from 'components/GlobalSummary/UnitedStatesSummary/F4050Summary/F4050_L11Sum/F4050_L11Server';
import Factory4050L11RackComponent from 'components/GlobalSummary/UnitedStatesSummary/F4050Summary/F4050_L11Sum/F4050_L11Rack';
import Factory4050L11RowComponent from 'components/GlobalSummary/UnitedStatesSummary/F4050Summary/F4050_L11Sum/F4050_L11Row';
import Factory4050L11SummaryComponent from 'components/GlobalSummary/UnitedStatesSummary/F4050Summary/F4050_L11Sum/F4050_L11Summary';

// ---------------------------------------------------------------------------------------------------------------------------------
//US:350 Factory Summary Import
import Factory350SummaryComponent from 'components/GlobalSummary/UnitedStatesSummary/F350Summary/Factory350_Sum';

//US:350 Factory L10 Imports
import Factory350L10ServerComponent from 'components/GlobalSummary/UnitedStatesSummary/F350Summary/F350_L10Sum/F350_L10Server';
import Factory350L10RackComponent from 'components/GlobalSummary/UnitedStatesSummary/F350Summary/F350_L10Sum/F350_L10Rack';
import Factory350L10RowComponent from 'components/GlobalSummary/UnitedStatesSummary/F350Summary/F350_L10Sum/F350_L10Row';
import Factory350L10SummaryComponent from 'components/GlobalSummary/UnitedStatesSummary/F350Summary/F350_L10Sum/F350_L10Summary';

//US:350 Factory L11 Imports
import Factory350L11ServerComponent from 'components/GlobalSummary/UnitedStatesSummary/F350Summary/F350_L11Sum/F350_L11Server';
import Factory350L11RackComponent from 'components/GlobalSummary/UnitedStatesSummary/F350Summary/F350_L11Sum/F350_L11Rack';
import Factory350L11RowComponent from 'components/GlobalSummary/UnitedStatesSummary/F350Summary/F350_L11Sum/F350_L11Row';
import Factory350L11SummaryComponent from 'components/GlobalSummary/UnitedStatesSummary/F350Summary/F350_L11Sum/F350_L11Summary';



const sectionTitle: any = {
  "server": "Intelligent Factory Dashboard",
  "racks": "Intelligent Factory Dashboard",
  "row": "Row"
}

const rackData: any = [
  { val: 'A' },
  { val: 'B' },
  { val: 'C' },
  { val: 'D' },
  { val: 'E' },
  { val: 'F' },
];

const sourceData = [
  {
    id: '1',
    model: '8.2 XIO',
    indexVal: 'm12345',
    repairStatus: 'Yes',
    row: 'A',
    slotNumber: '30',
    bladeNumber: '1',
    position: '2',
    publishedBy: '2021-12-11',
    ssCode: 'SS-AMZ012-1234',
    serverN: '20724093438',
    label: '//Storage',
    currentTest: 'Current IP: 127.0.0.1',
    location: 'Row A, Slot 30, Blade 1, Position 2',
    test: 'MDaas',
    operator: 'Matt S',
    status: 'pass',
    indicator: 'on',
    isRepair: true,
    highlight: false,
    slot: "A1",
    value: 1,
    rackColor: '#43E955',
    filledStatus: "Empty",
    timeRange: 2,
    server: "6",
    mserial: "M34249",
    type: 'single',
    opacity: 1,
    section: "UTILITY",
    rowColor: '#00CEC933',
    rackNumber: '1'
  },
  {
    id: '2',
    model: 'WAIPOUA1818',
    indexVal: 'm12348',
    repairStatus: 'Yes',
    row: 'A',
    slotNumber: '30',
    bladeNumber: '2',
    position: '2',
    publishedBy: '2021-12-11',
    ssCode: 'SS-AMZ012-1234',
    serverN: '20725093439',
    currentTest: 'Current IP: 127.0.0.1',
    location: 'Row A, Slot 30, Blade 2, Position 2',
    test: 'FinalZCONFORM',
    operator: 'Devit',
    status: 'fail',
    indicator: 'off',
    isRepair: true,
    highlight: false,
    slot: "A30",
    value: 30,
    rackColor: '#33D8D4',
    filledStatus: "Empty",
    timeRange: 1,
    server: "6",
    mserial: "M34248",
    type: 'single',
    opacity: 1,
    section: "COMPUTE",
    rowColor: '#00CEC933',
    rackNumber: '1'
  },
  {
    id: '3',
    model: 'WAIPOUA1817',
    indexVal: 'm44456',
    repairStatus: 'Yes',
    row: 'A',
    slotNumber: '32',
    bladeNumber: '3',
    position: '1',
    publishedBy: '2021-12-11',
    ssCode: 'SS-AMZ012-1234',
    serverN: '20726093448',
    currentTest: 'Current IP: 127.0.0.1',
    location: 'Row A, Slot 32, Blade 3, Position 1',
    test: 'FinalZCONFORM',
    operator: 'Matt S',
    status: 'running',
    indicator: 'on',
    isRepair: true,
    highlight: false,
    slot: "A3",
    value: 3,
    isMultiple: true,
    rackColor: '#33D8D4',
    filledStatus: "Empty",
    timeRange: 12,
    server: "5",
    mserial: "M34249",
    type: 'single',
    opacity: 1,
    section: "UTILITY",
    rowColor: '#00CEC933',
    rackNumber: '2'
  },
  {
    id: '3',
    model: 'WAIPOUA1817',
    indexVal: 'm44456',
    repairStatus: 'Yes',
    row: 'A',
    slotNumber: '32',
    bladeNumber: '4',
    position: '1',
    publishedBy: '2021-12-11',
    ssCode: 'SS-AMZ012-1234',
    serverN: '20726093448',
    currentTest: 'Current IP: 127.0.0.1',
    location: 'Row A, Slot 32, Blade 4, Position 1',
    test: 'FinalZCONFORM',
    operator: 'Matt S',
    status: 'empty',
    indicator: 'on',
    isRepair: true,
    highlight: false,
    slot: "A32",
    value: 3,
    isMultiple: true,
    rackColor: '#33D8D4',
    filledStatus: "Empty",
    timeRange: 12,
    server: "5",
    mserial: "M34249",
    type: 'single',
    opacity: 1,
    section: "UTILITY",
    rowColor: '#00CEC933',
    rackNumber: '2',
    isSlave: true
  },
  {
    id: '4',
    model: '7.1 XSTORE',
    indexVal: 'm33445',
    repairStatus: 'Yes',
    row: 'A',
    slotNumber: '32',
    bladeNumber: '5',
    position: '2',
    label: '//Utility',
    publishedBy: '2021-12-11',
    ssCode: 'SS-AMZ012-1234',
    serverN: '20723093438',
    currentTest: 'Current IP: 127.0.0.1',
    location: 'Row A, Slot 32, Blade 5, Position 2',
    test: 'Nick',
    operator: 'Devit',
    status: 'fail',
    indicator: 'on',
    isRepair: true,
    highlight: false,
    slot: "A2",
    value: 2,
    rackColor: '#ED6746',
    filledStatus: "Empty",
    timeRange: 11,
    isMultiple: true,
    server: "5",
    mserial: "M34249",
    type: 'single',
    opacity: 1,
    section: "UTILITY",
    rowColor: '#00CEC933',
    rackNumber: '2'
  },
  {
    id: '5',
    model: 'WAIPOUA1816',
    indexVal: 'm11223',
    repairStatus: 'No',
    row: 'A',
    slotNumber: '32',
    bladeNumber: '6',
    position: '2',
    publishedBy: '2021-12-11',
    ssCode: 'SS-AMZ012-1234',
    serverN: '20723093438',
    currentTest: ' Current IP: 127.0.0.1',
    location: 'Row A, Slot 32, Blade 6, Position 2',
    test: 'FinalZCONFORM',
    operator: 'Devit',
    status: 'fail',
    indicator: 'off',
    isRepair: false,
    highlight: false,
    slot: "A32",
    value: 32,
    rackColor: '#ED6746',
    filledStatus: "Empty",
    timeRange: 10,
    isMultiple: true,
    server: "5",
    mserial: "M34249",
    type: 'single',
    opacity: 1,
    section: "UTILITY",
    rowColor: '#00CEC933',
    rackNumber: '2'
  },
  {
    id: '25',
    model: 'WAIPOUA1816',
    indexVal: 'm234333',
    repairStatus: 'No',
    row: 'A',
    slotNumber: '32',
    bladeNumber: '7',
    position: '2',
    publishedBy: '2021-12-11',
    ssCode: 'SS-AMZ012-1234',
    serverN: '20723093438',
    currentTest: ' Current IP: 127.0.0.1',
    location: 'Row A, Slot 32, Blade 7, Position 2',
    test: 'Test IT',
    operator: 'Devit',
    status: 'fail',
    indicator: 'off',
    isRepair: false,
    highlight: false,
    isSlave: true,
    isMultiple: true,
    slot: "A32",
    value: 32,
    rackColor: '#ED6746',
    filledStatus: "Empty",
    timeRange: 10,
    server: "5",
    mserial: "M34249",
    type: 'single',
    opacity: 1,
    section: "UTILITY",
    rowColor: '#00CEC933',
    rackNumber: '2'
  },
  {
    id: '65',
    model: 'WAIPOUA1816',
    indexVal: 'm234333',
    repairStatus: 'No',
    row: 'A',
    slotNumber: '32',
    bladeNumber: '8',
    position: '3',
    publishedBy: '2021-12-11',
    ssCode: 'SS-AMZ012-1234',
    serverN: '20723093438',
    currentTest: ' Current IP: 127.0.0.1',
    location: 'Row A, Slot 32, Blade 8, Position 3',
    test: 'Test IT',
    operator: 'Devit',
    status: 'fail',
    indicator: 'off',
    isRepair: false,
    highlight: false,
    isMultiple: true,
    isSlave: true,
    slot: "A32",
    value: 32,
    rackColor: '#ED6746',
    filledStatus: "Empty",
    timeRange: 10,
    server: "5",
    mserial: "M34249",
    type: 'single',
    opacity: 1,
    section: "UTILITY",
    rowColor: '#00CEC933',
    rackNumber: '2'
  },
  {
    id: '6',
    model: 'WAIPOUA1817',
    indexVal: 'm22113',
    repairStatus: 'No',
    row: 'A',
    slotNumber: '49',
    bladeNumber: '9',
    position: '2',
    publishedBy: '2021-12-11',
    ssCode: 'SS-AMZ012-1234',
    serverN: '20723093438',
    currentTest: 'Current IP: 127.0.0.1',
    location: 'Row A, Slot 49, Blade 9, Position 2',
    test: 'CTCS',
    operator: 'Devit',
    status: 'pass',
    indicator: 'off',
    isRepair: false,
    highlight: false,
    slot: "A29",
    value: 29,
    rackColor: '#43E955',
    filledStatus: "Empty",
    timeRange: 9,
    server: "4",
    mserial: "M34249",
    type: 'single',
    opacity: 1,
    section: "UTILITY",
    rowColor: '#00CEC933',
    rackNumber: '2'
  },
  {
    id: '7',
    model: 'WAIPOUA1816',
    indexVal: 'm33221',
    repairStatus: 'No',
    row: 'A',
    slotNumber: '36',
    bladeNumber: '10',
    position: '3',
    publishedBy: '2021-12-11',
    ssCode: 'SS-AMZ012-1234',
    serverN: '20723093438',
    currentTest: 'Current IP: 127.0.0.1',
    location: 'Row A, Slot 36, Blade 10, Position 3',
    test: 'FinalZCONFORM',
    operator: 'Devit',
    status: 'running',
    indicator: 'off',
    isRepair: false,
    highlight: false,
    slot: "A36",
    value: 36,
    rackColor: '#33D8D4',
    filledStatus: "Empty",
    timeRange: 7,
    server: "3",
    mserial: "M34249",
    type: 'single',
    opacity: 1,
    section: "UTILITY",
    rowColor: '#00CEC933',
    rackNumber: '1'
  },
  {
    id: '8',
    model: '7.1 COMPUTE T4',
    indexVal: 'm55443',
    repairStatus: 'No',
    row: 'A',
    slotNumber: '36',
    bladeNumber: '11',
    position: '2',
    publishedBy: '2021-12-11',
    ssCode: 'SS-AMZ012-1234',
    serverN: '20723093438',
    currentTest: 'Current IP: 127.0.0.1',
    location: 'Row A, Slot 36, Blade 11, Position 2',
    test: 'FinalZCONFORM',
    operator: 'Devit',
    label: '//Compute',
    status: 'pass',
    indicator: 'off',
    isRepair: false,
    highlight: false,
    slot: "A24",
    value: 24,
    rackColor: '#43E955',
    filledStatus: "Empty",
    timeRange: 6,
    server: "3",
    mserial: "M34249",
    type: 'single',
    opacity: 1,
    section: "UTILITY",
    rowColor: '#00CEC933',
    rackNumber: '2'
  },
  {
    id: '9',
    model: 'WAIPOUA1818',
    indexVal: 'm12346',
    repairStatus: 'No',
    row: 'A',
    slotNumber: '41',
    bladeNumber: '12',
    position: '2',
    publishedBy: '2021-12-11',
    ssCode: 'SS-AMZ012-1234',
    serverN: '20723093438',
    currentTest: 'Current IP: 127.0.0.1',
    location: 'Row A, Slot 41, Blade 12, Position 2',
    test: 'FinalZCONFORM',
    operator: 'Devit',
    status: 'fail',
    indicator: 'off',
    isRepair: false,
    highlight: false,
    slot: "A33",
    value: 33,
    rackColor: '#ED6746',
    filledStatus: "Empty",
    timeRange: 5,
    server: "2",
    mserial: "M34249",
    type: 'single',
    opacity: 1,
    section: "UTILITY",
    rowColor: '#00CEC933',
    rackNumber: '2'
  },
  {
    id: '10',
    model: 'WAIPOUA1816',
    indexVal: 'm55667',
    repairStatus: 'No',
    row: 'A',
    slotNumber: '41',
    bladeNumber: '13',
    position: '2',
    publishedBy: '2021-12-11',
    ssCode: 'SS-AMZ012-1234',
    serverN: '20723093438',
    currentTest: 'Current IP: 127.0.0.1',
    location: 'Row A, Slot 41, Blade 13, Position 2',
    test: 'FinalZCONFORM',
    operator: 'Devit',
    status: 'running',
    indicator: 'off',
    isRepair: false,
    highlight: false,
    slot: "A41",
    value: 41,
    rackColor: '#33D8D4',
    filledStatus: "Empty",
    timeRange: 4,
    server: "2",
    mserial: "M34249",
    type: 'single',
    opacity: 1,
    section: "UTILITY",
    rowColor: '#00CEC933',
    rackNumber: '2'
  },
  {
    id: '11',
    model: 'WAIPOUA1817',
    indexVal: 'm99887',
    repairStatus: 'No',
    row: 'A',
    slotNumber: '26',
    bladeNumber: '14',
    position: '2',
    publishedBy: '2021-12-11',
    ssCode: 'SS-AMZ012-1234',
    serverN: '20723093438',
    currentTest: 'Current IP: 127.0.0.1',
    location: 'Row A, Slot 26, Blade 14, Position 2',
    test: 'FinalZCONFORM',
    operator: 'Devit',
    status: 'pass',
    indicator: 'off',
    isRepair: false,
    highlight: false,
    slot: "A20",
    value: 20,
    rackColor: '#43E955',
    filledStatus: "Empty",
    timeRange: 3,
    server: "1",
    mserial: "M34249",
    type: 'single',
    opacity: 1,
    section: "UTILITY",
    rowColor: '#00CEC933',

  },
  {
    id: '12',
    model: 'WAIPOUA1818',
    indexVal: 'm55443',
    repairStatus: 'No',
    row: 'A',
    slotNumber: '26',
    bladeNumber: '15',
    position: '2',
    publishedBy: '2021-12-11',
    ssCode: 'SS-AMZ012-1234',
    serverN: '20723093438',
    currentTest: 'Current IP: 127.0.0.1',
    location: 'Row A, Slot 26, Blade 15, Position 2',
    test: 'PreZConform',
    operator: 'Devit',
    status: 'fail',
    indicator: 'off',
    isRepair: false,
    highlight: false,
    slot: "A26",
    value: 26,
    rackColor: '#ED6746',
    filledStatus: "Empty",
    timeRange: 2,
    server: "1",
    mserial: "M34249",
    type: 'single',
    opacity: 1,
    section: "UTILITY",
    rowColor: '#00CEC933',

  },
  {
    id: '13',
    model: 'WAIPOUA185',
    indexVal: 'm22113',
    repairStatus: 'No',
    row: 'A',
    slotNumber: '49',
    bladeNumber: '16',
    position: '2',
    publishedBy: '2021-12-11',
    ssCode: 'SS-AMZ012-1234',
    serverN: '20723093438',
    currentTest: 'Current IP: 127.0.0.1',
    location: 'Row A, Slot 49, Blade 16, Position 2',
    test: 'CTCS',
    operator: 'Devit',
    status: 'notstarted',
    indicator: 'off',
    isRepair: false,
    highlight: false,
    slot: "A49",
    value: 49,
    rackColor: '#FAF8C7',
    filledStatus: "Empty",
    timeRange: 9,
    server: "4",
    mserial: "M34249",
    type: 'single',
    opacity: 1,
    section: "UTILITY",
    rowColor: '#00CEC933',
    rackNumber: '2'
  },
];


const App = () => {
  const [server, setServer] = useState('server');
  const [isLoggedIn, setLogin] = useState(false); //should be false
  const [rackId, setRackId] = useState('');
  const [rowVal, setRowVal] = useState<any>('');
  const [selectedData, setSelectedData] = useState<any>([]);
  const [anchorStateHeader, setStateHeader] = React.useState(true);
  const history = useHistory();



  const onLogin = (values: any) => {
    console.log('vals', values);
    //api 
    setLogin(true);
    let item: any = { loggedIn: true, token: "" };
    const action: DashboardAction = {
      type: "authentication",
      payload: item
    };
    history.push('/root')
    //dispatch
  }

  const [globalView, setGlobalView] = useState<any>('GLOBAL');  //global
  const [countryView, setCountryView] = useState<any>(null); //US:CN:NL
  const [factoryView, setFactoryView] = useState<any>(null); //United States Factories 350:4050 | China Factories... | Netherland Factories...
  const [levelView, setLevelView] = useState<any>(null); //United States Factories 350 -> L10 or L11 || 4050 -> L10 or L11  | China Factories... | Netherland Factories...
  const [CurrMenuView, setCurrMenuView] = useState<any>(null);  //United States Factories 350 -> L10 or L11 -> Summary,Server,Rack,Room ...

  const [factories, setFactories] = useState<any>([]); //Used to filter out factory options based on country ex. U.S - F350,F450
  const [levels, setLevels] = useState<any>([{}]); //Used to filter out level options based on factory selected: ex. L10,L11

  const [globalPosition, setGlobalPosition] = useState<any>(null);
  const [countryPosition, setCountryPosition] = useState<any>(null);
  const [factoryPosition, setFactoryPosition] = useState<any>(null);
  const [levelPosition, setLevelPosition] = useState<any>(null);
  // const [currMenuPosition, setCurrMenuPosition] = useState('SERVER ROOM - SERVER');


  //Define user path based upon URL Change and update footer menu.
  // useEffect(() => {
  //   return history.listen((location) => { 
  //     console.log(`You changed the page to: ${location.pathname}`) 
  //     let currentPath = location.pathname;
  //     console.log("Country is: " + currentPath.split("/")[2]);
  //   }) 
  // },[history])


  const handleClick = (event: React.MouseEvent, val: any, listener: any) => {
    if (val) {
      return;
    }
    event.preventDefault();
    listener({
      top: event.pageY,
      left: event.pageX
    });
  };
  
  const handleItemClick = (event: React.MouseEvent | null, value: any, routeValue: string, rowValue?: string) => {
      if(value.country === 'U.S' || value.country === "C.N" || value.country == "N.L" || value.country === "GLOBAL"){
        if(value.country === 'U.S'){
          setCountryView(value.country);
          setFactoryView(null);
          setLevelView(null);
          setCurrMenuView(null);
          setFactories(['F350', 'F4050']);
          console.log('Country Value Set To: ' + value.country )
          if(value.factory === 'F350' || value.factory === 'F4050' ){
            console.log('Factory Value Set To: ' + value.factory )
            setFactoryView(value.factory);
            setLevelView(null);
            setCurrMenuView(null);
            setLevels(['L10', 'L11']);
            if(value.level === 'L10' || value.level === 'L11'){
              console.log('Level Value Set To: ' + value.level )
              setLevelView(value.level);
              setCurrMenuView(null);
              if(value.currMenu === 'SERVER ROOM - SERVER'){
                console.log('Current Menu Set To: ' + value.currMenu);
                setCurrMenuView(value.currMenu);
                setServer('server')
                setRowVal(rowValue);


              }
              else if(value.currMenu === 'SERVER ROOM - RACK'){
                console.log('Current Menu Set To: ' + value.currMenu);
                setCurrMenuView(value.currMenu);
                setServer('racks')
                setRowVal(rowValue);

              }  
                
              else if(value.currMenu === `SERVER ROOM - ROW A` || value.currMenu === `SERVER ROOM - ROW B` || 
                value.currMenu === `SERVER ROOM - ROW C` || value.currMenu === `SERVER ROOM - ROW D`||
                value.currMenu === `SERVER ROOM - ROW E` || value.currMenu === `SERVER ROOM - ROW F`
              ){
                console.log('Current Menu Set To: ' + value.currMenu);
                setCurrMenuView(value.currMenu);
                setServer('row')
                setRowVal(rowValue);
                
                
              }
            }
          }
        }
        if(value.country === 'C.N'){
          setCountryView(value.country);
          setFactoryView(null);
          setLevelView(null);
          setCurrMenuView(null);
          setFactories(['CN-F1','CN-F2']);
          if(value.factory === 'CN-F1' || value.factory === 'CN-F2' ){
            console.log('Factory Value Set To: ' + value.factory )
            setFactoryView(value.factory);
            setLevelView(null);
            setCurrMenuView(null);
            setLevels(['CN-L10', 'CN-L11']);
            if(value.level === 'CN-L10' || value.level === 'CN-L11'){
              console.log('Level Value Set To: ' + value.level )
              setLevelView(value.level);
              setCurrMenuView(null);
              if(value.currMenu === 'SERVER ROOM - SERVER'){
                console.log('Current Menu Set To: ' + value.currMenu);
                setCurrMenuView(value.currMenu);
                setServer('server')
                setRowVal(rowValue);


              }
              else if(value.currMenu === 'SERVER ROOM - RACK'){
                console.log('Current Menu Set To: ' + value.currMenu);
                setCurrMenuView(value.currMenu);
                setServer('racks')
                setRowVal(rowValue);

              }  
                
              else if(value.currMenu === `SERVER ROOM - ROW A` || value.currMenu === `SERVER ROOM - ROW B` || 
                value.currMenu === `SERVER ROOM - ROW C` || value.currMenu === `SERVER ROOM - ROW D`||
                value.currMenu === `SERVER ROOM - ROW E` || value.currMenu === `SERVER ROOM - ROW F`
              ){
                console.log('Current Menu Set To: ' + value.currMenu);
                setCurrMenuView(value.currMenu);
                setServer('row')
                setRowVal(rowValue);
              }
            }
          }
        }
        if(value.country === 'N.L'){
          setCountryView(value.country);
          setFactoryView(null);
          setLevelView(null);
          setCurrMenuView(null);
          setFactories(['NL-F1','NL-F2']);
          if(value.factory === 'NL-F1' || value.factory === 'NL-F2' ){
            console.log('Factory Value Set To: ' + value.factory )
            setFactoryView(value.factory);
            setLevelView(null);
            setCurrMenuView(null);
            setLevels(['NL-L10', 'NL-L11']);
            if(value.level === 'NL-L10' || value.level === 'NL-L11'){
              console.log('Level Value Set To: ' + value.level )
              setLevelView(value.level);
              setCurrMenuView(null);
              if(value.currMenu === 'SERVER ROOM - SERVER'){
                console.log('Current Menu Set To: ' + value.currMenu);
                setCurrMenuView(value.currMenu);
                setServer('server')
                setRowVal(rowValue);


              }
              else if(value.currMenu === 'SERVER ROOM - RACK'){
                console.log('Current Menu Set To: ' + value.currMenu);
                setCurrMenuView(value.currMenu);
                setServer('racks')
                setRowVal(rowValue);

              }  
                
              else if(value.currMenu === `SERVER ROOM - ROW A` || value.currMenu === `SERVER ROOM - ROW B` || 
                value.currMenu === `SERVER ROOM - ROW C` || value.currMenu === `SERVER ROOM - ROW D`||
                value.currMenu === `SERVER ROOM - ROW E` || value.currMenu === `SERVER ROOM - ROW F`
              ){
                console.log('Current Menu Set To: ' + value.currMenu);
                setCurrMenuView(value.currMenu);
                setServer('row')
                setRowVal(rowValue);
              }
            }
          }
        }
        if(value.country === 'GLOBAL'){
          setCountryView(null);
          setFactoryView(null);
          setLevelView(null);
          setCurrMenuView(null);
        }

      }
    // setMenuPosition(null);
    // setCurrentMenu(value);
    // setRowVal(rowValue);
    handleChange(routeValue);
  };

  const handleChange = (value: string) => {
    history.push(`/${value}`);
  };

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
  const [anchorStateFooter, setStateFooter] = React.useState(true);

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
              classes={{ paper: 'drawer-paper' }}
            >

              <Header data={selectedData} toggleDrawerHeader={toggleDrawerHeader} setLogin={setLogin} title={server !== 'row' ? sectionTitle[`${server}`] : `${sectionTitle[`${server}`]} ${rowVal}`} />
            </Drawer>
          </>
          <div className="view-container" style={{ display: 'flex', flexDirection: 'column', marginTop: anchorStateHeader ? 70 : 10 }}>

            <Switch>
              {/* ---------------------------------- Global Summary Section ----------------------------------------------*/}
              {/* /root : RENDER GLOBAL SUMMARY PAGE */}
              <Route exact path="/root">
                  <GlobalSummaryComponent />
              </Route>


              {/* ---------------------------------- United States Summary Section ----------------------------------------------*/}
              {/* /root/US-Sum : RENDER U.S SUMMARY */}
              <Route exact path ="/root/U.S-Sum">
                <UnitedStatesSummaryComponent/>
              </Route>


              {/* -----------------------------------US:4050------------------------------------------- */} 
              {/* /Root/US_Sum/F4050 : RENDER FACTORY 4050 SUMMARY */}
              <Route exact path ="/root/U.S-Sum/F4050">
                <Factory4050SummaryComponent/>
              </Route>

              {/* -----------------------------------US:4050 L11 ------------------------------------------- */}

              {/* /root/US-Sum/F4050/L11-Summary : RENDER FACTORY 4050 L11 SUMMARY */}
              <Route exact path ="/root/U.S-Sum/F4050/L11-Summary">
                <Factory4050L11SummaryComponent/>
              </Route>

              {/* /root/US-Sum/F4050/L11-Server : RENDER 4050 L11 SERVER */}
              <Route exact path ="/root/U.S-Sum/F4050/L11-Server">
                <Factory4050L11ServerComponent/>
              </Route>

              {/* /root/US-Sum/F4050/L11-Rack : RENDER 4050 L11 RACK */}
              <Route exact path ="/root/U.S-Sum/F4050/L11-Rack">
                <Factory4050L11RackComponent/>
              </Route>
              
              {/* /root/US-Sum/F4050/L11-Row : RENDER 4050 L11 ROW */}
              <Route exact path ="/root/U.S-Sum/F4050/L11-Row">
                <Factory4050L11RowComponent/>
              </Route>

              {/* -----------------------------------US:4050 L10 ------------------------------------------- */}
              
              {/* /root/US-Sum/F4050/L10-Summary : RENDER FACTORY 4050 L10 SUMMARY */}
              <Route exact path ="/root/U.S-Sum/F4050/L10-Summary">
                <Factory4050L10SummaryComponent/>
              </Route>

              {/* /root/US-Sum/F4050/L10-Server : RENDER 4050 L10 SERVER */}
              <Route exact path ="/root/U.S-Sum/F4050/L10-Server">
                <Factory4050L10ServerComponent/>
              </Route>

              {/* /root/US-Sum/F4050/L10-Rack : RENDER 4050 L10 Rack */}
              <Route exact path ="/root/U.S-Sum/F4050/L10-Rack">
                <Factory4050L10RackComponent/>
              </Route>

              {/* /root/US-Sum/F4050/L10-Row : RENDER 4050 L10 ROW */}
              <Route exact path ="/root/U.S-Sum/F4050/L10-Row">
                <Factory4050L10RowComponent/>
              </Route>


              {/* -----------------------------------US:350------------------------------------------- */} 
              {/* /root/US-Sum/F350 : RENDER FACTORY 350 SUMMARY */}
              <Route exact path ="/root/U.S-Sum/F350">
                <Factory350SummaryComponent/>
              </Route>

              {/* -----------------------------------US:350 L10 ------------------------------------------- */}

              {/* /root/US-Sum/F350/L10-Summary : RENDER FACTORY 350 L10 SUMMARY */}
              <Route exact path ="/root/U.S-Sum/F350/L10-Summary">
                <Factory350L10SummaryComponent/>
              </Route>

              {/* /root/US-Sum/F350/L10-server : RENDER FACTORY 350 L10 SERVER */}
              <Route exact path ="/root/U.S-Sum/F350/L10-Server">
                <Factory350L10ServerComponent/>
              </Route>

              {/* /root/US-Sum/F350/L10-Rack : RENDER 350 L10 Rack */}
              <Route exact path ="/root/U.S-Sum/F350/L10-Rack">
                <Factory350L10RackComponent/>
              </Route>

              {/* /root/US-Sum/F350/L10-Row : RENDER 350 L10 ROW */}
              <Route exact path ="/root/U.S-Sum/F350/L10-Row">
                <Factory350L10RowComponent/>
              </Route>

              
              {/* -----------------------------------US:350 L11 ------------------------------------------- */}
              {/* /root/US-Sum/F350/L11-Summary : RENDER FACTORY 350 L11 SUMMARY */}
              <Route exact path ="/root/U.S-Sum/F350/L11-Summary">
                <Factory350L11SummaryComponent/>
              </Route>


              {/* /root/US-Sum/F350/L11-Server : RENDER FACTORY 350 L11 SERVER */}
              <Route exact path ="/root/U.S-Sum/F350/L11-Server">
                <Factory350L11ServerComponent/>
              </Route>

              {/* /root/US-Sum/F350/L11-Rack : RENDER 350 L11 Rack */}
              <Route exact path ="/root/U.S-Sum/F350/L11-Rack">
                <Factory350L11RackComponent/>
              </Route>

              {/* /root/US-Sum/F350/L11-Row : RENDER 350 L11 ROW */}
              <Route exact path ="/root/U.S-Sum/F350/L11-Row">
                <Factory350L11RowComponent/>
              </Route>

              {/* United States Summary Section : ENDS*/}


              <Route exact path='/root/:countryView/:factoryView/:levelView/Server'>
                <Dashboard data={sourceData} onFilterSelect={(data) => setSelectedData(data)} />
              </Route>
              <Route exact path='/root/:countryView/:factoryView/:levelView/Rack'>
                <RackView data={sourceData} rackNavigation={(val: string) => { setRackId(`Row ${val}`); handleItemClick(null, `SERVER ROOM ROW ${val}`, 'row') }} />
              </Route>
              <Route exact path='/root/:countryView/:factoryView/:levelView/Row'>
                <RowView data={sourceData} />
              </Route>
            </Switch>


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
              classes={{ paper: 'drawer-paper' }}
            >
              <>
                <div style={{ position: 'absolute', left: '50%', top: 0 }}>
                  <ExpandMore onClick={toggleDrawerFooter('bottom', false)} style={{ cursor: 'pointer', zIndex: 1200 }} />
                </div>
                <div className="bottom-sec">
                  {/* <div className="bottom-title">GLOBAL &#62; US &#62; 4050 &#62;</div> */}
                  <> <div className="bottom-title" onClick={(e: React.MouseEvent<Element, MouseEvent>) => { handleClick(e, globalPosition, setGlobalPosition) }}>{globalView} &gt; </div>
                    <Menu
                      open={!!globalPosition}
                      onClose={() => setGlobalPosition(null)}
                      anchorReference="anchorPosition"
                      anchorPosition={globalPosition}
                      elevation={0}
                      classes={{ paper: 'menu-paper' }}
                    >
                      <MenuItem onClick={(event: React.MouseEvent<Element, MouseEvent> | null) => handleItemClick(event, {country:'GLOBAL'}, 'root') }>GLOBAL</MenuItem>
                      <MenuItem onClick={(event: React.MouseEvent<Element, MouseEvent> | null) => handleItemClick(event, {country:'U.S'}, 'root/U.S-Sum') }>U.S</MenuItem>
                      <MenuItem onClick={(event: React.MouseEvent<Element, MouseEvent> | null) => handleItemClick(event, {country:'C.N'}, 'root/C.N-Sum')}>C.N</MenuItem>
                      <MenuItem onClick={(event: React.MouseEvent<Element, MouseEvent> | null) => handleItemClick(event, {country:'N.L'}, 'root/N.L-Sum')}>N.L</MenuItem>
                    </Menu></>

                
                   <> <div className="bottom-title" onClick={(e: React.MouseEvent<Element, MouseEvent>) => { handleClick(e, countryPosition, setCountryPosition) }}>{countryView ? `${countryView} >`  : null}</div>
                    <Menu
                      open={!!countryPosition}
                      onClose={() => setCountryPosition(null)}
                      anchorReference="anchorPosition"
                      anchorPosition={countryPosition}
                      elevation={0}
                      classes={{ paper: 'menu-paper' }}
                    >

                        {factories.map((factoryName: any) => (
                          <MenuItem onClick={(event: React.MouseEvent<Element, MouseEvent> | null) => handleItemClick(event, {country:`${countryView}`, factory: `${factoryName}`}, `root/${countryView}-Sum/${factoryName}`)}>{factoryName}</MenuItem>
                        ))}
                    </Menu>
                    </>

                  <> <div className="bottom-title" onClick={(e: React.MouseEvent<Element, MouseEvent>) => { handleClick(e, factoryPosition, setFactoryPosition) }}>{factoryView ? `${factoryView} >`  : null}</div>
                    <Menu
                      open={!!factoryPosition}
                      onClose={() => setFactoryPosition(null)}
                      anchorReference="anchorPosition"
                      anchorPosition={factoryPosition}
                      elevation={0}
                      classes={{ paper: 'menu-paper' }}
                    >
                      
                      {levels.map((levelName: any) => (
                          <MenuItem onClick={(event: React.MouseEvent<Element, MouseEvent> | null) => handleItemClick(event, {country:`${countryView}`, factory: `${factoryView}`, level: `${levelName}`}, `root/${countryView}-Sum/${factoryView}/${levelName}-Summary`)}>{levelName}</MenuItem>
                        ))}

                    </Menu>
                    </>

                    
                    <> <div className="bottom-title" onClick={(e: React.MouseEvent<Element, MouseEvent>) => { handleClick(e, levelPosition, setLevelPosition) }}>{levelView ? `${levelView} >`  : null}</div>
                    <Menu
                      open={!!levelPosition}
                      onClose={() => setLevelPosition(null)}
                      anchorReference="anchorPosition"
                      anchorPosition={levelPosition}
                      elevation={0}
                      classes={{ paper: 'menu-paper' }}
                    >
                      <MenuItem onClick={(event: React.MouseEvent<Element, MouseEvent> | null) => handleItemClick(event, {country:`${countryView}`, factory: `${factoryView}`, level: `${levelView}`, currMenu: 'SERVER ROOM - SERVER'}, `root/${countryView}-Sum/${factoryView}/${levelView}/Server`)}>SERVER</MenuItem>
                      <MenuItem onClick={(event: React.MouseEvent<Element, MouseEvent> | null) => handleItemClick(event, {country:`${countryView}`, factory: `${factoryView}`, level: `${levelView}`, currMenu: 'SERVER ROOM - RACK'}, `root/${countryView}-Sum/${factoryView}/${levelView}/Rack`)}>RACKS</MenuItem>
                      <NestedMenuItem
                        label="ROW"
                        parentMenuOpen={!!levelPosition}
                      >
                        {rackData.map((data: any) => (
                          <MenuItem onClick={(event: React.MouseEvent<Element, MouseEvent> | null) => handleItemClick(event, {country:`${countryView}`, factory: `${factoryView}`, level: `${levelView}`, currMenu: `SERVER ROOM - ROW ${data.val}`}, `root/${countryView}-Sum/${factoryView}/${levelView}/Row`, data.val)}>{data.val}</MenuItem>
                        ))}
                      </NestedMenuItem>


                    </Menu>
                    </>

                   <>
                   <div className="cur-pointer" onClick={(e: React.MouseEvent<Element, MouseEvent>) => { handleClick(e, CurrMenuView, setCurrMenuView) }}>{CurrMenuView}</div>
                   </> 

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
