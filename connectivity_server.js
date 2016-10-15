var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var driver

app.use(express.static('public'));


app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/init', function (req, res) {

   var webdriver = require('selenium-webdriver'),
       By = webdriver.By,
       until = webdriver.until;

   driver = new webdriver.Builder()
       .forBrowser('chrome')
       .build();

   driver.manage().window().setSize(1280, 968);
   res.end("Initialization done");
})

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})


app.post('/process_post', urlencodedParser, function (req, res) {
/*
   console.log("Starting Selenium....")
   driver.get('http://www.google.com/ncr');
   driver.findElement(By.name('q')).sendKeys('webdriver');
   driver.findElement(By.name('btnG')).click();
   driver.wait(until.titleIs('webdriver - Google Search'), 1000);
   driver.quit();
   console.log("Completed !")
*/
   console.log("Starting Selenium....")

   

   driver.get('https://qa:9087@qa.venzee.com')
      .then(function() {
         console.log("Completed !");
         res.end("Completed on browser");
   });


   /*
   // Prepare output in JSON format
   response = {
      first_name:req.body.first_name,
      last_name:req.body.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
   */
})


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)

})