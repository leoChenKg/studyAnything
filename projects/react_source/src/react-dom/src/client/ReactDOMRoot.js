import { createContainer } from 'react-reconciler/src/ReactFiberReconciler'

function ReactDOMRoot(internalRoot) {
  this._internalRoot = internalRoot
}

// 创建root
export function createRoot(container) {
  const root = createContainer(container)
  return new ReactDOMRoot(root)
}
