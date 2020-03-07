export default {
  'POST /api/portal/pre/getCompetitions':
    (req, res) => {
      setTimeout(() => {
        res.send(
          {
            "code": "200",
            "message": null,
            "responseTime": null,
            "result": [
              {
                "competitionId": 91,
                "competitionName": "英格兰超级联赛"
              },
              {
                "competitionId": 668,
                "competitionName": "澳大利亚A联赛"
              },
              {
                "competitionId": 55,
                "competitionName": "俄罗斯甲级联赛"
              },
              {
                "competitionId": 144,
                "competitionName": "罗马尼亚Liga I"
              },
              {
                "competitionId": 148,
                "competitionName": "捷克First League"
              },
              {
                "competitionId": 125,
                "competitionName": "俄罗斯超级联赛"
              },
              {
                "competitionId": 305,
                "competitionName": "德国丙级联赛"
              },
              {
                "competitionId": 182,
                "competitionName": "土耳其超级联赛"
              },
              {
                "competitionId": 121,
                "competitionName": "波兰Ekstraklasa"
              },
              {
                "competitionId": 46,
                "competitionName": "丹麦超级联赛"
              },
              {
                "competitionId": 95,
                "competitionName": "挪威甲级联赛"
              },
              {
                "competitionId": 122,
                "competitionName": "挪威Eliteserien"
              },
              {
                "competitionId": 94,
                "competitionName": "荷兰乙级联赛"
              },
              {
                "competitionId": 69,
                "competitionName": "德国乙级联赛"
              },
              {
                "competitionId": 143,
                "competitionName": "葡萄牙超级联赛"
              },
              {
                "competitionId": 167,
                "competitionName": "意大利甲级联赛"
              },
              {
                "competitionId": 236,
                "competitionName": "澳大利亚足总杯"
              },
              {
                "competitionId": 567,
                "competitionName": "UEFA Champions League"
              },
              {
                "competitionId": 580,
                "competitionName": "欧洲联赛"
              },
              {
                "competitionId": 120,
                "competitionName": "德国甲级联赛"
              },
              {
                "competitionId": 231,
                "competitionName": "英格兰全国联赛"
              },
              {
                "competitionId": 166,
                "competitionName": "芬兰甲级联赛"
              },
              {
                "competitionId": 97,
                "competitionName": "瑞典超级联赛"
              },
              {
                "competitionId": 249,
                "competitionName": "德国西部地区联赛"
              },
              {
                "competitionId": 512,
                "competitionName": "法国乙级联赛"
              },
              {
                "competitionId": 141,
                "competitionName": "意大利丙级联赛A组"
              },
              {
                "competitionId": 160,
                "competitionName": "意大利乙级联赛"
              },
              {
                "competitionId": 187,
                "competitionName": "阿根廷超级联赛"
              },
              {
                "competitionId": 127,
                "competitionName": "巴西足球甲级联赛"
              },
              {
                "competitionId": 107,
                "competitionName": "瑞典Superettan"
              },
              {
                "competitionId": 215,
                "competitionName": "哥伦比亚甲级联赛"
              },
              {
                "competitionId": 171,
                "competitionName": "保加利亚甲级联赛"
              }
            ],
            "status": "200"
          }
        );
      }, 500);
    },

};
