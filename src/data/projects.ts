import { Project, SliderImage } from "../types";

export const CATEGORY_NICKNAMES: Record<string, string> = {
  aetheris: "三维渲染",
  orcus_audio: "AIGC赋能",
  wild_moss_perfume: "主图设计",
  vert_chronograph: "详情页设计"
};

export const PROJECTS: Project[] = [
  {
    id: "aetheris",
    title: "AETHERIS 极境原生修护精华液",
    englishTitle: "Aetheris Cellular Serum Concept",
    category: "高端美妆 | C4D 3D空间渲染 · 艺术创意指导",
    imageUrl: "/aetheris_cover.jpg",
    fallbackImageUrl: "https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=1200",
    client: "Aetheris Labs Inc.",
    date: "2026.03",
    role: "视觉总监 / 3D美术主创",
    description: "打破常规美妆产品温暖柔和的陈设陈词，将精华液瓶体置于经过高位微米级扫描的极冷玄武岩与润泽高山苔藓之上，通过凛冽而富有情绪感的光影，传达液体高浸透与极端细胞修护的坚韧生命张力。为高净值客群构筑强烈的视觉仪式感。",
    tags: ["C4D 高精度硬面", "植物微粒场景造景", "情绪冷感布光", "天猫奢品超级视觉"],
    stats: [
      { label: "视觉落地点击率 (CTR) 跃升", value: "+46.3%" },
      { label: "电商详情页新品购买转化", value: "11.24%" },
      { label: "客单价质感溢价接受度指标", value: "98.5%" }
    ],
    concept: "将地缘天然质料拉入极简商业静物。用粗粝玄武岩与湿密苔藓的生命张力，反观液体瓶体的莹润剔透、科学冷冽，在感官上实现产品「愈合、屏障」物理物理功效的直觉投射。",
    tools: ["Cinema 4D", "Octane Render", "Photoshop CC", "Substance Painter"],
    beforeImage: "/aetheris_before.jpg",
    fallbackBeforeImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
    afterImage: "/aetheris_after.jpg",
    fallbackAfterImage: "https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "orcus_audio",
    title: "ORCUS 鸣木系列环保声学耳机",
    englishTitle: "Orcus Eco-Acoustic Headphones",
    category: "数码电子 | 极简美学 · 空间微缩陈设",
    imageUrl: "/orcus_cover.jpg",
    fallbackImageUrl: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=1200",
    client: "ORCUS Acoustics Ltd.",
    date: "2026.01",
    role: "三维创意设计师 / 商业合成师",
    description: "针对全球倡导可持续的鸣木系列胡桃木再生耳机定制的品牌大图。利用大面积轻盈山川云雾以及长青碎石植物进行场景构筑，展现声学材质的高贵与自然共生。避开传统科技配色的厚重、数码感，转而渲染温润、空纳、静溢的空间。",
    tags: ["胡桃木拉丝微晶材质", "大自然声波造景", "柔冷暖漫反射光", "海外官网站群创意"],
    stats: [
      { label: "单页面停留时长", value: "4分12秒" },
      { label: "线上极客群首发预定量", value: "3.2万副" },
      { label: "设计社区Behance周精选奖", value: "Featured" }
    ],
    concept: "让工业归于林野。科技消融于天然微粒，当温润实木耳机轻置于野山清苔，光路透过繁茂叶片投下丁达尔射光，高精度的木质拉丝肌理与苔藓微小的叶孢共同谱写了无声的环保之音。",
    tools: ["Cinema 4D", "Redshift Render", "Marvelous Designer", "Photoshop"],
    beforeImage: "/orcus_before.jpg",
    fallbackBeforeImage: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&q=80&w=1200",
    afterImage: "/orcus_after.jpg",
    fallbackAfterImage: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "wild_moss_perfume",
    title: "MOSS WANDERER 荒原苔迹古香水",
    englishTitle: "Moss Wanderer Eau de Parfum KVs",
    category: "奢侈香水 | 艺术场景重构 · 情绪通感流主视觉",
    imageUrl: "/moss_cover.jpg",
    fallbackImageUrl: "https://images.unsplash.com/photo-1523450001312-ffd43755c687?auto=format&fit=crop&q=80&w=1200",
    client: "L'Atelier de Botanique",
    date: "2025.11",
    role: "三维布光美术师 / 奢侈品视觉主创",
    description: "一瓶带走整座湿冷荒野。主视觉采用'粗野的优雅'作为美学支撑点，香水剔透的矿物玻璃底座，折射出水纹的碎落以及泥土苔痕的侵蚀。以微距镜头下的高对比冷感光影，直觉传达雨后潮湿苔藓、冬青与针叶冷松环托的沉静香调。",
    tags: ["极细微距景深渲染", "高阶折射反射精算", "情绪通感主干线", "海外众筹首发爆款"],
    stats: [
      { label: "页面点击转化漏斗 (ATC)", value: "+38.4%" },
      { label: "品牌认知正面心智反馈", value: "+73%" },
      { label: "全球媒体视觉报道引用", value: "24+" }
    ],
    concept: "用光线传递香气，将无形化为有形。在万物灰暗苍老的苔原深处中，只有该剔透玻璃瓶是唯一的光学重心。空气里的薄水雾由粒子 system 计算飞舞，令人指尖发冷、呼吸清润。",
    tools: ["Cinema 4D", "Octane Render", "X-Particles", "DaVinci Resolve"],
    beforeImage: "/moss_before.jpg",
    fallbackBeforeImage: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=1200",
    afterImage: "/moss_after.jpg",
    fallbackAfterImage: "https://images.unsplash.com/photo-1523450001312-ffd43755c687?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "vert_chronograph",
    title: "VERT CHRONO 绿野深林复古计秒精表",
    englishTitle: "Vert Luxury Chronograph Poster",
    category: "高级腕表 | 硬面精密渲染 · 商业精修大图合成",
    imageUrl: "/vert_cover.jpg",
    fallbackImageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=1200",
    client: "VERT Watchmakers Co.",
    date: "2025.09",
    role: "硬壳产品建模渲染师 / 精修大图合成师",
    description: "VERT新一代复古越野精钢表的跨国商用主KV。全片通过微距展现精钢拉丝表圈、太阳纹苔绿碳表盘、高难度的蓝宝石弧面反射。腕表被固定于悬空的常青雨林石柱之上，四周弥漫着天然雾晶与飞落 of 草叶，象征极致的探险精奢美学。",
    tags: ["硬面网格流线微晶精控建模", "金属各向异性微观渲染", "极致大图无损合成", "奢品海报级调色"],
    stats: [
      { label: "推广广告视觉 CTR", value: "+51.2%" },
      { label: "全站首跳跳出率降低", value: "28.4%" },
      { label: "整体订单转化率(CR)", value: "+3.45%" }
    ],
    concept: "时间的自然切片。腕表运转的绝对机械精确度，同古老花岗岩裂痕以及盘绕苔藓的野性美，在清冷高山的背景下达成绝妙的视觉和谐共鸣。",
    tools: ["Blender Engine", "Octane Render", "Photoshop Art", "Lightroom Classic"],
    beforeImage: "/vert_before.jpg",
    fallbackBeforeImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
    afterImage: "/vert_after.jpg",
    fallbackAfterImage: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=1200"
  }
];

export const getSliderImages = (projectId: string): SliderImage[] => {
  const aetherisIds = [
    "photo-1608248597481-496100c80836", "photo-1617897903246-719242758050", "photo-1601049541289-9b1b7bbbfe19",
    "photo-1612817288484-6f916006741a", "photo-1620916566398-39f1143ab7be", "photo-1556228720-195a672e8a03",
    "photo-1626806787461-102c1bfaaea1", "photo-1631730359575-38e4755d772b", "photo-1571781926291-c477ebfd024b",
    "photo-1526947425960-945c6e72858f", "photo-1512290923902-8a9f81dc236c", "photo-1608571423902-eed4a5ad8108",
    "photo-1616683693504-3ea7e9ad6fec", "photo-1629732047847-50b7ecf0cbf1", "photo-1598440947619-2c35fc9aa908",
    "photo-1535585209827-a15fcdbc4c2d", "photo-1501183007986-d0d080b147f9", "photo-1515688594390-b649af70d282",
    "photo-1594489428504-5c0c480a15fa", "photo-1508746829417-e6f548d8d6ed", "photo-1570554886111-c80fcca7a051",
    "photo-1618005182384-a83a8bd57fbe", "photo-1512209994916-70e9dec0271c", "photo-1545239351-ef35f43d514b",
    "photo-1556228453-efd6c1ff04f6", "photo-1590483736148-3c1d58742807", "photo-1601049676099-e7ed07d825b0",
    "photo-1614850523011-8f49fc9ec671", "photo-1522335789203-aabd1fc54bc9", "photo-1598440947619-2c35fc9aa908"
  ];

  const orcusIds = [
    "photo-1583394838336-acd977736f90", "photo-1545239351-ef35f43d514b", "photo-1505740420928-5e560c06d30e",
    "photo-1484704849700-f032a568e944", "photo-1524678606370-a47ad25cb82a", "photo-1546435770-a3e426bf472b",
    "photo-1618336753974-aae8e04506aa", "photo-1583394838336-acd977736f90", "photo-1487215078519-e21cc028cb29",
    "photo-1511379938547-c1f69419868d", "photo-1470225620780-dba8ba36b745", "photo-1508700115892-45ecd05ae2ad",
    "photo-1506157786151-b8491531f063", "photo-1519681393784-d120267933ba", "photo-1600585154340-be6161a56a0c",
    "photo-1513829096960-ef0a33b9c148", "photo-1486406146926-c627a92ad1ab", "photo-1513694203232-719a280e022f",
    "photo-1498050108023-c5249f4df085", "photo-1526374965328-7f61d4dc18c5", "photo-1542751371-adc38448a05e",
    "photo-1550745165-9bc0b252726f", "photo-1555066931-4365d14bab8c", "photo-1527474305487-b87b222841cc",
    "photo-1518770660439-4636190af475", "photo-1563986768609-322da13575f3", "photo-1516259762381-22954d7d3ad2",
    "photo-1552664730-d307ca884978", "photo-1461749280684-dccba630e2f6", "photo-1504639725590-34d0984388bd"
  ];

  const mossIds = [
    "photo-1523450001312-ffd43755c687", "photo-1579546929518-9e396f3cc809", "photo-1594035910387-fea47794261f",
    "photo-1547887537-6158d64c35e3", "photo-1592945403244-b3fbafd7f539", "photo-1615396187826-b9b82da906fc",
    "photo-1595425970377-c9703cf48b6d", "photo-1512290923902-8a9f81dc236c", "photo-1590156221120-7ff29046c82e",
    "photo-1616949755610-8c9bbc08f138", "photo-1448375240586-882707db888b", "photo-1502082553048-f009c37129b9",
    "photo-1464822759023-fed622ff2c3b", "photo-1511497584788-876760111969", "photo-1473448912268-2022ce9509d8",
    "photo-1525253013412-55c1a69a5738", "photo-1507525428034-b723cf961d3e", "photo-1519046904884-53103b34b206",
    "photo-1544735716-392fe2489ffa", "photo-1505118380757-91f5f5632de0", "photo-1513542789411-b6a5d4f31634",
    "photo-1520262454473-a1a82277a893", "photo-1540555700478-4be289fbecef", "photo-1500627764786-fb15eb49eff0",
    "photo-1416339306562-f3d12fefd36f", "photo-1441974231531-c6227db76b6e", "photo-1472289065668-ce650ac443d2",
    "photo-1462331940025-496dfbfc7564", "photo-1434064511983-18c6dae20ed5", "photo-1523450001312-ffd43755c687"
  ];

  const vertIds = [
    "photo-1524592094714-0f0654e20314", "photo-1523275335684-37898b6baf30", "photo-1542496658-e33a6d0d50f6",
    "photo-1547996160-81dfa63595aa", "photo-1509198397868-475647b2a1e5", "photo-1612817159949-195b6eb9e31a",
    "photo-1508685096489-7aacd43bd3b1", "photo-1614162692292-7ac56d7f7f1e", "photo-1522337360788-8b13dee7a37e",
    "photo-1619134778706-7015533a6150", "photo-1639006570490-79c0c53f1080", "photo-1495856458515-083d14e177ad",
    "photo-1533139502938-02b2880935da", "photo-1451187580459-43490279c0fa", "photo-1504384308090-c894fdcc538d",
    "photo-1504608524841-42fe6f032b4b", "photo-1518770660439-4636190af475", "photo-1550751827-4bd374c3f58b",
    "photo-1518186285589-2f7649de83e0", "photo-1531297484001-80022131f5a1", "photo-1563986768609-322da13575f3",
    "photo-1581091226825-a6a2a5aee158", "photo-1451187580459-43490279c0fa", "photo-1531297484001-80022131f5a1",
    "photo-1518770660439-4636190af475", "photo-1562408590-e32931084e23", "photo-1563986768609-322da13575f3",
    "photo-1581091226825-a6a2a5aee158", "photo-1524592094714-0f0654e20314", "photo-1542496658-e33a6d0d50f6"
  ];

  let selectedIds = aetherisIds;
  let prefix = "AETHERIS";
  let maxCount = 20;

  if (projectId === "orcus_audio") {
    selectedIds = orcusIds;
    prefix = "ORCUS";
    maxCount = 15;
  } else if (projectId === "wild_moss_perfume") {
    selectedIds = mossIds;
    prefix = "MOSS";
    maxCount = 30;
  } else if (projectId === "vert_chronograph") {
    selectedIds = vertIds;
    prefix = "VERT";
    maxCount = 13;
  }

  return selectedIds.slice(0, maxCount).map((id, index) => {
    const sequenceNum = String(index + 1).padStart(2, "0");
    let title = `${prefix} // 渲染细节 ${sequenceNum}`;

    if (index === 0) {
      title = `${prefix} // 主视觉高定渲染`;
    } else if (index === 1) {
      title = `${prefix} // C4D 骨架拓扑线框图`;
    } else if (index === 2) {
      title = `${prefix} // 主光源漫反射渲染通道`;
    } else if (index === 3) {
      title = `${prefix} // 表面微晶噪点肌理图`;
    } else if (index === 4) {
      title = `${prefix} // 容积丁达尔散射环境图`;
    }

    return {
      url: `/${projectId}_detail${index + 1}.jpg`,
      fallbackUrl: `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=1200`,
      title
    };
  });
};
