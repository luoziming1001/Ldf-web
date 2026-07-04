import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { getValue, setValue } from "../lib/db";
import { PROJECTS, CATEGORY_NICKNAMES, getSliderImages } from "../data/projects";
import { Project, SliderImage } from "../types";
import {
  Image as ImageIcon,
  Grid3X3,
  X,
  Upload,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight
} from "lucide-react";

export default function Works() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isGridView, setIsGridView] = useState(false);

  // States to hold IndexedDB customized cover and slide galleries
  const [cardCustomImages, setCardCustomImages] = useState<Record<string, string>>({});
  const [projectCustomGallery, setProjectCustomGallery] = useState<Record<string, Record<number, string>>>({});
  
  const isLoadedRef = useRef(false);
  const lastScrollTimeRef = useRef(0);

  // Load customizations from IndexedDB
  useEffect(() => {
    async function loadCustomizations() {
      let cardCustoms = await getValue<Record<string, string>>("cardCustomImages");
      let galleryCustoms = await getValue<Record<string, Record<number, string>>>("projectCustomGallery");

      if (!cardCustoms) {
        try {
          const legacy = localStorage.getItem("cardCustomImages");
          cardCustoms = legacy ? JSON.parse(legacy) : {};
        } catch {
          cardCustoms = {};
        }
      }

      if (!galleryCustoms) {
        try {
          const legacy = localStorage.getItem("projectCustomGallery");
          galleryCustoms = legacy ? JSON.parse(legacy) : {};
        } catch {
          galleryCustoms = {};
        }
      }

      setCardCustomImages(cardCustoms || {});
      setProjectCustomGallery(galleryCustoms || {});
      isLoadedRef.current = true;
    }
    loadCustomizations();
  }, []);

  // Save Cover Customizations to IndexedDB
  useEffect(() => {
    if (!isLoadedRef.current) return;
    async function saveCardCustoms() {
      await setValue("cardCustomImages", cardCustomImages);
      try {
        localStorage.setItem("cardCustomImages", JSON.stringify(cardCustomImages));
      } catch (e) {
        console.warn("Storage warning: falling back to IndexedDB only", e);
      }
    }
    saveCardCustoms();
  }, [cardCustomImages]);

  // Save Gallery Customizations to IndexedDB
  useEffect(() => {
    if (!isLoadedRef.current) return;
    async function saveGalleryCustoms() {
      await setValue("projectCustomGallery", projectCustomGallery);
      try {
        localStorage.setItem("projectCustomGallery", JSON.stringify(projectCustomGallery));
      } catch (e) {
        console.warn("Storage warning: falling back to IndexedDB only", e);
      }
    }
    saveGalleryCustoms();
  }, [projectCustomGallery]);

  // Helper to compile the active slide deck of a project, replacing indices with custom images
  const getProjectSlides = (project: Project): SliderImage[] => {
    const defaultSlides = getSliderImages(project.id);
    const customProjectGallery = projectCustomGallery[project.id] || {};
    const customIndices = Object.keys(customProjectGallery).map(Number).sort((a, b) => a - b);

    if (customIndices.length > 0) {
      // If we have some customized images, return them at their positions
      return defaultSlides.map((slide, index) => {
        const customUrl = customProjectGallery[index];
        if (customUrl) {
          return {
            url: customUrl,
            title: `本地上传细节 ${String(index + 1).padStart(2, "0")}`,
            isCustomized: true
          };
        }
        return {
          ...slide,
          isCustomized: false
        };
      });
    }

    return defaultSlides.map(slide => ({ ...slide, isCustomized: false }));
  };

  // Wheel gesture to scroll through slides, matches target website's experience
  const handleWheelScroll = (e: React.WheelEvent) => {
    if (!selectedProject || isGridView) return;

    const now = Date.now();
    if (now - lastScrollTimeRef.current < 250) return;

    const slides = getProjectSlides(selectedProject);
    if (!slides.length) return;

    if (e.deltaY > 0) {
      // scroll down -> next slide
      setActiveIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
      lastScrollTimeRef.current = now;
    } else if (e.deltaY < 0) {
      // scroll up -> prev slide
      setActiveIndex(prev => (prev === 0 ? slides.length - 1 : prev - 1));
      lastScrollTimeRef.current = now;
    }
  };

  // Reset indices on opening modal
  useEffect(() => {
    setActiveIndex(0);
    setIsGridView(false);
  }, [selectedProject]);

  // Main works list excludes wild_moss_perfume as per custom filter
  const displayWorks = PROJECTS.filter(item => item.id !== "wild_moss_perfume");

  // Custom current image uploader
  const handleSingleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedProject) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const base64Data = event.target.result as string;
          
          // Save cover if it's the first image, or save current active index
          setProjectCustomGallery(prev => {
            const currentProjectObj = prev[selectedProject.id] || {};
            return {
              ...prev,
              [selectedProject.id]: {
                ...currentProjectObj,
                [activeIndex]: base64Data
              }
            };
          });

          // If replacing index 0, optionally sync to cover cardCustomImages
          if (activeIndex === 0) {
            setCardCustomImages(prev => ({
              ...prev,
              [selectedProject.id]: base64Data
            }));
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Restore single image back to default
  const handleRestoreSingleImage = (index: number) => {
    if (selectedProject) {
      setProjectCustomGallery(prev => {
        const updatedObj = { ...(prev[selectedProject.id] || {}) };
        delete updatedObj[index];
        return {
          ...prev,
          [selectedProject.id]: updatedObj
        };
      });

      if (index === 0) {
        setCardCustomImages(prev => {
          const updated = { ...prev };
          delete updated[selectedProject.id];
          return updated;
        });
      }
    }
  };

  // Bulk replace all images
  const handleBulkImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && selectedProject) {
      const maxLimit = selectedProject.id === "vert_chronograph" ? 13 : selectedProject.id === "orcus_audio" ? 15 : 20;
      const fileArray = Array.from(files).slice(0, maxLimit);

      const readPromises = fileArray.map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            resolve((event.target?.result as string) || "");
          };
          reader.readAsDataURL(file as Blob);
        });
      });

      Promise.all(readPromises).then(results => {
        const loadedData = results.filter(Boolean);
        if (loadedData.length > 0) {
          setProjectCustomGallery(prev => {
            const freshProjectObj: Record<number, string> = {};
            loadedData.forEach((data, index) => {
              freshProjectObj[index] = data;
            });
            return {
              ...prev,
              [selectedProject.id]: freshProjectObj
            };
          });

          // Sync index 0 to cover
          setCardCustomImages(prev => ({
            ...prev,
            [selectedProject.id]: loadedData[0]
          }));

          setActiveIndex(0);
        }
      });
    }
  };

  // Reset entire project slide set back to original static state
  const handleResetWholeSet = () => {
    if (selectedProject) {
      if (window.confirm(`确定要恢复这套作品的所有默认渲染原图吗？`)) {
        setProjectCustomGallery(prev => {
          const updated = { ...prev };
          delete updated[selectedProject.id];
          return updated;
        });

        setCardCustomImages(prev => {
          const updated = { ...prev };
          delete updated[selectedProject.id];
          return updated;
        });

        setActiveIndex(0);
      }
    }
  };

  return (
    <section id="works" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#f8faf7] relative overflow-hidden">
      {/* Editorial Decorative Background blurs */}
      <div className="absolute left-[3%] top-[25%] w-[450px] h-[450px] rounded-full bg-radial from-[#cedacd]/25 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute right-[5%] bottom-[15%] w-[35vw] h-[35vw] rounded-full bg-radial from-[#d4dfd4]/25 to-transparent blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 55 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Header Title */}
        <div className="flex justify-start mb-14 text-left">
          <h2 className="font-serif italic text-4xl sm:text-[64px] lg:text-[80px] lg:leading-[80px] sm:leading-[70px] font-bold text-stone-900 tracking-tight">
            作品集
          </h2>
        </div>

        {/* Portfolio Cards Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-4" id="portfolio-expanded-grid">
          {displayWorks.map((work, index) => {
            const categoryNickname = CATEGORY_NICKNAMES[work.id] || "作品展示";
            
            // Cover calculation
            const customCover = cardCustomImages[work.id];
            const slideDeck = getProjectSlides(work);
            const activeCustomSlideUrl = slideDeck[0]?.url;
            
            const coverSrc = customCover || activeCustomSlideUrl || work.imageUrl;

            return (
              <motion.div
                key={work.id}
                onClick={() => {
                  setSelectedProject(work);
                  setActiveIndex(0);
                }}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -10 }}
                className="group relative aspect-[9/13.5] rounded-[2.2rem] overflow-hidden cursor-pointer border border-stone-850/45 shadow-xl bg-stone-950 transition-all duration-500"
              >
                {/* Visual Cover */}
                <div className="absolute inset-0 z-0">
                  <motion.img
                    src={coverSrc}
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      if (work.fallbackImageUrl) {
                        e.currentTarget.src = work.fallbackImageUrl;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent transition-all duration-500" />
                </div>

                {/* Number Overlay */}
                <span className="absolute top-6 right-6 font-mono text-3.5xl font-extrabold text-white/10 select-none group-hover:text-white/20 transition-colors duration-300">
                  0{index + 1}
                </span>

                {/* Label Category Overlay */}
                <div className="absolute inset-0 flex items-end justify-start p-8 sm:p-10 z-10">
                  <span className="font-serif not-italic font-bold text-2.5xl sm:text-3xl lg:text-3.5xl text-white tracking-widest text-left select-none transition-transform duration-500 group-hover:translate-x-2">
                    {categoryNickname}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Full screen Slideshow and Grid Modal details drawer */}
      <AnimatePresence>
        {selectedProject && (() => {
          const categoryName = CATEGORY_NICKNAMES[selectedProject.id] || "作品详情";
          const slides = getProjectSlides(selectedProject);
          const activeSlide = slides[activeIndex];
          const hasCustomizations = Object.keys(projectCustomGallery[selectedProject.id] || {}).length > 0;

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 bg-stone-950 z-50 overflow-y-auto"
              id="works-detail-modal-overlay"
            >
              <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 relative animate-fade-in">
                
                {/* Slide View Workspace col (Full-width, 12-cols span) */}
                <div
                  className="lg:col-span-12 relative h-screen w-full flex items-center justify-center bg-stone-900 overflow-hidden"
                  onWheel={handleWheelScroll}
                >
                  {/* Left status panel metadata */}
                  <div className="absolute top-6 left-6 z-40 flex items-center gap-3 select-none">
                    <span className="hidden md:inline-block font-mono text-[10px] text-stone-300 tracking-wider bg-stone-900/80 backdrop-blur-md px-3.5 py-2.5 rounded-full border border-stone-700">
                      {isGridView
                        ? "GRID INDEX VIEW // 全览模式"
                        : `PASS 进度: ${String(activeIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`}
                    </span>
                    
                    {/* View switcher pills */}
                    <div className="flex bg-stone-900/90 backdrop-blur-md border border-stone-700 p-1 rounded-full text-stone-400">
                      <button
                        onClick={() => setIsGridView(false)}
                        className={`p-1.5 px-3 rounded-full text-[10px] uppercase font-mono tracking-wider flex items-center gap-1 transition-all cursor-pointer ${
                          !isGridView ? "bg-stone-800 text-white font-bold" : "hover:text-stone-200"
                        }`}
                        title="Slideshow View"
                      >
                        <ImageIcon className="w-3 h-3" />
                        <span className="hidden xs:inline">单张</span>
                      </button>
                      <button
                        onClick={() => setIsGridView(true)}
                        className={`p-1.5 px-3 rounded-full text-[10px] uppercase font-mono tracking-wider flex items-center gap-1 transition-all cursor-pointer ${
                          isGridView ? "bg-stone-800 text-white font-bold" : "hover:text-stone-200"
                        }`}
                        title="Grid Index View"
                      >
                        <Grid3X3 className="w-3 h-3" />
                        <span className="hidden xs:inline">网格</span>
                      </button>
                    </div>
                  </div>

                  {/* Return Back Button */}
                  <div className="absolute top-6 right-6 z-40">
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="group flex items-center gap-2 select-none px-5 py-2.5 bg-stone-900/90 border border-stone-700 backdrop-blur-md hover:bg-stone-800 text-white rounded-full text-[11px] font-mono tracking-widest uppercase transition-all duration-300 shadow-xl hover:-translate-y-0.5 cursor-pointer"
                      aria-label="Close modal"
                    >
                      <span>返回</span>
                    </button>
                  </div>

                  {/* Top center custom media modifiers */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 z-40 flex flex-wrap items-center justify-center gap-2 bg-stone-900/95 backdrop-blur-md border border-stone-700/80 p-1.5 px-3 rounded-full shadow-2xl select-none max-w-[90vw]">
                    {!isGridView && (
                      <>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 border-r border-stone-800 pr-2.5 mr-1 font-bold">
                          图层 #{String(activeIndex + 1).padStart(2, "0")}
                        </span>
                        
                        {/* Replace image uploader */}
                        <label className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-900/40 hover:border-emerald-500/40 text-emerald-300 rounded-full text-[10px] font-bold tracking-wide transition-all cursor-pointer hover:scale-102 active:scale-98">
                          <Upload className="w-3.5 h-3.5" />
                          <span>更换当前图片</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleSingleImageUpload}
                            className="hidden"
                          />
                        </label>

                        {/* Reset single image uploader */}
                        {activeSlide?.isCustomized && (
                          <button
                            onClick={() => handleRestoreSingleImage(activeIndex)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-950/45 hover:bg-rose-900/45 border border-rose-900/35 hover:border-rose-500/30 text-rose-300 rounded-full text-[10px] font-bold tracking-wide transition-all hover:scale-102 active:scale-98 cursor-pointer"
                            title="还原这张为原设"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>恢复原图</span>
                          </button>
                        )}
                      </>
                    )}

                    {/* Bulk multiple custom images */}
                    <label className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-950/40 hover:bg-sky-900/40 border border-sky-900/40 hover:border-sky-500/40 text-sky-300 rounded-full text-[10px] font-bold tracking-wide transition-all cursor-pointer hover:scale-102 active:scale-98">
                      <Upload className="w-3.5 h-3.5" />
                      <span>一次性替换全部 ({slides.length}张)</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleBulkImageUpload}
                        className="hidden"
                      />
                    </label>

                    {/* Reset whole package back */}
                    {hasCustomizations && (
                      <button
                        onClick={handleResetWholeSet}
                        className="flex items-center gap-1 px-2.5 py-1.5 bg-stone-800/85 hover:bg-stone-700/85 border border-stone-700/60 text-stone-300 rounded-full text-[10px] font-medium tracking-wide transition-all active:scale-95 cursor-pointer"
                        title={`恢复本套作品的 ${slides.length} 张图片为默认原图`}
                      >
                        <span>重置整套</span>
                      </button>
                    )}
                  </div>

                  {/* Dark base background container */}
                  <div className="absolute inset-0 z-0 bg-stone-950" />

                  {/* Slider Wrapper */}
                  <div className="absolute inset-0 w-full h-full flex flex-col justify-between">
                    <div className="flex-grow w-full h-full relative overflow-hidden">
                      <AnimatePresence mode="wait">
                        {isGridView ? (
                          /* GRID OVERVIEW CONTAINER */
                          <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35 }}
                            className="absolute inset-0 w-full h-full overflow-y-auto px-6 sm:px-12 pt-24 pb-32 text-left bg-stone-950/98 z-10"
                          >
                            {selectedProject.id === "vert_chronograph" ? (
                              /* Special layout: details scroll long page */
                              <div className="max-w-xl mx-auto space-y-2 pb-12">
                                <div className="text-center mb-8">
                                  <p className="font-mono text-[10px] text-emerald-400 tracking-widest uppercase font-bold">
                                    LONG DETAILS PAGE DESIGN // 详情页长图全景
                                  </p>
                                  <h3 className="font-serif italic text-2xl sm:text-3xl text-stone-200 mt-2">
                                    头戴式耳机·全案视觉详情
                                  </h3>
                                </div>

                                <div className="rounded-2xl overflow-hidden border border-stone-850 shadow-2xl bg-stone-900 divide-y divide-stone-850">
                                  {slides.map((slide, sIndex) => (
                                    <div key={sIndex} className="relative group/longimg w-full overflow-hidden">
                                      <img
                                        src={slide.url}
                                        alt={slide.title}
                                        className="w-full h-auto object-contain block transition-transform duration-700"
                                        referrerPolicy="no-referrer"
                                      />
                                      
                                      <div className="absolute top-4 left-4 z-10 bg-black/75 backdrop-blur-md border border-stone-800 px-2.5 py-1.5 rounded-lg text-[9px] font-mono text-stone-200 select-none">
                                        模块 {String(sIndex + 1).padStart(2, "0")} // {slide.title.split("//")[1] || "精修细节"}
                                      </div>

                                      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 opacity-0 group-hover/longimg:opacity-100 transition-opacity">
                                        <button
                                          onClick={() => {
                                            setActiveIndex(sIndex);
                                            setIsGridView(false);
                                          }}
                                          className="flex items-center gap-1 px-2.5 py-1.5 bg-stone-900/90 hover:bg-stone-800 border border-stone-700 text-white rounded-md text-[9px] font-mono tracking-wider transition-all cursor-pointer shadow-md"
                                        >
                                          <span>单张观看</span>
                                        </button>
                                        
                                        <label className="flex p-1.5 bg-stone-900/90 hover:bg-emerald-900/90 border border-stone-700 hover:border-emerald-500/50 rounded-md text-stone-300 hover:text-emerald-300 cursor-pointer active:scale-90 transition-all shadow-md">
                                          <Upload className="w-3.5 h-3.5" />
                                          <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                              const file = e.target.files?.[0];
                                              if (file) {
                                                const reader = new FileReader();
                                                reader.onload = (ev) => {
                                                  if (ev.target?.result) {
                                                    const base64Data = ev.target.result as string;
                                                    setProjectCustomGallery(prev => {
                                                      const curObj = prev[selectedProject.id] || {};
                                                      return {
                                                        ...prev,
                                                        [selectedProject.id]: {
                                                          ...curObj,
                                                          [sIndex]: base64Data
                                                        }
                                                      };
                                                    });
                                                  }
                                                };
                                                reader.readAsDataURL(file);
                                              }
                                            }}
                                            className="hidden"
                                          />
                                        </label>

                                        {slide.isCustomized && (
                                          <button
                                            onClick={() => handleRestoreSingleImage(sIndex)}
                                            className="flex p-1.5 bg-rose-950/90 hover:bg-rose-900/90 border border-rose-900/50 rounded-md text-rose-300 hover:text-rose-100 active:scale-90 transition-all shadow-md cursor-pointer"
                                            title="还原此张图片"
                                          >
                                            <RotateCcw className="w-3.5 h-3.5" />
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              /* Regular details matrix grid */
                              <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 pb-6">
                                {slides.map((slide, sIndex) => (
                                  <motion.div
                                    key={sIndex}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => {
                                      setActiveIndex(sIndex);
                                      setIsGridView(false);
                                    }}
                                    className={`relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border transition-all duration-300 bg-stone-900 group/thumbnail ${
                                      activeIndex === sIndex
                                        ? "border-emerald-500 shadow-lg shadow-emerald-500/10"
                                        : slide.isCustomized
                                        ? "border-emerald-500/40 hover:border-emerald-500"
                                        : "border-stone-700 hover:border-stone-500"
                                    }`}
                                  >
                                    <img
                                      src={slide.url}
                                      alt={slide.title}
                                      className="w-full h-full object-cover transition-transform duration-500 group-hover/thumbnail:scale-110 pointer-events-none"
                                      referrerPolicy="no-referrer"
                                      onError={(e) => {
                                        if (slide.fallbackUrl) {
                                          e.currentTarget.src = slide.fallbackUrl;
                                        }
                                      }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-60 group-hover/thumbnail:opacity-90 transition-opacity" />
                                    
                                    <div className={`absolute top-2 left-2 z-10 bg-black/70 backdrop-blur-sm border px-1.5 py-0.5 rounded text-[8px] font-mono ${
                                      slide.isCustomized ? "border-emerald-500/50 text-emerald-400 font-bold" : "border-stone-850 text-stone-300"
                                    }`}>
                                      {String(sIndex + 1).padStart(2, "0")}
                                      {slide.isCustomized && " ● 已换"}
                                    </div>

                                    {/* Small hover controls on grid thumbnails */}
                                    <div className="absolute top-2 right-2 z-20 flex items-center gap-1 opacity-0 group-hover/thumbnail:opacity-100 transition-opacity">
                                      <label
                                        onClick={e => e.stopPropagation()}
                                        className="flex p-1.5 bg-stone-900/90 hover:bg-emerald-900/90 border border-stone-700 hover:border-emerald-500/50 rounded-md text-stone-300 hover:text-emerald-300 cursor-pointer active:scale-90 transition-all shadow-md"
                                        title="更换此张图片"
                                      >
                                        <Upload className="w-3 h-3" />
                                        <input
                                          type="file"
                                          accept="image/*"
                                          onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                              const reader = new FileReader();
                                              reader.onload = (ev) => {
                                                if (ev.target?.result) {
                                                  const base64Data = ev.target.result as string;
                                                  setProjectCustomGallery(prev => {
                                                    const curObj = prev[selectedProject.id] || {};
                                                    return {
                                                      ...prev,
                                                      [selectedProject.id]: {
                                                        ...curObj,
                                                        [sIndex]: base64Data
                                                      }
                                                    };
                                                  });
                                                }
                                              };
                                              reader.readAsDataURL(file);
                                            }
                                          }}
                                          className="hidden"
                                        />
                                      </label>

                                      {slide.isCustomized && (
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleRestoreSingleImage(sIndex);
                                          }}
                                          className="flex p-1.5 bg-rose-950/90 hover:bg-rose-900/90 border border-rose-900/50 rounded-md text-rose-300 hover:text-rose-100 active:scale-90 transition-all shadow-md cursor-pointer"
                                          title="还原此张图片"
                                        >
                                          <RotateCcw className="w-3 h-3" />
                                        </button>
                                      )}
                                    </div>

                                    <div className="absolute bottom-2 left-2 right-2 z-10 opacity-0 group-hover/thumbnail:opacity-100 transition-opacity duration-300">
                                      <p className="font-mono text-[7px] text-stone-300 tracking-wider truncate uppercase">
                                        {slide.title.split("//")[1] || "渲染细节"}
                                      </p>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        ) : (
                          /* STANDARD IMAGE SLIDESHOW MODE */
                          <motion.div
                            key="viewer"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="absolute inset-0 w-full h-full bg-stone-900 flex items-center justify-center group/viewer select-none"
                          >
                            <img
                              src={activeSlide?.url}
                              alt={activeSlide?.title}
                              className="w-full h-full object-contain pointer-events-none transition-all duration-300"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                if (activeSlide?.fallbackUrl) {
                                  e.currentTarget.src = activeSlide.fallbackUrl;
                                }
                              }}
                            />

                            {/* Left Navigation Chevron */}
                            <div className="absolute inset-y-0 left-0 w-1/4 flex items-center pl-6 opacity-0 group-hover/viewer:opacity-100 transition-opacity duration-300 z-20">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveIndex(prev => (prev === 0 ? slides.length - 1 : prev - 1));
                                }}
                                className="p-3.5 rounded-full bg-stone-900/80 border border-stone-700 text-white hover:bg-stone-800 transition-all hover:scale-105 shadow-xl cursor-pointer"
                                aria-label="Previous image"
                              >
                                <ChevronLeft className="w-5 h-5" />
                              </button>
                            </div>

                            {/* Right Navigation Chevron */}
                            <div className="absolute inset-y-0 right-0 w-1/4 flex items-center justify-end pr-6 opacity-0 group-hover/viewer:opacity-100 transition-opacity duration-300 z-20">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
                                }}
                                className="p-3.5 rounded-full bg-stone-900/80 border border-stone-700 text-white hover:bg-stone-800 transition-all hover:scale-105 shadow-xl cursor-pointer"
                                aria-label="Next image"
                              >
                                <ChevronRight className="w-5 h-5" />
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Horizontal Slides Previews Indicator Bar at the bottom */}
                    {!isGridView && (
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 max-w-4xl w-[90%] bg-stone-900/80 backdrop-blur-md px-4 py-3 rounded-2xl border border-stone-700 z-20 select-none shadow-2xl">
                        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-stone-850 scrollbar-track-transparent snap-x">
                          {slides.map((slide, sIndex) => (
                            <button
                              key={sIndex}
                              onClick={() => setActiveIndex(sIndex)}
                              className={`relative flex-shrink-0 w-16 sm:w-20 aspect-[4/3] rounded-lg overflow-hidden border transition-all duration-300 snap-center cursor-pointer ${
                                activeIndex === sIndex
                                  ? "border-emerald-500 ring-1 ring-emerald-500/30 scale-105"
                                  : "border-stone-800 opacity-40 hover:opacity-85 hover:scale-102"
                              }`}
                            >
                              <img
                                src={slide.url}
                                alt={slide.title}
                                className="w-full h-full object-cover pointer-events-none"
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                  if (slide.fallbackUrl) {
                                    e.currentTarget.src = slide.fallbackUrl;
                                  }
                                }}
                              />
                              <div className="absolute inset-0 bg-black/10" />
                              <span className="absolute bottom-0.5 right-1 z-10 font-mono text-[7px] text-white/80">
                                {String(sIndex + 1).padStart(2, "0")}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Left bottom watermark logo text */}
                  <div className="absolute bottom-6 left-6 z-20 hidden md:block select-none pointer-events-none text-left">
                    <h4 className="font-serif italic text-white/20 text-5xl font-light tracking-wider uppercase leading-none">
                      {categoryName}
                    </h4>
                  </div>
                </div>

                {/* Hidden col-span-0 element to keep bundle architecture matching perfectly */}
                <div className="hidden lg:block lg:col-span-0 w-0 h-0 overflow-hidden" />
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
