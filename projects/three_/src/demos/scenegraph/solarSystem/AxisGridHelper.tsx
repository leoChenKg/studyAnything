import * as THREE from 'three'
import { Material } from 'three'

export default class AxisGridHelper {

    grid: THREE.GridHelper

    axes: THREE.AxesHelper

    private _visible: boolean = false

    constructor(node: THREE.Mesh | THREE.Object3D<THREE.Event>, units = 10) {
        const axes = new THREE.AxesHelper();
        ; (axes.material as Material).depthTest = false // 防止元素遮挡坐标轴
        axes.renderOrder = 2 // 在网格渲染之后再渲染
        node.add(axes)

        const grid = new THREE.GridHelper(units, units);
        ; (grid.material as Material).depthTest = false
        grid.renderOrder = 1 // 首先渲染网格
        node.add(grid)

        this.grid = grid
        this.axes = axes
        this.visible = false
    }

    get visible() {
        return this._visible
    }

    set visible(v) {
        this._visible = v
        this.grid.visible = v
        this.axes.visible = v
    }
}
