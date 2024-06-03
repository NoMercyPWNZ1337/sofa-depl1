;(() => {
  const ctx = document.getElementById('myChart').getContext('2d')
  const buildBtn = document.getElementById('build-button')
  let myChart

  function updateChart() {
    let H1_L_input = parseFloat(document.getElementById('H1_L_input').value)
    let H1_R_input = parseFloat(document.getElementById('H1_R_input').value)

    let H2_L_input = parseFloat(document.getElementById('H2_L_input').value)
    let H2_R_input = parseFloat(document.getElementById('H2_R_input').value)

    let H3_L_input = parseFloat(document.getElementById('H3_L_input').value)
    let H3_R_input = parseFloat(document.getElementById('H3_R_input').value)

    let H4_L_input = parseFloat(document.getElementById('H4_L_input').value)
    let H4_R_input = parseFloat(document.getElementById('H4_R_input').value)

    let H5_L_input = parseFloat(document.getElementById('H5_L_input').value)
    let H5_R_input = parseFloat(document.getElementById('H5_R_input').value)

    let H6_L_input = parseFloat(document.getElementById('H6_L_input').value)
    let H6_R_input = parseFloat(document.getElementById('H6_R_input').value)

    let F1_L_input = parseFloat(document.getElementById('F1_L_input').value)
    let F1_R_input = parseFloat(document.getElementById('F1_R_input').value)

    let F2_L_input = parseFloat(document.getElementById('F2_L_input').value)
    let F2_R_input = parseFloat(document.getElementById('F2_R_input').value)

    let F3_L_input = parseFloat(document.getElementById('F3_L_input').value)
    let F3_R_input = parseFloat(document.getElementById('F3_R_input').value)

    let F4_L_input = parseFloat(document.getElementById('F4_L_input').value)
    let F4_R_input = parseFloat(document.getElementById('F4_R_input').value)

    let F5_L_input = parseFloat(document.getElementById('F5_L_input').value)
    let F5_R_input = parseFloat(document.getElementById('F5_R_input').value)

    let F6_L_input = parseFloat(document.getElementById('F6_L_input').value)
    let F6_R_input = parseFloat(document.getElementById('F6_R_input').value)

    //------------Середнє-----------------
    let avgCount =
      (H1_L_input +
        H1_R_input +
        H2_L_input +
        H2_R_input +
        H3_L_input +
        H3_R_input +
        H4_L_input +
        H4_R_input +
        H5_L_input +
        H5_R_input +
        H6_L_input +
        H6_R_input +
        F1_L_input +
        F1_R_input +
        F2_L_input +
        F2_R_input +
        F3_L_input +
        F3_R_input +
        F4_L_input +
        F4_R_input +
        F5_L_input +
        F5_R_input +
        F6_L_input +
        F6_R_input) /
      24

    //------------Крок для відступу меж норми-----------------
    const step = 0.0636 * avgCount + 6.864

    //------------Нормалізація H-----------------

    let result_H1_L_input = H1_L_input * 0.8557,
      result_H1_R_input = H1_R_input * 0.8557,
      result_H2_L_input = H2_L_input * 0.9326,
      result_H2_R_input = H2_R_input * 0.9326,
      result_H3_L_input = H3_L_input * 1.1067,
      result_H3_R_input = H3_R_input * 1.1067,
      result_H4_L_input = H4_L_input * 0.9326,
      result_H4_R_input = H4_R_input * 0.9326,
      result_H5_L_input = H5_L_input * 0.8058,
      result_H5_R_input = H5_R_input * 0.8058,
      result_H6_L_input = H6_L_input * 0.8058,
      result_H6_R_input = H6_R_input * 0.8058

    //------------Нормалізація F-----------------

    let result_F1_L_input = F1_L_input * 1,
      result_F1_R_input = F1_R_input * 1,
      result_F2_L_input = F2_L_input * 1.2769,
      result_F2_R_input = F2_R_input * 1.2769,
      result_F3_L_input = F3_L_input * 1,
      result_F3_R_input = F3_R_input * 1,
      result_F4_L_input = F4_L_input * 1.0921,
      result_F4_R_input = F4_R_input * 1.0921,
      result_F5_L_input = F5_L_input * 1.2769,
      result_F5_R_input = F5_R_input * 1.2769,
      result_F6_L_input = F6_L_input * 1.1488,
      result_F6_R_input = F6_R_input * 1.1488

    const values_L = [
      result_H1_L_input,
      result_H2_L_input,
      result_H3_L_input,
      result_H4_L_input,
      result_H5_L_input,
      result_H6_L_input,
      result_F1_L_input,
      result_F2_L_input,
      result_F3_L_input,
      result_F4_L_input,
      result_F5_L_input,
      result_F6_L_input,
    ]
    const values_R = [
      result_H1_R_input,
      result_H2_R_input,
      result_H3_R_input,
      result_H4_R_input,
      result_H5_R_input,
      result_H6_R_input,
      result_F1_R_input,
      result_F2_R_input,
      result_F3_R_input,
      result_F4_R_input,
      result_F5_R_input,
      result_F6_R_input,
    ]

    const colors_L = values_L.map(value => {
      if (value > avgCount + step) return 'red'
      if (value < avgCount - step) return 'blue'
      return 'green'
    })

    const colors_R = values_R.map(value => {
      if (value > avgCount + step) return 'red'
      if (value < avgCount - step) return 'blue'
      return 'green'
    })

    if (myChart) {
      myChart.destroy()
    }

    myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'H1',
          'H2',
          'H3',
          'H4',
          'H5',
          'H6',
          'F1',
          'F2',
          'F3',
          'F4',
          'F5',
          'F6',
        ],
        datasets: [
          {
            label: 'Ліво',
            data: values_L,
            backgroundColor: colors_L,
            borderColor: colors_L,
            borderWidth: 1,
            categoryPercentage: 0.5,
            barPercentage: 0.8,
          },
          {
            label: 'Право',
            data: values_R,
            backgroundColor: colors_R,
            borderColor: colors_R,
            borderWidth: 1,
            categoryPercentage: 0.5,
            barPercentage: 0.8,
          },
        ],
      },
      options: {
        scales: {
          x: {
            position: 'top',
          },
          y: {
            beginAtZero: true,
            suggestedMax: 160,
            suggestedMin: 0,
            ticks: {
              stepSize: 10,
            },
          },
          r: {
            ticks: {
              backdropPadding: {
                x: 100,
                y: 4,
              },
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              generateLabels: function (chart) {
                return [
                  {
                    text: 'Гіперфункція',
                    fillStyle: 'red',
                  },
                  {
                    text: 'Норма',
                    fillStyle: 'green',
                  },
                  {
                    text: 'Гіпофункція',
                    fillStyle: 'blue',
                  },
                ]
              },
            },
          },
          annotation: {
            annotations: [
              {
                type: 'line',
                yMin: avgCount,
                yMax: avgCount,
                borderColor: 'black',
                borderWidth: 1.5,
                label: {
                  content: avgCount.toFixed(3),
                  font: {
                    size: 8,
                  },
                  enabled: true,
                  position: 'center',
                },
              },
              {
                type: 'line',
                yMin: avgCount + step,
                yMax: avgCount + step,
                borderColor: 'grey',
                borderWidth: 1.5,
                label: {
                  content: (avgCount + step).toFixed(3),
                  font: {
                    size: 8,
                  },
                  enabled: true,
                  position: 'center',
                },
              },
              {
                type: 'line',
                yMin: avgCount - step,
                yMax: avgCount - step,
                borderColor: 'grey',
                borderWidth: 1.5,
                label: {
                  content: (avgCount - step).toFixed(3),
                  font: {
                    size: 8,
                  },
                  enabled: true,
                  position: 'center',
                },
              },
            ],
          },
        },
      },
    })

    let arrHeadResult = [],
      arrResult = []
    function checkInput(result_L_input, result_R_input, avgCount, step) {
      if (
        result_L_input > avgCount + step &&
        result_R_input > avgCount + step
      ) {
        return 'Гіперфункція'
      } else if (
        result_L_input > avgCount + step &&
        result_R_input < avgCount - step
      ) {
        return 'Дисфункція'
      } else if (
        result_L_input < avgCount - step &&
        result_R_input > avgCount + step
      ) {
        return 'Дисфункція'
      } else if (
        result_L_input > avgCount + step &&
        result_R_input < avgCount + step &&
        result_R_input > avgCount - step
      ) {
        return 'Гіперфункція'
      } else if (
        result_L_input < avgCount - step &&
        result_R_input < avgCount + step &&
        result_R_input > avgCount - step
      ) {
        return 'Гіпофункція'
      } else if (
        result_R_input > avgCount + step &&
        result_L_input < avgCount + step &&
        result_L_input > avgCount - step
      ) {
        return 'Гіперфункція'
      } else if (
        result_R_input < avgCount - step &&
        result_L_input < avgCount + step &&
        result_L_input > avgCount - step
      ) {
        return 'Гіпофункція'
      } else if (
        result_R_input < avgCount - step &&
        result_R_input < avgCount - step
      ) {
        return 'Гіпофункція'
      }
    }

    let results = [
      {
        input_L: result_H1_L_input,
        input_R: result_H1_R_input,
        head: 'H1 (Легені):',
      },
      {
        input_L: result_H2_L_input,
        input_R: result_H2_R_input,
        head: 'H2 (Перикарда):',
      },
      {
        input_L: result_H3_L_input,
        input_R: result_H3_R_input,
        head: 'H3 (Серце):',
      },
      {
        input_L: result_H4_L_input,
        input_R: result_H4_R_input,
        head: 'H4 (Тонка кишка):',
      },
      {
        input_L: result_H5_L_input,
        input_R: result_H5_R_input,
        head: 'H5 (Три частини тулуба):',
      },
      {
        input_L: result_H6_L_input,
        input_R: result_H6_R_input,
        head: 'H6 (Товста кишка):',
      },
      {
        input_L: result_F1_L_input,
        input_R: result_F1_R_input,
        head: 'F1 (Селезінка - підшлункова залоза):',
      },
      {
        input_L: result_F2_L_input,
        input_R: result_F2_R_input,
        head: 'F2 (Печінка):',
      },
      {
        input_L: result_F3_L_input,
        input_R: result_F3_R_input,
        head: 'F3 (Нирки):',
      },
      {
        input_L: result_F4_L_input,
        input_R: result_F4_R_input,
        head: 'F4 (Сечовий міхур):',
      },
      {
        input_L: result_F5_L_input,
        input_R: result_F5_R_input,
        head: 'F5 (Жовчний міхур):',
      },
      {
        input_L: result_F6_L_input,
        input_R: result_F6_R_input,
        head: 'F6 (Шлунок):',
      },
    ]

    for (let result of results) {
      let resultText = checkInput(
        result.input_L,
        result.input_R,
        avgCount,
        step
      )
      if (resultText) {
        arrHeadResult.push(result.head)
        arrResult.push(resultText)
      }
    }

    document.getElementById('head-res').innerHTML = getHeadResHTML()
    document.getElementById('final-res').innerHTML = getResHTML()

    function getHeadResHTML() {
      return arrHeadResult
        .map(item => {
          return '<li class="items">' + item + '</li>'
        })
        .join('')
    }
    function getResHTML() {
      return arrResult
        .map(item => {
          return '<li class="items">' + item + '</li>'
        })
        .join('')
    }
  }

  buildBtn.addEventListener('click', () => {
    document.querySelector('#nakatani-wraper').classList.add('active')
    updateChart()
  })
})()
