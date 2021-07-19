# rotary.js

## Adding Rotary.js to Project
```javascript
<script src="..."></script>
```

## How to Use
```javascript
const rotary = new Rotary();

// registering actions
rotary.actions = [
    ...preparedActions
];
```

### Creating an Action
```javascript
const act1 = Rotary.createAction(
    'input_update', 
    ({ type, params }) => {
        console.log('Updated value:', params);
    }
);

rotary.actions = [ ...rotary.actions, act1 ];
```

### Subscribing to an Spesific Events
```javascript
rotary.subscribe('value_change', ({ type, params }) => {
    console.log({ type, params });
});
```

### Subscribing to Any Events
```javascript
rotary.subscribeAny(({  type, params }) => {
    console.log({ type, params });
});
```

### Unsubscribe
Coming soon

## API 
### `Class: Rotary`
#### `Static Method: createAction`
`.createAction(type, cb)`
#### `Method: subscribe`
`.subscribe(type, cb)`
#### `Method: subscribeAny`
`.subscribeAny(cb)`
#### `Method: dispatch` 
`.dispatch(type[, params = null])`