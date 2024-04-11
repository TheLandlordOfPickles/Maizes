let tellV = document.getElementById('vClipP')

let showTime = document.getElementById('time')
let showPoints = document.getElementById('points')
let showFPS = document.getElementById('fps')
let showKeys = document.getElementById('keyCount')

let shortHand = document.getElementById('shortHand')
let fullHand = document.getElementById('fullHand')

let dateThen = Math.round(new Date()/1000)
let date
let secondsThen = 0
let seconds = 0

let gamePoints = 0
let gamePointsThen = 0
let truePoints = 0

let gameKeys = 0
let gameKeysThen = 0
let trueKeys = 0

let gameFPS = 0
let timePassed = 0

let opacityTop = 0
let opacitySide = 0
let opacityChangeSpeed = 1.5
let opacityFadeInTime = 60
let opacityV = 0

let shortSide = 'Find my bolts'
let fullSide = 'The bolts are located at 9834 Main street under the doormat'

let resetSeconds = false
let hasChangedTop = false
let hasChangedSide = false
let showWhatsHidden = false


//This code does not work. It will be changes, but for now it is just planning.
let createTask = (taskName, type, placement, object, objectVar, amount, time) => {
    taskName = {
        type : type,
        placement : placement,
        object : object,
        objectVar : objectVar,
        amount : amount,
        time : time,
        taskComplete : false,
        taskFailed : false
    }
    timeThen = seconds
    showTime = 0

    return taskName
}

function updateTask(taskName, byWhat, moral) {
    if (moral === 0) {
        taskName.objectVar -= byWhat
    } else {
        taskName.objectVar += byWhat
    }
}

function checkTask() {
    switch (taskName.type) {
        case 1:
            //Fetch quest
            if (taskName.objectVar === taskName.amount) {
                taskName.taskComplete = true
            }
            break
        case 2:
            //Timed fetch quest
            if (showTime === 0 && !taskName.taskComplete) {
                taskName.taskFailed = true
            } else if (taskName.objectVar === taskName.amount) {
                taskName.taskComplete = true
            }
            break
    }
}

function updateTaskBar() {

    switch (taskName.type) {
        case 1:
            //Fetch quest
            shortHand = `Collect ${taskName.amount} ${taskName.object}. (${taskName.objectVar}/${taskName.amount})`
            break
        case 2:
            //Timed fetch quest
            showTime = time-(seconds-timeThen)
            shortHand = `Collect ${taskName.amount} ${taskName.object} in the next ${showTime} seconds. (${taskName.objectVar}/${taskName.amount})`
            break
    }
}


function updateTopBar(dt) {
    
    date = Math.round(new Date()/1000)
    seconds = date-dateThen

    if (Math.floor(timePassed) > 1) {
        gameFPS = Math.round(1/dt)
        timePassed = 0
    } else {
        timePassed += dt
    }

    if (gamePointsThen === truePoints) {}
    else {
        hasChangedTop = true
        gamePointsThen = truePoints
    }
    if (gameKeysThen === trueKeys) {}
    else {
        hasChangedTop = true
        gameKeysThen = trueKeys
    }


    if (playerFlags.noclip) {
        tellV.innerHTML = 'Noclip enabled'
    } else {
        tellV.innerHTML = ''
    }

    // For reseting the time count
    if (resetSeconds) {
        dateThen = Math.round(new Date()/1000)
        resetSeconds = false
    }

    // For making the points and keys appear
    if (hasChangedTop) {
        if (opacityTop >= opacityFadeInTime + 100) {
            if (showWhatsHidden) {}
            else {
                hasChangedTop = false
            }
            opacityTop = opacityFadeInTime + 100
            gamePointsThen = gamePoints
            gameKeysThen = gameKeys
        } else {
            opacityTop += opacityChangeSpeed
        }
    } else {
        if (opacityTop <= 0) {
            opacityTop = 0
        }
        else {
            opacityTop -= opacityChangeSpeed
        }
    }
    if (gamePoints === truePoints) {}
    else if (opacityTop > (opacityFadeInTime+100)*0.8) {
        gamePoints = truePoints
        gameKeys = trueKeys
    }
    

    showTime.innerHTML = `${seconds}`
    showPoints.innerHTML = `Points<br>${gamePoints}`
    showFPS.innerHTML = `${gameFPS}`
    showKeys.innerHTML = `Keys<br>${gameKeys}`

    showPoints.style.opacity = `${opacityTop}%`
    showKeys.style.opacity = `${opacityTop}%`
}

function updateSideBar(dt) {
    //updateTaskBar()

    if (hasChangedSide) {
        if (opacitySide >= opacityFadeInTime + 100) {
            if (showWhatsHidden) {
                hasChangedSide = false
            }
            opacitySide = opacityFadeInTime + 100
        } else {
            opacitySide += opacityChangeSpeed
        }
    } else {
        if (opacitySide <= 0) {
            opacitySide = 0
        }
        else {
            opacitySide -= opacityChangeSpeed
        }
    }


    fullHand.style.opacity = `${opacitySide}%`

    shortHand.innerHTML = `${shortSide}`
    fullHand.innerHTML = `${fullSide}`
}


updateWindows = (dt) => {
    if (showWhatsHidden) {
        hasChangedTop = true
        hasChangedSide = true
    }

    updateTopBar(dt)
    updateSideBar(dt)
}