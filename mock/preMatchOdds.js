export default {
  'POST /api/portal/pre/getPreMatchOdds':
    (req, res) => {
      setTimeout(() => {
        res.send(
          {
            "status": "200",
            "code": "200",
            "message": null,
            "result": [
              {
                "cptId": "91",
                "cptName": "英超联赛",
                "matchId": "1234",
                "homeId": "100",
                "awayId": "101",
                "homeName": "曼联",
                "awayName": "切尔西",
                "time": "20190101143000",
                "odds": [{
                  "oddId": "10",
                  "oddName": "让球",
                  "upd": "20190101065727",
                  "chs": [{
                    "dishId": "100",
                    "choiceHandicap": "1",
                    "name": "2",
                    "dish": "11.8"
                  }, {
                    "dishId": "101",
                    "choiceHandicap": "-1",
                    "name": "1",
                    "dish": "1.11"
                  }]
                },
                  {
                    "oddId": "11",
                    "oddName": "大/小",
                    "upd": "20190101065727",
                    "chs": [{
                      "dishId": "102",
                      "choiceHandicap": "1",
                      "name": "2",
                      "dish": "1.8"
                    }, {
                      "dishId": "103",
                      "choiceHandicap": "1",
                      "name": "1",
                      "dish": "2.8"
                    }]
                  },
                  {
                    "oddId": "12",
                    "oddName": "独赢",
                    "upd": "20190101065727",
                    "chs": [{
                      "dishId": "104",
                      "choiceHandicap": null,
                      "name": "1",
                      "dish": "1.8"
                    }, {
                      "dishId": "105",
                      "choiceHandicap": null,
                      "name": "2",
                      "dish": "1.8"
                    },
                      {
                        "dishId": "106",
                        "choiceHandicap": null,
                        "name": "x",
                        "dish": "1.8"
                      }

                    ]
                  }, {
                    "oddId": "13",
                    "oddName": "让球",
                    "upd": "20190101065727",
                    "chs": [{
                      "dishId": "107",
                      "choiceHandicap": "1",
                      "name": "1",
                      "dish": "1.8"
                    }, {
                      "dishId": "108",
                      "choiceHandicap": "-1",
                      "name": "2",
                      "dish": "1.8"
                    }]
                  }, {
                    "oddId": "14",
                    "oddName": "大/小",
                    "upd": "20190101065727",
                    "chs": [{
                      "dishId": "109",
                      "choiceHandicap": "1",
                      "name": "1",
                      "dish": "1.8"
                    }, {
                      "dishId": "110",
                      "choiceHandicap": "-1",
                      "name": "2",
                      "dish": "1.8"
                    }]
                  }, {
                    "oddId": "15",
                    "oddName": "独赢",
                    "upd": "20190101065727",
                    "chs": [{
                      "dishId": "111",
                      "choiceHandicap": "1",
                      "name": "1",
                      "dish": "1.8"
                    }, {
                      "dishId": "112",
                      "choiceHandicap": "-1",
                      "name": "2",
                      "dish": "1.8"
                    },
                      {
                        "dishId": "113",
                        "choiceHandicap": "-1",
                        "name": "x",
                        "dish": "1.8"
                      }
                    ]
                  }
                ]
              }
              ,
              {
                "cptId": "91",
                "cptName": "英超联赛",
                "matchId": "1238",
                "homeId": "100",
                "awayId": "101",
                "homeName": "曼联",
                "awayName": "切尔西",
                "time": "20190101143000",
                "odds": [{
                  "oddId": "10",
                  "oddName": "让球",
                  "upd": "20190101065727",
                  "chs": [{
                    "dishId": "100",
                    "choiceHandicap": "1",
                    "name": "1",
                    "dish": "1.7"
                  }, {
                    "dishId": "101",
                    "choiceHandicap": "-1",
                    "name": "2",
                    "dish": "1.8"
                  }]
                },
                  {
                    "oddId": "11",
                    "oddName": "大/小",
                    "upd": "20190101065727",
                    "chs": [{
                      "dishId": "102",
                      "choiceHandicap": "1",
                      "name": "1",
                      "dish": "1.8"
                    }, {
                      "dishId": "103",
                      "choiceHandicap": "1",
                      "name": "2",
                      "dish": "1.8"
                    }]
                  },
                  {
                    "oddId": "12",
                    "oddName": "独赢",
                    "upd": "20190101065727",
                    "chs": [{
                      "dishId": "104",
                      "choiceHandicap": null,
                      "name": "1",
                      "dish": "1.8"
                    }, {
                      "dishId": "105",
                      "choiceHandicap": null,
                      "name": "2",
                      "dish": "1.7"
                    },
                      {
                        "dishId": "106",
                        "choiceHandicap": null,
                        "name": "x",
                        "dish": "1.8"
                      }

                    ]
                  }, {
                    "oddId": "13",
                    "oddName": "让球",
                    "upd": "20190101065727",
                    "chs": [{
                      "dishId": "107",
                      "choiceHandicap": "1",
                      "name": "2",
                      "dish": "1.8"
                    }, {
                      "dishId": "108",
                      "choiceHandicap": "-1",
                      "name": "1",
                      "dish": "2.9"
                    }]
                  }, {
                    "oddId": "14",
                    "oddName": "大/小",
                    "upd": "20190101065727",
                    "chs": [{
                      "dishId": "109",
                      "choiceHandicap": "1",
                      "name": "1",
                      "dish": "1.8"
                    }, {
                      "dishId": "110",
                      "choiceHandicap": "-1",
                      "name": "2",
                      "dish": "1.8"
                    }]
                  }, {
                    "oddId": "15",
                    "oddName": "独赢",
                    "upd": "20190101065727",
                    "chs": [{
                      "dishId": "111",
                      "choiceHandicap": "1",
                      "name": "1",
                      "dish": "1.8"
                    }, {
                      "dishId": "112",
                      "choiceHandicap": "-1",
                      "name": "2",
                      "dish": "1.8"
                    },
                      {
                        "dishId": "113",
                        "choiceHandicap": "-1",
                        "name": "x",
                        "dish": "1.8"
                      }
                    ]
                  }
                ]
              }
              ,
              {
                "cptId": "91",
                "cptName": "英超联赛",
                "matchId": "1235",
                "homeId": "100",
                "awayId": "101",
                "homeName": "曼联",
                "awayName": "切尔西",
                "time": "20190101143000",
                "odds": [
                  {
                  "oddId": "10",
                  "oddName": "让球",
                  "upd": "20190101065727",
                  "chs": [{
                    "dishId": "100",
                    "choiceHandicap": "1",
                    "name": "1",
                    "dish": "1.8"
                  }, {
                    "dishId": "101",
                    "choiceHandicap": "-1",
                    "name": "2",
                    "dish": "1.8"
                  }]
                },
                  {
                    "oddId": "11",
                    "oddName": "大/小",
                    "upd": "20190101065727",
                    "chs": [{
                      "dishId": "102",
                      "choiceHandicap": "1",
                      "name": "1",
                      "dish": "1.8"
                    }, {
                      "dishId": "103",
                      "choiceHandicap": "1",
                      "name": "2",
                      "dish": "1.8"
                    }]
                  },
                  {
                    "oddId": "12",
                    "oddName": "独赢",
                    "upd": "20190101065727",
                    "chs": [{
                      "dishId": "104",
                      "choiceHandicap": null,
                      "name": "1",
                      "dish": "1.8"
                    }, {
                      "dishId": "105",
                      "choiceHandicap": null,
                      "name": "2",
                      "dish": "1.8"
                    },
                      {
                        "dishId": "106",
                        "choiceHandicap": null,
                        "name": "x",
                        "dish": "1.8"
                      }

                    ]
                  }, {
                    "oddId": "13",
                    "oddName": "让球",
                    "upd": "20190101065727",
                    "chs": [{
                      "dishId": "107",
                      "choiceHandicap": "1",
                      "name": "1",
                      "dish": "1.8"
                    }, {
                      "dishId": "108",
                      "choiceHandicap": "-1",
                      "name": "2",
                      "dish": "1.8"
                    }]
                  }, {
                    "oddId": "14",
                    "oddName": "大/小",
                    "upd": "20190101065727",
                    "chs": [{
                      "dishId": "109",
                      "choiceHandicap": "1",
                      "name": "1",
                      "dish": "1.8"
                    }, {
                      "dishId": "110",
                      "choiceHandicap": "-1",
                      "name": "2",
                      "dish": "1.8"
                    }]
                  }, {
                    "oddId": "15",
                    "oddName": "独赢",
                    "upd": "20190101065727",
                    "chs": [{
                      "dishId": "111",
                      "choiceHandicap": "1",
                      "name": "1",
                      "dish": "1.8"
                    }, {
                      "dishId": "112",
                      "choiceHandicap": "-1",
                      "name": "2",
                      "dish": "1.8"
                    },
                      {
                        "dishId": "113",
                        "choiceHandicap": "-1",
                        "name": "x",
                        "dish": "1.8"
                      }
                    ]
                  }
                ]
              }
              ,
              {
                "cptId": "33",
                "cptName": "日本联赛",
                "matchId": "1342",
                "homeId": "1032",
                "awayId": "1031",
                "homeName": "主队1",
                "awayName": "客队1",
                "time": "20190101143000",
                "odds": [{
                  "oddId": "30",
                  "oddName": "让球",
                  "upd": "20190101065727",
                  "chs": [{
                    "dishId": "1000",
                    "choiceHandicap": "1",
                    "name": "1",
                    "dish": "1.8"
                  }, {
                    "dishId": "1001",
                    "choiceHandicap": "-1",
                    "name": "2",
                    "dish": "1.8"
                  }]
                },
                  {
                    "oddId": "31",
                    "oddName": "大/小",
                    "upd": "20190101065727",
                    "chs": [{
                      "dishId": "1002",
                      "choiceHandicap": "1",
                      "name": "1",
                      "dish": "1.8"
                    }, {
                      "dishId": "1003",
                      "choiceHandicap": "1",
                      "name": "2",
                      "dish": "1.8"
                    }]
                  },
                  {
                    "oddId": "32",
                    "oddName": "独赢",
                    "upd": "20190101065727",
                    "chs": [{
                      "dishId": "1004",
                      "choiceHandicap": null,
                      "name": "1",
                      "dish": "1.8"
                    }, {
                      "dishId": "1005",
                      "choiceHandicap": null,
                      "name": "2",
                      "dish": "1.8"
                    },
                      {
                        "dishId": "1006",
                        "choiceHandicap": null,
                        "name": "x",
                        "dish": "1.8"
                      }

                    ]
                  }, {
                    "oddId": "43",
                    "oddName": "让球",
                    "upd": "20190101065727",
                    "chs": [{
                      "dishId": "1011",
                      "choiceHandicap": "1",
                      "name": "1",
                      "dish": "1.8"
                    }, {
                      "dishId": "1012",
                      "choiceHandicap": "-1",
                      "name": "2",
                      "dish": "1.8"
                    }]
                  }, {
                    "oddId": "44",
                    "oddName": "大/小",
                    "upd": "20190101065727",
                    "chs": [{
                      "dishId": "1013",
                      "choiceHandicap": "1",
                      "name": "1",
                      "dish": "1.8"
                    }, {
                      "dishId": "101",
                      "choiceHandicap": "-1",
                      "name": "2",
                      "dish": "1.8"
                    }]
                  }, {
                    "oddId": "45",
                    "oddName": "独赢",
                    "upd": "20190101065727",
                    "chs": [{
                      "dishId": "1014",
                      "choiceHandicap": "1",
                      "name": "1",
                      "dish": "1.8"
                    }, {
                      "dishId": "1015",
                      "choiceHandicap": "-1",
                      "name": "2",
                      "dish": "1.8"
                    },
                      {
                        "dishId": "1016",
                        "choiceHandicap": "-1",
                        "name": "x",
                        "dish": "1.8"
                      }
                    ]
                  }
                ]
              },

              {
                "cptId": "53",
                "cptName": "美国联赛",
                "matchId": "223124",
                "homeId": "21200",
                "awayId": "20121",
                "homeName": "主队2",
                "awayName": "客队2",
                "time": "20190101143000",
                "odds": [{
                  "oddId": "70",
                  "oddName": "让球",
                  "upd": "20190101065727",
                  "chs": [{
                    "dishId": "700",
                    "choiceHandicap": "1",
                    "name": "1",
                    "dish": "1.8"
                  }, {
                    "dishId": "701",
                    "choiceHandicap": "-1",
                    "name": "2",
                    "dish": "1.8"
                  }]
                },
                  {
                    "oddId": "71",
                    "oddName": "大/小",
                    "upd": "20190101065727",
                    "chs": [{
                      "dishId": "700",
                      "choiceHandicap": "1",
                      "name": "1",
                      "dish": "1.8"
                    }, {
                      "dishId": "701",
                      "choiceHandicap": "1",
                      "name": "2",
                      "dish": "1.8"
                    }]
                  },
                  {
                    "oddId": "72",
                    "oddName": "独赢",
                    "upd": "20190101065727",
                    "chs": [{
                      "dishId": "3700",
                      "choiceHandicap": null,
                      "name": "1",
                      "dish": "1.8"
                    }, {
                      "dishId": "3701",
                      "choiceHandicap": null,
                      "name": "2",
                      "dish": "1.8"
                    },
                      {
                        "dishId": "3702",
                        "choiceHandicap": null,
                        "name": "x",
                        "dish": "1.8"
                      }

                    ]
                  }, {
                    "oddId": "1750",
                    "oddName": "让球",
                    "upd": "20190101065727",
                    "chs": [{
                      "dishId": "232",
                      "choiceHandicap": "1",
                      "name": "1",
                      "dish": "1.8"
                    }, {
                      "dishId": "233",
                      "choiceHandicap": "-1",
                      "name": "2",
                      "dish": "1.8"
                    }]
                  }, {
                    "oddId": "450",
                    "oddName": "大/小",
                    "upd": "20190101065727",
                    "chs": [{
                      "dishId": "1123",
                      "choiceHandicap": "1",
                      "name": "1",
                      "dish": "1.8"
                    }, {
                      "dishId": "1124",
                      "choiceHandicap": "-1",
                      "name": "2",
                      "dish": "1.8"
                    }]
                  }, {
                    "oddId": "451",
                    "oddName": "独赢",
                    "upd": "20190101065727",
                    "chs": [{
                      "dishId": "253",
                      "choiceHandicap": "1",
                      "name": "1",
                      "dish": "1.8"
                    }, {
                      "dishId": "254",
                      "choiceHandicap": "-1",
                      "name": "2",
                      "dish": "1.8"
                    },
                      {
                        "dishId": "255",
                        "choiceHandicap": "-1",
                        "name": "x",
                        "dish": "1.8"
                      }
                    ]
                  }
                ]
              }
            ]
          },
        );
      }, 500);
    },
};
