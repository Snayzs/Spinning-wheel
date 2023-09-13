let xi_4 = [
  { name: "ADRYAN SAPUTRA PRATAMA" },
  { name: "ALEA NADIA PUTRI DEWI" },
  { name: "ALFIANSYAH WIRAMADHAN GILANG PAMUNGKAS" },
  { name: "ANNISA FITRIA AZ ZAHRA" },
  { name: "DANDI RAMADHANI" },
  { name: "HANIF DZAKWAN FAA'IZ SANTOSO" },
  { name: "HENDY WAHYU ILLAHI" },
  { name: "ILAL JANNATI ZUMARA" },
  { name: "ISANIA HERLIDA JISE" },
  { name: "JOSAPHAT MARVEL CHRISTIAN" },
  { name: "MADA RAMADHAN" },
  { name: "MICHELLE MAHARANI" },
  { name: "MOHAMMAD ILHAM FARIZKY" },
  { name: "MOHAMMAD ROSYID" },
  { name: "MUHAMAD DZAKI AL HASANI" },
  { name: "MUHAMMAD DIKY PRATAMA" },
  { name: "MUHAMMAD HELVAN RYAN AKBAR" },
  { name: "NATASHA ALICIA DANIELA" },
  { name: "NESIA HABIBATUL KARIMA" },
  { name: "NUR AZIZAH" },
  { name: "NUR MAULIDYA PUTRI SUKARNINGRUM" },
  { name: "PUTRI FELICIA" },
  { name: "RADITYA ARYASATYA MAHESWARA" },
  { name: "RADJA AZZIS AL HAKIM" },
  { name: "RAFA NINO ADIYATMA" },
  { name: "RAFLY OKTAVIAN RAMADHANI" },
  { name: "RANGGA PUGUH PRAMUDANA" },
  { name: "REVO MUZZAKI FERGYMNASTIAL" },
  { name: "REXANA DIVA RAFITA" },
  { name: "SAYYID MOCHAMMAD IBROHIM BAFAQIH" },
  { name: "SHELA AFIATUZZUFAH" },
  { name: "TANAYA PRIYA PRAMUSITA" },
  { name: "TAUFIKUR ROKHMAN" },
  { name: "ZAHWA ALEA SAFIRA" }
];


let full_data = []
let data = []

const color = [
  '#16a085', '#2980b9', '#34495e',
  '#f39c12', '#d35400', '#0074e4',
  '#4caf50', '#ffc107', '#9c27b0',
  "#795548", "#d32f2f", "#ff5722",
  "#00bcd4", "#4caf50", "#673ab7",
  "#03a9f4", "#e91e63",
]

function setData() {
  data = sortedName(full_data)

  data.map(e => {
    let index = Math.round(Math.random() * (color.length - 1))
    return e.color = color[index]
  })
}
setData()

function sortedName(arr) {
  return arr.map(e => {
    validation(e.name)
    return { name: completed_name, color: e.color }
  })
}

function validation(full_name) {
  let [a, b, c] = full_name.split(' ')
  let regex = /m[uo]hamm?ad/gi

  if (regex.test(a)) {
    if (!c) {
      completed_name = a[0] + ' ' + b
    } else {
      if ((b.length + c.length) >= 10) {
        completed_name = a[0] + ' ' + b + ' ' + c[0]
      } else {
        completed_name = b + ' ' + c
      }
    }
  } else {
    if (a.length >= 10 || !b) {
      completed_name = a
    } else {
      if ((a.length + b.length) >= 10) {
        completed_name = a + ' ' + b[0]
      } else {
        completed_name = a + ' ' + b
      }
    }
  }

  return completed_name || ''
}