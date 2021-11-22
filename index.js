// {
//     type: 'ADD_TODO',
//         todo: {
//         id: 0,
//         name: 'Learn Redux',
//         complete: false,
//     }
// }

// {
//     type: 'REMOVE_TODO',
//         id: 0,
//   }

// {
//     type: 'TOGGLE_TODO',
//         id: 0,
//   }

// {
//     type: 'ADD_GOAL',
//         goal: {
//         id: 0,
//             name: 'Run a Marathon'
//     }
// }

// {
//     type: 'REMOVE_GOAL',
//         id: 0
// }

function todos(state, action) {
    if (action.type === 'ADD_TODO') {
        return state.concat([action.todo])
    } else if (action.type === 'REMOVE_TODO') {
        return state.filter((todo) => todo.id !== action.id)
    }

    return state
}


function createStore(reducer) {

    let state;
    let listeners = []

    const getState = () => state

    const subscribe = (listener) => {
        listeners.push(listener)

        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }
    }

    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach((listener) => listener())
    }

    return {
        getState,
        subscribe,
        dispatch
    }
}