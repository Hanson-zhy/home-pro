// weather.js

function fetchWeather() {
    const weatherElement = document.getElementById("weather");
    if (!weatherElement) return;

    // 显示加载中状态
    weatherElement.innerText = "⏳ 正在获取天气...";

    // 设置 10 秒超时
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    fetch('https://cn.apihz.cn/api/tianqi/tqyb.php?id=10016280&key=54933f1eeb14279704485476db8a3680&sheng=江西&place=南昌', {
        signal: controller.signal
    })
        .then(response => {
            clearTimeout(timeoutId);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Weather data:', data);

            // 检查 API 返回的业务状态码
            if (data.code !== 200) {
                throw new Error(data.msg || "天气服务返回错误");
            }

            // 安全获取地点（优先使用市级，其次是 name，最后是默认值）
            const location = data.shi || data.name || data.place || "未知地点";

            // 当前天气数据（可能为空对象）
            const now = data.nowinfo || {};

            // 构建显示字符串，缺失字段用 'N/A' 代替
            const weatherString = `${location} 
降水: ${now.precipitation ?? 'N/A'} mm
温度: ${now.temperature ?? 'N/A'} ℃
气压: ${now.pressure ?? 'N/A'} hPa
湿度: ${now.humidity ?? 'N/A'} %
风向: ${now.windDirection ?? 'N/A'}
风速: ${now.windSpeed ?? 'N/A'} m/s
风力等级: ${now.windScale ?? 'N/A'}
天气: ${data.weather1 || ''}${data.weather2 ? '转' + data.weather2 : ''}
更新时间: ${now.uptime || data.uptime || '未知'}`;

            weatherElement.innerText = weatherString;
        })
        .catch(error => {
            console.error('Fetch weather error:', error);
            let errorMsg = "⚠️ 天气加载失败";
            if (error.name === 'AbortError') {
                errorMsg = "⏰ 请求超时，请稍后重试";
            } else if (error.message.includes('HTTP')) {
                errorMsg = `🔌 网络异常 (${error.message})`;
            } else if (error.message.includes('秘钥') || error.message.includes('key')) {
                errorMsg = "🔑 天气服务授权失效";
            } else {
                errorMsg = "🌧️ 暂时无法获取天气";
            }
            weatherElement.innerText = errorMsg;
        });
}

// 确保 DOM 加载完成后再执行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fetchWeather);
} else {
    fetchWeather();
}
