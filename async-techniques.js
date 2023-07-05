// ESEMPIO DI CODICE ASINCRONO
// avete due funzioni, la prima delle quali è un'operazione ASINCRONA (sapete quando parte, ma non si concluderà immediatamente)
// avete la necessità di chiamare la seconda funzione DOPO la fine della prima

let countUntilThree = function () {
  setTimeout(() => {
    console.log('conto fino a 3...')
  }, 3000)
}

let start = function () {
  countUntilThree() // non viene aspettata per la prosecuzione del codice :(
  console.log('FINITO!')
}

// start()

// come facciamo a far eseguire la riga 13 solo DOPO la fine della riga 12?

// SOLUZIONE 1) approccio con una CALLBACK
// una callback è una funzione che viene passata come parametro ad un'altra funzione
let countUntilThreeWithCallback = function (nextCode) {
  console.log('conto fino a 3...')
  setTimeout(() => {
    nextCode()
  }, 3000)
}

// esempio con callback definita separatamente
// const runConsoleLog = function () {
//   console.log('FINITO!')
// }

// let startWithCallback = function () {
//   countUntilThreeWithCallback(runConsoleLog)
// }

let startWithCallback = function () {
  countUntilThreeWithCallback(() => {
    console.log('FINITO!')
  })
}

startWithCallback()
