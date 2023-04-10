declare var onconnect: ((event: MessageEvent) => void) | null; // fix issue Cannot find name 'onconnect'.

const connections: MessagePort[] = [];
const todoList: { id: number; value: string }[] = [];
onconnect = (e) => {
  const port = e.ports[0];
  connections.push(port);

  port.onmessage = (event) => {
    if (event.data.type === 'addTodo') {
      if (event.data.value) {
        todoList.push({ id: new Date().getTime(), value: event.data.value });
      }
      connections.forEach((connection) => {
        connection.postMessage(todoList);
      });
    }
    
    if (event.data.type === 'deleteTodo') {
      const index = todoList.findIndex((item) => item.id === event.data.value);
      if (index < 0) return;
      todoList.splice(index, 1);
      connections.forEach((connection) => {
        connection.postMessage(todoList);
      });
    }
  };
  port.start();
};
