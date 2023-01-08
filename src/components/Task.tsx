import { useState } from "react";
import { Trash } from "phosphor-react";

import styles from './Task.module.css';
import Check from '../assets/check.png';
import Checked from '../assets/checked.png';

type TaskProps = {
  nameTask: string
  done: boolean
  pressDeleteTask: () => void
  pressChangeTaskChecked: () => void
}

export function Task({ nameTask, done = true, pressDeleteTask, pressChangeTaskChecked }: TaskProps) {
  const [isDone, setIsDone] = useState(done);

  function handleChangeCheck() {
    setIsDone(!isDone);
    pressChangeTaskChecked()
  }

  return (
    <div className={styles.wrapperTask}>
      <a className={styles.buttonA} onClick={handleChangeCheck}>
        <img src={isDone ? Checked : Check} className={styles.image} alt="checkbox image" />
        <span className={isDone ? styles.taskDone : styles.task}>
          {nameTask}
        </span>
      </a>

      <a className={styles.buttonA} onClick={pressDeleteTask}>
        <Trash color="#808080" size={24} />
      </a>
    </div>
  )
}