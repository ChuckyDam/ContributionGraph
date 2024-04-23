import { useEffect, useState } from 'react'
import './App.scss'
import axios from 'axios';
import BoxCon from '../BoxCon/BoxCon';

interface dates {
  [key: string]: number;
}

function getDays(startDate:Date,endDate:Date){
  let start = startDate;
  let dateArr = [];
  while (start <= endDate) {
    let arr = [];
    for (let index = 0; index < 7; index++) {
      let month = start.getMonth()+1 > 9 ? start.getMonth()+1 : "0"+(start.getMonth()+1);
      let day = start.getDate() > 9 ? start.getDate() : "0"+start.getDate();
      arr.push(`${start.getFullYear()}-${month}-${day}`);
      start.setTime(start.getTime() + 24*60*60*1000)
    }
    dateArr.push(arr);
  }
  return dateArr;
}

function ContributionGraph() {
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - 350*24*60*60*1000);
  const dateArr = getDays(startDate, endDate);

  const [contributions, setContributions] = useState<dates>({});

  useEffect(()=>{
    axios.get("https://dpg.gg/test/calendar.json")
    .then((data)=>{
      console.log(data.data);
      setContributions(data.data);
    })
  }, [])

  return (
    <div className='ContributionGraph'>
      <div className="ContributionGraph__table">
        {
          dateArr.map((el, id)=>{
            return (
              <div className='ContributionGraph__week' key={id}>
                {
                  el.map((date)=>{
                    return (
                      <BoxCon date={date} key={date} contributions={contributions[date]}/>
                    )
                  })
                }
              </div>
            )
          })
          }
      </div>
      {/* <BoxCon date={}/> */}
    </div>
  )
}

export default ContributionGraph