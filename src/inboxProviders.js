// Providers without a known search deep link: these open the webmail inbox only,
// so `from`, `daysAgo` and `hoursAgo` are ignored. `regional` maps a domain to
// its local webmail when it differs from `inbox`.
module.exports = {
  // Western
  aol: {
    domains: ['aol.com', 'aim.com', 'aol.co.uk'],
    inbox: 'https://mail.aol.com/',
  },
  fastmail: {
    domains: ['fastmail.com', 'fastmail.fm'],
    inbox: 'https://app.fastmail.com/',
  },
  gmx: {
    domains: ['gmx.net', 'gmx.de', 'gmx.at', 'gmx.ch', 'gmx.com', 'gmx.us', 'gmx.co.uk', 'gmx.fr', 'gmx.es'],
    inbox: 'https://www.gmx.net/',
    regional: {
      'gmx.com': 'https://www.gmx.com/',
      'gmx.us': 'https://www.gmx.com/',
      'gmx.co.uk': 'https://www.gmx.co.uk/',
      'gmx.fr': 'https://www.gmx.fr/',
      'gmx.es': 'https://www.gmx.es/',
    },
  },
  webde: {
    domains: ['web.de'],
    inbox: 'https://web.de/',
  },
  zoho: {
    domains: ['zoho.com', 'zohomail.com', 'zoho.eu', 'zohomail.eu', 'zohomail.in'],
    inbox: 'https://mail.zoho.com/',
    regional: {
      'zoho.eu': 'https://mail.zoho.eu/',
      'zohomail.eu': 'https://mail.zoho.eu/',
      'zohomail.in': 'https://mail.zoho.in/',
    },
  },
  mailcom: {
    domains: ['mail.com', 'email.com', 'usa.com'],
    inbox: 'https://www.mail.com/',
  },
  orange: {
    domains: ['orange.fr', 'wanadoo.fr'],
    inbox: 'https://mail.orange.fr/',
  },
  free: {
    domains: ['free.fr'],
    inbox: 'https://webmail.free.fr/',
  },
  laposte: {
    domains: ['laposte.net'],
    inbox: 'https://www.laposte.net/',
  },
  wp: {
    domains: ['wp.pl'],
    inbox: 'https://poczta.wp.pl/',
  },
  onet: {
    domains: ['onet.pl', 'op.pl', 'onet.eu', 'vp.pl'],
    inbox: 'https://poczta.onet.pl/',
  },
  interia: {
    domains: ['interia.pl', 'interia.eu', 'poczta.fm'],
    inbox: 'https://poczta.interia.pl/',
  },
  seznam: {
    domains: ['seznam.cz', 'email.cz', 'post.cz'],
    inbox: 'https://email.seznam.cz/',
  },
  tuta: {
    domains: ['tuta.com', 'tuta.io', 'tutanota.com', 'tutanota.de', 'tutamail.com', 'keemail.me'],
    inbox: 'https://app.tuta.com/',
  },
  // Non-western
  qq: {
    domains: ['qq.com', 'vip.qq.com', 'foxmail.com'],
    inbox: 'https://mail.qq.com/',
  },
  netease: {
    domains: ['163.com', '126.com', 'yeah.net'],
    inbox: 'https://mail.163.com/',
    regional: {
      '126.com': 'https://mail.126.com/',
      'yeah.net': 'https://mail.yeah.net/',
    },
  },
  sina: {
    domains: ['sina.com', 'sina.cn'],
    inbox: 'https://mail.sina.com.cn/',
  },
  sohu: {
    domains: ['sohu.com'],
    inbox: 'https://mail.sohu.com/',
  },
  aliyun: {
    domains: ['aliyun.com'],
    inbox: 'https://mail.aliyun.com/',
  },
  naver: {
    domains: ['naver.com'],
    inbox: 'https://mail.naver.com/',
  },
  daum: {
    domains: ['daum.net', 'hanmail.net'],
    inbox: 'https://mail.daum.net/',
  },
  yahoojapan: {
    domains: ['yahoo.co.jp', 'ymail.ne.jp'],
    inbox: 'https://mail.yahoo.co.jp/',
  },
  rediff: {
    domains: ['rediffmail.com'],
    inbox: 'https://mail.rediff.com/',
  },
};
