# RN-EmptyDataSet
RN-没有数据时显示的页面



声明属性

emptyDataSet.propTypes = {

    topSpace: PropTypes.number, // 子组件距离上部间距
    
    titleTopSpace: PropTypes.number, // 标题距离上部间距
    
    title: PropTypes.string, // 标题
    
    description: PropTypes.string, // 描述
    
    descriptionTopSpace: PropTypes.number, // 描述距离上部间距
    
    buttonTopSpace: PropTypes.number, // 默认按钮距离上部间距
    
    buttonTitle: PropTypes.string, // 默认按钮标题
    
    isShowAnimal: PropTypes.bool, // 是否显示动画
    
    animalTyle: PropTypes.string, // 动画类型 opacity(渐变)  transform(旋转)  scale(缩放)
    
    customElement: PropTypes.element, // 自定义组件
    
    screenClick: PropTypes.func, // 点击屏幕触发方法
    
    buttonClick: PropTypes.func, // 点击默认按钮触发方法
    
};



相关介绍在我的简书里面 http://www.jianshu.com/p/f7e9fb9afc53
忘大佬多多批评^_^
