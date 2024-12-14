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

            // 构建所需的字符串格式
            var weatherString = `${data.place} 降水: ${data.precipitation} 温度: ${data.temperature} 气压: ${data.pressure} 湿度: ${data.humidity} 风向: ${data.windDirection}`;
            var weatherString2 = `风向角度: ${data.windDirectionDegree} 风速: ${data.windSpeed} 风力等级: ${data.windScale} 天气: ${data.weather1}转${data.weather2}`;
            // 在网页上显示结果
            document.getElementById("weather").textContent = weatherString <br> weatherString2;
        })
        .catch(error => console.error('Error fetching weather data:', error)); // 如果获取数据失败，输出错误信息
}

// 调用获取天气数据的函数
fetchWeather();
