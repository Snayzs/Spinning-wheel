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

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  width: '75%',
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

$('#enfource').click(function() {
  Swal.fire({
    customClass: {
      confirmButton: 'btn btn-primary mx-2',
      cancelButton: 'btn btn-danger mx-2'
    },
    buttonsStyling: false,
    icon: 'info',
    title: 'it will delete all results',
    showCancelButton: true,
    reverseButtons: true,
  }).then(res => {
    if (res.isConfirmed) {
      full_data = [...xi_4]
      setData()
      setWheel(data)
      setTextArea()
      clear()

      setTimeout(() =>
        Toast.fire({
          icon: 'success',
          title: 'Set up success'
        }), 500)
    }
  })
})