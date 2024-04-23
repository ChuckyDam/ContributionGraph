import { useEffect, useState } from 'react'
import styles from "./ContributionGraph.module.scss"
import axios from 'axios';
import BoxCon from '../BoxCon/BoxCon';

interface dates {
  [key: string]: number;
}

function getDays(date: Date){
    const endDate = date;
    let dayWeek = endDate.getDay();
    switch(dayWeek){
        case 1:
            endDate.setTime(endDate.getTime() + 6*24*60*60*1000)
            break;
        case 2:
            endDate.setTime(endDate.getTime() + 5*24*60*60*1000)
            break;
        case 3:
            endDate.setTime(endDate.getTime() + 4*24*60*60*1000)
            break;
        case 4:
            endDate.setTime(endDate.getTime() + 3*24*60*60*1000)
            break;
        case 5:
            endDate.setTime(endDate.getTime() + 2*24*60*60*1000)
            break;
        case 6:
            endDate.setTime(endDate.getTime() + 1*24*60*60*1000)
            break;
    }

    let start = new Date(endDate.getTime() - 356*24*60*60*1000);
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

const month = ["Янв.","Фев.","Март","Апр.","Май","Июнь","Июль","Авг.","Сен.","Окт.","Ноя.","Дек."]
const week = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
const fullMonth = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"]

function ContributionGraph() {
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - 356*24*60*60*1000);
  const dateArr = getDays(new Date());

  const [contributions, setContributions] = useState<dates>({});

  const [daySelect, setDaySelect] = useState("");

  useEffect(()=>{
    axios.get("https://dpg.gg/test/calendar.json")
    .then((data)=>{
      console.log(data.data);
      setContributions(data.data);
    })
  }, [])

  let firstMonth = startDate.getMonth();

  return (
    <div className={styles.ContributionGraph}>
        <div className={styles.ContributionGraph__Month}>
            {
                month.map((mnt,id,arr)=>{
                    let month = arr[firstMonth];
                    firstMonth += 1;
                    if (firstMonth > 11) firstMonth = 0;
                    return(
                        <p key={id}>
                        {month}
                        </p>
                    )
                })
            }
        </div>
        <div className={styles.ContributionGraph__table}>
            <div className={styles.ContributionGraph__weekName}>
                <div>Пн</div>
                <div></div>
                <div>Ср</div>
                <div></div>
                <div>Пт</div>
                <div></div>
                <div></div>
            </div>
            {
            dateArr.map((el, id)=>{
                return (
                <div className={styles.ContributionGraph__week} key={id}>
                    {
                    el.map((date)=>{
                        let contr=contributions[date];
                        const dateParse = new Date(Date.parse(date));
                        return (
                        <BoxCon date={date} daySelect={daySelect} key={date} contributions={contr} onClick={()=>{
                            setDaySelect(date);
                        }} 
                        textUp={(contr?contr:0) + " contributiones"}
                        textDown={`${week[dateParse.getDay()]}, ${fullMonth[dateParse.getMonth()]} ${dateParse.getDate()}, ${dateParse.getFullYear()}`}/>
                        )
                    })
                    }
                </div>
                )
            })
            }
        </div>
        <div className={styles.ContributionGraph__example}>
            <p>Меньше... </p>
            <BoxCon date={"0 level"} daySelect={daySelect} contributions={undefined} onClick={()=>{
                setDaySelect("0 level");
            }}
            textUp='Нет контрибуций'
            textDown=''/>
            <BoxCon date={"1 level"} daySelect={daySelect} contributions={5} onClick={()=>{
                setDaySelect("1 level");
            }}
            textUp='1-9 контрибуций'/>
            <BoxCon date={"2 level"} daySelect={daySelect} contributions={15} onClick={()=>{
                setDaySelect("2 level");
            }}
            textUp='10-19 контрибуций'/>
            <BoxCon date={"3 level"} daySelect={daySelect} contributions={25} onClick={()=>{
                setDaySelect("3 level");
            }}
            textUp='20-29 контрибуций'/>
            <BoxCon date={"4 level"} daySelect={daySelect} contributions={35} onClick={()=>{
                setDaySelect("4 level");
            }}
            textUp='30+ контрибуций'/>
            <p>Больше... </p>     
        </div>
    </div>
  )
}

export default ContributionGraph