// 寻找小飞机
export let test = 1;

export function smallPlane() {
    for (let i = 0; i < smallPlanes.length; i++) {
        if (smallPlanes[i].offsetTop >= bg.offsetHeight) {
            smallPlanes[i].style.top = _.random(-500, -smallPlanes[i].offsetHeight) + 'px';
            smallPlanes[i].style.left = _.random(0, bg.offsetWidth - smallPlanes[i].offsetWidth) + 'px';
            break;
        }
    }
}
// 让小飞机下落
export function smallFlay() {
    for (let j = 0; j < smallPlanes.length; j++) {
        if (smallPlanes[j].offsetTop < bg.offsetHeight) {
            smallPlanes[j].style.top = smallPlanes[j].offsetTop + 8 + 'px';
        } else {

        }
    }
};