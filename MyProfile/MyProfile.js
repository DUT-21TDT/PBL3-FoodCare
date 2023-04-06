const toggleBtn = document.getElementById('toggle-btn');

toggleBtn.addEventListener('click', function() {
  this.classList.toggle('active');
});


var ctx = document.getElementById('canvas').getContext('2d');
var chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
        datasets: [
            {
            label: 'Chiều cao',
            data: [168, 168.5, 168.9, 169.5, 169.8, 170, 170.6],
            backgroundColor: 'transparent',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            yAxisID: 'y',
            tension:0.5,
        },
        {
            label: 'Cân nặng',
            data: [60.3, 60.7, 60.5, 61.3, 60.7, 61.5, 61.9],
            backgroundColor: 'transparent',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
            yAxisID: 'y1',
            tension:0.4,
        }]
    },
    options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        stacked: false,
        plugins: {
          title: {
            display: true,
            text: 'Biểu đồ chiều cao và cân nặng',
            font: {
                size: 20
            }
            
          }
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
          }
        }
    }
});

