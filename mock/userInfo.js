export default {
  'POST /api/portal/user/getUserInfo':
    (req, res) => {
      setTimeout(() => {
        res.send(
          {
            'code': "200",
            'status': "200",
            'msg': '8ms',
            'result': {
              'userName': 'loli',
              'balance': 90
            },
          },
        );
      }, 500);
    },

};
