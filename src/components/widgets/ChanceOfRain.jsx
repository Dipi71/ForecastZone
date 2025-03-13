import { useEffect, useRef, useState } from "react";
import { useGetHourlyForecastQuery } from "../../services/WeatherApi";
import { useSelector } from "react-redux";
import { IoRainy } from "react-icons/io5";
import Chart, { BarController } from "chart.js/auto";

function ChanceOfRain() {
  const { lat, lng } = useSelector((state) => state.geolocation.geolocation);
  const { data, isSuccess } = useGetHourlyForecastQuery({ lat, lng });

  const chartRef = useRef(null);
  const [chart, setChart] = useState(null);

  function convertToHour(dt, timezone) {
    let utc_time = new Date(dt * 1000);
    let local_time = new Date(utc_time.getTime() + timezone * 1000);
    return local_time.toLocaleTimeString("en-US", { timeZone: "UTC", hour12: true, hour: "numeric" });
  }

  useEffect(() => {
    if (chartRef.current && isSuccess) {
      const timezone = data.city.timezone;
      const hourlyData = data.list.slice(0, 6); // First 6 hours only (OpenWeather Free Plan)

      const rainData = hourlyData.map(({ dt, pop }) => ({
        time: convertToHour(dt, timezone),
        chanceOfRain: pop * 100,
      }));

      Chart.register(BarController);

      const newChart = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: rainData.map(({ time }) => time),
          datasets: [
            {
              label: "Chance of Rain",
              data: rainData.map(({ chanceOfRain }) => chanceOfRain),
              backgroundColor: "#171717",
              borderWidth: 1,
              borderRadius: Number.MAX_VALUE,
              barThickness: 10,
              minBarLength: 5,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          scales: {
            x: { grid: { display: false } },
            y: {
              grid: { display: true },
              ticks: {
                beginAtZero: true,
                stepSize: 25,
                callback: (value) => (value <= 10 ? "Slight" : value <= 40 ? "Moderate" : "Rainy"),
              },
            },
          },
        },
      });

      return () => {
        setChart(newChart);
        newChart.destroy();
      };
    }
  }, [data, isSuccess]);

  return (
    <div className="flex h-40 flex-col overflow-hidden rounded-3xl bg-white p-4 shadow-lg dark:bg-neutral-800">
      <div className="flex flex-row gap-1">
        <IoRainy className="h-4 w-4" />
        <div className="text-xs font-semibold">CHANCE OF RAIN</div>
      </div>
      <div className="h-full w-full py-2">
        <canvas ref={chartRef} className="dark:invert" />
      </div>
    </div>
  );
}

export default ChanceOfRain;
