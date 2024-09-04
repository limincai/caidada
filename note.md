# 在 Taro 小程序开发页面的步骤

1. 在 app.config.ts 中配置页面的路由

哪个页面路径放在第一条就默认加载哪个页面

页面路径是与文件夹路径是一致的

~~~ react
pages: [
    "pages/user/index",
    "pages/index/index"
 ],
~~~

2. 在组件库中搜索想要使用的组件并使用
3. react 函数式编程写法

~~~react
export default () => {
  return <View className="index">首页</View>;
};
~~~

## useEffect 钩子

~~~react
useEffect(() => {
 // depends 数组中的元素发生变化，执行函数  
},[depends])
~~~

## Taro 跳转页面

~~~react
// 普通路由跳转
Taro.navigateTo({ url: "/pages/doQuestion/index" });

// 关闭所有历史页面，打开到应用内的某个页面
Taro.reLaunch({
  url: 'test?id=1'
})
~~~

