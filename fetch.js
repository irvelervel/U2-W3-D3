// ora impariamo ad utilizzare il metodo fetch()
// fetch() è un metodo integrato in ogni browser moderno
// il tuo scopo è effettuare una HTTP REQUEST (client -> server)

// fetch() torna una Promise :)

// come funziona fetch()?
// fetch può accettare fino a 2 parametri:
// - 1) URL da contattare (obbligatorio)
// - 2) un oggetto di configurazione (facoltativo) dove si può indicare il method, eventuali headers, eventuale payload etc.

// METODI HTTP:
// GET -> recupero dati
// POST -> creo un nuovo dato
// PUT -> modifico un dato esistente
// DELETE -> elimino un dato esistente

const getRemoteData = function () {
  fetch('https://jsonplaceholder.typicode.com/users', {
    // method: 'GET' // anche senza scriverlo esplicitamente, il metodo di default è sempre GET
  })
    .then((res) => {
      // entro qui dentro solamente a fetch completata, non importa quanto tempo ci metterà!
      console.log('FETCH FINITA!')
      console.log(res)
      // res è un oggetto di tipo Response
      // Response contiene varie informazioni relative al risultato della nostra Request
      // quello che Response non contiene, tuttavia, è il PAYLOAD della risposta (i dati che cercavamo)
      if (res.ok) {
        // la chiamata è andata a buon fine e posso proseguire con l'estrazione dei dati (del payload)
        // ora vediamo come estrarre il body/payload dalla Response e avere finalmente a disposizione l'array di utenti
        return res.json() // questo è il metodo che estrae dalla Response il json risultante
      } else {
        // ho ottenuto un 400, 401, 404, 500, etc.
        // fermo l'esecuzione! NON proseguo con l'estrazione dei dati (che probabilmente neanche ci sono...)
        throw new Error('Errore nella chiamata') // questo vi butta automaticamente nel .catch(), dove
        // potete gestire gli errori
      }
    })
    .then((data) => {
      console.log(data)
      //   nascondo lo spinner quando sono CERTO i dati siano arrivati -> ovvero quando sono certo che il caricamento sia concluso
      let spinnerContainer = document.getElementById('spinner-container')
      spinnerContainer.classList.add('d-none')
      // qui dentro io dovrò utilizzare data!
      let row = document.querySelector('.row')
      data.forEach((user) => {
        let newCol = document.createElement('div')
        newCol.classList.add('col', 'col-3')
        newCol.innerHTML = `
            <div>
                <h3>${user.name}</h3>
                <p>${user.phone}</p>
            </div>
        `
        row.appendChild(newCol)
      })
    })
    .catch((err) => {
      // qui dentro voi dovreste gestire gli errori
      console.log('ERRORE!', err)
      // es. creare un Alert di BootStrap con l'errore dentro
    })
}

// i dati della chiamata li vediamo nel tab Preview della sezione "Network" degli strumenti di sviluppo
// quindi ci sono! però come li uso dal codice?

getRemoteData()
