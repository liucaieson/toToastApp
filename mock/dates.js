export default {
  'POST /api/portal/pre/getDates':
    (req, res) => {
      setTimeout(() => {
        res.send(
          {
            "status": "200",
            "code": "200",
            "message": null,
            "result":
              [
                {
                  "id":"20190711",
                  "text":"11 七月(周四)"
                },
                {
                  "id":"20190712",
                  "text":"12 七月(周五)"
                },
                {
                  "id":"20190713",
                  "text":"13 七月(周六)"
                },
                {
                  "id":"20190714",
                  "text":"14 七月(周天)"
                },
                {
                  "id":"20190715",
                  "text":"15 七月(周一)"
                },
                {
                  "id":"20190716P",
                  "text":">6天"
                },
              ]
          }
        );
      }, 500);
    },

};
