export default {
  'POST /api/admin/bet/queryHistory':
    (req, res) => {
      setTimeout(() => {
        res.send(
          {
            "code": "200",
            "message": null,
            "responseTime": null,
            "result": {
              "data": [
                {
                  "bonusMoney": "100",
                  "betMoney": "50",
                  "detailed": [
                    {
                      "hostName": "杜塞尔多夫",
                      "awayName": "弗赖堡",
                      "oddName": "全场亚盘大小",
                      "choiceContent": "Over",
                      "resultFlag": null,
                      "matchTime": "2019-09-29 21:30:00.0",
                      "choiceHandicap": "2.5, 3.0",
                      "dishRate": "1.81"
                    }
                  ],
                  "betTime": "2019-10-17 12:17:19.4",
                  "betType": "单注",
                  "betPrice": "50"
                },
                {
                  "bonusMoney": "300",
                  "betMoney": "40",
                  "detailed": [
                    {
                      "hostName": "多特蒙德",
                      "awayName": "云达不莱梅",
                      "oddName": "全场亚盘大小-附加",
                      "choiceContent": "Under",
                      "resultFlag": null,
                      "matchTime": "2019-09-29 00:30:00.1",
                      "choiceHandicap": "5.0, 5.5",
                      "dishRate": "1.22"
                    },
                    {
                      "hostName": "杜塞尔多夫",
                      "awayName": "弗赖堡",
                      "oddName": "全场亚盘大小-附加",
                      "choiceContent": "Under",
                      "resultFlag": null,
                      "matchTime": "2019-09-29 21:30:00.0",
                      "choiceHandicap": "4.5, 5.0",
                      "dishRate": "1.14"
                    }
                  ],
                  "betTime": "2019-10-31 12:20:11.3",
                  "betType": "串场",
                  "betPrice": "20"
                },
                {
                  "bonusMoney": "100",
                  "betMoney": "50",
                  "detailed": [
                    {
                      "hostName": "杜塞尔多夫",
                      "awayName": "弗赖堡",
                      "oddName": "全场亚盘大小",
                      "choiceContent": "Over",
                      "resultFlag": null,
                      "matchTime": "2019-09-29 21:30:00.0",
                      "choiceHandicap": "2.5, 3.0",
                      "dishRate": "1.81"
                    }
                  ],
                  "betTime": "2019-10-17 12:17:19.0",
                  "betType": "单注",
                  "betPrice": "50"
                },
                {
                  "bonusMoney": "100",
                  "betMoney": "50",
                  "detailed": [
                    {
                      "hostName": "杜塞尔多夫",
                      "awayName": "弗赖堡",
                      "oddName": "全场亚盘大小",
                      "choiceContent": "Over",
                      "resultFlag": null,
                      "matchTime": "2019-09-29 21:30:00.0",
                      "choiceHandicap": "2.5, 3.0",
                      "dishRate": "1.81"
                    }
                  ],
                  "betTime": "2019-10-17 12:17:19.1",
                  "betType": "单注",
                  "betPrice": "50"
                },
                {
                  "bonusMoney": "100",
                  "betMoney": "50",
                  "detailed": [
                    {
                      "hostName": "杜塞尔多夫",
                      "awayName": "弗赖堡",
                      "oddName": "全场亚盘大小",
                      "choiceContent": "Over",
                      "resultFlag": null,
                      "matchTime": "2019-09-29 21:30:00.0",
                      "choiceHandicap": "2.5, 3.0",
                      "dishRate": "1.81"
                    }
                  ],
                  "betTime": "2019-10-17 12:17:19.2",
                  "betType": "单注",
                  "betPrice": "50"
                },
              ],
              "count": 3,
              "current":1
            },
            "status": "200"
          },
        );
      }, 500);
    },

};





