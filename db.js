var pg     = require('pg');
var templateSource = require('./Products - Bar & Wine Tools - 993.json');

var db_qa_config = {
  user:     "",
  database: "venzeeqa",
  password: "", 
  host:     "v.....",
  port:     "5432"
};

var pg_client = new pg.Client(db_qa_config);


var sql = 'INSERT INTO template(id, name, description, type, configuration, authorid, shared, ' +
                                 'organizationid, logo, lastupdated, planid, status, guideline, ' +
                                 'solutionid, customconfig, releasenotes, deliverymethod) ' +
            'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)';


var params = [
  1,                 
  templateSource.name, 
  templateSource.description,
  templateSource.type,
  templateSource.configuration,
  templateSource.authorId,
  templateSource.shared,
  templateSource.organizationId,
  templateSource.logo,
  templateSource.lastUpdated,
  templateSource.planId,
  templateSource.status,
  templateSource.guideline,
  templateSource.solutionId, 
  templateSource.customConfig,
  templateSource.releaseNotes,
  templateSource.deliveryMethod
];

//console.log(params)


pg_client.connect(function (err) {
  if (err) throw err;
  

  pg_client.query(sql, params, function (err, result) {
    if (err) throw err;

    var res = {
      updatedRowCount: result.rowCount,
      id: templateSource.id
    };

    console.log(res); 

    // disconnect the client 
    pg_client.end(function (err) {
      if (err) throw err;
    });

  });

});

