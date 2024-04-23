import { useEffect, useRef, useState } from "react"
import styles from "./BoxCon.module.scss"

type Props = {
  date: string,
  contributions: number|undefined,
  onClick: Function,
  daySelect: string,
  textUp: string,
  textDown?: string
}

function whatColor(contributions: number|undefined){
  if (!contributions) return ""
  if (contributions < 10) return styles.level1
  if (contributions < 20) return styles.level2
  if (contributions < 30) return styles.level3
  return styles.level4
}

export default function BoxCon({date, contributions, onClick, daySelect, textUp, textDown}: Props) {

  const [modalActive, setModalActive] = useState(false)
  const modal = useRef(document.createElement("div"));

  useEffect(()=>{
    if(daySelect === date){
      modal.current.style.display = "flex"
      setModalActive(true);
    }else {
      setModalActive(false);
      modal.current.style.display = "none"
    }
  }, [daySelect])

  const color = whatColor(contributions);
  const cls = modalActive?styles.BoxCon__modal_active : "";
  const cls2 = modalActive?styles.BoxCon_active : "";

  return (
    <div className={[styles.BoxCon, color, cls2].join(" ")} onClick={()=>{onClick();}}>

      <div ref={modal} className={styles.BoxCon__modal + " " + cls}>
        <p className={styles.BoxCon__modalFirstText}>{textUp}</p>
        <p className={styles.BoxCon__modalSecondText}>{textDown}</p>
        <div className={styles.BoxCon__darkSquere}></div>
      </div>
    </div>
  )
}