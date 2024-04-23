import styles from "./BoxCon.module.scss"

type Props = {
  date: string,
  contributions: number|undefined
}

function whatColor(contributions: number|undefined){
  if (!contributions) return ""
  if (contributions < 10) return styles.level1
  if (contributions < 20) return styles.level2
  if (contributions < 30) return styles.level3
  return styles.level4
}

export default function BoxCon({date, contributions}: Props) {

  const color = whatColor(contributions);

  return (
    <div className={[styles.BoxCon, color].join(" ")} onClick={()=>{
      console.log(date);
      console.log(contributions);
    }}>

    </div>
  )
}