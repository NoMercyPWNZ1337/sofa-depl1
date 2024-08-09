; (() => {
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
        let avgCount = (H1_L_input + H1_R_input + H2_L_input + H2_R_input + H3_L_input + H3_R_input + H4_L_input + H4_R_input + H5_L_input + H5_R_input + H6_L_input + H6_R_input +
            F1_L_input + F1_R_input + F2_L_input + F2_R_input + F3_L_input + F3_R_input + F4_L_input + F4_R_input + F5_L_input + F5_R_input + F6_L_input + F6_R_input) / 24;

        //------------Крок для відступу меж норми-----------------

        const stepLow = 0.0636 * avgCount + 6.864;
        const stepMedium = stepLow * 2;
        const stepHigh = stepLow * 3;


        // Функція для обчислення фізичної відстані за значенням на шкалі
        function valueToDistance(value, scaleIntervals) {
            let distance = 0;
            for (let interval of scaleIntervals) { // цикл за інтервалами шкал (H1 - F6)
                if (value > interval.end) {  // якщо отримане число > кінця інтервалу
                    distance += interval.length;  // тоді додаємо висота
                } else {
                    distance += (value - interval.start) / (interval.end - interval.start) * interval.length; // в іншому випадку вираховується висота до точки за шкалою в мм
                    //(різниця числа та початку інтервалу / різницю кінця інтервалу та початку інтервалу * на довжину поточного інтервалу)
                    break;
                }
            }
            return distance; // повернули готову дистанцію в мм
        }

        // Переведення фізичної відстані значення на шкалі 160
        function distanceToValue(distance, scaleIntervals) {
            let currentDistance = 0;
            for (let interval of scaleIntervals) { // цикл за інтервалами шкали 160
                if (distance > currentDistance + interval.length) { // якщо значення висоти поточної шкали (H1 - F6) > значення висоти шкали 160
                    currentDistance += interval.length; // тоді додаємо висоту
                } else {
                    return interval.start + (distance - currentDistance) / interval.length * (interval.end - interval.start); // в іншому випадку розраховується значення на шкалі 160
                    /*(беремо початок поточного інтервалу,
                        до нього додаємо різницю між фізичною відстанню і відстанню до початку поточного інтервалу - це дає нам відстань, що залишилася, яке потрібно пройти всередині поточного інтервалу
                        далі відстань, що залишилася, ділиться на довжину поточного інтервалу - отримуємо коефіцієнт
                        далі коефіцієнт множимо на різницю кінця інтервалу і початку інтервалу - це перетворює фізичну відстань в число шале 160)
                      */
                }
            }
            return scaleIntervals[scaleIntervals.length - 1].end; // Якщо відстань перевищує загальну довжину інтервалів, повертаємо кінець останнього інтервалу.
        }


        //------------Интервалы шкалы 160 (среднее знач, F1, F3)-----------------
        const scale_Main_Intervals = [
            { start: 0, end: 10, length: 14.7 },
            { start: 10, end: 20, length: 13 },
            { start: 20, end: 30, length: 12.5 },
            { start: 30, end: 40, length: 10.9 },
            { start: 40, end: 50, length: 10 },
            { start: 50, end: 60, length: 9 },
            { start: 60, end: 70, length: 8.8 },
            { start: 70, end: 80, length: 7.9 },
            { start: 80, end: 90, length: 7.6 },
            { start: 90, end: 100, length: 7.1 },
            { start: 100, end: 110, length: 6.5 },
            { start: 110, end: 120, length: 6.3 },
            { start: 120, end: 130, length: 6 },
            { start: 130, end: 140, length: 5.8 },
            { start: 140, end: 150, length: 5.8 },
            { start: 150, end: 160, length: 5.1 }
        ];

        //------------Интервалы шкалы 190 (H1)-----------------
        const scale_H1_Intervals = [
            { start: 0, end: 10, length: 12 },
            { start: 10, end: 20, length: 11.6 },
            { start: 20, end: 30, length: 10.6 },
            { start: 30, end: 40, length: 10 },
            { start: 40, end: 50, length: 8.8 },
            { start: 50, end: 60, length: 8.5 },
            { start: 60, end: 70, length: 7.9 },
            { start: 70, end: 80, length: 7.5 },
            { start: 80, end: 90, length: 6.9 },
            { start: 90, end: 100, length: 6.3 },
            { start: 100, end: 110, length: 6.3 },
            { start: 110, end: 120, length: 6 },
            { start: 120, end: 130, length: 5.7 },
            { start: 130, end: 140, length: 5.4 },
            { start: 140, end: 150, length: 5 },
            { start: 150, end: 160, length: 5 },
            { start: 160, end: 170, length: 4.5 },
            { start: 170, end: 180, length: 4.8 },
            { start: 180, end: 190, length: 4.5 }
        ];

        //------------Интервалы шкалы 170 (H2, H4)-----------------
        const scale_H2_H4_Intervals = [
            { start: 0, end: 10, length: 14 },
            { start: 10, end: 20, length: 12.7 },
            { start: 20, end: 30, length: 11.5 },
            { start: 30, end: 40, length: 10 },
            { start: 40, end: 50, length: 9.7 },
            { start: 50, end: 60, length: 8.9 },
            { start: 60, end: 70, length: 8.3 },
            { start: 70, end: 80, length: 8 },
            { start: 80, end: 90, length: 7.2 },
            { start: 90, end: 100, length: 6.9 },
            { start: 100, end: 110, length: 6.5 },
            { start: 110, end: 120, length: 6.2 },
            { start: 120, end: 130, length: 5.8 },
            { start: 130, end: 140, length: 5.5 },
            { start: 140, end: 150, length: 5.2 },
            { start: 150, end: 160, length: 5.1 },
            { start: 160, end: 170, length: 4.9 }
        ];

        //------------Интервалы шкалы 140 (H3)-----------------
        const scale_H3_Intervals = [
            { start: 0, end: 10, length: 15.5 },
            { start: 10, end: 20, length: 14.2 },
            { start: 20, end: 30, length: 13 },
            { start: 30, end: 40, length: 11.5 },
            { start: 40, end: 50, length: 10.9 },
            { start: 50, end: 60, length: 9.5 },
            { start: 60, end: 70, length: 9.1 },
            { start: 70, end: 80, length: 8.5 },
            { start: 80, end: 90, length: 7.7 },
            { start: 90, end: 100, length: 7.5 },
            { start: 100, end: 110, length: 6.9 },
            { start: 110, end: 120, length: 6.5 },
            { start: 120, end: 130, length: 6.1 },
            { start: 130, end: 140, length: 6 }
        ];

        //------------Интервалы шкалы 200 (H5, H6)-----------------
        const scale_H5_H6_Intervals = [
            { start: 0, end: 10, length: 12 },
            { start: 10, end: 20, length: 11.3 },
            { start: 20, end: 30, length: 10 },
            { start: 30, end: 40, length: 9.4 },
            { start: 40, end: 50, length: 8.8 },
            { start: 50, end: 60, length: 8 },
            { start: 60, end: 70, length: 7.6 },
            { start: 70, end: 80, length: 7.1 },
            { start: 80, end: 90, length: 6.9 },
            { start: 90, end: 100, length: 6.3 },
            { start: 100, end: 110, length: 6.1 },
            { start: 110, end: 120, length: 5.7 },
            { start: 120, end: 130, length: 5.5 },
            { start: 130, end: 140, length: 5.2 },
            { start: 140, end: 150, length: 5 },
            { start: 150, end: 160, length: 5 },
            { start: 160, end: 170, length: 4.3 },
            { start: 170, end: 180, length: 4.7 },
            { start: 180, end: 190, length: 4.5 },
            { start: 190, end: 200, length: 4 }
        ];

        //------------Интервалы шкалы 130 (F2, F5)-----------------
        const scale_F2_F5_Intervals = [
            { start: 0, end: 10, length: 18.5 },
            { start: 10, end: 20, length: 16 },
            { start: 20, end: 30, length: 14.5 },
            { start: 30, end: 40, length: 13.2 },
            { start: 40, end: 50, length: 11 },
            { start: 50, end: 60, length: 10.5 },
            { start: 60, end: 70, length: 9.8 },
            { start: 70, end: 80, length: 9.2 },
            { start: 80, end: 90, length: 8 },
            { start: 90, end: 100, length: 8 },
            { start: 100, end: 110, length: 7.1 },
            { start: 110, end: 120, length: 6.9 },
            { start: 120, end: 130, length: 6.6 }
        ];


        //------------Интервалы шкалы 150 (F4)-----------------
        const scale_F4_Intervals = [
            { start: 0, end: 10, length: 16.3 },
            { start: 10, end: 20, length: 14.1 },
            { start: 20, end: 30, length: 12.9 },
            { start: 30, end: 40, length: 11.5 },
            { start: 40, end: 50, length: 10 },
            { start: 50, end: 60, length: 9.9 },
            { start: 60, end: 70, length: 9 },
            { start: 70, end: 80, length: 8.5 },
            { start: 80, end: 90, length: 7.9 },
            { start: 90, end: 100, length: 7.2 },
            { start: 100, end: 110, length: 7 },
            { start: 110, end: 120, length: 6.5 },
            { start: 120, end: 130, length: 6.2 },
            { start: 130, end: 140, length: 6 },
            { start: 140, end: 150, length: 5.5 }
        ];

        //------------Интервалы шкалы 140 (F6)-----------------
        const scale_F6_Intervals = [
            { start: 0, end: 10, length: 16.7 },
            { start: 10, end: 20, length: 14.9 },
            { start: 20, end: 30, length: 13.6 },
            { start: 30, end: 40, length: 11.8 },
            { start: 40, end: 50, length: 11.6 },
            { start: 50, end: 60, length: 9.6 },
            { start: 60, end: 70, length: 9.5 },
            { start: 70, end: 80, length: 8.7 },
            { start: 80, end: 90, length: 8.3 },
            { start: 90, end: 100, length: 7.5 },
            { start: 100, end: 110, length: 7.5 },
            { start: 110, end: 120, length: 6.8 },
            { start: 120, end: 130, length: 6.3 },
            { start: 130, end: 140, length: 6.2 }
        ];


        //-------------H1-------------
        const distanceOnScale_H1_L = valueToDistance(H1_L_input, scale_H1_Intervals);
        const distanceOnScale_H1_R = valueToDistance(H1_R_input, scale_H1_Intervals);
        const valueOnScaleMain_H1_L = distanceToValue(distanceOnScale_H1_L, scale_Main_Intervals);
        const valueOnScaleMain_H1_R = distanceToValue(distanceOnScale_H1_R, scale_Main_Intervals);

        //-------------H2-------------
        const distanceOnScale_H2_L = valueToDistance(H2_L_input, scale_H2_H4_Intervals);
        const distanceOnScale_H2_R = valueToDistance(H2_R_input, scale_H2_H4_Intervals);
        const valueOnScaleMain_H2_L = distanceToValue(distanceOnScale_H2_L, scale_Main_Intervals);
        const valueOnScaleMain_H2_R = distanceToValue(distanceOnScale_H2_R, scale_Main_Intervals);

        //-------------H3-------------
        const distanceOnScale_H3_L = valueToDistance(H3_L_input, scale_H3_Intervals);
        const distanceOnScale_H3_R = valueToDistance(H3_R_input, scale_H3_Intervals);
        const valueOnScaleMain_H3_L = distanceToValue(distanceOnScale_H3_L, scale_Main_Intervals);
        const valueOnScaleMain_H3_R = distanceToValue(distanceOnScale_H3_R, scale_Main_Intervals);

        //-------------H4-------------
        const distanceOnScale_H4_L = valueToDistance(H4_L_input, scale_H2_H4_Intervals);
        const distanceOnScale_H4_R = valueToDistance(H4_R_input, scale_H2_H4_Intervals);
        const valueOnScaleMain_H4_L = distanceToValue(distanceOnScale_H4_L, scale_Main_Intervals);
        const valueOnScaleMain_H4_R = distanceToValue(distanceOnScale_H4_R, scale_Main_Intervals);

        //-------------H5-------------
        const distanceOnScale_H5_L = valueToDistance(H5_L_input, scale_H5_H6_Intervals);
        const distanceOnScale_H5_R = valueToDistance(H5_R_input, scale_H5_H6_Intervals);
        const valueOnScaleMain_H5_L = distanceToValue(distanceOnScale_H5_L, scale_Main_Intervals);
        const valueOnScaleMain_H5_R = distanceToValue(distanceOnScale_H5_R, scale_Main_Intervals);

        //-------------H6-------------
        const distanceOnScale_H6_L = valueToDistance(H6_L_input, scale_H5_H6_Intervals);
        const distanceOnScale_H6_R = valueToDistance(H6_R_input, scale_H5_H6_Intervals);
        const valueOnScaleMain_H6_L = distanceToValue(distanceOnScale_H6_L, scale_Main_Intervals);
        const valueOnScaleMain_H6_R = distanceToValue(distanceOnScale_H6_R, scale_Main_Intervals);

        //-------------F1-------------
        //таке ж саме

        //-------------F2-------------
        const distanceOnScale_F2_L = valueToDistance(F2_L_input, scale_F2_F5_Intervals);
        const distanceOnScale_F2_R = valueToDistance(F2_R_input, scale_F2_F5_Intervals);
        const valueOnScaleMain_F2_L = distanceToValue(distanceOnScale_F2_L, scale_Main_Intervals);
        const valueOnScaleMain_F2_R = distanceToValue(distanceOnScale_F2_R, scale_Main_Intervals);

        //-------------F3-------------
        //таке ж саме

        //-------------F4-------------
        const distanceOnScale_F4_L = valueToDistance(F4_L_input, scale_F4_Intervals);
        const distanceOnScale_F4_R = valueToDistance(F4_R_input, scale_F4_Intervals);
        const valueOnScaleMain_F4_L = distanceToValue(distanceOnScale_F4_L, scale_Main_Intervals);
        const valueOnScaleMain_F4_R = distanceToValue(distanceOnScale_F4_R, scale_Main_Intervals);

        //-------------F5-------------
        const distanceOnScale_F5_L = valueToDistance(F5_L_input, scale_F2_F5_Intervals);
        const distanceOnScale_F5_R = valueToDistance(F5_R_input, scale_F2_F5_Intervals);
        const valueOnScaleMain_F5_L = distanceToValue(distanceOnScale_F5_L, scale_Main_Intervals);
        const valueOnScaleMain_F5_R = distanceToValue(distanceOnScale_F5_R, scale_Main_Intervals);

        //-------------F6-------------
        const distanceOnScale_F6_L = valueToDistance(F6_L_input, scale_F6_Intervals);
        const distanceOnScale_F6_R = valueToDistance(F6_R_input, scale_F6_Intervals);
        const valueOnScaleMain_F6_L = distanceToValue(distanceOnScale_F6_L, scale_Main_Intervals);
        const valueOnScaleMain_F6_R = distanceToValue(distanceOnScale_F6_R, scale_Main_Intervals);

        //-------------Масиви для графіку-------------
        const values_L = [valueOnScaleMain_H1_L, valueOnScaleMain_H2_L, valueOnScaleMain_H3_L, valueOnScaleMain_H4_L, valueOnScaleMain_H5_L, valueOnScaleMain_H6_L, F1_L_input, valueOnScaleMain_F2_L, F3_L_input, valueOnScaleMain_F4_L, valueOnScaleMain_F5_L, valueOnScaleMain_F6_L];
        const values_R = [valueOnScaleMain_H1_R, valueOnScaleMain_H2_R, valueOnScaleMain_H3_R, valueOnScaleMain_H4_R, valueOnScaleMain_H5_R, valueOnScaleMain_H6_R, F1_R_input, valueOnScaleMain_F2_R, F3_R_input, valueOnScaleMain_F4_R, valueOnScaleMain_F5_R, valueOnScaleMain_F6_R];


        //-------------Кольори для гістаграм-------------
        const colors_L = values_L.map(value => {
            if (value > avgCount + stepHigh) { return '#990000'; }
            else if (value > avgCount + stepMedium) { return '#FF6666'; }
            else if (value > avgCount + stepLow) { return '#FF9999'; }
            if (value < avgCount - stepHigh) return 'blue';
            else if (value < avgCount - stepMedium) { return '#6666FF'; }
            else if (value < avgCount - stepLow) { return '#9999FF'; }
            return 'green';
        });

        const colors_R = values_R.map(value => {
            if (value > avgCount + stepHigh) return '#990000';
            else if (value > avgCount + stepMedium) { return '#FF6666'; }
            else if (value > avgCount + stepLow) { return '#FF9999'; }
            if (value < avgCount - stepHigh) return 'blue';
            else if (value < avgCount - stepMedium) { return '#6666FF'; }
            else if (value < avgCount - stepLow) { return '#9999FF'; }
            return 'green';
        });

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
                                        size: 8
                                    },
                                    enabled: true,
                                    position: 'center'
                                }
                            },
                            {
                                type: 'line',
                                yMin: avgCount + stepLow,
                                yMax: avgCount + stepLow,
                                borderColor: '#404040',
                                borderWidth: 1.5,
                                label: {
                                    content: (avgCount + stepLow).toFixed(3),
                                    font: {
                                        size: 8
                                    },
                                    enabled: true,
                                    position: 'center'
                                }
                            },
                            {
                                type: 'line',
                                yMin: avgCount - stepLow,
                                yMax: avgCount - stepLow,
                                borderColor: '#404040',
                                borderWidth: 1.5,
                                label: {
                                    content: (avgCount - stepLow).toFixed(3),
                                    font: {
                                        size: 8
                                    },
                                    enabled: true,
                                    position: 'center'
                                }
                            },
                            {
                                type: 'line',
                                yMin: avgCount + stepMedium,
                                yMax: avgCount + stepMedium,
                                borderColor: '#404040',
                                borderWidth: 1.5,
                                borderDash: [5, 5], // Пунктирна лінія
                                label: {
                                    content: (avgCount + stepMedium).toFixed(3),
                                    font: {
                                        size: 8
                                    },
                                    enabled: true,
                                    position: 'center'
                                }
                            },
                            {
                                type: 'line',
                                yMin: avgCount - stepMedium,
                                yMax: avgCount - stepMedium,
                                borderColor: '#404040',
                                borderWidth: 1.5,
                                borderDash: [5, 5], // Пунктирна лінія
                                label: {
                                    content: (avgCount - stepMedium).toFixed(3),
                                    font: {
                                        size: 8
                                    },
                                    enabled: true,
                                    position: 'center'
                                }
                            },
                            {
                                type: 'line',
                                yMin: avgCount + stepHigh,
                                yMax: avgCount + stepHigh,
                                borderColor: '#C0C0C0',
                                borderWidth: 1.5,
                                borderDash: [5, 5],
                                label: {
                                    content: (avgCount + stepHigh).toFixed(3),
                                    font: {
                                        size: 8
                                    },
                                    enabled: true,
                                    position: 'center'
                                }
                            },
                            {
                                type: 'line',
                                yMin: avgCount - stepHigh,
                                yMax: avgCount - stepHigh,
                                borderColor: '#C0C0C0',
                                borderWidth: 1.5,
                                borderDash: [5, 5], // Пунктирна лінія
                                label: {
                                    content: (avgCount - stepHigh).toFixed(3),
                                    font: {
                                        size: 8
                                    },
                                    enabled: true,
                                    position: 'center'
                                }
                            }

                        ]
                    },
                },
            },
        })

        //-------------Перевірка висновку-------------
        let arrHeadResult = [],
            arrResult = [];
        function checkInput(result_L_input, result_R_input, avgCount) {
            if (result_L_input > (avgCount + stepHigh) && result_R_input > (avgCount + stepHigh)) {
                return "Гіперфункція - III ступінь";
            } else if ((result_L_input > (avgCount + stepHigh) && result_R_input < (avgCount - stepHigh)) || result_L_input > (avgCount + stepMedium) && result_R_input < (avgCount - stepMedium) || result_L_input > (avgCount + stepLow) && result_R_input < (avgCount - stepLow)) {
                return "Дисфункція";
            } else if ((result_L_input < (avgCount - stepHigh) && result_R_input > (avgCount + stepHigh)) || (result_L_input < (avgCount - stepMedium) && result_R_input > (avgCount + stepMedium)) || (result_L_input < (avgCount - stepLow) && result_R_input > (avgCount + stepLow))) {
                return "Дисфункція";
            } else if (result_L_input > (avgCount + stepHigh) && (result_R_input < (avgCount + stepHigh) && result_R_input > (avgCount - stepHigh))) {
                return "Гіперфункція - III ступінь";
            } else if (result_L_input < (avgCount - stepHigh) && (result_R_input < (avgCount + stepHigh) && result_R_input > (avgCount - stepHigh))) {
                return "Гіпофункція - III ступінь";
            } else if (result_R_input > (avgCount + stepHigh) && (result_L_input < (avgCount + stepHigh) && result_L_input > (avgCount - stepHigh))) {
                return "Гіперфункція - III ступінь";
            } else if (result_R_input < (avgCount - stepHigh) && (result_L_input < (avgCount + stepHigh) && result_L_input > (avgCount - stepHigh))) {
                return "Гіпофункція - III ступінь";
            } else if (result_R_input < (avgCount - stepHigh) && result_R_input < (avgCount - stepHigh)) {
                return "Гіпофункція - III ступінь";
            }
            if (result_L_input > (avgCount + stepMedium) && result_R_input > (avgCount + stepMedium)) {
                return "Гіперфункція - II ступінь";
            } else if ((result_L_input > (avgCount + stepHigh) && result_R_input < (avgCount - stepHigh)) || result_L_input > (avgCount + stepMedium) && result_R_input < (avgCount - stepMedium) || result_L_input > (avgCount + stepLow) && result_R_input < (avgCount - stepLow)) {
                return "Дисфункція";
            } else if ((result_L_input < (avgCount - stepHigh) && result_R_input > (avgCount + stepHigh)) || (result_L_input < (avgCount - stepMedium) && result_R_input > (avgCount + stepMedium)) || (result_L_input < (avgCount - stepLow) && result_R_input > (avgCount + stepLow))) {
                return "Дисфункція";
            } else if (result_L_input > (avgCount + stepMedium) && (result_R_input < (avgCount + stepMedium) && result_R_input > (avgCount - stepMedium))) {
                return "Гіперфункція - II ступінь";
            } else if (result_L_input < (avgCount - stepMedium) && (result_R_input < (avgCount + stepMedium) && result_R_input > (avgCount - stepMedium))) {
                return "Гіпофункція - II ступінь";
            } else if (result_R_input > (avgCount + stepMedium) && (result_L_input < (avgCount + stepMedium) && result_L_input > (avgCount - stepMedium))) {
                return "Гіперфункція - II ступінь";
            } else if (result_R_input < (avgCount - stepMedium) && (result_L_input < (avgCount + stepMedium) && result_L_input > (avgCount - stepMedium))) {
                return "Гіпофункція - II ступінь";
            } else if (result_R_input < (avgCount - stepMedium) && result_R_input < (avgCount - stepMedium)) {
                return "Гіпофункція - II ступінь";
            }
            if (result_L_input > (avgCount + stepLow) && result_R_input > (avgCount + stepLow)) {
                return "Гіперфункція - I ступінь";
            } else if ((result_L_input > (avgCount + stepHigh) && result_R_input < (avgCount - stepHigh)) || result_L_input > (avgCount + stepMedium) && result_R_input < (avgCount - stepMedium) || result_L_input > (avgCount + stepLow) && result_R_input < (avgCount - stepLow)) {
                return "Дисфункція";
            } else if ((result_L_input < (avgCount - stepHigh) && result_R_input > (avgCount + stepHigh)) || (result_L_input < (avgCount - stepMedium) && result_R_input > (avgCount + stepMedium)) || (result_L_input < (avgCount - stepLow) && result_R_input > (avgCount + stepLow))) {
                return "Дисфункція";
            } else if (result_L_input > (avgCount + stepLow) && (result_R_input < (avgCount + stepLow) && result_R_input > (avgCount - stepLow))) {
                return "Гіперфункція - I ступінь";
            } else if (result_L_input < (avgCount - stepLow) && (result_R_input < (avgCount + stepLow) && result_R_input > (avgCount - stepLow))) {
                return "Гіпофункція - I ступінь";
            } else if (result_R_input > (avgCount + stepLow) && (result_L_input < (avgCount + stepLow) && result_L_input > (avgCount - stepLow))) {
                return "Гіперфункція - I ступінь";
            } else if (result_R_input < (avgCount - stepLow) && (result_L_input < (avgCount + stepLow) && result_L_input > (avgCount - stepLow))) {
                return "Гіпофункція - I ступінь";
            } else if (result_R_input < (avgCount - stepLow) && result_R_input < (avgCount - stepLow)) {
                return "Гіпофункція - I ступінь";
            }
        }

        let results = [
            { input_L: valueOnScaleMain_H1_L, input_R: valueOnScaleMain_H1_R, head: "H1 (Легені):" },
            { input_L: valueOnScaleMain_H2_L, input_R: valueOnScaleMain_H2_R, head: "H2 (Перикарда):" },
            { input_L: valueOnScaleMain_H3_L, input_R: valueOnScaleMain_H3_R, head: "H3 (Серце):" },
            { input_L: valueOnScaleMain_H4_L, input_R: valueOnScaleMain_H4_R, head: "H4 (Тонка кишка):" },
            { input_L: valueOnScaleMain_H5_L, input_R: valueOnScaleMain_H5_R, head: "H5 (Три частини тулуба):" },
            { input_L: valueOnScaleMain_H6_L, input_R: valueOnScaleMain_H6_R, head: "H6 (Товста кишка):" },
            { input_L: F1_L_input, input_R: F1_R_input, head: "F1 (Селезінка - підшлункова залоза):" },
            { input_L: valueOnScaleMain_F2_L, input_R: valueOnScaleMain_F2_R, head: "F2 (Печінка):" },
            { input_L: F3_L_input, input_R: F3_R_input, head: "F3 (Нирки):" },
            { input_L: valueOnScaleMain_F4_L, input_R: valueOnScaleMain_F4_R, head: "F4 (Сечовий міхур):" },
            { input_L: valueOnScaleMain_F5_L, input_R: valueOnScaleMain_F5_R, head: "F5 (Жовчний міхур):" },
            { input_L: valueOnScaleMain_F6_L, input_R: valueOnScaleMain_F6_R, head: "F6 (Шлунок):" }
        ];

        for (let result of results) {
            let resultText = checkInput(result.input_L, result.input_R, avgCount, stepLow);
            if (resultText) {
                arrHeadResult.push(result.head);
                arrResult.push(resultText);
            }
        }

        document.getElementById('head-res').innerHTML = getHeadResHTML()
        document.getElementById('final-res').innerHTML = getResHTML()

        function getHeadResHTML() {
            return arrHeadResult
                .map(item => {
                    return '<li class="items"><h3>' + item + '</h3></li>'
                })
                .join('')
        }
        function getResHTML() {
            return arrResult
                .map(item => {
                    return '<li class="items"><h3>' + item + '</h3></li>'
                })
                .join('')
        }
    }

    buildBtn.addEventListener('click', () => {
        document.querySelector('#nakatani-wraper').classList.add('active')
        updateChart()
    })
})()
