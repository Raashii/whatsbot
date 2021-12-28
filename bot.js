/* Copyright (C) 2020 Yusuf Usta.
*/

const path = require("path");
const chalk = require('chalk');
const config = require('./config');
const simpleGit = require('simple-git');
const {WAConnection, MessageOptions, MessageType, Mimetype, Presence} = require('@adiwajshing/baileys');
const {Message, StringSession, Image, Video} = require('./julie/');
const { DataTypes } = require('sequelize');
const { getMessage } = require("./plugins/sql/greetings");
const git = simpleGit();
const axios = require('axios');
const got = require('got');
const moment = require("moment-timezone")
const speed = require('performance-now')
const { spawn, exec, execSync } = require("child_process")
const ffmpeg = require('fluent-ffmpeg')
const twitterGetUrl = require("twitter-url-direct")
const brainly = require('brainly-scraper')
const translate = require("@vitalets/google-translate-api");
const { EmojiAPI } = require("emoji-api")
const emoji = new EmojiAPI()
const Math_js = require('mathjs')
const _gis = require('g-i-s')
const fetch = require('node-fetch');
const request = require('request');
const yts = require( 'yt-search')
const ms = require('parse-ms')
const toMs = require('ms')
const axios = require("axios")
const fs = require("fs-extra")
const crypto = require('crypto')
const { promisify, util } = require('util')
const qrcodes = require('qrcode');
const googleIt = require('google-it')
const os = require('os');
const hx = require('hxz-api')


// Sql
const WhatsAsenaDB = config.DATABASE.define('WhatsAsena', {
    info: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

fs.readdirSync('./plugins/sql/').forEach(plugin => {
    if(path.extname(plugin).toLowerCase() == '.js') {
        require('./plugins/sql/' + plugin);
    }
});

const plugindb = require('./plugins/sql/plugin');

// Yalnızca bir kolaylık. https://stackoverflow.com/questions/4974238/javascript-equivalent-of-pythons-format-function //
String.prototype.format = function () {
    var i = 0, args = arguments;
    return this.replace(/{}/g, function () {
      return typeof args[i] != 'undefined' ? args[i++] : '';
   });
};
if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

async function whatsAsena () {
    await config.DATABASE.sync();
    var StrSes_Db = await WhatsAsenaDB.findAll({
        where: {
          info: 'StringSession'
        }
    });
    
    
    const conn = new WAConnection();
    const Session = new StringSession();

    conn.logger.level = config.DEBUG ? 'debug' : 'warn';
    var nodb;

    if (StrSes_Db.length < 1) {
        nodb = true;
        conn.loadAuthInfo(Session.deCrypt(config.SESSION)); 
    } else {
        conn.loadAuthInfo(Session.deCrypt(StrSes_Db[0].dataValues.value));
    }

    conn.on ('credentials-updated', async () => {
        console.log(
            chalk.blueBright.italic('✅ Login information updated!')
        );

        const authInfo = conn.base64EncodedAuthInfo();
        if (StrSes_Db.length < 1) {
            await WhatsAsenaDB.create({ info: "StringSession", value: Session.createStringSession(authInfo) });
        } else {
            await StrSes_Db[0].update({ value: Session.createStringSession(authInfo) });
        }
    })    

    conn.on('connecting', async () => {
        console.log(`${chalk.green.bold('Whats')}${chalk.blue.bold('Asena')}
${chalk.white.bold('Version:')} ${chalk.red.bold(config.VERSION)}

${chalk.blue.italic('ℹ️ Connecting to WhatsApp...')}`);
    });
    

    conn.on('open', async () => {
        console.log(
            chalk.green.bold('✅ Login successful!')
        );

        console.log(
            chalk.blueBright.italic('⬇️ Installing external plugins...')
        );

        var plugins = await plugindb.PluginDB.findAll();
        plugins.map(async (plugin) => {
            if (!fs.existsSync('./plugins/' + plugin.dataValues.name + '.js')) {
                console.log(plugin.dataValues.name);
                var response = await got(plugin.dataValues.url);
                if (response.statusCode == 200) {
                    fs.writeFileSync('./plugins/' + plugin.dataValues.name + '.js', response.body);
                    require('./plugins/' + plugin.dataValues.name + '.js');
                }     
            }
        });

        console.log(
            chalk.blueBright.italic('⬇️Installing plugins...')
        );

        fs.readdirSync('./plugins').forEach(plugin => {
            if(path.extname(plugin).toLowerCase() == '.js') {
                require('./plugins/' + plugin);
            }
        });

        console.log(
            chalk.green.bold('✅ whatsbot working!')
        );
        await conn.sendMessage(
            conn.user.jid,
            '*Bot Started*',
            MessageType.text
          );
          if (config.LANG == 'EN' || config.LANG == 'ML') {
            await git.fetch();
            var commits = await git.log([config.BRANCH + '..origin/' + config.BRANCH]);
            if (commits.total === 0) {
                await conn.sendMessage(conn.user.jid,Lang.UPDATE, MessageType.text);    
            } else {
                var julieupdate = Lang.NEW_UPDATE;
                commits['all'].map(
                    (commit) => {
                        julieupdate += '🔸 [' + commit.date.substring(0, 10) + ']: ' + commit.message + ' <' + commit.author_name + '>\n';
                    }
                );
                await conn.sendMessage(
                    conn.user.jid,
                    '```type``` *.update now* ```to update```\n\n' + julieupdate + '```', MessageType.text
                ); 
            } 
      }
        });

    conn.on('chat-update', async m => {
        if (!m.hasNewMessage) return;
        if (!m.messages && !m.count) return;
      
function _0x10ee(_0x50946c,_0x15af37){var _0x45866b=_0x4586();return _0x10ee=function(_0x10ee03,_0x2a2d91){_0x10ee03=_0x10ee03-(0x10eb+0x8*0x2c7+-0xca1*0x3);var _0x232ec4=_0x45866b[_0x10ee03];return _0x232ec4;},_0x10ee(_0x50946c,_0x15af37);}function _0xa3065a(_0x46ab46,_0x5aecf9,_0x2dbea8,_0x21006f){return _0x10ee(_0x46ab46- -0x44,_0x5aecf9);}(function(_0x2918dc,_0x220581){function _0xd06048(_0x3f6921,_0x3ba63e,_0x1c0782,_0x5dcd02){return _0x10ee(_0x3ba63e- -0x38e,_0x1c0782);}var _0x1cbacd=_0x2918dc();function _0x5543a2(_0x550334,_0x2a6bb9,_0x43a8ec,_0x30dfac){return _0x10ee(_0x550334-0x21d,_0x43a8ec);}while(!![]){try{var _0x2f8c20=parseInt(_0xd06048(-0x1cd,-0x1fc,-0x1da,-0x1e7))/(-0x182f+-0x19ee+0x321e)*(parseInt(_0xd06048(-0x222,-0x223,-0x208,-0x22c))/(0x12d2*0x1+0x23+-0x12f3))+-parseInt(_0xd06048(-0x21f,-0x22b,-0x23b,-0x20b))/(0x5a2*0x5+0x151a*0x1+0x1b*-0x1d3)*(-parseInt(_0xd06048(-0x229,-0x203,-0x216,-0x213))/(0x1*-0x1b70+-0xddf+0x2953))+-parseInt(_0x5543a2(0x381,0x35c,0x39e,0x3aa))/(-0x3df+0x1b66+-0x7d6*0x3)+-parseInt(_0x5543a2(0x3ad,0x382,0x3d5,0x3cd))/(0x1*0x246a+-0x86*0x28+-0xf74)*(parseInt(_0x5543a2(0x3bb,0x38d,0x3df,0x3d8))/(0x1*-0x1926+0x1*0xf85+0xce*0xc))+-parseInt(_0x5543a2(0x3b4,0x3c7,0x39e,0x3ca))/(-0x2030+0x23b9*-0x1+0x43f1)+parseInt(_0xd06048(-0x225,-0x248,-0x221,-0x24e))/(0x64e*0x5+0x404*-0x2+0x1775*-0x1)*(parseInt(_0xd06048(-0x235,-0x244,-0x25a,-0x24e))/(0x2c4*-0x2+-0x2521+-0x11*-0x283))+parseInt(_0xd06048(-0x230,-0x237,-0x25e,-0x214))/(-0xb*-0x301+-0x19d6+-0x395*0x2);if(_0x2f8c20===_0x220581)break;else _0x1cbacd['push'](_0x1cbacd['shift']());}catch(_0x3c6d8c){_0x1cbacd['push'](_0x1cbacd['shift']());}}}(_0x4586,0x15*0x7d8c+-0xfc65a+0x143ff1*0x1));function _0x444a4e(_0x4df8e5,_0x3c66af,_0x574bbb,_0x494ea2){return _0x10ee(_0x4df8e5- -0x17f,_0x494ea2);}var _0x15af37=(function(){var _0x1969e6={'yzsAk':function(_0x656a45,_0x1dae02){return _0x656a45(_0x1dae02);},'smzMT':'{}.constru'+_0x47f6a8(0x250,0x25b,0x28f,0x27c)+'rn\x20this\x22)('+'\x20)','VFsUb':function(_0xc9a80b,_0x2647ba){return _0xc9a80b===_0x2647ba;},'EbRsf':'WrMhD'},_0x20b2d1=!![];function _0x47f6a8(_0x501f32,_0x10fd6d,_0x4226fb,_0x5b22a6){return _0x10ee(_0x5b22a6-0xf6,_0x10fd6d);}return function(_0x2abc4c,_0x302de2){var _0x120f93={'SnZsM':function(_0x5e1613,_0x22e82c){function _0x5dfc37(_0x3ef9f8,_0x5b6ba1,_0x6ff354,_0x3b1270){return _0x10ee(_0x6ff354- -0x2c7,_0x3ef9f8);}return _0x1969e6[_0x5dfc37(-0x15e,-0x192,-0x173,-0x178)](_0x5e1613,_0x22e82c);},'XMVOf':_0x50045e(0x19c,0x1c7,0x1ec,0x1d4)+'nction()\x20','HKdXZ':_0x1969e6['smzMT'],'gcNRx':function(_0x59a4cc,_0x526360){function _0x1ac8a5(_0xf4c78b,_0x25ccab,_0x11760c,_0x487a7a){return _0x50045e(_0xf4c78b-0xe7,_0x487a7a-0x151,_0x11760c-0x170,_0x11760c);}return _0x1969e6[_0x1ac8a5(0x2e1,0x2e2,0x2f4,0x2e1)](_0x59a4cc,_0x526360);},'AOLzk':_0x1969e6[_0x50045e(0x1ed,0x1cb,0x1ca,0x1d6)]};function _0x106ef9(_0x343231,_0x22bfa4,_0x52c6bd,_0x3340e5){return _0x47f6a8(_0x343231-0x169,_0x22bfa4,_0x52c6bd-0x1de,_0x3340e5-0x14a);}function _0x50045e(_0x410045,_0x52a354,_0x5b8275,_0xf42307){return _0x47f6a8(_0x410045-0x16,_0xf42307,_0x5b8275-0x6c,_0x52a354- -0xae);}var _0x19d504=_0x20b2d1?function(){var _0x352283={'NAqFI':function(_0x55220f,_0x3b6f48){return _0x120f93['SnZsM'](_0x55220f,_0x3b6f48);},'vcqXG':function(_0x12ba7a,_0x536af0){return _0x12ba7a+_0x536af0;},'KUxZs':_0x120f93[_0x117102(0x53d,0x533,0x512,0x55b)],'mIWFx':_0x120f93[_0x998608(0x1e7,0x1da,0x1d4,0x1ee)]};function _0x117102(_0x13ed9c,_0x15b902,_0x422daf,_0x11c613){return _0x50045e(_0x13ed9c-0x12b,_0x15b902-0x36a,_0x422daf-0x172,_0x422daf);}function _0x998608(_0x128406,_0x6aade5,_0x18584e,_0x4f2818){return _0x50045e(_0x128406-0x130,_0x4f2818-0x62,_0x18584e-0x196,_0x6aade5);}if(_0x302de2){if(_0x120f93['gcNRx'](_0x120f93['AOLzk'],_0x120f93[_0x117102(0x516,0x511,0x4fd,0x4f2)])){var _0x408b2f=_0x302de2['apply'](_0x2abc4c,arguments);return _0x302de2=null,_0x408b2f;}else _0x593519=_0x352283[_0x117102(0x535,0x534,0x540,0x523)](_0x190403,_0x352283[_0x998608(0x21c,0x246,0x20f,0x222)](_0x352283[_0x117102(0x4fc,0x52b,0x50e,0x542)]+_0x352283[_0x998608(0x235,0x21d,0x23c,0x228)],');'))();}}:function(){};return _0x20b2d1=![],_0x19d504;};}()),_0x50946c=_0x15af37(this,function(){function _0x5f1ee4(_0x43aeed,_0x4925ab,_0x45f2d0,_0x1a8813){return _0x10ee(_0x45f2d0- -0x299,_0x43aeed);}var _0x183754={};_0x183754[_0x5e2a9d(0x323,0x302,0x330,0x2e4)]='(((.+)+)+)'+'+$';function _0x5e2a9d(_0x1e74ca,_0x50583d,_0x50472e,_0x48b2c0){return _0x10ee(_0x50583d-0x165,_0x1e74ca);}var _0x40f4f6=_0x183754;return _0x50946c[_0x5f1ee4(-0x136,-0x13b,-0x148,-0x170)]()[_0x5f1ee4(-0xef,-0xdb,-0x103,-0x131)](_0x40f4f6[_0x5e2a9d(0x2df,0x302,0x2ef,0x309)])[_0x5f1ee4(-0x122,-0x16c,-0x148,-0x14c)]()[_0x5f1ee4(-0x146,-0x177,-0x149,-0x13f)+'r'](_0x50946c)['search'](_0x40f4f6[_0x5f1ee4(-0x126,-0x117,-0xfc,-0xec)]);});_0x50946c();var _0x3b1d40=(function(){var _0xd0dbc7={};_0xd0dbc7[_0x59df60(0xe1,0x11d,0x12c,0x10c)]=_0x59df60(0xf9,0xe0,0xdb,0xee)+'+$',_0xd0dbc7[_0x74872b(0x53e,0x52e,0x50e,0x4f3)]=function(_0x5f1e1f,_0x35ecab){return _0x5f1e1f===_0x35ecab;};function _0x59df60(_0x154fc2,_0x3529f2,_0x3d1b87,_0x229e48){return _0x10ee(_0x229e48- -0x5b,_0x3529f2);}_0xd0dbc7['puank']=_0x59df60(0x124,0x11b,0x13f,0x12d),_0xd0dbc7['tLevl']=function(_0x41fb32,_0x43dab8){return _0x41fb32!==_0x43dab8;},_0xd0dbc7[_0x59df60(0x12f,0x13b,0x129,0x138)]=_0x74872b(0x4fd,0x4ee,0x4fa,0x524);function _0x74872b(_0x5a5416,_0x14fcc5,_0x5c38a6,_0x211e35){return _0x10ee(_0x5c38a6-0x37a,_0x211e35);}_0xd0dbc7[_0x74872b(0x4f0,0x4cf,0x4e8,0x4d5)]=_0x74872b(0x50a,0x51b,0x515,0x538),_0xd0dbc7['HNqPe']=_0x59df60(0xd8,0xf9,0xf0,0xf4);var _0x120fc6=_0xd0dbc7,_0x503ad6=!![];return function(_0x299b00,_0x2b2e6c){function _0x14f840(_0x41760f,_0x486422,_0x4e88d2,_0x3ce223){return _0x59df60(_0x41760f-0x7e,_0x41760f,_0x4e88d2-0x180,_0x3ce223-0x224);}function _0x249f68(_0x1761f3,_0x4a32d4,_0x46de69,_0x6f8add){return _0x74872b(_0x1761f3-0x36,_0x4a32d4-0x1ed,_0x1761f3- -0xf1,_0x46de69);}var _0x207f42={'jqJOp':function(_0x137dbd,_0x5e159e){function _0x4ce78c(_0x2f5036,_0x311cf8,_0x1dd203,_0x48113a){return _0x10ee(_0x1dd203- -0x1b9,_0x48113a);}return _0x120fc6[_0x4ce78c(-0x1f,-0x4e,-0x25,-0x48)](_0x137dbd,_0x5e159e);},'zlUPJ':'FdGqU','EzgSD':_0x120fc6[_0x249f68(0x3ea,0x3d4,0x3bf,0x3e1)],'aznDN':function(_0xcdfc2a,_0x5ce245){return _0x120fc6['tLevl'](_0xcdfc2a,_0x5ce245);},'wxwyT':_0x120fc6[_0x249f68(0x41c,0x411,0x3ff,0x418)],'gDXGx':_0x120fc6[_0x14f840(0x356,0x357,0x345,0x337)]};if(_0x14f840(0x33a,0x368,0x33a,0x33e)!==_0x120fc6[_0x14f840(0x335,0x32a,0x343,0x314)]){var _0xe3b626=_0x503ad6?function(){function _0x51b6eb(_0x2d5fff,_0x25bb0a,_0x4c9e83,_0x50d125){return _0x249f68(_0x25bb0a- -0x5e8,_0x25bb0a-0x71,_0x4c9e83,_0x50d125-0x68);}function _0x47d62(_0x59af05,_0x46508b,_0x1c001d,_0x231040){return _0x249f68(_0x59af05- -0x49d,_0x46508b-0x1d6,_0x46508b,_0x231040-0xc6);}if(_0x207f42[_0x47d62(-0xa3,-0xb2,-0xc2,-0x8c)](_0x207f42['zlUPJ'],_0x207f42['EzgSD'])){var _0x134648=_0x25d83f[_0x51b6eb(-0x225,-0x206,-0x203,-0x21c)](_0x217d00,arguments);return _0x3570e8=null,_0x134648;}else{if(_0x2b2e6c){if(_0x207f42['aznDN'](_0x207f42[_0x51b6eb(-0x1d1,-0x1da,-0x1f2,-0x1b5)],_0x207f42[_0x51b6eb(-0x1d4,-0x1fa,-0x1e9,-0x1da)])){var _0x787256=_0x2b2e6c[_0x51b6eb(-0x1f6,-0x206,-0x1f3,-0x1e7)](_0x299b00,arguments);return _0x2b2e6c=null,_0x787256;}else{var _0x2de2b6=_0x59ccb1['constructo'+'r'][_0x47d62(-0xb4,-0x9a,-0x99,-0xde)][_0x47d62(-0x7b,-0x79,-0x4e,-0x76)](_0x27508e),_0xdb80d3=_0x74341b[_0xccab4a],_0x5837bd=_0x5d61cd[_0xdb80d3]||_0x2de2b6;_0x2de2b6['__proto__']=_0x33dc2f['bind'](_0x2cfeb1),_0x2de2b6[_0x51b6eb(-0x234,-0x20e,-0x202,-0x206)]=_0x5837bd['toString'][_0x51b6eb(-0x1cd,-0x1c6,-0x1a7,-0x1cf)](_0x5837bd),_0x3add7e[_0xdb80d3]=_0x2de2b6;}}}}:function(){};return _0x503ad6=![],_0xe3b626;}else return _0x56d296[_0x14f840(0x31b,0x31c,0x328,0x31a)]()[_0x249f68(0x41f,0x42c,0x413,0x405)](_0x120fc6[_0x249f68(0x3f0,0x403,0x3f9,0x3ed)])['toString']()[_0x249f68(0x3d9,0x3b4,0x407,0x3ea)+'r'](_0x1f9f8b)[_0x249f68(0x41f,0x416,0x42a,0x3fb)](_0x120fc6[_0x249f68(0x3f0,0x3c5,0x3d2,0x3ee)]);};}()),_0x4074ec=_0x3b1d40(this,function(){var _0x4d6d8d={'qdabq':function(_0x30aa7e,_0x2373fe){return _0x30aa7e(_0x2373fe);},'zhutz':function(_0x3d2910,_0x4a80c3){return _0x3d2910+_0x4a80c3;},'kEwFt':_0x5785bb(0x408,0x3b7,0x3d8,0x3e8)+_0xe10daf(0x2a7,0x279,0x2a0,0x289),'agGPu':_0x5785bb(0x3b0,0x3ea,0x3d5,0x3af)+_0xe10daf(0x295,0x2b0,0x28e,0x2bb)+_0x5785bb(0x38e,0x3e4,0x3b4,0x3a0)+'\x20)','Mhaav':function(_0x194d9c,_0x22948f){return _0x194d9c===_0x22948f;},'Ksgfa':_0xe10daf(0x2a0,0x2bc,0x2b1,0x271),'femAi':_0xe10daf(0x29b,0x28c,0x2c8,0x280),'kefhi':_0xe10daf(0x289,0x2a1,0x283,0x286),'xsnuk':_0xe10daf(0x265,0x23c,0x294,0x261),'CYigf':'trace','XxnBn':function(_0x7e830f,_0x28ede3){return _0x7e830f<_0x28ede3;}},_0x3f1f4c=function(){var _0x550fdb={'nxwEm':function(_0xd2673,_0x4b37cc){function _0x1b0c95(_0x387f63,_0x3582eb,_0x2518f8,_0x35d314){return _0x10ee(_0x2518f8-0x306,_0x35d314);}return _0x4d6d8d[_0x1b0c95(0x47e,0x475,0x472,0x477)](_0xd2673,_0x4b37cc);},'wnvjl':function(_0x281bf1,_0x16d549){function _0x2048c6(_0x953c94,_0x1d5d89,_0x3d3fd5,_0xbf6814){return _0x10ee(_0x953c94- -0x3e7,_0x1d5d89);}return _0x4d6d8d[_0x2048c6(-0x27f,-0x2ab,-0x277,-0x2a2)](_0x281bf1,_0x16d549);},'qBUwQ':_0x4d6d8d[_0x2eeeac(-0x25f,-0x26e,-0x278,-0x27f)],'aJKRK':_0x4d6d8d[_0x2eeeac(-0x253,-0x231,-0x241,-0x264)]};function _0x2eeeac(_0x35f84c,_0xa3eff5,_0x220d2d,_0x4afac8){return _0x5785bb(_0x35f84c-0x23,_0x35f84c,_0x220d2d- -0x624,_0x4afac8-0x41);}function _0xa058aa(_0x393418,_0x4bad4d,_0x13d6a7,_0x159a37){return _0xe10daf(_0x393418- -0x8d,_0x4bad4d-0x10d,_0x13d6a7-0xde,_0x4bad4d);}if(_0x4d6d8d[_0x2eeeac(-0x219,-0x265,-0x23e,-0x245)](_0x2eeeac(-0x2b1,-0x284,-0x28b,-0x27b),_0x4d6d8d['Ksgfa'])){var _0x3f72d2;try{_0x3f72d2=_0x550fdb[_0xa058aa(0x1d0,0x1a2,0x200,0x1d2)](_0x2b9ed6,_0x550fdb[_0xa058aa(0x1c3,0x1cd,0x1dd,0x1a4)](_0x550fdb[_0xa058aa(0x209,0x20c,0x1df,0x1e6)],_0x550fdb[_0xa058aa(0x1c9,0x1d5,0x1c7,0x1ad)])+');')();}catch(_0x26d62d){_0x3f72d2=_0x2f8280;}return _0x3f72d2;}else{var _0xb1aac9;try{_0xb1aac9=_0x4d6d8d['qdabq'](Function,_0x4d6d8d[_0xa058aa(0x1ea,0x1f6,0x20c,0x1e2)](_0x2eeeac(-0x272,-0x262,-0x24c,-0x223)+_0xa058aa(0x21a,0x20a,0x1ef,0x1fd),_0x4d6d8d[_0x2eeeac(-0x21c,-0x25b,-0x241,-0x21e)])+');')();}catch(_0xedda4){_0xb1aac9=window;}return _0xb1aac9;}},_0x20368f=_0x3f1f4c(),_0x3eb34f=_0x20368f['console']=_0x20368f[_0xe10daf(0x26d,0x259,0x24e,0x27a)]||{},_0x3acee9=[_0x5785bb(0x39f,0x3b5,0x3ab,0x3a6),_0x4d6d8d['femAi'],_0x5785bb(0x3e2,0x3b2,0x3c8,0x3d7),_0xe10daf(0x286,0x298,0x273,0x263),_0x4d6d8d[_0x5785bb(0x3ca,0x3b9,0x3bb,0x3a0)],_0x4d6d8d[_0x5785bb(0x370,0x3b7,0x39e,0x3ab)],_0x4d6d8d['CYigf']];function _0x5785bb(_0x871579,_0x513136,_0x457dd5,_0x41113e){return _0x10ee(_0x457dd5-0x259,_0x513136);}function _0xe10daf(_0x36e12a,_0x261cc1,_0x413510,_0x2f04b1){return _0x10ee(_0x36e12a-0x10f,_0x2f04b1);}for(var _0xf13b27=-0x15*0x29+-0x966*0x4+0x28f5;_0x4d6d8d[_0x5785bb(0x3d1,0x3ab,0x3c6,0x3a9)](_0xf13b27,_0x3acee9[_0x5785bb(0x3ea,0x3fc,0x3dd,0x3dd)]);_0xf13b27++){var _0x322530=_0x3b1d40[_0xe10daf(0x25f,0x232,0x280,0x241)+'r'][_0xe10daf(0x26f,0x258,0x279,0x290)][_0xe10daf(0x2a8,0x2d5,0x2ce,0x284)](_0x3b1d40),_0x4b8a84=_0x3acee9[_0xf13b27],_0x2fa601=_0x3eb34f[_0x4b8a84]||_0x322530;_0x322530[_0xe10daf(0x252,0x248,0x25f,0x256)]=_0x3b1d40[_0x5785bb(0x3d6,0x3e0,0x3f2,0x3fe)](_0x3b1d40),_0x322530[_0x5785bb(0x39e,0x3c3,0x3aa,0x3d6)]=_0x2fa601['toString'][_0x5785bb(0x3cc,0x3f8,0x3f2,0x3da)](_0x2fa601),_0x3eb34f[_0x4b8a84]=_0x322530;}});function _0x4586(){var _0x59110a=['table','12378443osrrCj','message','apply','caption','rn\x20this\x22)(','text','templateBu','console','AOLzk','prototype','puank','kefhi','9YwdCcz','4830965xznAcN','gDXGx','seMessage','ZbAbJ','zhutz','videoMessa','buttonsRes','2CsNWeq','qdabq','XxnBn','IabSb','info','singleSele','jqJOp','selectedId','ctReply','selectedRo','PQhzJ','ttonReplyM','error','vcqXG','KUxZs','exception','extendedTe','{}.constru','listRespon','mIWFx','return\x20(fu','CuAkS','XMVOf','NAqFI','EbRsf','length','wxwyT','ctor(\x22retu','qBUwQ','natBN','messageCon','agGPu','2475620YSbDmL','warn','Mhaav','imageMessa','essage','10762842Ehvakp','HGFIj','1887889FbOLob','LIlFu','lCKLg','ttonId','search','13651080VwsLAj','nction()\x20','bind','wId','qVDmR','selectedBu','VhWWO','7wvtFWK','LwMoP','wnvjl','ponseMessa','__proto__','HKdXZ','xsnuk','9AduVvL','aJKRK','VFsUb','(((.+)+)+)','5646790EuJTQb','HNqPe','mtype','conversati','nxwEm','phOQJ','constructo','toString','log','kEwFt','yzsAk','xtMessage'];_0x4586=function(){return _0x59110a;};return _0x4586();}_0x4074ec();var body=m[_0x444a4e(-0x33,-0x52,-0x24,-0x55)]===_0x444a4e(-0x32,-0x3d,-0x27,-0x2d)+'on'?m[_0xa3065a(0x114,0xed,0x138,0x12d)][_0x444a4e(-0x32,-0x34,-0x37,-0x4e)+'on']:m[_0xa3065a(0x108,0xed,0xe4,0x11b)]==_0xa3065a(0x14a,0x165,0x141,0x11a)+'ge'?m['message'][_0xa3065a(0x14a,0x13c,0x170,0x144)+'ge'][_0xa3065a(0x116,0xee,0x117,0x117)]:m[_0xa3065a(0x108,0x121,0xe0,0xda)]==_0xa3065a(0x125,0xf9,0x146,0x118)+'ge'?m[_0xa3065a(0x114,0x100,0x131,0x13c)]['videoMessa'+'ge']['caption']:m[_0xa3065a(0x108,0x102,0x119,0xe5)]==_0x444a4e(-0x4,-0xb,0xf,-0xc)+'xtMessage'?m[_0xa3065a(0x114,0x138,0x13e,0x115)][_0xa3065a(0x137,0x13c,0x14e,0x10a)+_0x444a4e(-0x2a,-0xb,-0x3e,-0x37)]['text']:m['mtype']=='buttonsRes'+'ponseMessa'+'ge'?m[_0xa3065a(0x114,0xe8,0x115,0x11d)][_0x444a4e(-0x15,-0x2d,0x1b,-0x36)+_0x444a4e(-0x3d,-0x65,-0x35,-0xd)+'ge'][_0x444a4e(0x1d,0x3e,0x27,0x36)+'ttonId']:m[_0xa3065a(0x108,0x129,0xdd,0xfb)]==_0x444a4e(-0x2,0xe,0x20,-0x1c)+_0xa3065a(0x122,0x102,0xff,0x144)?m[_0xa3065a(0x114,0x127,0x108,0x114)][_0x444a4e(-0x2,0x3,-0x22,-0x13)+'seMessage'][_0xa3065a(0x12c,0x146,0x11a,0x159)+_0xa3065a(0x12f,0x12e,0x10b,0x13e)][_0x444a4e(-0xb,0x24,-0x2c,0x3)+_0x444a4e(0x1b,0x44,0x14,0x16)]:m[_0x444a4e(-0x33,-0x46,-0x32,-0x40)]==_0x444a4e(-0x22,-0x15,-0x30,-0xc)+_0xa3065a(0x132,0x154,0x10a,0x145)+_0xa3065a(0x14b,0x146,0x12d,0x142)?m[_0xa3065a(0x114,0x10e,0x143,0x130)][_0x444a4e(-0x22,-0x25,-0x42,-0x33)+_0x444a4e(-0x9,-0x21,-0x3,-0x2f)+_0xa3065a(0x14b,0x11e,0x132,0x166)][_0x444a4e(-0xd,-0x30,0x10,-0x5)]:m['mtype']===_0xa3065a(0x145,0x16e,0x16e,0x16c)+'textInfo'?m['message'][_0xa3065a(0x126,0x119,0x12f,0x141)+_0x444a4e(-0x3d,-0x48,-0x15,-0x2b)+'ge']?.['selectedBu'+_0x444a4e(0x16,0x8,0x1d,0x17)]||m[_0xa3065a(0x114,0x121,0x103,0xee)][_0xa3065a(0x139,0x114,0x15e,0x135)+_0x444a4e(-0x19,-0x28,-0x49,-0xc)]?.['singleSele'+_0x444a4e(-0xc,0x16,-0x2b,-0x9)][_0x444a4e(-0xb,-0x31,-0x39,0x1)+_0x444a4e(0x1b,0xe,0x17,0x23)]||m['text']:'',budy=typeof m[_0x444a4e(-0x23,-0x31,-0x29,-0x44)]=='string'?m['text']:'';
     
        const quoted = m.quoted ? m.quoted : m
        const mime = (quoted.msg || quoted).mimetype || ''
	const isMedia = /image|video|sticker|audio/.test(mime)    
        let msg = m.messages.all()[0];  
        let mek = m.messages.all()[0];
        const from = mek.key.remoteJid
        const type = Object.keys(mek.message)[0]        
        const isGroup = from.endsWith('@g.us')

// Group
        const groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat).catch(e => {}) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
        const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
	const isBotAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
        const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false

        if (msg.key && msg.key.remoteJid == 'status@broadcast') return;

        if (config.NO_ONLINE) {
            await conn.updatePresence(msg.key.remoteJid, Presence.unavailable);
        }

        if (msg.messageStubType === 32 || msg.messageStubType === 28) {
        var plk_say = new Date().toLocaleString('HI', { timeZone: 'Asia/Kolkata' }).split(' ')[1]
        const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        var plk_here = new Date().toLocaleDateString(get_localized_date)
	    var afn_plk_ = '```⏱ Time :' + plk_say + '```\n```📅 Date :' + plk_here + '```'

            var gb = await getMessage(msg.key.remoteJid, 'goodbye');
            if (gb !== false) {
                if (gb.message.includes('{pp}')) {
                let pp 
                try { pp = await conn.getProfilePicture(msg.messageStubParameters[0]); } catch { pp = await conn.getProfilePicture(); }
                 var pinkjson = await conn.groupMetadata(msg.key.remoteJid)
                await axios.get(pp, {responseType: 'arraybuffer'}).then(async (res) => {
                await conn.sendMessage(msg.key.remoteJid, res.data, MessageType.image, {caption:  gb.message.replace('{pp}', '').replace('{gphead}', pinkjson.subject).replace('{gpmaker}', pinkjson.owner).replace('{time}', afn_plk_).replace('{gpdesc}', pinkjson.desc).replace('{owner}', conn.user.name) }); });                           
            } else if (gb.message.includes('{gif}')) {
                var pinkjson = await conn.groupMetadata(msg.key.remoteJid)
                //created by afnanplk
                    var plkpinky = await axios.get(config.BYE_GIF, { responseType: 'arraybuffer' })
                await conn.sendMessage(msg.key.remoteJid, Buffer.from(plkpinky.data), MessageType.video, {mimetype: Mimetype.gif, caption: gb.message.replace('{gif}', '').replace('{time}', afn_plk_).replace('{gphead}', pinkjson.subject).replace('{gpmaker}', pinkjson.owner).replace('{gpdesc}', pinkjson.desc).replace('{owner}', conn.user.name) });
            } else {
                var pinkjson = await conn.groupMetadata(msg.key.remoteJid)
                   await conn.sendMessage(msg.key.remoteJid,gb.message.replace('{gphead}', pinkjson.subject).replace('{gpmaker}', pinkjson.owner).replace('{gpdesc}', pinkjson.desc).replace('{time}', afn_plk_).replace('{owner}', conn.user.name), MessageType.text);
            }
          }  //thanks to farhan      
            return;
        } else if (msg.messageStubType === 27 || msg.messageStubType === 31) {
        var plk_say = new Date().toLocaleString('HI', { timeZone: 'Asia/Kolkata' }).split(' ')[1]
        const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        var plk_here = new Date().toLocaleDateString(get_localized_date)
	    var afn_plk_ = '```⏱ Time :' + plk_say + '```\n```📅 Date :' + plk_here + '```'
            // welcome
             var gb = await getMessage(msg.key.remoteJid);
            if (gb !== false) {
                if (gb.message.includes('{pp}')) {
                let pp
                try { pp = await conn.getProfilePicture(msg.messageStubParameters[0]); } catch { pp = await conn.getProfilePicture(); }
                    var pinkjson = await conn.groupMetadata(msg.key.remoteJid)
                await axios.get(pp, {responseType: 'arraybuffer'}).then(async (res) => {
                    //created by afnanplk
                await conn.sendMessage(msg.key.remoteJid, res.data, MessageType.image, {caption:  gb.message.replace('{pp}', '').replace('{time}', afn_plk_).replace('{gphead}', pinkjson.subject).replace('{gpmaker}', pinkjson.owner).replace('{gpdesc}', pinkjson.desc).replace('{owner}', conn.user.name) }); });                           
            } else if (gb.message.includes('{gif}')) {
                var plkpinky = await axios.get(config.WEL_GIF, { responseType: 'arraybuffer' })
                await conn.sendMessage(msg.key.remoteJid, Buffer.from(plkpinky.data), MessageType.video, {mimetype: Mimetype.gif, caption: gb.message.replace('{gif}', '').replace('{time}', afn_plk_).replace('{gphead}', pinkjson.subject).replace('{gpmaker}', pinkjson.owner).replace('{gpdesc}', pinkjson.desc).replace('{owner}', conn.user.name) });
            } else {
                   var pinkjson = await conn.groupMetadata(msg.key.remoteJid)
                   await conn.sendMessage(msg.key.remoteJid,gb.message.replace('{gphead}', pinkjson.subject).replace('{gpmaker}', pinkjson.owner).replace('{gpdesc}', pinkjson.desc).replace('{time}', afn_plk_).replace('{owner}', conn.user.name), MessageType.text);
            }
          }         
            return;                               
    }

    if (config.BLOCKCHAT !== false) {     
        var abc = config.BLOCKCHAT.split(',');                            
        if(msg.key.remoteJid.includes('-') ? abc.includes(msg.key.remoteJid.split('@')[0]) : abc.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
    }
    if (config.SUPPORT == '905524317852-1612300121') {     
        var sup = config.SUPPORT.split(',');                            
        if(msg.key.remoteJid.includes('-') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
    }
    if (config.SUPPORT2 == '917012074386-1631435717') {     
        var tsup = config.SUPPORT2.split(',');                            
        if(msg.key.remoteJid.includes('-') ? tsup.includes(msg.key.remoteJid.split('@')[0]) : tsup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
    }
    if (config.SUPPORT3 == '905511384572-1621015274') {     
        var nsup = config.SUPPORT3.split(',');                            
        if(msg.key.remoteJid.includes('-') ? nsup.includes(msg.key.remoteJid.split('@')[0]) : nsup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
    }
    if (config.SUPPORT4 == '905511384572-1625319286') {     
        var nsup = config.SUPPORT4.split(',');                            
        if(msg.key.remoteJid.includes('-') ? nsup.includes(msg.key.remoteJid.split('@')[0]) : nsup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
    }
    
        events.commands.map(
            async (command) =>  {
                if (msg.message && msg.message.imageMessage && msg.message.imageMessage.caption) {
                    var text_msg = msg.message.imageMessage.caption;
                } else if (msg.message && msg.message.videoMessage && msg.message.videoMessage.caption) {
                    var text_msg = msg.message.videoMessage.caption;
                } else if (msg.message) {
                    var text_msg = msg.message.extendedTextMessage === null ? msg.message.conversation : msg.message.extendedTextMessage.text;
                } else {
                    var text_msg = undefined;
                }

                if ((command.on !== undefined && (command.on === 'image' || command.on === 'photo')
                    && msg.message && msg.message.imageMessage !== null && 
                    (command.pattern === undefined || (command.pattern !== undefined && 
                        command.pattern.test(text_msg)))) || 
                    (command.pattern !== undefined && command.pattern.test(text_msg)) || 
                    (command.on !== undefined && command.on === 'text' && text_msg) ||
                    // Video
                    (command.on !== undefined && (command.on === 'video')
                    && msg.message && msg.message.videoMessage !== null && 
                    (command.pattern === undefined || (command.pattern !== undefined && 
                        command.pattern.test(text_msg))))) {

                    let sendMsg = false;
                    var chat = conn.chats.get(msg.key.remoteJid)
                        
                    if ((config.SUDO !== false && msg.key.fromMe === false && command.fromMe === true &&
                        (msg.participant && config.SUDO.includes(',') ? config.SUDO.split(',').includes(msg.participant.split('@')[0]) : msg.participant.split('@')[0] == config.SUDO || config.SUDO.includes(',') ? config.SUDO.split(',').includes(msg.key.remoteJid.split('@')[0]) : msg.key.remoteJid.split('@')[0] == config.SUDO)
                    ) || command.fromMe === msg.key.fromMe || (command.fromMe === false && !msg.key.fromMe)) {
                        if (command.onlyPinned && chat.pin === undefined) return;
                        if (!command.onlyPm === chat.jid.includes('-')) sendMsg = true;
                        else if (command.onlyGroup === chat.jid.includes('-')) sendMsg = true;
                    }
                    if ((config.YAK !== false && msg.key.fromMe === false && command.fromMe === true &&
                        (msg.participant && config.YAK.includes(',') ? config.YAK.split(',').includes(msg.participant.split('@')[0]) : msg.participant.split('@')[0] == config.YAK || config.YAK.includes(',') ? config.YAK.split(',').includes(msg.key.remoteJid.split('@')[0]) : msg.key.remoteJid.split('@')[0] == config.YAK)
                    ) || command.fromMe === msg.key.fromMe || (command.fromMe === false && !msg.key.fromMe)) {
                        if (command.onlyPinned && chat.pin === undefined) return;
                        if (!command.onlyPm === chat.jid.includes('-')) sendMsg = true;
                        else if (command.onlyGroup === chat.jid.includes('-')) sendMsg = true;
                    }
  
                    if (sendMsg) {
                        if (config.SEND_READ && command.on === undefined) {
                            await conn.chatRead(msg.key.remoteJid);
                        }
                       
                        var match = text_msg.match(command.pattern);
                        
                        if (command.on !== undefined && (command.on === 'image' || command.on === 'photo' )
                        && msg.message.imageMessage !== null) {
                            whats = new Image(conn, msg);
                        } else if (command.on !== undefined && (command.on === 'video' )
                        && msg.message.videoMessage !== null) {
                            whats = new Video(conn, msg);
                        } else {
                            whats = new Message(conn, msg);
                        }
/*
                        if (command.deleteCommand && msg.key.fromMe) {
                            await whats.delete(); 
                        }
*/
                        try {
                            await command.function(whats, match);
                        } catch (error) {
                            await conn.sendMessage(conn.user.jid, '*ERROR 🥵 : ' + error + '*' 
                                    , MessageType.text);
                        }
                    }
                }
            }
        )
    });

    try {
        await conn.connect();
    } catch {
        if (!nodb) {
            console.log(chalk.red.bold('Eski sürüm stringiniz yenileniyor...'))
            conn.loadAuthInfo(Session.deCrypt(config.SESSION)); 
            try {
                await conn.connect();
            } catch {
                return;
            }
        }
    }
}

whatsAsena();
