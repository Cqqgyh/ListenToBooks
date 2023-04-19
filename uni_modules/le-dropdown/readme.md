# le-dropdown

### 使用方式

```javascript
<le-dropdown 
    v-model:menuList="menuList" 
    themeColor="#3185FF"
    :duration="300"
    @onConfirm="onConfirm"
    @onChange="onChange"
></le-dropdown>
```
### 组件的属性说明如下：

| 属性                      | 类型        | 默认值      | 必填 | 说明            |
|-------------------------|-----------|----------| ---- |---------------|
| v-model:menuList        | Array     | []       | 是   | 设置整个菜单筛选的配置数居 |
| themeColor              | String    | #3185FF  | 否   | 整个组件的主题颜色     |
| duration                | Number    | 300      | 否   | 动画的执行时间       |
| isClickMutuallyExclude  | Boolean   | false    | 否   | 是否单击互斥(当单击互斥的时候，菜单对应click需要增添isChecked属性)      |

#### menuList参数说明：

| 属性           | 类型                    | 必填 | 说明                                          |
| -------------- |-----------------------|----|---------------------------------------------|
| title          | String                | 是  | 菜单名称                                        |
| type           | String                | 是  | 菜单筛选展示的类型：cell\|picker\|sort\|click\|filter |
| isChecked      | Boolean               | 否  | 当组件属性isClickMutuallyExclude为true时候必填        |
| value          | Number\|String\|Array | 是  | 菜单对应的值                                      |
| options        | Array                 | 否  | 菜单配置的组件参数数据，**见下**：                         |
| children       | Array                 | 否  | 菜单配置的组件参数数据（当前只用在filter类型），**见下**：          |
| componentProps | Object                | 否  | 菜单对应type的组件参数（当前只用在picker类型），**见下**：        |

##### options参数说明：

| 属性     | 类型           | 必填 | 说明                            |
| -------- | -------------- | ---- | ------------------------------- |
| label    | String         | 是   | 属性名，显示在页面上            |
| value    | Number\|String | 是   | 属性值，保存在父级的value属性上 |
| children | options[]      | 否   | 子层级（当前只在picker上使用）  |

##### **children参数（filter）说明：**

| 属性    | 类型           | 必填 | 说明                                        |
| ------- | -------------- | ---- | ------------------------------------------- |
| title   | String         | 是   | 菜单名称                                    |
| type    | String         | 是   | 菜单筛选展示的类型：radio\|slider\|checkbox |
| value   | Number\|String | 是   | 菜单对应的值                                |
| options | Array          | 是   | 菜单配置的组件参数数据，**见上**：          |

###### children下type参数说明：

- radio：单选
- checkbox：多选
- slider：进度（存在componentProps与type同级参数，对象里的值为uniapp原生的slider里的参数）

##### componentProps参数（picker）说明：

| 属性       | 类型   | 默认值                                                 | 必填 | 说明                                    |
| ---------- | ------ | ------------------------------------------------------ | ---- | --------------------------------------- |
| colNum     | Number | 1                                                      | 否   | 级联的列数                              |
| options    | Array  | -                                                      | 是   | 菜单配置的组件参数数据，**见上**：      |
| fieldNames | Object | { label: `label`, value: `value`, options: `options` } | 否   | 自定义节点 label、value、options 的字段 |

### 事件

| 事件名称  | 回调参数             | 说明                                                         |
| --------- | -------------------- | ------------------------------------------------------------ |
| onConfirm | (data) => void       | 确定事件回调，data为当前确认选中的菜单数据                   |
| onChange  | (data,index) => void | 改变事件，data为当前操作菜单数据，index为当前操作菜单第index个索引发生变化 |

