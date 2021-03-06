//permite hacer peticiones http
const request = require("request");

function createRemoteDB(host, port) {
  const URL = `http://${host}:${port}`;

  const list = (table) => {
    return req("GET", table);
  };
  const get = (table, id) => {
    return req("GET", table, id);
  };
  const upsert = (table, data) => {
    return req("POST", table, data);
  };
  const update = (table, data) => {
    return req("PUT", table, data);
  };
  const query = (table, query, join) => {
    return req("POST" || "PUT", table, query, join);
  };

  function req(method, table, data) {
    //ex: localhost:3001/user
    let url = `${URL}/${table}`;
    body = "";

    // if (data && method === "GET") {
    //   url += `/${id}`;
    // } else if (data) {
    //   body = JSON.stringify(data);
    // }

    return new Promise((resolve, reject) => {
      //ejecuta el request
      request(
        {
          method,
          headers: {
            //todo por json
            "content-type": "application/json",
          },
          url,
          body,
        },
        //request funciona con callbacks
        (err, req, body) => {
          if (err) {
            console.error("Error con la base de datos remota", err);
            return reject(err.message);
          }

          const resp = JSON.parse(body);
          return resolve(resp.body);
        }
      );
    });
  }

  return {
    list,
    get,
    upsert,
    update,
    query,
  };
}

module.exports = createRemoteDB;
