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