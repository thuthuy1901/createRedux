// import { createStore } from 'https://cdn.skypack.dev/redux';

///////////////////MY REDUX///////////////////////
function createStore(reducer) {
    let state = reducer(undefined, {});
    const subscribes = [];

    return {
        getState() {
            return state;
        },
        dispatch(action) {
            state = reducer(state, action);

            subscribes.forEach(subscriber => subscriber());
        },
        subscribe(subscriber) {
            subscribes.push(subscriber);
        }
    }
}


////////////////////MY APP//////////////////////
const initState = 0;
// reducer
function bankReducer(state = initState, action) {
    switch (action.type) {
        case 'DEPOSIT':
            return state + action.payload;
        case 'WITHDRAW':
            return state - action.payload;

        default:
            return 0;

    }
}

// store
const store = window.store = createStore(bankReducer);

// action
function actionDeposit(payload) {
    return {
        type: 'DEPOSIT',
        payload
    }
}

function actionWithdraw(payload) {
    return {
        type: 'WITHDRAW',
        payload
    }
}

// DOM event
const deposit = document.querySelector('#deposit');
const withdraw = document.querySelector('#withdraw');

// event hander
deposit.onclick = function () {
    store.dispatch(actionDeposit(10));

}

withdraw.onclick = function () {
    store.dispatch(actionWithdraw(10));

}

// listener
store.subscribe(() => {
    render();
})

// render
function render() {
    const output = document.querySelector('#output');
    output.innerText = store.getState();
}

render()