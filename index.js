// import { smallPlane, smallFlay, test } from './utils.js';
let startBtn = document.querySelector('.start-btn');
let yellowBullets = document.querySelectorAll('.yellow_bullet');
let rlBullets = document.querySelectorAll('.bullet');
let continueBtn = document.querySelector('.continue-btn');
let newStart = document.querySelector('.new-btn');
let plane = document.querySelector('.plane');
let pause = document.querySelector('.pause');
let audio = document.querySelector('.audio');
let enemys = document.querySelectorAll('.bad');
let smallPlanes = document.querySelectorAll('.plane_small');
let middlePlanes = document.querySelectorAll('.plane_middle');
let bigPlanes = document.querySelectorAll('.plane_big');
let bg = document.querySelector('.bg');
let luckys = document.querySelectorAll('.lucky');
let boomAward = document.querySelector('.bomb_award');
let bulletAward = document.querySelector('.bullet_award');
let findBule;
let bulletFly;
let findBullet;
let score = 0;

console.log(test);


//点击开始游戏按钮
startBtn.addEventListener('click', () => {
    startShoot();
    startFall();
    startLuck();
    plane.style.display = "block";
    startBtn.style.display = 'none';
    continueBtn.style.display = 'none';
    newStart.style.display = 'none';
    pause.style.display = 'block';
    audio.play();

    // 重置
    resetEnemys();
});

// 重置坏蛋的位置
function resetEnemys() {
    for (let enemy of enemys) {
        const maxLeft = bg.offsetWidth - enemy.offsetWidth;
        const maxTop = -enemy.offsetHeight;
        enemy.setAttribute('data-setp', _.random(3, 7));
        enemy.style.left = _.random(0, maxLeft) + 'px';
        enemy.style.top = _.random(-500, maxTop) + 'px';
    }
}

//点击暂停按钮
pause.addEventListener('click', () => {
    stopShoot();
    stopFall();
    stopLuck();
    plane.style.display = "none";
    startBtn.style.display = 'none';
    continueBtn.style.display = 'block';
    newStart.style.display = 'block';
    audio.pause();
    pause.style.display = 'none';
});

//点击继续游戏按钮
continueBtn.addEventListener('click', () => {
    startShoot();
    startFall();
    plane.style.display = "block";
    startBtn.style.display = 'none';
    continueBtn.style.display = 'none';
    newStart.style.display = 'none';
    audio.play();
    pause.style.display = 'block';
})

//点击重新开始按钮
newStart.addEventListener('click', () => {
    window.location.reload();
    // startShoot();
    // startFall();
    // startBtn.style.display = 'none';
    // continueBtn.style.display = 'none';
    // newStart.style.display = 'none';
    audio.play();
    // pause.style.display = 'block';
})

//找子弹
// 定义 findBullet
function yellowBullet() {
    // 使用 for 循环 ，i 等于从 0 开始循环， i 要小于自己定义的子弹数量， 再每次循环一次
    for (let i = 0; i < yellowBullets.length; i++) {
        // 循环里面的 if 条件是：子弹数组的每一枚子弹的当前元素高度要 小于 0，才会执行以下代码：
        if (yellowBullets[i].offsetTop < 0) {
            // 子弹放在飞机头; （飞机当前元素的头部 加上 飞机当前元素的宽度 ÷ 2 再 − 45 加上单位）就是 子弹数组的每一枚子弹在的位置
            yellowBullets[i].style.top = plane.offsetTop + plane.offsetWidth / 2 - 45 + 'px';
            // 子弹放在飞机头; （飞机当前元素的左边 加上 飞机当前元素的宽度）赋值给 子弹数组的每一枚子弹在的位置
            yellowBullets[i].style.left = plane.offsetLeft + plane.offsetWidth - 31 + 'px';
            break;
        }
    }
}

//让黄色子弹飞
function bulletFlay() {
    for (let j = 0; j < yellowBullets.length; j++) {
        if (yellowBullets[j].offsetTop > -20) {
            yellowBullets[j].style.top = yellowBullets[j].offsetTop - 20 + 'px';
        } else {
            // clearInterval(bulletFly);
        }
    }
    // 检测子弹和坏蛋是否相撞
    let enemies = [...bigPlanes, ...smallPlanes, ...middlePlanes];
    for (let enemy of enemies) {
        for (let bullet of yellowBullets) {
            if (checkIntersect(bullet, enemy)) {
                if (!enemy.querySelector('.boom')) {
                    let boom = document.createElement('div');
                    boom.classList.add('boom');
                    enemy.append(boom);
                    boom.addEventListener('animationend', () => {
                        boom.remove();
                        enemy.style.left = _.random(0, 300) + 'px';
                        enemy.style.top = _.random(-800, -100) + 'px';
                        bullet.style.top = _.random(-800, 0) + 'px';
                    });
                }
            }
            // 吃到补给 全屏爆炸
            if (checkIntersect(plane, boomAward)) {
                if (enemy.offsetTop < bg.offsetHeight && enemy.offsetTop > 0) {
                    for (let enemy of enemies) {
                        if (!enemy.querySelector('.boom')) {
                            let boom = document.createElement('div');
                            boom.classList.add('boom');
                            enemy.append(boom);
                            boom.addEventListener('animationend', () => {
                                boom.remove();
                                enemy.style.left = _.random(0, 300) + 'px';
                                enemy.style.top = _.random(-800, -100) + 'px';
                                bullet.style.top = _.random(-800, 0) + 'px';
                            });
                            boomAward.style.left = _.random(0, 300) + 'px';
                            boomAward.style.top = _.random(-800, -100) + 'px';
                        }
                    }
                }
            }
            // 吃到降落伞 的效果
            if (checkIntersect(plane, bulletAward)) {
                if (!enemy.querySelector('.boom')) {
                    let boom = document.createElement('div');
                    boom.classList.add('boom');
                    enemy.append(boom);
                    boom.addEventListener('animationend', () => {
                        boom.remove();
                        enemy.style.left = _.random(0, 300) + 'px';
                        enemy.style.top = _.random(-800, -100) + 'px';
                        bullet.style.top = _.random(-800, 0) + 'px';
                    });
                    bulletAward.style.left = _.random(0, 300) + 'px';
                    bulletAward.style.top = _.random(-800, -100) + 'px';
                    clearInterval(findBullet);
                    startBlueShoot();
                    setTimeout(() => {
                        clearInterval(findBule);
                        findBullet = setInterval(yellowBullet, 20);
                    }, 5000);

                }
            }

            // 检测飞机和坏蛋是否相撞
            if (checkIntersect(enemy, plane)) {
                // 坏蛋爆炸效果
                if (!enemy.querySelector('.boom')) {
                    let boom = document.createElement('div');
                    boom.classList.add('boom');
                    enemy.append(boom);
                    boom.addEventListener('animationend', () => {
                        boom.remove();
                        enemy.style.left = _.random(0, 300) + 'px';
                        enemy.style.top = _.random(-800, -100) + 'px';
                        bullet.style.top = _.random(-800, 0) + 'px';
                    });
                }
                // 飞机爆炸效果
                if (!plane.querySelector('.boom')) {
                    let boom = document.createElement('div');
                    boom.classList.add('boom');
                    plane.append(boom);
                    boom.addEventListener('animationend', () => {
                        boom.remove();
                        enemy.style.left = _.random(0, 300) + 'px';
                        enemy.style.top = _.random(-800, -100) + 'px';
                        bullet.style.top = _.random(-800, 0) + 'px';
                        stopShoot();
                        stopFall();
                        stopLuck();
                        newStart.style.display = 'block';
                        plane.style.display = 'none';
                    });

                }
            }
        }
    }
}
// 设置黄色子弹的函数
function startShoot() {
    findBullet = setInterval(yellowBullet, 30);
    bulletFly = setInterval(bulletFlay, 10);
}
function stopShoot() {
    clearInterval(findBullet);
    clearInterval(bulletFly);
    for (let bullet of yellowBullets) {
        bullet.style.top = '-100px';
    }
}

// 寻找蓝色子弹
function buleBullet() {
    let num = 0;
    for (let i = 0; i < rlBullets.length; i++) {
        if (rlBullets[i].offsetTop < -10) {
            if (num === 0) {
                rlBullets[i].style.left = plane.offsetLeft + plane.offsetWidth / 2 - 21 + 'px';
            } else {
                rlBullets[i].style.left = plane.offsetLeft + plane.offsetWidth / 2 + 21 + 'px';
            }
            rlBullets[i].style.top = plane.offsetTop + 'px';
            num++;
        }
        if (num === 2) {
            break;
        }
    }
}
// 让蓝色子弹飞
let blueFly;
function blueFlay() {
    for (let j = 0; j < rlBullets.length; j++) {
        if (rlBullets[j].offsetTop > -20) {
            rlBullets[j].style.top = rlBullets[j].offsetTop - 20 + 'px';
        } else {
        }
    }

    // 检测子弹和坏蛋是否相撞
    let enemies = [...bigPlanes, ...smallPlanes, ...middlePlanes];
    for (let enemy of enemies) {
        for (let bullet of rlBullets) {
            if (checkIntersect(bullet, enemy)) {
                if (!enemy.querySelector('.boom')) {
                    let boom = document.createElement('div');
                    boom.classList.add('boom');
                    enemy.append(boom);
                    boom.addEventListener('animationend', () => {
                        boom.remove();
                        enemy.style.left = _.random(0, 300) + 'px';
                        enemy.style.top = _.random(-800, -100) + 'px';
                        bullet.style.top = _.random(-800, 0) + 'px';
                    });
                }
            }
            // 吃到补给 全屏爆炸
            if (checkIntersect(plane, boomAward)) {
                if (enemy.offsetTop < bg.offsetHeight && enemy.offsetTop > 0) {
                    for (let enemy of enemies) {
                        if (!enemy.querySelector('.boom')) {
                            let boom = document.createElement('div');
                            boom.classList.add('boom');
                            enemy.append(boom);
                            boom.addEventListener('animationend', () => {
                                boom.remove();
                                enemy.style.left = _.random(0, 300) + 'px';
                                enemy.style.top = _.random(-800, -100) + 'px';
                                bullet.style.top = _.random(-800, 0) + 'px';
                            });
                            boomAward.style.left = _.random(0, 300) + 'px';
                            boomAward.style.top = _.random(-800, -100) + 'px';
                        }
                    }
                }
            }

            // 检测飞机和坏蛋是否相撞
            if (checkIntersect(enemy, plane)) {
                // 坏蛋爆炸效果
                if (!enemy.querySelector('.boom')) {
                    let boom = document.createElement('div');
                    boom.classList.add('boom');
                    enemy.append(boom);
                    boom.addEventListener('animationend', () => {
                        boom.remove();
                        enemy.style.left = _.random(0, 300) + 'px';
                        enemy.style.top = _.random(-800, -100) + 'px';
                        bullet.style.top = _.random(-800, 0) + 'px';
                    });
                }

                // 飞机爆炸效果
                if (!plane.querySelector('.boom')) {
                    let boom = document.createElement('div');
                    boom.classList.add('boom');
                    plane.append(boom);
                    boom.addEventListener('animationend', () => {
                        boom.remove();
                        enemy.style.left = _.random(0, 300) + 'px';
                        enemy.style.top = _.random(-800, -100) + 'px';
                        bullet.style.top = _.random(-800, 0) + 'px';
                        stopShoot();
                        stopFall();
                        stopLuck();
                        newStart.style.display = 'block';
                        plane.style.display = 'none';
                    });

                }
            }
        }
    }
}

// 设置蓝色子弹的函数
function startBlueShoot() {
    findBule = setInterval(buleBullet, 30);
    blueFly = setInterval(blueFlay, 10);
}

function stopBlueShoot() {
    clearInterval(findBule);
    clearInterval(blueFly);
    for (let blue of bullets) {
        blue.style.top = '-100px';
    }
}

// 找到大飞机
let findBig;
function bigPlane() {
    for (let i = 0; i < bigPlanes.length; i++) {
        if (bigPlanes[i].offsetTop >= bg.offsetHeight) {
            bigPlanes[i].style.top = _.random(-500, -bigPlanes[i].offsetHeight) + 'px';
            bigPlanes[i].style.left = _.random(0, bg.offsetWidth - bigPlanes[i].offsetWidth) + 'px';
            break;
        }
    }
}
// 让大飞机下落
let bigFly;
function bigFlay() {
    for (let j = 0; j < bigPlanes.length; j++) {
        if (bigPlanes[j].offsetTop < bg.offsetHeight) {
            bigPlanes[j].style.top = bigPlanes[j].offsetTop + 1 + 'px';
        } else {

        }
    }
}

// 找到小飞机
let findSmall;
function smallPlane() {
    for (let i = 0; i < smallPlanes.length; i++) {
        if (smallPlanes[i].offsetTop >= bg.offsetHeight) {
            smallPlanes[i].style.top = _.random(-500, -smallPlanes[i].offsetHeight) + 'px';
            smallPlanes[i].style.left = _.random(0, bg.offsetWidth - smallPlanes[i].offsetWidth) + 'px';
            break;
        }
    }
}
// 让小飞机下落
let smallFly;
function smallFlay() {
    for (let j = 0; j < smallPlanes.length; j++) {
        if (smallPlanes[j].offsetTop < bg.offsetHeight) {
            smallPlanes[j].style.top = smallPlanes[j].offsetTop + 8 + 'px';
        } else {

        }
    }
}

// 找到中飞机
let findMiddle;
function middlePlane() {
    for (let i = 0; i < middlePlanes.length; i++) {
        if (middlePlanes[i].offsetTop >= bg.offsetHeight) {
            middlePlanes[i].style.top = _.random(-500, -middlePlanes[i].offsetHeight) + 'px';
            middlePlanes[i].style.left = _.random(-10, bg.offsetWidth - middlePlanes[i].offsetWidth) + 'px';
            break;
        }
    }
}
// 让中飞机下落
let middleFly;
function middleFlay() {
    for (let j = 0; j < middlePlanes.length; j++) {
        if (middlePlanes[j].offsetTop < bg.offsetHeight) {
            middlePlanes[j].style.top = middlePlanes[j].offsetTop + 6 + 'px';
        } else {

        }
    }
}

function startFall() {
    // 大飞机
    findBig = setInterval(bigPlane, 100);
    bigFly = setInterval(bigFlay, 10);
    // 小飞机
    findSmall = setInterval(smallPlane, 10);
    smallFly = setInterval(smallFlay, 20);
    // 中飞机
    findMiddle = setInterval(middlePlane, 10);
    middleFly = setInterval(middleFlay, 30);
}
function stopFall() {
    // 大飞机
    clearInterval(findBig);
    clearInterval(bigFly);
    // 小飞机
    clearInterval(findSmall);
    clearInterval(smallFly);
    // 中飞机
    clearInterval(findMiddle);
    clearInterval(middleFly);
}

// 找到降落伞
let findLucky;
function award() {
    for (let i = 0; i < luckys.length; i++) {
        if (luckys[i].offsetTop >= bg.offsetHeight) {
            luckys[i].style.top = _.random(-500, luckys[i].offsetHeight) + 'px';
            luckys[i].style.left = _.random(0, bg.offsetWidth - luckys[i].offsetWidth) + 'px';
            break;
        }
    }
}
// 让降落伞下落
let awardFly;
function awardFlay() {
    for (let j = 0; j < luckys.length; j++) {
        if (luckys[j].offsetTop < bg.offsetHeight) {
            luckys[j].style.top = luckys[j].offsetTop + 10 + 'px';
        } else {
            // clearInterval(awardFlay);
        }
    }
}

function startLuck() {
    findLucky = setInterval(award, 80);
    // awardFly = setInterval(awardFlay, _.random(50, 70));
    awardFly = setInterval(awardFlay, 20);
}
function stopLuck() {
    clearInterval(findLucky);
    clearInterval(awardFly);
}

// 相撞
function checkIntersect(el1, el2) {
    let rectA = el1.getBoundingClientRect();
    let rectB = el2.getBoundingClientRect();
    let nonIntersect = (rectB.right < rectA.left) || (rectB.left > rectA.right) || (rectB.bottom < rectA.top) || (rectB.top > rectA.bottom);
    return !nonIntersect;
}

// 

//飞机拖拽(移动端)
plane.addEventListener('touchstart', event => {
    const touch = event.touches[0];
    const shiftX = touch.clientX - plane.offsetLeft;
    const shiftY = touch.clientY - plane.offsetTop;

    plane.addEventListener('touchmove', event => {
        const touch = event.touches[0];

        let top = touch.pageY - shiftY;
        top = top > 0 ? top : 0;

        let left = touch.pageX - shiftX;
        left = left > -20 ? left : -20;

        let maxLeft = bg.offsetWidth - plane.offsetWidth;
        let maxTop = bg.offsetHeight - plane.offsetHeight;

        left = left > maxLeft ? maxLeft : left;
        top = top > maxTop ? maxTop : top;


        plane.style.left = left + 'px';
        plane.style.top = top + 'px';
    });
});

//飞机拖拽(PC端)
plane.addEventListener('mousedown', event => {
    let shiftX = event.clientX - plane.offsetLeft;
    let shiftY = event.clientY - plane.offsetTop;

    handleMove(event);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleStop)

    function handleMove(event) {
        //判断顶部不能超过的大小
        let top = event.pageY - shiftY;
        top = top > 0 ? top : 0;

        //判断左边不能超过的大小
        let left = event.pageX - shiftX;
        left = left > -20 ? left : -20;

        //设置飞机拖拽的位置横向最大的宽度 不超过 背景图
        let maxLeft = document.querySelector('.bg').offsetWidth - plane.offsetWidth;
        //设置飞机拖拽的位置 底部不超过最大的高度 不超过 背景图
        let maxTop = document.querySelector('.bg').offsetHeight - plane.offsetHeight;

        //判断飞机拖拽的右边距离不超过 最大宽度，否则使用left原值
        left = left > maxLeft ? maxLeft : left;
        //判断飞机拖拽的底部位置不超过 最大高度， 否则使用top原值
        top = top > maxTop ? maxTop : top;

        // 让飞机的左边和顶部赋值
        plane.style.left = left + 'px';
        plane.style.top = top + 'px';
    }

    function handleStop() {
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleStop);
    }
});
plane.ondragstart = () => false; //取消浏览器自带的拖拽事件

