window.addEventListener('load',function(){
    var hourSet;
    var minuteSet;
    var musicSet;
    var noticeSet;
    var secondSet = 0;
    const changeNumber = (number)=>{
        if(number < 10){
            const newNumber = '0'+ number
            return newNumber
        }
        return number
    }
    //Show-Date
    const showCurrentDate = function(){
        const date = document.querySelector('.date');
        const currentTime = new Date();
        const day = currentTime.getDay() + 1
        const dateDay = currentTime.getDate();
        const month = currentTime.getMonth();
        const year = currentTime.getFullYear();

        const dateString = `thứ ${day}, ngày ${dateDay}, tháng ${month +1}, năm ${year}`
        date.innerText= dateString
    } 

    //Update-random-Image
    const updateImage =function() {
        const image = document.querySelector('.changeImage');
        const random = Math.floor(Math.random() * (21 - 1) ) + 1
        if (image.src.split('-')[1].substring(0,2) == random){
            return updateImage();
        }
        image.src = `./avt/chill-${random}.jpg`
    }
    //Go-Alert
    const setMusic = function(){
        const musicSrc = document.querySelector('.music-control-src')
        musicSrc.src =`music-${musicSet}.mp3`
    }
    const playMusic =() =>{
        const musicControl = document.querySelector('.music-control')
        musicControl.style.opacity = 0
        musicControl.volume = 0.1
        musicControl.play()
    }
    const displayLayout = () =>{
        const layout = document.querySelector('.layout')
        layout.style.display ='flex'
        const layoutTittle = document.querySelector('.layout-content-tittle')
        const layoutNotice = document.querySelector('.layout-content-notice')
        layoutTittle.innerText=`thời gian bạn đặt đã đến (${changeNumber(hourSet)}:${changeNumber(minuteSet)}:00)`
        layoutNotice.innerText=`${noticeSet}`
        playMusic();
    }
    const layoutBtn = document.querySelector('.layout-btn')
    layoutBtn.addEventListener('click',function(){
        location.reload();
    })
    //Show-Time
    const showCurrentTime = function(){
        const clock = document.querySelector('.clock');
        const currentTime = new Date();
        const hours = changeNumber(currentTime.getHours())
        const minutes = changeNumber(currentTime.getMinutes())
        const seconds = changeNumber(currentTime.getSeconds())  

        const clockString = [hours,minutes,seconds].join(':')
        clock.innerText= clockString
        if (hourSet  != undefined && minuteSet != undefined){
            const showAlertElapse=  document.querySelector('.showAlert-elapse');
            if(hourSet < Number(hours) || ((hourSet == Number(hours)) && (minuteSet < Number(minutes)))){
                hourSet += 24
            } 
    
            let hourView = hourSet-Number(hours)
            let minuteView = minuteSet-Number(minutes) -1
            let secondsView = 60 - seconds
            if (minuteView < 0 ){
                minuteView += 60
                hourView -=1
            }
    
            showAlertElapse.innerText = `Đổ chuông sau : ${changeNumber(hourView)}:${changeNumber(minuteView)}:${changeNumber(secondsView)}`
            
            if (hourSet == hours && minuteSet == minutes){
                // goAlert
                displayLayout();
            }
        }
    }
    //Set Time Alert
    const setTime = ()=>{
        const hour =  Number(document.querySelector('.setHour').value)
        const minute =  Number(document.querySelector('.setMinute').value)
        const alertMusic= document.querySelector('.music').value
        const noticeAlert = document.querySelector('.noticeAlert-input').value
        
        const showAlertTittle=  document.querySelector('.showAlert-tittle')
        const showAlertNote=  document.querySelector('.showAlert-note') 

        showAlertTittle.innerText= `Thời gian đã hẹn là : ${changeNumber(hour)}:${changeNumber(minute)}:00`
        showAlertNote.innerText =`Tên báo thức : ${noticeAlert}`

        hourSet = hour
        minuteSet= minute
        musicSet = alertMusic
        noticeSet= noticeAlert



    }
    const setAlertBtn = document.querySelector('.setAlert')
    setAlertBtn.addEventListener('click', function(){
        setTime();
        setMusic();
        this.innerText ='Báo thức đã dc đặt. Đặt lại báo thức ?'
        this.style.backgroundColor= 'red';
    })

    const oneSecond = 1000;
    updateImage();
    showCurrentDate();
    setInterval(showCurrentTime,oneSecond)
    setInterval(updateImage,1200000)
})