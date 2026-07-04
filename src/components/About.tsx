import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { getValue, setValue } from "../lib/db";
import { ProfileInfo } from "../types";
import { Copy, Check, Upload, Edit, Save, RefreshCw, Briefcase, GraduationCap } from "lucide-react";

// @ts-ignore
import portraitImg from "../assets/images/regenerated_image_1783155607967.jpg";

const DEFAULT_PORTRAIT = portraitImg;
const FALLBACK_PORTRAIT = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000";

const DEFAULT_PROFILE: ProfileInfo = {
  name: "骆东方",
  age: "24",
  gender: "男",
  education: "本科",
  phone: "15815281989",
  email: "691566550@qq.com",
  wechat: "ldf15815281989",
  hobbies: "C4D三维精炼渲染、潮玩数码收集、AIGC创意生图、摄影与越野骑行",
  company: "知名3C数码配件电商大厂",
  time: "2024.03 - 至今",
  position: "高级视觉设计师",
  experience: "精通C4D/Octane/KeyShot及PS后期，深度结合AIGC工作流，主导多款百万销量智能穿戴及潮玩首发主视觉、精细化材质打磨一站式视觉策划。",
  evaluation: "具有扎实的软件基础与学习能力。我熟练掌握c4d，oc，ks等主流三维渲染软件，以及ps后期优化渲染出图，能够独立完成产品的基础质感，包括材质贴图、灯光布置和渲染输出等流程。 具有良好的美术功底与审美能力。对色彩、构图、光影等方面有较强的把控能力，能够突出产品卖点，设计出符合电商需求的渲染效果图。 较强的沟通能力和团队合作精神。我性格开朗，乐于沟通，能够清晰表达自己的想法，并虚心接受他人的意见和建议。在团队合作中，我积极主动，认真负责，能够与团队成员紧密配合，共同完成项目目标。"
};

export default function About() {
  const [portraitUrl, setPortraitUrl] = useState<string>(DEFAULT_PORTRAIT);
  const isLoadedRef = useRef(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [editMode, setEditMode] = useState(false);
  
  const [profile, setProfile] = useState<ProfileInfo>(() => {
    try {
      const saved = localStorage.getItem("ziming_about_profile_v2");
      if (saved) {
        return { ...DEFAULT_PROFILE, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error("Failed to parse profile info", e);
    }
    return DEFAULT_PROFILE;
  });

  // Load portrait from IndexedDB
  useEffect(() => {
    async function loadPortrait() {
      let savedPortrait = await getValue<string>("ziming_about_portrait");
      if (!savedPortrait) {
        try {
          savedPortrait = localStorage.getItem("ziming_about_portrait") || "";
          if (savedPortrait) {
            await setValue("ziming_about_portrait", savedPortrait);
          }
        } catch {
          savedPortrait = "";
        }
      }
      if (savedPortrait && savedPortrait.startsWith("data:image/")) {
        setPortraitUrl(savedPortrait);
      } else {
        setPortraitUrl(DEFAULT_PORTRAIT);
      }
      isLoadedRef.current = true;
    }
    loadPortrait();
  }, []);

  // Save portrait to IndexedDB when changed
  useEffect(() => {
    if (!isLoadedRef.current) return;
    async function savePortrait() {
      await setValue("ziming_about_portrait", portraitUrl);
      try {
        localStorage.setItem("ziming_about_portrait", portraitUrl);
      } catch {}
    }
    savePortrait();
  }, [portraitUrl]);

  const handleCopy = (key: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedStates((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [key]: false }));
    }, 2e3);
  };

  const handleFieldChange = (key: keyof ProfileInfo, value: string) => {
    const updatedProfile = { ...profile, [key]: value };
    setProfile(updatedProfile);
    try {
      localStorage.setItem("ziming_about_profile_v2", JSON.stringify(updatedProfile));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  };

  const handlePortraitUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPortraitUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetProfile = () => {
    if (window.confirm("确定要恢复默认设计师资料和肖像吗？")) {
      setProfile(DEFAULT_PROFILE);
      setPortraitUrl(DEFAULT_PORTRAIT);
      try {
        localStorage.setItem("ziming_about_profile_v2", JSON.stringify(DEFAULT_PROFILE));
      } catch {}
    }
  };

  const fieldsList = [
    { label: "姓名 // NAME", key: "name" as const, placeholder: "姓名 (例如：骆东方)" },
    { label: "年龄 // AGE", key: "age" as const, placeholder: "年龄 (例如：24)" },
    { label: "性别 // GENDER", key: "gender" as const, placeholder: "性别 (例如：男)" },
    { label: "学历 // EDUCATION", key: "education" as const, placeholder: "学历 (例如：本科)", icon: GraduationCap },
    { label: "电话 // PHONE", key: "phone" as const, placeholder: "联系电话", type: "tel" },
    { label: "邮箱 // EMAIL", key: "email" as const, placeholder: "电子邮箱", type: "email" },
    { label: "微信号 // WECHAT", key: "wechat" as const, placeholder: "微信 ID" },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#f2f5f1] relative overflow-hidden">
      {/* Decorative Blur Background circles */}
      <div className="absolute right-[5%] top-[10%] w-[35vw] h-[35vw] rounded-full bg-radial from-stone-250/20 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute left-[8%] bottom-[12%] w-[400px] h-[400px] rounded-full bg-stone-300/10 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Section Title */}
        <div className="border-b border-stone-300 pb-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="font-serif italic font-semibold text-[3.5rem] sm:text-[4.5rem] lg:text-[5rem] leading-none tracking-tight text-stone-950 drop-shadow-[0_2px_4px_rgba(255,255,255,0.45)]">
              关于我
            </h2>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Narrative Info (Left block) */}
          <div className="lg:col-span-6 space-y-8" id="about-text-narrative">
            <div className="space-y-4">
              <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-[#5c6e58] uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#829e82] animate-pulse" />
                PERSONAL PROFILE DOSSIER // 简历档案
              </span>
            </div>

            {/* Profile Fields List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 pt-4">
              {fieldsList.map((field) => (
                <div key={field.key} className="space-y-1.5 pb-2 border-b border-stone-200/60">
                  <span className="text-xs text-stone-400 font-mono tracking-wider font-semibold uppercase block">
                    {field.label}
                  </span>
                  
                  {editMode ? (
                    <input
                      type={field.type || "text"}
                      value={profile[field.key]}
                      onChange={(e) => handleFieldChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full bg-white/80 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 font-sans focus:outline-none focus:ring-1 focus:ring-stone-500 shadow-inner"
                    />
                  ) : (
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="text-stone-900 font-semibold text-base block font-sans truncate">
                        {profile[field.key] || "未填写"}
                      </span>
                      {["phone", "email", "wechat"].includes(field.key) && profile[field.key] && (
                        <button
                          onClick={() => handleCopy(field.key, profile[field.key])}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase transition-all shrink-0 active:scale-95 border cursor-pointer ${
                            copiedStates[field.key]
                              ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                              : "bg-white hover:bg-stone-900 border-stone-200 hover:border-stone-900 text-stone-600 hover:text-white"
                          }`}
                          title={`复制${field.label.split(" // ")[0]}`}
                        >
                          {copiedStates[field.key] ? (
                            <>
                              <Check className="w-2.5 h-2.5" />
                              <span>已复制</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-2.5 h-2.5" />
                              <span>复制</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Comprehensive Evaluation */}
            <div className="space-y-4 pt-4 border-t border-stone-200/40">
              <div className="space-y-2">
                <span className="text-xs text-stone-400 font-mono tracking-wider font-semibold uppercase block">
                  综合评价 // COMPREHENSIVE EVALUATION
                </span>
                {editMode ? (
                  <textarea
                    value={profile.evaluation}
                    onChange={(e) => handleFieldChange("evaluation", e.target.value)}
                    rows={4}
                    className="w-full bg-white/80 border border-stone-300 rounded-xl px-3 py-2.5 text-xs text-stone-900 font-sans focus:outline-none focus:ring-1 focus:ring-stone-500 shadow-inner"
                    placeholder="输入综合评价..."
                  />
                ) : (
                  <div className="text-sm sm:text-base text-stone-800 leading-relaxed font-serif italic font-bold border-l-2 border-[#829e82] pl-4 py-1 text-justify">
                    &ldquo;{profile.evaluation}&rdquo;
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Portrait Section (Right block) */}
          <div className="lg:col-span-6 flex justify-center w-full" id="about-visual-editorial-panel">
            <div className="relative w-full max-w-[340px] aspect-[3/4] rounded-[2.2rem] border border-stone-300/60 shadow-lg overflow-hidden group transition-all duration-500 hover:shadow-2xl">
              <img
                src={portraitUrl}
                alt="设计师个人肖像 Portrait"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  if (portraitUrl !== FALLBACK_PORTRAIT) {
                    setPortraitUrl(FALLBACK_PORTRAIT);
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 via-transparent to-stone-900/5 pointer-events-none" />
              
              {/* Overlay edit banner for portrait */}
              {editMode && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-white p-4 transition-all duration-300">
                  <label className="flex flex-col items-center gap-2 cursor-pointer bg-stone-900/80 hover:bg-stone-800 border border-stone-700 hover:border-stone-500 px-6 py-4 rounded-2xl transition-all shadow-xl active:scale-95 group/upload">
                    <Upload className="w-6 h-6 text-stone-300 group-hover/upload:text-white transition-colors animate-pulse" />
                    <span className="text-xs font-mono font-bold tracking-widest uppercase text-stone-200 group-hover/upload:text-white">
                      上传全新肖像 // UPLOAD PORTRAIT
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePortraitUpload}
                      className="hidden"
                    />
                  </label>
                  
                  <div className="mt-4 flex gap-2">
                    <input
                      type="text"
                      placeholder="或者直接粘贴图片网络链接"
                      value={portraitUrl === DEFAULT_PORTRAIT ? "" : portraitUrl}
                      onChange={(e) => e.target.value && setPortraitUrl(e.target.value)}
                      className="bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/20 focus:border-white/40 focus:outline-none rounded-xl px-3 py-1.5 text-[10px] text-white w-48 text-center transition-all placeholder:text-stone-400"
                    />
                  </div>
                  
                  {portraitUrl !== DEFAULT_PORTRAIT && (
                    <button
                      onClick={() => setPortraitUrl(DEFAULT_PORTRAIT)}
                      className="mt-3 text-[10px] font-mono text-stone-400 hover:text-stone-200 border-b border-stone-500 pb-0.5 transition-colors"
                    >
                      恢复默认肖像 PORTRAIT
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
