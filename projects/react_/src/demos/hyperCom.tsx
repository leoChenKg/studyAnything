// 组合函数的实现
type ProcessFn = (...args: any[]) => any
export const compose: (fns: ProcessFn[]) => ProcessFn = (fns) => fns.reduce((a, c) => (...args) => c(a(...args)))

function a(p: number) {
    return p + 1
}
function b(p: string) {
    return p + 'b'
}
function c(p: string) {
    return p + 'c'
}
function d(p: string) {
    return p + 'd'
}

let fn = compose([a, b, c, d]) // 执行的顺序是 a => b => c => d (数据流向也是如此)