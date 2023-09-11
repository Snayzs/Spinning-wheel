let notification = localStorage.getItem('notif') || 'true'
let speed = Number(localStorage.getItem('speed')) || 1.5
let check = document.querySelector('#hide-notif')
let text_area = document.querySelector('#text-area')
let range_speed = document.querySelector('#speed-range')


let getTextArea = () => text_area.value.trim().split('\n')

$(document).ready(function() {
  if (notification == 'false') {
    check.checked = true
  } else if (notification == 'true') {
    check.checked = false
  }

  range_speed.value = speed

  full_data = getTextArea().map(e => ({ name: e }))

  setData()
  setWheel(data)
})


$(text_area).on('input', function() {
  full_data = getTextArea().map(e => ({ name: e }))

  setData()
  setWheel(data)
})

$('#hide-notif').on('input', function() {
  notification = this.checked ? 'false' : 'true'

  localStorage.setItem('notif', !this.checked)
})

$('#speed-range').on('input', function() {
  speed = Number(this.value)

  localStorage.setItem('speed', this.value)
})

$('#enfource').click(function() {
  full_data = [...xi_4]
  setData()
  setWheel(data)

  text_area.value = getTextArea()

  clear()
})

function sortField() {
  let sortedval = getTextArea().sort()

  text_area.value = sortedval.join('\n')
  full_data = sortedval.map(e => ({ name: e }))
}

function randomField() {
  let randomVal = getTextArea().sort(() => Math.random() - 0.5)

  text_area.value = randomVal.join('\n')
  full_data = randomVal.map(e => ({ name: e }))
}

function setTextArea() {
  let newdata1 = data.map(e => e.name)
  let newdata2 = full_data.map(e => e.name)

  let text = newdata2.filter(full_name => {
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

    let name = completed_name
    
    return newdata1.includes(name)
  })
  
  text_area.value = text.join('\n')
}