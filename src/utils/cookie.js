export const getCookie = (name) => {
    const value = `; ${document.cookie}`; // 获取所有的 cookie 字符串并在前面加一个 ";"
    const parts = value.split(`; ${name}=`); // 按照指定的 cookie 名称分割字符串
    if (parts.length === 2) {
      return parts.pop().split(';').shift(); // 返回目标 cookie 的值
    }
    return null;
  };