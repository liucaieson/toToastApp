export default {
  'POST /api/portal/user/accountStatement':
    (req, res) => {
      setTimeout(() => {
        res.send(
          {
            "status": "200",
            "code": "200",
            "message": null,
            "result": {
              "data":[{
              "date": "2019-09-01",
              "title": "123456",
              "type": "会员存款",
              "amount": "100",
              "balance": "100"
            }, {
              "date": "2019-09-01",
              "title": "123457",
              "type": "会员提现",
              "amount": "50",
              "balance": "50"
            }],
            "page":1,
            "count": 8
            }
          }
        );
      }, 500);
    },

};
