// weather.js

// 获取天气数据的函数
function fetchWeather() {
    // 使用fetch()函数从API获取天气数据
    fetch('https://cn.apihz.cn/api/tianqi/tqyb.php?id=88888888&key=88888888&sheng=江西&place=南昌')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // 在控制台输出获取到的数据，便于调试
            console.log('Weather data:', data);

            // 处理数据并显示在网页上
            var weatherString = JSON.stringify(data, null, 2); // 将JSON数据转换为字符串，便于阅读
            document.getElementById("weather").textContent = weatherString; // 将字符串插入到页面指定区域
        })
        .catch(error => console.error('Error fetching weather data:', error)); // 如果获取数据失败，输出错误信息
}

// 调用获取天气数据的函数
fetchWeather();
