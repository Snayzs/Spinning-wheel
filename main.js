let degree;
let clicks = 0
let winners = []
let range = 1
let teams = Array.from({ length: 10 }, () => []);
let spinnable = true
let autoGenerate = false
let totalDegree;

$(document).ready(function() {
  setWheel(data)

  $('#spin').click(function() {
    degree = 360 * (data.length < 6 ? 8 : data.length)
    
    $('#inner-wheel').css('transitionDuration', speed + 's')

    if (autoGenerate) {
      interval = setInterval(() => {
        spin()
      }, 250)
    } else {
      spin()
    }

    function spin() {
      clicks++;

      let newDegree = degree * clicks;
      let extraDegree = Math.floor(Math.random() * (360)) + 1;
      totalDegree = newDegree + extraDegree;

      let function_call = false;

      if (spinnable == false) return
      spinnable = false
      $('#wheel .sec').each(function() {
        let t = $(this);
        let noY = 0;

        let rotation_speed = 1000 * speed + 100;
        setTimeout(function() {
          let aoY = t.offset().top;

          if (function_call == false) {
            function_call = true;
            getCounterData(aoY)
            setTeam()
            setResult(teams)

            for (var i = 0; i < winners.length; i++) {
              data = data.filter(item => item.name != winners[i])
            }
            if (notification == 'true')
              Swal.fire({
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
                title: 'Congratulation',
                html: `<div class='text-start card p-2'>${winners[winners.length - 1]}</div>`,

                showCloseButton: true,
                reverseButtons: true,
                confirmButtonText: 'Oke'
              })

            setWheel(data, true)
            spinnable = true
          }
        }, rotation_speed)

        $('#inner-wheel').css({
          'transform': 'rotate(' + totalDegree + 'deg)'
        });

        noY = t.offset().top;
      });
    }
  });
});

function setPosition() {
  position = [];
  position_name = [];
  position_left = [];

  $('.sec').each(function() {
    let pos = $(this).offset().top;
    let left_pos = $(this).offset().left;
    position_left.push(left_pos);
    position.push(pos);

    position_name.push($(this).text())
    $(this).attr('data-position', pos);
  });
}
setPosition();


function getCounterData(num) {
  setPosition();
  current = position[0];
  current_name = position_name[0];
  position = sortWithIndeces(position);
  current_name = position_name[position.sortIndices[1]];

  if (data.length == 3) {
    let current_degree = totalDegree % 360 + 60
    if (current_degree <= 120) {
      winners.push(data[0].name);
    } else if (current_degree <= 240) {
      winners.push(data[2].name);
    } else if (current_degree <= 360) {
      winners.push(data[1].name);
    } else
      winners.push(data[0].name);
  } else if (data.length == 2) {
    winners.push(position_name[position.sortIndices[0]])
  } else if (data.length == 1) {
    winners.push(data[0].name)
  } else
    winners.push(current_name)
  setPosition();
}

function sortWithIndeces(toSort) {
  for (let i = 0; i < toSort.length; i++) {
    toSort[i] = [toSort[i], i];
  }
  toSort.sort(function(left, right) {
    return left[0] < right[0] ? -1 : 1;
  });
  toSort.sortIndices = [];
  for (let j = 0; j < toSort.length; j++) {
    toSort.sortIndices.push(toSort[j][1]);
    toSort[j] = toSort[j][0];
  }
  return toSort;
}

function setWheel(arr, condition = false) {
  let degree = 360 / arr.length

  if (condition) { $("#inner-wheel").html('') }

  for (var i = 0; i < arr.length; i++) {
    let name = arr[i].name
    let color = arr[i].color

    let el = $('<div>').addClass('sec')
      .css('borderTopColor', color)
    let text = $('<span>').addClass('fa').text(name)

    $("#inner-wheel").append(el.append(text))
  }

  $('.sec').each(function(i) {

    $(this).css({
      'transform': 'rotate(' + degree * i + 'deg)'
    })

    let extra = [0, 1750, 250, 105, 60, 40, 30, 25][arr.length - 1] || 20

    let radian = degree * (Math.PI / 180)
    let chord = (250 + extra) * Math.sin((radian / 2))
    $(this).css('borderWidth', `125px ${chord / 2}px 0 ${chord / 2}px`)

    if (arr.length == 2) {
      this.style.borderColor = this.style.borderTopColor
    } else {
      this.style.borderLeftColor = 'transparent'
      this.style.borderRightColor = 'transparent'
    }

    if (arr.length == 1) {
      this.parentNode.style.background = this.style.borderTopColor
    }
  })
}

function setResult(arg) {
  $('#result').empty()
  for (var i = 0; i < range; i++) {
    $('#result').append($('<ul>').addClass('list-group rounded-0 list-group-numbered'))
  }

  let list = $('#result ul')
  list.empty();

  list.each(function(j) {
    $(this).append($('<li>').text(`Team ${j + 1}:`).addClass('fw-bold'))

    arg[j].forEach(team => {
      $(this).addClass('mb-3').append($('<li>')
        .addClass('list-group-item list-group-item-secondary list-group-item-action')
        .text(team));
    });
  });


  $('.badge-result').text(winners.length == 0 ? '' : winners.length)
}

function setTeam() {
  teams = Array.from({ length: 10 }, () => []);

  winners.forEach((winner, index) => {
    const teamIndex = index % range;
    teams[teamIndex].push(winner)
  })
}

let status = true

function sortData() {
  let arr = [...teams];
  status = !status;

  let sortedTeam = arr.map(el => [...el].sort());

  setResult(!status ? sortedTeam : arr);
}




//============Event Handler===========\\
$('.sort-result').click(() => {
  sortData()
})

$('.clear-result').click(() => {
  Swal.fire({
    customClass: {
      confirmButton: 'btn btn-primary mx-2',
      cancelButton: 'btn btn-danger mx-2'
    },
    buttonsStyling: false,
    icon: 'warning',
    title: 'All results will be deleted',
    showCancelButton: true,
    reverseButtons: true,
  }).then(res => {
    if (res.isConfirmed) {
      winners = []
      teams = Array.from({ length: 10 }, () => []);
      $('#result ul').empty()
      $('.badge-result').empty()
    }
  })
})

$('#auto-gen').on('input', function() {
  autoGenerate = this.checked
  
  notification = 'false'
  speed = 0.5
})

$('#text-area').on('input', function() {
  new_data = this.value.split('\n')
});

$('#teams-range').on('input', function() {
  range = Number(this.value)
  setTeam()
  setResult(teams)
});