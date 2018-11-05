const domains = [
  { val: 'blog.shinobi.jp', text: 'blog.shinobi.jp (オリジナルドメイン)' },
  { val: 'anime-voice.com', text: 'anime-voice.com (アニメ声)' },
  { val: 'anime-japan.net', text: 'anime-japan.net (日本のアニメ)' },
  { val: 'anime-festa.com', text: 'anime-festa.com (アニメ祭り)' },
  { val: 'animegoe.com', text: 'animegoe.com (アニメ声)' },
  { val: 'anime-movie.net', text: 'anime-movie.net (アニメ映画)' },
  { val: 'anime-report.com', text: 'anime-report.com (アニメのレポート)' },
  { val: 'anime-navi.net', text: 'anime-navi.net (アニメナビ)' },
  { val: 'anime-life.com', text: 'anime-life.com (アニメ生活)' },
  { val: 'anime-ranking.net', text: 'anime-ranking.net (アニメのランキング)' },
  { val: 'animech.net', text: 'animech.net (アニメちゃんねる)' },
  { val: 'cosplay-japan.net', text: 'cosplay-japan.net (日本のコスプレ)' },
  { val: 'cosplay-festa.com', text: 'cosplay-festa.com (コスプレ祭り)' },
  {
    val: 'cosplay-report.com',
    text: 'cosplay-report.com (コスプレのレポート)'
  },
  { val: 'cosplay-navi.com', text: 'cosplay-navi.com (コスプレナビ)' },
  { val: 'cos-mania.net', text: 'cos-mania.net (コスプレマニア)' },
  { val: 'coslife.net', text: 'coslife.net (コスプレ生活)' },
  { val: 'cos-live.com', text: 'cos-live.com (コスプレライブ)' },
  { val: 'moe-cosplay.com', text: 'moe-cosplay.com (萌え系コスプレ)' },
  { val: 'anime-cosplay.com', text: 'anime-cosplay.com (アニメのコスプレ)' },
  { val: 'manga-cosplay.com', text: 'manga-cosplay.com (漫画のコスプレ)' },
  { val: 'fukuwarai.net', text: 'fukuwarai.net (福笑い)' },
  { val: 'sugo-roku.com', text: 'sugo-roku.com (双六)' },
  { val: 'hyakunin-isshu.net', text: 'hyakunin-isshu.net (百人一首)' },
  { val: 'kagome-kagome.com', text: 'kagome-kagome.com (かごめかごめ)' },
  { val: 'take-uma.net', text: 'take-uma.net (竹馬)' },
  { val: 'mamagoto.com', text: 'mamagoto.com (ままごと)' },
  {
    val: 'darumasangakoronda.com',
    text: 'darumasangakoronda.com (だるまさんが転んだ)'
  },
  { val: '7narabe.net', text: '7narabe.net (７並べ)' },
  { val: 'janken-pon.net', text: 'janken-pon.net (じゃんけんぽん)' },
  { val: 'kakuren-bo.com', text: 'kakuren-bo.com (かくれんぼ)' },
  { val: 'komochijima.com', text: 'komochijima.com (子持ち縞)' },
  { val: 'misujitate.com', text: 'misujitate.com (三筋縦)' },
  { val: 'koushijima.com', text: 'koushijima.com (格子縞)' },
  { val: 'ichi-matsu.net', text: 'ichi-matsu.net (市松模様)' },
  { val: 'yotsumeyui.com', text: 'yotsumeyui.com (四つ目結)' },
  { val: 'sankuzushi.com', text: 'sankuzushi.com (算崩し・三崩し)' },
  { val: 'dankanoko.com', text: 'dankanoko.com (段鹿の子)' },
  { val: 'ya-gasuri.com', text: 'ya-gasuri.com (矢絣)' },
  { val: 'futatsutomoe.com', text: 'futatsutomoe.com (二つ巴・双級巴)' },
  { val: 'tsuyushiba.com', text: 'tsuyushiba.com (露芝)' },
  { val: 'edoblog.net', text: 'edoblog.net (江戸ブログ)' },
  { val: 'satsumablog.com', text: 'satsumablog.com (薩摩ブログ)' },
  { val: 'tyoshublog.com', text: 'tyoshublog.com (長州ブログ)' },
  { val: 'tosalog.com', text: 'tosalog.com (土佐ブログ)' },
  { val: 'sekigaharablog.com', text: 'sekigaharablog.com (関ヶ原ブログ)' },
  { val: 'iga-log.com', text: 'iga-log.com (伊賀ブログ)' },
  { val: 'kamakurablog.com', text: 'kamakurablog.com (鎌倉ブログ)' },
  { val: 'asukablog.net', text: 'asukablog.net (飛鳥ブログ)' },
  { val: 'kyotolog.net', text: 'kyotolog.net (京都ブログ)' },
  { val: 'yamatoblog.net', text: 'yamatoblog.net (大和ブログ)' },
  { val: 'v-kei.net', text: 'v-kei.net (ヴィジュアル系)' },
  { val: 'visualshoxx.net', text: 'visualshoxx.net (ヴィジュアルショック)' },
  { val: 'visualfan.com', text: 'visualfan.com (ヴィジュアルファン)' },
  { val: 'bijual.com', text: 'bijual.com (ビジュアル)' },
  { val: 'indiesj.com', text: 'indiesj.com (インディーズ)' },
  { val: 'en-grey.com', text: 'en-grey.com (灰色の)' },
  { val: 'bangalog.com', text: 'bangalog.com (バンギャのブログ)' },
  { val: 'go-th.net', text: 'go-th.net (ゴス)' },
  { val: 'kurofuku.com', text: 'kurofuku.com (黒服)' },
  { val: 'or-hell.com', text: 'or-hell.com (～か地獄か)' },
  { val: 'mangalog.com', text: 'mangalog.com (漫画ブログ)' },
  { val: 'mangadou.net', text: 'mangadou.net (漫画道)' },
  { val: 'dou-jin.com', text: 'dou-jin.com (同人)' },
  { val: 'ria10.com', text: 'ria10.com (リア充)' },
  { val: 'no-mania.com', text: 'no-mania.com (～のマニア)' },
  { val: 'ni-moe.com', text: 'ni-moe.com (～に萌え)' },
  { val: 'zoku-sei.com', text: 'zoku-sei.com (～属性)' },
  { val: 'side-story.net', text: 'side-story.net (SS・サイドストーリー)' },
  { val: 'nari-kiri.com', text: 'nari-kiri.com (なりきり)' },
  { val: 'p-kin.net', text: 'p-kin.net (P禁)' },
  { val: 'gjgd.net', text: 'gjgd.net (グッジョブグッジョブ)' },
  { val: 'gjpw.net', text: 'gjpw.net (グッジョブパワー)' },
  { val: 'atgj.net', text: 'atgj.net (アットグッジョブ)' },
  { val: 'o-oi.net', text: 'o-oi.net (おーおい (o-oi))' },
  { val: 'guhaw.com', text: 'guhaw.com (ぐはｗ)' },
  { val: 'omaww.net', text: 'omaww.net (おまｗｗ)' },
  { val: 'iku4.com', text: 'iku4.com (いくよ)' },
  { val: 'tou3.com', text: 'tou3.com (とうさん)' },
  { val: 'ni-3.net', text: 'ni-3.net (にーさん)' },
  { val: 'ky-3.net', text: 'ky-3.net (けーわいさん)' },
  { val: 'mmo-fps.com', text: 'mmo-fps.com (MMO FPS)' },
  { val: 'blog-mmo.com', text: 'blog-mmo.com (ブログMMO)' },
  { val: 'blog-rpg.com', text: 'blog-rpg.com (ブログRPG)' },
  { val: 'blog-sim.com', text: 'blog-sim.com (シミュレーションブログ)' },
  { val: 'blog-fps.com', text: 'blog-fps.com (ブログFPS)' },
  { val: 'game-ss.com', text: 'game-ss.com (ゲームのSS)' },
  { val: 'game-waza.net', text: 'game-waza.net (ゲームの技)' },
  { val: 'gg-blog.com', text: 'gg-blog.com (good gameブログ)' },
  { val: 'pazru.com', text: 'pazru.com (パズル)' },
  { val: 'kuizu.net', text: 'kuizu.net (クイズ)' },
  { val: 'sakeblog.net', text: 'sakeblog.net (酒ブログ)' },
  { val: 'kai-seki.net', text: 'kai-seki.net (懐石)' },
  { val: 'wa-syo-ku.com', text: 'wa-syo-ku.com (和食)' },
  { val: 'ko-me.com', text: 'ko-me.com (お米)' },
  { val: '99ing.net', text: '99ing.net (クッキング)' },
  { val: '3rin.net', text: '3rin.net (みりん)' },
  { val: 'ryorika.com', text: 'ryorika.com (料理家)' },
  { val: 'cooklog.net', text: 'cooklog.net (クッキングブログ)' },
  { val: 'bangofan.com', text: 'bangofan.com (晩御飯が好き)' },
  { val: 'syoyu.net', text: 'syoyu.net (醤油)' }
];

export default domains;