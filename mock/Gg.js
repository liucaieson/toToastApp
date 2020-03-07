export default {
  'POST /api/portal/pre/getGg':
    (req, res) => {
      setTimeout(() => {
        res.send(
          {
            "status": "200",
            "code": "200",
            "message": null,
            "result": [{
              "ggId": "1",
              "ggName": "让球&大小",
              "matchCount": "110"
            },
              {
                "ggId": "2",
                "ggName": "全场 上半场 单/双",
                "matchCount": "110"
              },
              {
                "ggId": "3",
                "ggName": "全场 上半场 进球总数",
                "matchCount": "110"
              },
              {
                "ggId": "4",
                "ggName": "1x2 双重机会",
                "matchCount": "110"
              },
              {
                "ggId": "5",
                "ggName": "波胆",
                "matchCount": "110"
              },
              {
                "ggId": "6",
                "ggName": "半场/全场",
                "matchCount": "110"
              },
              {
                "ggId": "7",
                "ggName": "最先进球最后进球",
                "matchCount": "110"
              },
              {
                "ggId": "8",
                "ggName": "混合过关",
                "matchCount": "110"
              },
              {
                "ggId": "9",
                "ggName": "优胜冠军",
                "matchCount": "110"
              },
              {
                "ggId": "10",
                "ggName": "特别投注",
                "matchCount": "110"
              }
            ]
          },
        );
      }, 500);
    },

};
