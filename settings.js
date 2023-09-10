let notification = localStorage.getItem('notif') || 'true'

let speed = localStorage.getItem('speed') || 1.5

$(document).ready(function() {
  let check = document.querySelector('#hide-notif')
  let text_area = document.querySelector('#text-area')

  if (notification == 'false') {
    check.checked = true
  } else if (notification == 'true') {
    check.checked = false
  }

  let text = full_data.map(e => e.name)
  full_data = text_area.value.trim().split('\n').map(e => { return { name: e } })
  setData()
  setWheel(data)

  $(text_area).on('input', function() {
    full_data = this.value.trim().split('\n').map(e => { return { name: e } })

    setData()
    setWheel(data)
  })
})

$('#hide-notif').on('input', function() {
  notification = this.checked ? 'false' : 'true'

  localStorage.setItem('notif', !this.checked)
})

$('#speed-range').on('input', function() {
  speed = Number(this.value)
})

$('#enfource').click(function() {
  full_data = [...xi_4]
  setData()
  setWheel(data)
})