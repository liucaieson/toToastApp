export default {
  'POST /api/portal/pre/getPreMatchOdds9':
    (req, res) => {
      setTimeout(() => {
        res.send(
          {
            "status": "200",
            "code": "200",
            "message": null,
            "result": [{
              "cptId": "23",
              "cptName": "英超联赛",
              "matchId": "1234",
              "homeId": "100",
              "awayId": "101",
              "time": "20190101143000",
              "odds": [{
                "oddId": "10",
                "oddName": "队伍名称1",
                "upd": "20190101065727",
                "chs": [{
                  "dishId": "100",
                  "name": "1",
                  "dish": "1.8"
                }]
              },
                {
                  "oddId": "11",
                  "oddName": "队伍名称2",
                  "upd": "20190101065727",
                  "chs": [{
                    "dishId": "101",
                    "name": "1",
                    "dish": "1.8"
                  }]
                },
                {
                  "oddId": "12",
                  "oddName": "队伍名称3",
                  "upd": "20190101065727",
                  "chs": [{
                    "dishId": "102",
                    "name": "1",
                    "dish": "1.8"
                  }]
                }

              ]
            },
              {
                "cptId": "33",
                "cptName": "美国足球联赛",
                "matchId": "1235",
                "homeId": "200",
                "awayId": "201",
                "time": "20190101143000",
                "odds": [{
                  "oddId": "20",
                  "oddName": "队伍名称1",
                  "upd": "20190101065727",
                  "chs": [{
                    "dishId": "200",
                    "name": "1",
                    "dish": "1.8"
                  }]
                },
                  {
                    "oddId": "21",
                    "oddName": "队伍名称2",
                    "upd": "20190101065727",
                    "chs": [{
                      "dishId": "201",
                      "name": "1",
                      "dish": "1.8"
                    }]
                  },
                  {
                    "oddId": "22",
                    "oddName": "队伍名称3",
                    "upd": "20190101065727",
                    "chs": [{
                      "dishId": "202",
                      "name": "1",
                      "dish": "1.8"
                    }]
                  }
                ]
              }
            ]
          },
        );
      }, 500);
    },
};
