const cnn = require("../models");
var Request = require("tedious").Request;
// var TYPES = require("tedious").TYPES;
var async = require("async");

async function Execute(query, params = null) {
  var request = new Request(query, function (err) {
    if (err) {
      console.log(err);
    }
  });

  if (params != null) {
    // add parameter to SQL command
    // please do something....

    // request.addParameter('Name', TYPES.NVarChar,'Nguyễn Văn A');
    params.forEach((element) => {
      request.addParameter(element.name, element.type, element.value);
    });
  }

  // Close the connection after the final event emitted by the request, after the callback passes
  request.on("requestCompleted", function (rowCount, more) {
    cnn.close();
  });
  cnn.execSql(request);
}

async function getRecords(query, params = null) {
  var result = null;

  var request = new Request(query, function (err) {
    if (err) {
      console.log(err);
    }
  });

  if (params != null) {
    // add parameter to SQL command
    // please do something....

    // request.addParameter('Name', TYPES.NVarChar,'Nguyễn Văn A');
    params.forEach((element) => {
      request.addParameter(element.name, element.type, element.value);
    });
  }

  var result = [];
  request.on("row", function (columns) {
    columns.forEach(function (column) {
      if (column.value === null) {
        console.log("NULL");
      } else {
        result.push(column.value);
      }
    });
    console.log(result);
    result = [];
  });

  // Execute SQL statement
  connection.execSql(request);
}

module.exports = {
  Execute,
  getRecords,
};
