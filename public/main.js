const socket = io();

let chart;
const labels = [];
const bandwidthData = [];

// ======= UPDATE STATUS PERANGKAT =======
socket.on("update", (devices) => {
  const tbody = document.getElementById("deviceTable");
  tbody.innerHTML = "";

  devices.forEach(d => {
    tbody.innerHTML += `
      <tr>
        <td>${d.name}</td>
        <td>${d.ip}</td>
        <td style="color:${d.status === "online" ? "green" : "red"}">${d.status}</td>
        <td>${d.bandwidth}</td>
      </tr>
    `;

    // update grafik
    labels.push(d.name + " " + Date.now());
    bandwidthData.push(d.bandwidth);

    if (labels.length > 20) {
      labels.shift();
      bandwidthData.shift();
    }

    chart.update();
  });
});

// ======= GRAFIK =======
const ctx = document.getElementById("chart");
chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: labels,
    datasets: [{
      label: "Bandwidth (Mbps)",
      data: bandwidthData,
      borderWidth: 3
    }]
  }
});

// ======= LOAD LOGS =======
async function loadLogs() {
  const res = await fetch("/api/logs");
  const logs = await res.json();
  
  const logList = document.getElementById("logs");
  logList.innerHTML = "";

  logs.forEach(l => {
    logList.innerHTML += `<li>${l.time} - ${l.device}: ${l.alert}</li>`;
  });
}

setInterval(loadLogs, 3000);

