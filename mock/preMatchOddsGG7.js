export default {
  'POST /api/portal/pre/getPreMatchOdds7':
    (req, res) => {
      setTimeout(() => {
        res.send(
          {
            "status": "200",
            "code": "200",
            "message": null,
            "result": [
              {
              "cptId": "23",
              "cptName": "英超联赛",
              "matchId": "1234",
              "homeId": "100",
              "awayId": "101",
              "homeName": "曼联",
              "awayName": "切尔西",
              "time": "20190101143000",
              "odds": [{
                "oddId": "10",
                "oddName": "最先进球",
                "upd": "20190101065727",
                "chs": [{
                  "dishId": "100",
                  "name": "1",
                  "dish": "1.8"
                }, {
                  "dishId": "101",
                  "name": "2",
                  "dish": "1.9"
                }, {
                  "dishId": "111",
                  "name": "x",
                  "dish": "2.8"
                }]
              },
                {
                  "oddId": "11",
                  "oddName": "最后进球",
                  "upd": "20190101065727",
                  "chs": [{
                    "dishId": "103",
                    "choiceHandicap": "",
                    "name": "1",
                    "dish": "1.8"
                  }, {
                    "dishId": "104",
                    "name": "2",
                    "dish": "1.9"
                  }, {
                    "dishId": "112",
                    "name": "x",
                    "dish": "2.8"
                  }]
                }

              ]
            },{
              "cptId": "23",
              "cptName": "美国足球联赛",
              "matchId": "1235",
              "homeId": "200",
              "awayId": "201",
              "homeName": "主队名称",
              "awayName": "客队名称",
              "time": "20190101143000",
              "odds": [{
                "oddId": "20",
                "oddName": "最先进球",
                "upd": "20190101065727",
                "chs": [{
                  "dishId": "200",
                  "name": "1",
                  "dish": "1.8"
                }, {
                  "dishId": "201",
                  "name": "2",
                  "dish": "1.8"
                }, {
                  "dishId": "211",
                  "name": "x",
                  "dish": "1.8"
                }]
              },
                {
                  "oddId": "21",
                  "oddName": "最后进球",
                  "upd": "20190101065727",
                  "chs": [{
                    "dishId": "303",
                    "choiceHandicap": "",
                    "name": "1",
                    "dish": "1.8"
                  }, {
                    "dishId": "304",
                    "name": "2",
                    "dish": "1.8"
                  }, {
                    "dishId": "312",
                    "name": "x",
                    "dish": "1.8"
                  }]
                }

              ]
            }]
          },
        );
      }, 500);
    },
};
