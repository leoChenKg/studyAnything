function FiberRootNode(containerInfo) {
  this.containerInfo = containerInfo
}

export function createFiberRoot(containerInfo) {
  const root = new FiberRootNode(containerInfo) // 是整个项目得根，就是容器 真实dom节点，只不过包装了一下
  return root
}
