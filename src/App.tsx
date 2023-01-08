
import { useState } from 'react';
import { PlusCircle } from "phosphor-react";

import './global.css';
import styles from './App.module.css';

import ClipBoard from './assets/clipboard.png';
import { Header } from './components/Header';
import { Task } from './components/Task';

type ListTaskProps = {
  id: string,
  nameTask: string,
  isDone: boolean,
}

function App() {
  const [nameTask, setNameTask] = useState('');
  const [listTasks, setListTasks] = useState<ListTaskProps[]>([]);

  const initialValue = 0;
  const tasksDone = listTasks.reduce(
    (previousValue, currentValue) => currentValue.isDone ? previousValue + 1 : previousValue + 0, 
    initialValue
  );

  function handleAddNewTask() {
    if(!nameTask) {
      return alert("Informe o nome da tarefa a ser feita.")
    }
    const tasksInMyList = [...listTasks];

    const min = Math.ceil(1);
    const max = Math.floor(5000);
    const numRandomId = Math.floor(Math.random() * (max - min)) + min;

    const data ={
      id: numRandomId.toString(),
      nameTask,
      isDone: false,
    } as ListTaskProps

    tasksInMyList.push(data);

    setListTasks(tasksInMyList);
    setNameTask('');
  }

  function handleUpdateTask(idTask: string) {
    const taskExists = listTasks.find(tasks => tasks.id === idTask);

    if(taskExists) {
      taskExists.isDone = !taskExists.isDone;

      setListTasks([...listTasks])
    }
  }

  function handleDeleteTask(idTask: string) {
    if(confirm("Tem certeza que quer deletar essa tarefa?")) {
      setListTasks(listTasks.filter(tasks => tasks.id !== idTask))
    }
  }

  return (
    <div style={{ flex: 1 }}>
      <Header />
      <div className={styles.content}>

        <div className={styles.wrapperInput}>
          <input 
            type="text" 
            className={styles.input} 
            placeholder="Adicione uma nova tarefa" 
            value={nameTask}
            onChange={e => setNameTask(e.target.value)}
          />
          <button title="Criar" onClick={handleAddNewTask} className={styles.button}>
            <span className={styles.textButton}>Criar</span>
            <PlusCircle color="#F2F2F2" size={16} />
          </button>
        </div>

        <div className={styles.wrapperSpaceTask}>
          <div className={styles.wrapperTask}>
            <span className={styles.taskCreate}>Tarefas criadas</span>
            <div className={styles.wrapperCount}>
              <span className={styles.textCount}>{listTasks.length}</span>
            </div>
          </div>

          <div className={styles.wrapperTask}>
            <span className={styles.taskCompleted}>Concluídas</span>
            <div className={styles.wrapperCount}>
              <span className={styles.textCount}>
                {listTasks.length <= 0
                ?
                  0
                :
                  `${tasksDone} de ${listTasks.length}`
                }
              </span>
            </div>
          </div>
        </div>

        {listTasks.length <= 0
        ?
          <div className={styles.emptyTask}>
            <img src={ClipBoard} alt="Nenhuma tarefa cadastrada" />
            <span className={styles.textEmpty}>
              <span style={{ fontWeight: 700 }}>Você ainda não tem tarefas cadastradas</span><br/>
              Crie tarefas e organize seus itens a fazer
            </span>
          </div>
        :
          listTasks.map((task) => {
            return (
              <Task
                nameTask={task.nameTask}
                done={task.isDone}
                pressChangeTaskChecked={() => handleUpdateTask(task.id)}
                pressDeleteTask={() => handleDeleteTask(task.id)}
              />
            )
          })
        }

      </div>
    </div>
  )
}

export default App
