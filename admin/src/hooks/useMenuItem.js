/**
 * 
 * @param {*} label 导航名
 * @param {*} key 导航 Key 值
 * @param {*} icon 导航图标
 * @param {*} children 是否下拉
 * @param {*} type 导航类型
 * @returns 
 */
export function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  }
}