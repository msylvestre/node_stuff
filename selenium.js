var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

//var driver = new webdriver.Builder()
//    .forBrowser('chrome')
//    .usingServer('http://localhost:4444/wd/hub')
//    .build();

driver.get('http://www.google.com/ncr');
driver.findElement(By.name('q')).sendKeys('webdriver');
driver.findElement(By.name('btnG')).click();
driver.wait(until.titleIs('webdriver - Google Search'), 1000);
driver.quit().then(function(){

 var errr = new Error("message de marde");
 errr.stackTraceLimit = 2;
 throw errr;

});


