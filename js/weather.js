// weather.js

// 获取天气数据的函数
function fetchWeather() {
    // 替换为实际的API调用
    fetch('https://cn.apihz.cn/api/tianqi/tqyb.php?id=88888888&key=88888888&sheng=江西&place=南昌')
        .then(response => response.json())
        .then(data => {
            // 处理数据并显示在网页上
            var weatherString = JSON.stringify(data, null, 2);
            document.getElementById("weather").textContent = weatherString;
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

// 调用获取天气数据的函数
fetchWeather();
