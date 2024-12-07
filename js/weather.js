// 使用 JSON.stringify() 将 JSON 对象转换为字符串
var jsonString = JSON.stringify(jsonObject, null, 2);

// 在网页上显示 JSON 字符串
document.getElementById("jsonDisplay").textContent = jsonString;
