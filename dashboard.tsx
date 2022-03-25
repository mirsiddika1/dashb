import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import CardComponent from "../Card/Card";
import Chip from '@mui/material/Chip';
import Drawer from '@mui/material/Drawer';
import { ChevronLeft } from '@mui/icons-material';
import DashboardSidebar from './Sidebar/Sidebar';
import './Dashboard.css';

type Prop = {
  onFilterSelect: (arg: any) => any,
  data: any,
  history: any
}

// dashboard displaying cards 
const Dashboard = (props: Prop) => {
  const dummyData = props.data;
  console.log(`The dummy data is: ${dummyData}`);
  const filterMapping = [
    { type: 'model', base: 'Server', name: 'Model' },
    { type: 'ssCode', base: 'Server', name: 'SS Code' },
    { type: 'indexVal', base: 'Server', name: 'Index' },
    { type: 'test', base: 'Server', name: 'Test' },
    { type: 'serverN', base: 'Server', name: 'Server N' },
    { type: 'repairStatus', base: 'Server', name: 'Repair Status' },
    { type: 'status', base: 'Status', name: 'Status' },
    { type: 'row', base: 'Location', name: 'Row' },
    { type: 'slotNumber', base: 'Location', name: 'Slot Number' },
    { type: 'bladeNumber', base: 'Location', name: 'Blade Number' },
    { type: 'position', base: 'Location', name: 'Position' },
    { type: 'server', base: 'Server', name: 'Server' }
  ]
  const [serverFilter, setServerFilter] = useState<any>();
  const [filterCount, setFilterCount] = useState(0);
  const [anchorState, setState] = useState(false);
  const [cardsData, setCardsData] = useState<any>(dummyData);
  const [apiServerData, setApiServerData] = useState<any>(null);
  const [resetFilter, setFilterReset] = useState<any>({})
  const handleChipRemove = (type: string, val: number) => {
    removeDashboardFilter(type, val);
  }

  console.log(`The cards data is: ${cardsData}`);

  const location = useLocation();
  useEffect(() => {
      //Used to filter out data based on url(Dashboard Page)
      if(location.search){
        const search = document.location.search;
        const params = new URLSearchParams(search);
        
        const model = params.get('Model');
        const ssCode = params.get('SSCode');
        const serverN = params.get('Server-SN/Job');
        const customer= params.get('Customer');
        const indexVal = params.get('Index');
        const status = params.get('Status');
        const test = params.get('Test');
        const repairStatus= params.get('RepairStatus');
        const row = params.get('Row');
        const slotNumber = params.get('SlotNumber');
        const bladeNumber= params.get('BladeNumber');
        const position = params.get('Position');
        console.log(`Model: ${model?.split(',')}, SSCode: ${ssCode?.split(',')}, ServerN: ${serverN?.split(',')}, Customer: ${customer?.split(',')}, Index: ${indexVal?.split(',')}, Status: ${status?.split(',')}, Test: ${test?.split(',')}, RepairStatus: ${repairStatus?.split(',')}, Row: ${row?.split(',')}, SlotNumber: ${slotNumber?.split(',')}, BladeNumber: ${bladeNumber?.split(',')}, Position: ${position?.split(',')}` )
        const urlSearchedData = {"status":status ? status.split(','):[],"repairStatus":repairStatus ? repairStatus.split(',') : [],"sortBy":[],"indicator":[],"model":model ? model.split(','): [],"location":[],"serverN":serverN ? serverN.split(','):[],"customer":[],"ssCode":ssCode ? ssCode.split(','):[],"operator":[],"test":test ? test.split(','):[],"indexVal":indexVal ? indexVal.split(','):[],"row":row ? row.split(','):[],"slotNumber":slotNumber ? slotNumber.split(','):[],"bladeNumber":bladeNumber ? bladeNumber.split(','):[],"position":position? position.split(','):[]}
        onDashboardFilter(urlSearchedData);
      }
    }, []);

    

  useEffect(() => {
    const filterView: any = sessionStorage.getItem('source');
    if (filterView) {

      const data = JSON.parse(filterView);
      const row = data.slot?.split('')[0];
      const slotNumber = data.slot?.substring(1);

      sessionStorage.clear();
      // const finalData = dummyData.filter(item => item.row === row && item.slotNumber === slotNumber && item.test === test);
      // setData(finalData)
      onDashboardFilter({
        status: [],
        repairStatus: [],
        sortBy: '',
        indicator: '',
        model: [],
        location: [],
        serverN: [],
        currentTest: [],
        ssCode: [],
        operator: [],
        indexVal: [],
        test: [],
        bladeNumber: [],
        position: [],
        row: [row],
        slotNumber: [slotNumber],

      })

    }
    const rowView: any = sessionStorage.getItem('rowSource');
    if (rowView) {
      sessionStorage.clear();
      const data = JSON.parse(rowView);
      const slotNumber = data?.slotNumber;
      // const finalData = dummyData.filter(item => item.row === row && item.slotNumber === slotNumber && item.test === test);
      // setData(finalData)
      onDashboardFilter({
        status: [],
        repairStatus: [],
        sortBy: '',
        indicator: '',
        model: [],
        location: [],
        serverN: [],
        customer: [],
        ssCode: [],
        operator: [],
        indexVal: [],
        test: [],
        bladeNumber: [],
        position: [],
        row: [],
        slotNumber: [slotNumber],
        server: []
      })
      
    }
  }, [])


  const removeDashboardFilter = (type: string, val: number) => {
    let temp: any = { ...serverFilter };
    temp && temp[type].splice(val, 1)
    setServerFilter(temp);
    setFilterReset({ type: type, index: val });
    onDashboardFilter(temp);
  }

  const handleAllFilterRemove = (type: string) => {
    let temp: any = { ...serverFilter };
    temp[type] = [];
    setServerFilter(temp);
    onDashboardFilter(temp);
    renderSearchTags();
  }

  const renderActiveSearch = () => {
    let renderElement: any = [];
    let baseList: any = [];
    let filterList: any = [];
    serverFilter && Object.keys(serverFilter).map(item => {
      if (serverFilter[item].length > 0) {
        serverFilter[item].map((data: string) => {
          const baseParent = filterMapping.filter(data => data.type === item)[0];
          if (baseList.indexOf(baseParent.base) === -1) {
            baseList.push(baseParent.base);
            filterList.push(item);
            renderElement.push(<><div className="page-title">{baseParent.base}</div><div className='filter-sec'><span className='filter-chip'><Chip className='filter-chip' label={baseParent.name} onDelete={() => handleAllFilterRemove(item)} /></span></div></>);
          } else if (filterList.indexOf(item) === -1) {
            filterList.push(item);
            renderElement.push(<div className='filter-sec'><span className='filter-chip'><Chip className='filter-chip' label={baseParent.name} onDelete={() => handleAllFilterRemove(item)} /></span></div>)
          }
        })
      }
    });
    return renderElement;
  }

  useEffect(() => {
    renderSearchTags();
  }, [serverFilter])

  // to render the filtered item in dashboard view
  const renderSearchTags = () => {
    let renderElement: any = [];
    serverFilter && Object.keys(serverFilter).map(item => {
      if (serverFilter[item].length > 0) {
        serverFilter[item].map((data: string) => {
          renderElement.push(<span className='filter-chip'><Chip className='filter-chip' label={data} onDelete={() => handleChipRemove(item, 0)} /></span>);
        })
      }
    });
    renderElement.length !== filterCount && setFilterCount(renderElement.length);
    // return renderElement;
  }
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

  //filter func for multiarray support dashboard
  const onDashboardFilter = (searchObj: any) => {
    console.log(`This is searchObj: ${JSON.stringify(searchObj)}`)
    let tempData: any = [];
    let isModelFiltered: boolean = false;
    let isOtherFiltered: boolean = false;
    let isLocationFiltered: boolean = false;
    if (searchObj.model.length > 0) {
      searchObj.model.map((item: any) => {
        //The filtering of card based upon user search.
        let filterData = dummyData.filter((data: any) => {
          if (data.model.toLowerCase().indexOf(item.toLowerCase()) >= 0) {
            return data;
          }
        });
        isModelFiltered = true;
        tempData = tempData.concat(filterData)
      })
    } else {
      tempData = [...dummyData]
    }

    let serachKeys: string[] = Object.keys(searchObj);
    let item: any = {};
    let filterSectionResult: any = [];
    for (item of serachKeys) {
      if (item !== 'model' && item !== 'sortBy' && item !== 'bladeNumber' && item !== 'row' && item !== 'slotNumber' && item !== 'position') {
        let searchval = searchObj[item];
        let arrresult: any = [];
        searchval.length > 0 && searchval.map((data: any) => {
          isOtherFiltered = true;
          arrresult = tempData.filter((val: any) => {
            if (val[item].toLowerCase().indexOf(data.toLowerCase()) >= 0) {
              return val;
            }
          });
          const findDisticnt = filterSectionResult.length > 0 ? removeDuplicates(filterSectionResult, arrresult) : arrresult;
          filterSectionResult = filterSectionResult.concat(findDisticnt);
        });
      }
      else if (item === 'sortBy') {
        searchObj['sortBy'][0] === 'latest' ? tempData.sort((a: any, b: any) => new Date(b.publishedBy) < new Date(a.publishedBy) ? 1 : -1) : tempData.sort((a: any, b: any) => new Date(a.publishedBy) < new Date(b.publishedBy) ? 1 : -1)
      }
    }
    let temp = filterSectionResult.length > 0 ? filterSectionResult : tempData;
    for (item of serachKeys) {
      if (item === 'bladeNumber' || item === 'row' || item === 'slotNumber' || item === 'position') {
        let searchval = searchObj[item];
        searchval.length > 0 && searchval.map((data: any) => {
          let arr: any = [];
          isLocationFiltered = true;
          arr = temp.filter((val: any) => {
            if (val[item].toLowerCase() === data.toLowerCase()) {
              return val;
            }
          });
          temp = arr.length > 0 ? arr : [];
        });
      }
    }
    window.history.pushState({},'', props.history.location.pathname +`?Model=${searchObj.model}&SSCode=${searchObj.ssCode}&Server-SN/Job=${searchObj.serverN}&Customer=${searchObj.customer}&Index=${searchObj.indexVal}&Status=${searchObj.status}&Test=${searchObj.test}&RepairStatus=${searchObj.repairStatus}&Row=${searchObj.row}&SlotNumber=${searchObj.slotNumber}&BladeNumber=${searchObj.bladeNumber}&Position=${searchObj.position}`);
    setServerFilter({ ...searchObj });
    setCardsData(isLocationFiltered ? temp : filterSectionResult.length > 0 ? filterSectionResult : isModelFiltered ? tempData : isOtherFiltered ? [] : tempData);
    props.onFilterSelect(tempData)
  };

  const removeDuplicates = (arr1: any, arr2: any) => {
    let res: any = [];
    arr2.map((item: any) => {
      const tempArr = arr1.filter((data: any) => data.id === item.id);
      res = res.concat(tempArr.length === 0 ? item : []);
    });
    return res;
  }



  return (
    <>
      <div className="side-bar-layout">
        {filterCount > 0 && <div className="active-filter">
          <div className="header-text">Active <br /> Search</div>
          {renderActiveSearch()}
        </div>}
        <div style={{ position: 'absolute', right: 0, top: '50%' }} className="ChevronIconLeft">
          <ChevronLeft onClick={toggleDrawer('right', true)} style={{ cursor: 'pointer' }} />
        </div>
      </div>

      <Drawer
        anchor={'right'}
        open={anchorState}
        onClose={toggleDrawer('right', false)}
        hideBackdrop
      >
        <DashboardSidebar selectedFitler={serverFilter} filterReset={resetFilter} toggleDrawer={toggleDrawer} onFilter={onDashboardFilter} history={props.history}/>
        {/* : server === 'racks' ?  <RackSidebar selectedFitler={rackFilter} resetRackFilter={resetRackFilter} selected={server} toggleDrawer={toggleDrawer} onFilterRack={onFilterRack} onRackFilter={onRackFilter} />: <RowSidebar selectedFitler={rowFilter} resetRowFilter={resetRowFilter} selected={server} toggleDrawer={toggleDrawer} onFilter={onRowFilter} />} */}
      </Drawer>

      <div className="dashboard-cards">
        {
          cardsData && cardsData.length > 0 ? cardsData.map((card: any, i: number) => {
            return (<CardComponent key={i} cardValues={card} />)
          }) : <div className="no-data-contianer">No Data Found</div>
        }

      </div></>
  )
}

export default Dashboard;
