const TodoList = ({ todos }) => {

  return (
    <div>
      <ul>
        {todos.map(t =>
          <li key={t.content}>{t.content} {t.done? <b>done</b> : <b>not done</b>}</li>
        )}
      </ul>
    </div>


  )

}

export default TodoList