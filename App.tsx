import * as React from 'react';
import { Link, Switch, BrowserRouter as Router, Route, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
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
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

// -------------------------------------------------------------------------------------------------------------------------------
//Global Summary Import
import GlobalSummaryComponent from './components/GlobalSummary/GlobalSummary';
//Country Summary Import
import CountrySummaryComponent from './components/GlobalSummary/CountrySummary/CountrySummary';
//Factory Summary Import
import FactorySummaryComponent from './components/GlobalSummary/CountrySummary/FactorySummary/FactorySummary';
//Level Summary Import
import LevelSummaryComponent from './components/GlobalSummary/CountrySummary/FactorySummary/LevelSummary/LevelSummary';

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
    slotNumber: '1',
    bladeNumber: '1',
    position: '2',
    publishedBy: '2021-12-11',
    ssCode: 'SS-AMZ012-1234',
    serverN: '20724093438',
    label: '//Storage',
    currentTest: 'Current IP: 127.0.0.1',
    location: 'Row A, Slot 1, Blade 1, Position 2',
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
    status: 'running',
    indicator: 'off',
    isRepair: true,
    highlight: false,
    slot: "A30",
    value: 30,
    rackColor: '#33D8D4',
    filledStatus: "Empty",
    timeRange: 1,
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
    slotNumber: '3',
    bladeNumber: '3',
    position: '1',
    publishedBy: '2021-12-11',
    ssCode: 'SS-AMZ012-1234',
    serverN: '20726093448',
    currentTest: 'Current IP: 127.0.0.1',
    location: 'Row A, Slot 3, Blade 3, Position 1',
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
    slotNumber: '3',
    bladeNumber: '3',
    position: '2',
    publishedBy: '2021-12-11',
    ssCode: 'SS-AMZ012-1234',
    serverN: '20726093448',
    currentTest: 'Current IP: 127.0.0.1',
    location: 'Row A, Slot 3, Blade 3, Position 2',
    test: 'FinalZCONFORM',
    operator: 'Matt S',
    status: 'pass',
    indicator: 'on',
    isRepair: true,
    highlight: false,
    slot: "A3",
    value: 3,
    isMultiple: true,
    rackColor: '#33D8D4',
    filledStatus: "Empty",
    timeRange: 12,
    mserial: "M34249",
    type: 'single',
    opacity: 1,
    section: "UTILITY",
    rowColor: '#00CEC933',
    isSlave: true,
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
    status: 'fail',
    indicator: 'on',
    isRepair: true,
    highlight: false,
    slot: "A32",
    value: 3,
    rackColor: '#33D8D4',
    filledStatus: "Empty",
    timeRange: 12,
    mserial: "M34249",
    type: 'single',
    opacity: 1,
    section: "UTILITY",
    rowColor: '#00CEC933',
    rackNumber: '2',

  },
  {
    id: '4',
    model: '7.1 XSTORE',
    indexVal: 'm33445',
    repairStatus: 'Yes',
    row: 'A',
    slotNumber: '2',
    bladeNumber: '5',
    position: '2',
    label: '//Utility',
    publishedBy: '2021-12-11',
    ssCode: 'SS-AMZ012-1234',
    serverN: '20723093438',
    currentTest: 'Current IP: 127.0.0.1',
    location: 'Row A, Slot 2, Blade 5, Position 2',
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
    slotNumber: '3',
    bladeNumber: '6',
    position: '2',
    publishedBy: '2021-12-11',
    ssCode: 'SS-AMZ012-1234',
    serverN: '20723093438',
    currentTest: ' Current IP: 127.0.0.1',
    location: 'Row A, Slot 3, Blade 6, Position 2',
    test: 'FinalZCONFORM',
    operator: 'Devit',
    status: 'fail',
    indicator: 'off',
    isRepair: false,
    highlight: false,
    slot: "A3",
    value: 3,
    rackColor: '#ED6746',
    filledStatus: "Empty",
    timeRange: 10,
    isMultiple: true,
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
    slot: "A32",
    value: 32,
    rackColor: '#ED6746',
    filledStatus: "Empty",
    timeRange: 10,
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
    slot: "A32",
    value: 32,
    rackColor: '#ED6746',
    filledStatus: "Empty",
    timeRange: 10,
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
    slotNumber: '29',
    bladeNumber: '9',
    position: '2',
    publishedBy: '2021-12-11',
    ssCode: 'SS-AMZ012-1234',
    serverN: '20723093438',
    currentTest: 'Current IP: 127.0.0.1',
    location: 'Row A, Slot 29, Blade 9, Position 2',
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
    slotNumber: '24',
    bladeNumber: '11',
    position: '2',
    publishedBy: '2021-12-11',
    ssCode: 'SS-AMZ012-1234',
    serverN: '20723093438',
    currentTest: 'Current IP: 127.0.0.1',
    location: 'Row A, Slot 24, Blade 11, Position 2',
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
    slotNumber: '33',
    bladeNumber: '12',
    position: '2',
    publishedBy: '2021-12-11',
    ssCode: 'SS-AMZ012-1234',
    serverN: '20723093438',
    currentTest: 'Current IP: 127.0.0.1',
    location: 'Row A, Slot 33, Blade 12, Position 2',
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
    slotNumber: '49',
    bladeNumber: '13',
    position: '2',
    publishedBy: '2021-12-11',
    ssCode: 'SS-AMZ012-1234',
    serverN: '20723093438',
    currentTest: 'Current IP: 127.0.0.1',
    location: 'Row A, Slot 49, Blade 13, Position 2',
    test: 'FinalZCONFORM',
    operator: 'Devit',
    status: 'running',
    indicator: 'off',
    isRepair: false,
    highlight: false,
    slot: "A49",
    value: 49,
    rackColor: '#33D8D4',
    filledStatus: "Empty",
    timeRange: 4,
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
    slotNumber: '20',
    bladeNumber: '14',
    position: '2',
    publishedBy: '2021-12-11',
    ssCode: 'SS-AMZ012-1234',
    serverN: '20723093438',
    currentTest: 'Current IP: 127.0.0.1',
    location: 'Row A, Slot 20, Blade 14, Position 2',
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
    mserial: "M34249",
    type: 'single',
    opacity: 1,
    section: "UTILITY",
    rowColor: '#00CEC933',

  },
  {
    id: '11',
    model: 'WAIPOUA1817',
    indexVal: 'm99887',
    repairStatus: 'No',
    row: 'A',
    slotNumber: '20',
    bladeNumber: '15',
    position: '2',
    publishedBy: '2021-12-11',
    ssCode: 'SS-AMZ012-1234',
    serverN: '20723093438',
    currentTest: 'Current IP: 127.0.0.1',
    location: 'Row A, Slot 20, Blade 15, Position 2',
    test: 'FinalZCONFORM',
    operator: 'Devit',
    status: 'running',
    indicator: 'off',
    isRepair: false,
    highlight: false,
    slot: "A20",
    value: 20,
    rackColor: '#43E955',
    filledStatus: "Empty",
    timeRange: 3,
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
    location: 'Row A, Slot 26, Blade 13, Position 2',
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
    status: 'pass',
    indicator: 'off',
    isRepair: false,
    highlight: false,
    slot: "A26",
    value: 26,
    rackColor: '#ED6746',
    filledStatus: "Empty",
    timeRange: 2,
    mserial: "M34249",
    type: 'single',
    opacity: 1,
    section: "UTILITY",
    rowColor: '#00CEC933',

  },
  {
    id: '13',
    model: 'WAIPOUA1815',
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
    mserial: "M34249",
    type: 'single',
    opacity: 1,
    section: "UTILITY",
    rowColor: '#00CEC933',
    rackNumber: '2'
  },
  {
    id: '13',
    model: 'WAIPOUA185',
    indexVal: 'm22113',
    repairStatus: 'No',
    row: 'A',
    slotNumber: '10',
    bladeNumber: '16',
    position: '2',
    publishedBy: '2021-12-11',
    ssCode: 'SS-AMZ012-1234',
    serverN: '20723093438',
    currentTest: 'Current IP: 127.0.0.1',
    location: 'Row A, Slot 10, Blade 16, Position 2',
    test: 'CTCS',
    operator: 'Devit',
    status: 'notstarted',
    indicator: 'off',
    isRepair: false,
    highlight: false,
    slot: "A10",
    value: 10,
    rackColor: '#FAF8C7',
    filledStatus: "Empty",
    timeRange: 9,
    mserial: "M34249",
    type: 'single',
    opacity: 1,
    section: "UTILITY",
    rowColor: '#00CEC933',
    rackNumber: '2'
  },
];

const App = () => {
  // const isLogin: any = sessionStorage.getItem('isLogin');
  // const loginDetails = isLogin ? JSON.parse(isLogin) : {}
  const [server, setServer] = useState('server');
  // const [isLoggedIn, setLogin] = useState(loginDetails?.login || false); //should be false
  const [isLoggedIn, setLogin] = useState(true); //should be false
  const [rackId, setRackId] = useState('');
  const [rowVal, setRowVal] = useState<any>('');
  const [selectedData, setSelectedData] = useState<any>([]);
  const [anchorStateHeader, setStateHeader] = React.useState(true);
  const history = useHistory();

  const client = new ApolloClient({
    uri: 'http://mfgsw-qa.ztsystems.com:5003/graphql',
    cache: new InMemoryCache()
  });

  const onLogin = (values: any) => {
    console.log('vals', values);
    //api 
    setLogin(true);
    let item: any = { loggedIn: false, token: "" };
    sessionStorage.setItem('isLogin', JSON.stringify({ login: true }));
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
  const [currMenuView, setCurrMenuView] = useState<any>(null);  //United States Factories 350 -> L10 or L11 -> Summary,Server,Rack,Room ...

  const [apiServerData, setApiServerData] = useState<any>(null);  //API Server Data
  const [apiRackData, setApiRackData] = useState<any>(null);  //API Rack Data
  const [apiRowData, setApiRowData] = useState<any>(null);  //API Row Data


 useEffect(() => {console.log("this is api data", apiServerData);},
 [apiServerData]);

  const footerData:any ={
    "Global" : {
          "U.S" : {
            "350" : {
                "L10" : [
                    "Rack",
                    "Server",
                    {"Row":["A","B","C","D","E","F"]}
                  ],
                "L11" : [
                    "Rack",
                    {"Row":["A","B","C","D","E","F"]}
                  ]
              },
            "4050" : {
                "L10" : [
                    "Rack",
                    "Server",
                    {"Row":["A","B","C","D","E","F"]}
                  ],
                "L11" : [
                    "Rack",
                    {"Row":["A","B","C","D","E","F"]}
                  ]
              },
         },
         "C.N" : {
          "CN-F1" : {
              "L10" : [
                  "Rack",
                  "Server",
                  {"Row":["A","B","C","D","E","F"]}
                ],
              "L11" : [
                  "Rack",
                  {"Row":["A","B","C","D","E","F"]}
                ]
            },
          "CN-F2" : {
              "L10" : [
                  "Rack",
                  "Server",
                  {"Row":["A","B","C","D","E","F"]}
                ],
              "L11" : [
                  "Rack",
                  {"Row":["A","B","C","D","E","F"]}
                ]
            },
       },
       "N.L" : {
        "NL-F1" : {
            "L10" : [
                "Rack",
                "Server",
                {"Row":["A","B","C","D","E","F"]}
              ],
            "L11" : [
                "Rack",
                {"Row":["A","B","C","D","E","F"]}
              ]
          },
        "NL-F2" : {
            "L10" : [
                "Rack",
                "Server",
                {"Row":["A","B","C","D","E","F"]}
              ],
            "L11" : [
                "Rack",
                {"Row":["A","B","C","D","E","F"]}
              ]
          },
     }
      }
  }

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


  //Used for Nested footer Menu
  const [menuPosition, setMenuPosition] = useState<any>(null);

  const location = useLocation();
  useEffect(() => {
      if(isLoggedIn){
        //Used to filter out data based on url(Dashboard Page)
        if(location.pathname){
          const searchURL = document.location.pathname.split('/');
          console.log(searchURL);
          setCountryView(searchURL[2] ? searchURL[2] : null);
          setFactoryView(searchURL[3]? searchURL[3] : null);
          setLevelView(searchURL[4] ?  searchURL[4] : null);
          console.log("SearchURL[5] is : " + searchURL[5]);
          if(searchURL[5] && searchURL[5]  === 'Server'){
            setCurrMenuView('SERVER ROOM - Server');
            setServer('server')

          }
          else if(searchURL[5] && searchURL[5] === 'Rack'){
            setCurrMenuView('SERVER ROOM - Rack');
            setServer('racks')

          }
          else if(searchURL[5] && searchURL[5].includes('Row')){
            setCurrMenuView(`SERVER ROOM - ${searchURL[5].split('-')[0]} ${searchURL[5].split('-')[1]}`);
            setServer('row')
            setRowVal(searchURL[5].split('-')[1]);
          }
        }
      }
    }, []);



    useEffect(()=>{
      if(currMenuView !== null && currMenuView === 'SERVER ROOM - Server'){
        console.log("Server");
        client
        .query({
          query: gql`
            query {
              GetServers(first:3){
                totalCount
                edges {
                  node {
                    ipAddress
                    serialNumber
                    model
                    ssCode
                    operator
                    onlineStatus
                    repairCount
                    lastRepair
                    customer
                    _id
                    location{
                      site
                      building
                      room
                      row
                      slot
                      blade
                      position
                    }
                    inRepair
                    rack
                    statuses{
                      timestamp
                      status
                      test
                      symptom{
                        component
                        type
                        code
                        detail
                      }
                      code
                    }
                  }
                }
              }
            }
          `
        })
        .then((serverResult) => {
          console.log(serverResult)
          const storedApiData: { id: any; model: any; repairStatus: any; row: any; slotNumber: any; bladeNumber: any; position: any; publishedBy: any; ssCode: any; serverN: any; currentTest: any; location: string; test: any; operator: any; status: any; indicator: any; isRepair: any; slot: string; value: any; section: null; rackNumber: any; }[] = [];
          Object.keys(serverResult.data.GetServers.edges).map((pos: any)=>{
              storedApiData.push({
                id: serverResult.data.GetServers.edges[pos].node._id,
                model: serverResult.data.GetServers.edges[pos].node.model,
                repairStatus: serverResult.data.GetServers.edges[pos].node.inRepair ? 'Yes' : 'No',
                row: serverResult.data.GetServers.edges[pos].node.location.row,
                slotNumber: serverResult.data.GetServers.edges[pos].node.location.slot,
                bladeNumber: serverResult.data.GetServers.edges[pos].node.location.blade,
                position: serverResult.data.GetServers.edges[pos].node.location.position,
                publishedBy: serverResult.data.GetServers.edges[pos].node.statuses[0].timestamp,
                ssCode: serverResult.data.GetServers.edges[pos].node.ssCode,
                serverN: serverResult.data.GetServers.edges[pos].node.serialNumber,
                currentTest: serverResult.data.GetServers.edges[pos].node.ipAddress,
                location: `Row ${serverResult.data.GetServers.edges[pos].node.location.row}, Slot ${serverResult.data.GetServers.edges[pos].node.location.slot}, Blade ${serverResult.data.GetServers.edges[pos].node.location.blade}, Position ${serverResult.data.GetServers.edges[pos].node.location.position} `,
                test: serverResult.data.GetServers.edges[pos].node.statuses[0].test,
                operator: serverResult.data.GetServers.edges[pos].node.operator,
                status: serverResult.data.GetServers.edges[pos].node.statuses[0].status,
                indicator: serverResult.data.GetServers.edges[pos].node.onlineStatus,
                isRepair: serverResult.data.GetServers.edges[pos].node.inRepair,
                slot: `${serverResult.data.GetServers.edges[pos].node.location.row}${serverResult.data.GetServers.edges[pos].node.location.slot}`,
                value: serverResult.data.GetServers.edges[pos].node.location.slot,
                section: null,
                rackNumber: serverResult.data.GetServers.edges[pos].node.rack
              })
          });
          setApiServerData(storedApiData);
          
        })
      }
      // else if(currMenuView !== null && currMenuView === 'SERVER ROOM - Rack'){
      //   console.log("Rack");
      //   client
      //   .query({
      //     query: gql`
      //       query{
      //         GetRacks{
      //           totalCount,
      //           edges{
      //             node{
      //               _id
      //               serialNumber
      //               model
      //               servers
      //               index
      //               rmIp
      //               statuses{
      //                 timestamp
      //                 status
      //                 test
      //                 symptom{
      //                   component
      //                   type
      //                   code
      //                   detail
      //                 }
      //                 code
      //               }
      //               location{
      //                 site
      //                 building
      //                 room
      //                 row
      //                 slot
      //                 blade
      //                 position
      //               }
      //             }
      //             cursor
      //           }
      //         }
      //       }
      //     `
      //   })
      //   .then((rackResults) => {
      //     console.log(`The Rack Data is : ${rackResults}`)
      //   }
      // }

      else if(currMenuView !== null && currMenuView.includes('Row')){
        console.log("Row");
      }
    },[currMenuView]);
  

     // handleItemClick(event, {country:countryName, factory: factoryName}, `root/${countryName}/${factoryName}`)
  const handleItemClick = (event: React.MouseEvent | null, value: any, routeValue: string, rowValue?: string) => {

    Object.keys(footerData['Global']).forEach((checkCountry:string)=>{
      if(value.country === checkCountry){
        setCountryView(value.country);
        setFactoryView(null);
        setLevelView(null); 
        setCurrMenuView(null);
        setServer('server');
        Object.keys(footerData['Global'][checkCountry]).map((checkFactory:string)=>{
          if(value.factory === checkFactory){
            setFactoryView(value.factory);
            setLevelView(null);
            setCurrMenuView(null);
            setServer('server');
            Object.keys(footerData['Global'][checkCountry][checkFactory]).map((checkLevel:string)=>{
              if(value.level === checkLevel){
                setLevelView(value.level);
                setCurrMenuView(null);
                Object.values(footerData['Global'][checkCountry][checkFactory][checkLevel]).map((checkMenuView:any)=>{
                  if(value.currMenu === checkMenuView && value.currMenu.includes('Row')){
                    setCurrMenuView(value.currMenu ? `SERVER ROOM - ${value.currMenu}` : null);
                    setServer('row')
                    setRowVal(rowValue);
                  }
                  else{
                    setCurrMenuView(value.currMenu ? `SERVER ROOM - ${value.currMenu}` : null);
                  }
                })
              }
            })
          }
        })
      }
      else if(value.country === "GLOBAL"){
        setCountryView(null);
        setFactoryView(null);
        setLevelView(null); 
        setCurrMenuView(null);
        setServer('server');

      }
    })
    // setMenuPosition(null);
    // setCurrentMenu(value);
    // setRowVal(rowValue);
    handleChange(routeValue);
  };


  const checkForRowData = (countryName:any,factoryName:any,levelName:any,currMenuView:any)=>{
    if(currMenuView['Row']){
      Object.values(currMenuView['Row']);
      return (
          <NestedMenuItem
            label="Row"
            parentMenuOpen={!!menuPosition}
            className="currMenuSection"
            >
              <div className="rowLetterContainer">
              {Object.values(currMenuView['Row']).map((data: any) => (
                <MenuItem onClick={(event: React.MouseEvent<Element, MouseEvent> | null) => handleItemClick(event, {country:countryName, factory:factoryName, level: levelName, currMenu: `${Object.keys(currMenuView)} ${data}`}, `root/${countryName}/${factoryName}/${levelName}/${Object.keys(currMenuView)}-${data}`, data)} className={"rowSection"}>{data}</MenuItem>
            ))}
              </div>
          </NestedMenuItem>
      )


    }
    return <MenuItem onClick={(event: React.MouseEvent<Element, MouseEvent> | null) => handleItemClick(event, {country:countryName, factory:factoryName, level: levelName, currMenu: currMenuView}, `root/${countryName}/${factoryName}/${levelName}/${currMenuView}`)}  className="currMenuSection">{currMenuView}</MenuItem>;
  }

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
              {/* /root : Render Global Summary */}
              <Route exact path="/root">
                  <GlobalSummaryComponent  />
              </Route>


              {/* ---------------------------------- Country Summary Section ----------------------------------------------*/}
              {/* /root/countryName : Render Specific Country Summary*/}
              <Route exact path ="/root/:countryView">
                <CountrySummaryComponent country={countryView}/>
              </Route>


              {/* -----------------------------------Factory Summary Section------------------------------------------- */} 
              {/* /Root/countryName/factoryName  : Render Specific Factory Summary*/}
              <Route exact path ="/root/:countryView/:factoryView">
                <FactorySummaryComponent country={countryView} factory={factoryView}/>
              </Route>


              {/* -----------------------------------Factory Summary Section------------------------------------------- */} 
              {/* /root/countryName/factoryName/levelName : Render Specific Level Summary */}
              <Route exact path ="/root/:countryView/:factoryView/:levelView">
                <LevelSummaryComponent country={countryView} factory={factoryView} level={levelView}/>
              </Route>




              {/* urlPath={history} */}
              <Route exact path='/root/:countryView/:factoryView/:levelView/Server'>
                <Dashboard data={apiServerData} onFilterSelect={(data) => setSelectedData(data)} history={history} />
              </Route>
              <Route exact path='/root/:countryView/:factoryView/:levelView/Rack'>
                <RackView data={sourceData} rackNavigation={(val: string) => { setRackId(`Row ${val}`); handleItemClick(null, `SERVER ROOM ROW ${val}`, 'row') }} history={history} />
              </Route>
              <Route exact path='/root/:countryView/:factoryView/:levelView/Row-:RowVal'>
                {/* <RowView data={sourceData} history={history}/> */}
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
                  <> <div className="bottom-title" onClick={(e: React.MouseEvent<Element, MouseEvent>) => { handleClick(e, menuPosition, setMenuPosition) }}>{globalView} &gt; </div>
                    <Menu
                      open={!!menuPosition}
                      onClose={() => setMenuPosition(null)}
                      anchorReference="anchorPosition"
                      anchorPosition={menuPosition}
                      elevation={0}
                      classes={{ paper: 'menu-paper' }}
                    >
                      <MenuItem onClick={(event: React.MouseEvent<Element, MouseEvent> | null) => handleItemClick(event, {country:'GLOBAL'}, 'root') } className="countrySection">GLOBAL</MenuItem>
                      {Object.keys(footerData['Global']).map((countryName:string)=>(
                              <NestedMenuItem
                                label={countryName}
                                parentMenuOpen = {!!menuPosition}
                                onClick={(event: React.MouseEvent<Element, MouseEvent> | null) => handleItemClick(event, {country:countryName}, `root/${countryName}`)}
                                className={"countrySection" }
                                >
                                  {Object.keys(footerData['Global'][countryName]).map((factoryName)=>(
                                    <NestedMenuItem
                                      id='factorySection'
                                      label={factoryName}
                                      parentMenuOpen = {!!menuPosition}
                                      onClick={(event: React.MouseEvent<Element, MouseEvent> | null) => handleItemClick(event, {country:countryName, factory: factoryName}, `root/${countryName}/${factoryName}`)}
                                      className="factorySection"
                                      >
                                      
                                      {Object.keys(footerData['Global'][countryName][factoryName]).map((levelName)=>(
                                        <NestedMenuItem
                                        label={levelName}
                                        parentMenuOpen = {!!menuPosition}
                                        onClick={(event: React.MouseEvent<Element, MouseEvent> | null) => handleItemClick(event,{country:countryName, factory:factoryName, level: levelName}, `root/${countryName}/${factoryName}/${levelName}`)}
                                        className="levelSection"
                                        >
                                            
                                          {Object.values(footerData['Global'][countryName][factoryName][levelName]).map((currMenuView:any)=>(
                                            checkForRowData(countryName,factoryName,levelName,currMenuView)
                                            ))
                                          }

                                        </NestedMenuItem>
                                        ))
                                      }

                                    </NestedMenuItem>
                                    ))
                                  }
                                  
                              </NestedMenuItem>
                        ))
                      }
                    </Menu>
                    <div className="bottom-title" onClick={(e: React.MouseEvent<Element, MouseEvent>) => { handleClick(e, countryView, setCountryView) }}>{countryView ? `${countryView} >`  : null}</div>
                    <div className="bottom-title" onClick={(e: React.MouseEvent<Element, MouseEvent>) => { handleClick(e, factoryView, setFactoryView) }}>{factoryView ? `${factoryView} >`  : null}</div>
                    <div className="bottom-title" onClick={(e: React.MouseEvent<Element, MouseEvent>) => { handleClick(e, levelView, setLevelView) }}>{levelView ? `${levelView} >`  : null}</div>
                    <div className="cur-pointer"  onClick={(e: React.MouseEvent<Element, MouseEvent>) => { handleClick(e, currMenuView, setCurrMenuView) }}>{currMenuView}</div>
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
