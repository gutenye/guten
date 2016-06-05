```
setState() only update its component, so need pass function
```

The Default Way

```

<App>
  state = {
    todos: [],
    filter: "SHOW_ALL", "SHOW_ACTIVE",
  }

  <Header addTodo setFilter>

  <Body todos filter>

addTodo, setFilter needs call App's setState().
```
