import dateFormat from 'dateformat';

export default  function runMonitor(minutes, oddSelector, removeSelector, matchSelector) {
    var isTestRunning = true;
    var scrollInterval, addOddInteval, removeOddInteval;
    var results=[];
    setTimeout(function () {
        isTestRunning = false;
    }, minutes * 60000);

    function runTestCasesBasic() {
        scrollInterval = setInterval(function () {
            window.scrollTo(0, (Math.random() * document.body.clientHeight) % document.body.clientHeight)
        }, 1000);
        addOddInteval = setInterval(function () {
            var buttons = document.getElementsByClassName(oddSelector);
            buttons[Math.floor((Math.random() * buttons.length)) % buttons.length].click()
        }, 1000);
        removeOddInteval = setInterval(function () {
            var buttons = document.getElementsByClassName(removeSelector);
            var click = buttons[Math.floor((Math.random() * buttons.length)) % buttons.length];
            if (click) {
                click.click()
            }
        }, 3000);
    }

    function stopTestCasesBasic() {
        scrollInterval ? clearInterval(scrollInterval) : console.warn("Scroll Test Case was not run");
        addOddInteval ? clearInterval(addOddInteval) : console.warn("Add Odd Test Case was not run");
        removeOddInteval ? clearInterval(removeOddInteval) : console.warn("Remove Odd Test Case was not run");
    }

    var Monitoring = function () {
        var beginTime = ( performance || Date ).now(), prevTime = beginTime, frames = 0;
        return {
            begin: function () {
                beginTime = ( performance || Date ).now();
            },
            end: function () {
                frames++;
                var time = ( performance || Date ).now();
                if (time > prevTime + 1000) {
                    var currentResult=[];
                    currentResult.push(dateFormat(new Date(),'isoDateTime'));
                    currentResult.push(( frames * 1000 ) / ( time - prevTime ));
                    prevTime = time;
                    frames = 0;
                    var memory = performance.memory;
                    currentResult.push(memory.usedJSHeapSize / 1048576);
                    currentResult.push(document.getElementsByClassName(matchSelector).length);
                    results.push(currentResult);
                }
            },

            update: function () {
                beginTime = this.end();
            }
        }
    }

    var monitoring = new Monitoring();
    return new Promise((resolve)=>{
        function monitoringLoop() {
            monitoring.begin();
            monitoring.end();
            if (isTestRunning) {
                requestAnimationFrame(monitoringLoop)
            } else {
                stopTestCasesBasic()
                var resultString ="time,fps,memory,matches"
                results.forEach(result=>{
                    resultString = resultString+"\n";
                    result.forEach(item =>{
                        resultString = resultString +item+','
                    })
                })
                resolve(resultString);
            }
        }
        results=[];
        runTestCasesBasic();
        requestAnimationFrame(monitoringLoop)
    });
}