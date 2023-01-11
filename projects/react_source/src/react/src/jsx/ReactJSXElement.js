import hasOwnProperty from 'shared/hasOwnProperty'
import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols'

// 保留属性
const RESERVED_PROPS = {
  ref: true,
  key: true,
  __self: true,
  __source: true
}

function hasValidKey(config) {
  return config.key !== undefined
}
function hasValidRef(config) {
  return config.ref !== undefined
}

function ReactElement(type, key, ref, props) {
  // react 元素 虚拟dom
  return {
    $$typeof: REACT_ELEMENT_TYPE, // react 元素类型标识
    type, // dom 类型
    key, // 唯一标识
    ref, // 获取真实dom元素
    props // chilrdren class styles 等等属性
  }
}

export function jsxDEV(type, config) {
  let key = null // 每个虚拟dom 可以有一个 key 用于父虚拟dom区分子虚拟DOM
  let ref = null
  let propName // 属性名
  const props = {} // 属性对象

  if (hasValidKey(config)) {
    key = config.key
  }
  if (hasValidRef(config)) {
    ref = config.ref
  }

  // 拷贝属性
  for (propName in config) {
    if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
      props[propName] = config[propName]
    }
  }

  // 创建虚拟 DOM
  return ReactElement(type, key, ref, props)
}
