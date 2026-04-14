/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, 
  Utensils, 
  Calendar as CalendarIcon, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Clock,
  Flame,
  Zap,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WEEKLY_PLAN, DayPlan, DayType } from './constants';

// --- Components ---

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-[#1a1a1a] border border-[#333] rounded-xl overflow-hidden ${className}`}>
    {children}
  </div>
);

const Badge = ({ type }: { type: DayType }) => (
  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
    type === 'High' ? 'bg-orange-500/20 text-orange-500 border border-orange-500/30' : 'bg-blue-500/20 text-blue-500 border border-blue-500/30'
  }`}>
    {type === 'High' ? '高碳日' : '低碳日'}
  </span>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<'today' | 'calendar' | 'progress'>('today');
  const [currentDay, setCurrentDay] = useState(new Date().getDay());
  
  // Initialize state from localStorage
  const [completedExercises, setCompletedExercises] = useState<string[]>(() => {
    const saved = localStorage.getItem('completedExercises');
    return saved ? JSON.parse(saved) : [];
  });
  const [completedMeals, setCompletedMeals] = useState<string[]>(() => {
    const saved = localStorage.getItem('completedMeals');
    return saved ? JSON.parse(saved) : [];
  });
  const [weight, setWeight] = useState<string>("");
  const [weightLog, setWeightLog] = useState<{ date: string, value: number }[]>(() => {
    const saved = localStorage.getItem('weightLog');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem('completedExercises', JSON.stringify(completedExercises));
  }, [completedExercises]);

  useEffect(() => {
    localStorage.setItem('completedMeals', JSON.stringify(completedMeals));
  }, [completedMeals]);

  useEffect(() => {
    localStorage.setItem('weightLog', JSON.stringify(weightLog));
  }, [weightLog]);

  const plan = WEEKLY_PLAN[currentDay as keyof typeof WEEKLY_PLAN];

  const toggleExercise = (name: string) => {
    setCompletedExercises(prev => 
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    );
  };

  const toggleMeal = (content: string) => {
    setCompletedMeals(prev => 
      prev.includes(content) ? prev.filter(i => i !== content) : [...prev, content]
    );
  };

  const addWeight = () => {
    if (!weight) return;
    const newLog = { date: new Date().toLocaleDateString(), value: parseFloat(weight) };
    setWeightLog(prev => [newLog, ...prev]);
    setWeight("");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans selection:bg-orange-500/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#222] px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <Flame className="w-5 h-5 text-black fill-current" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">蜕变 8 周</h1>
          </div>
          <div className="flex bg-[#1a1a1a] rounded-lg p-1 border border-[#333]">
            <button 
              onClick={() => setActiveTab('today')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${activeTab === 'today' ? 'bg-[#333] text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              今日
            </button>
            <button 
              onClick={() => setActiveTab('calendar')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${activeTab === 'calendar' ? 'bg-[#333] text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              计划
            </button>
            <button 
              onClick={() => setActiveTab('progress')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${activeTab === 'progress' ? 'bg-[#333] text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              进度
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 pb-24">
        <AnimatePresence mode="wait">
          {activeTab === 'today' && (
            <motion.div 
              key="today"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Day Selector */}
              <div className="flex items-center justify-between bg-[#1a1a1a] p-3 rounded-xl border border-[#333]">
                <button onClick={() => setCurrentDay((currentDay + 6) % 7)} className="p-2 hover:bg-[#333] rounded-lg transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="text-center">
                  <div className="text-sm text-gray-500 font-mono uppercase tracking-widest mb-1">WEEK 1 / DAY {currentDay === 0 ? 7 : currentDay}</div>
                  <div className="flex items-center gap-2 justify-center">
                    <span className="text-2xl font-black">{plan.dayName}</span>
                    <Badge type={plan.diet.type} />
                  </div>
                </div>
                <button onClick={() => setCurrentDay((currentDay + 1) % 7)} className="p-2 hover:bg-[#333] rounded-lg transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Injury Warning */}
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                <div className="text-sm text-red-200/80 leading-relaxed">
                  <span className="font-bold text-red-400 block mb-1">伤病规避提醒</span>
                  手腕痛请佩戴硬度护腕，推类动作保证手腕中立。脚踝痛严禁路跑，有氧请使用椭圆机或坡度快走。
                </div>
              </div>

              {/* Workout Section */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Dumbbell className="w-5 h-5 text-orange-500" />
                    <h2 className="text-lg font-bold">训练课表</h2>
                  </div>
                  <span className="text-xs text-gray-500 font-mono">{plan.workout.duration}</span>
                </div>
                
                <Card>
                  <div className="p-4 bg-[#222]/50 border-b border-[#333]">
                    <h3 className="font-bold text-orange-400">{plan.workout.title}</h3>
                  </div>
                  <div className="divide-y divide-[#333]">
                    {plan.workout.exercises.length > 0 ? (
                      plan.workout.exercises.map((ex, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => toggleExercise(ex.name)}
                          className={`p-4 flex items-start gap-4 cursor-pointer transition-colors ${completedExercises.includes(ex.name) ? 'bg-orange-500/5' : 'hover:bg-[#222]'}`}
                        >
                          <div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-all ${completedExercises.includes(ex.name) ? 'bg-orange-500 border-orange-500' : 'border-[#444]'}`}>
                            {completedExercises.includes(ex.name) && <CheckCircle2 className="w-4 h-4 text-black" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <span className={`font-medium ${completedExercises.includes(ex.name) ? 'text-gray-500 line-through' : ''}`}>{ex.name}</span>
                              <span className="text-xs font-mono text-orange-500/80">{ex.sets} × {ex.reps}</span>
                            </div>
                            {ex.note && <p className="text-xs text-gray-500 italic">{ex.note}</p>}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-gray-500 italic">今日无力量训练</div>
                    )}
                  </div>
                  {plan.workout.cardio && (
                    <div className="p-4 bg-[#111] flex items-center gap-3">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span className="text-xs text-gray-400">{plan.workout.cardio}</span>
                    </div>
                  )}
                </Card>
              </section>

              {/* Diet Section */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-blue-500" />
                    <h2 className="text-lg font-bold">饮食计划</h2>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-right">
                      <div className="text-[10px] text-gray-500 uppercase">Calories</div>
                      <div className="text-xs font-mono font-bold">{plan.diet.calories}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-gray-500 uppercase">Protein</div>
                      <div className="text-xs font-mono font-bold">{plan.diet.protein}</div>
                    </div>
                  </div>
                </div>

                <Card>
                  <div className="grid grid-cols-3 divide-x divide-[#333] border-b border-[#333] bg-[#222]/30">
                    <div className="p-2 text-center">
                      <div className="text-[9px] text-gray-500 uppercase mb-0.5">Carbs</div>
                      <div className="text-xs font-mono text-orange-400">{plan.diet.carb}</div>
                    </div>
                    <div className="p-2 text-center">
                      <div className="text-[9px] text-gray-500 uppercase mb-0.5">Protein</div>
                      <div className="text-xs font-mono text-blue-400">{plan.diet.protein}</div>
                    </div>
                    <div className="p-2 text-center">
                      <div className="text-[9px] text-gray-500 uppercase mb-0.5">Fat</div>
                      <div className="text-xs font-mono text-yellow-400">{plan.diet.fat}</div>
                    </div>
                  </div>
                  <div className="divide-y divide-[#333]">
                    {plan.diet.meals.map((meal, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => toggleMeal(meal.content)}
                        className={`p-4 flex items-start gap-4 cursor-pointer transition-colors ${completedMeals.includes(meal.content) ? 'bg-blue-500/5' : 'hover:bg-[#222]'}`}
                      >
                        <div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-all ${completedMeals.includes(meal.content) ? 'bg-blue-500 border-blue-500' : 'border-[#444]'}`}>
                          {completedMeals.includes(meal.content) && <CheckCircle2 className="w-4 h-4 text-black" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-mono bg-[#333] px-1.5 py-0.5 rounded text-gray-400">{meal.time}</span>
                            <span className={`text-sm font-medium ${completedMeals.includes(meal.content) ? 'text-gray-500 line-through' : ''}`}>{meal.content}</span>
                          </div>
                          {meal.note && <p className="text-xs text-blue-400/60 font-medium">💡 {meal.note}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </section>

              {/* Coach Tips */}
              <div className="bg-orange-500/5 border border-orange-500/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-orange-500" />
                  <h3 className="text-sm font-bold text-orange-500">教练叮嘱</h3>
                </div>
                <ul className="text-xs text-gray-400 space-y-2 list-disc list-inside">
                  <li>每天必须在100分钟内滚出健身房！</li>
                  <li>组间休息严格控制在 60-90 秒。</li>
                  <li>23:30 必须躺在床上，睡眠是铁律。</li>
                  <li>接受体重波动，看每周五空腹体重的对比。</li>
                </ul>
              </div>
            </motion.div>
          )}

          {activeTab === 'calendar' && (
            <motion.div 
              key="calendar"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-bold mb-4">每周循环概览</h2>
              <div className="grid gap-3">
                {[1, 2, 3, 4, 5, 6, 0].map(dayNum => {
                  const d = WEEKLY_PLAN[dayNum as keyof typeof WEEKLY_PLAN];
                  return (
                    <div 
                      key={dayNum}
                      onClick={() => { setCurrentDay(dayNum); setActiveTab('today'); }}
                      className="bg-[#1a1a1a] border border-[#333] p-4 rounded-xl flex items-center justify-between hover:border-orange-500/50 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${d.diet.type === 'High' ? 'bg-orange-500 text-black' : 'bg-blue-500 text-black'}`}>
                          {d.dayName.replace('周', '')}
                        </div>
                        <div>
                          <div className="font-bold text-sm group-hover:text-orange-400 transition-colors">{d.workout.title}</div>
                          <div className="text-xs text-gray-500">{d.diet.type === 'High' ? '高碳日' : '低碳日'} • {d.diet.calories} kcal</div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-orange-500 transition-colors" />
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeTab === 'progress' && (
            <motion.div 
              key="progress"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-bold">进度追踪</h2>
              
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  <h3 className="font-bold">体重记录 (kg)</h3>
                </div>
                <div className="flex gap-2 mb-6">
                  <input 
                    type="number" 
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="输入体重..."
                    className="flex-1 bg-[#0a0a0a] border border-[#333] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                  />
                  <button 
                    onClick={addWeight}
                    className="bg-orange-500 text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-orange-400 transition-colors"
                  >
                    记录
                  </button>
                </div>

                <div className="space-y-3">
                  {weightLog.length > 0 ? (
                    weightLog.map((log, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-[#222]/50 rounded-lg border border-[#333]">
                        <span className="text-xs text-gray-500 font-mono">{log.date}</span>
                        <span className="font-black text-lg">{log.value} <span className="text-xs font-normal text-gray-500">kg</span></span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500 text-sm italic">
                      暂无记录。建议每周五晨起空腹测量。
                    </div>
                  )}
                </div>
              </Card>

              {/* Mobile Sync Section */}
              <Card className="p-6 border-orange-500/30 bg-orange-500/5">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-orange-500" />
                  <h3 className="font-bold">发送到手机使用</h3>
                </div>
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="bg-white p-2 rounded-lg">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent('https://ais-pre-d5wqvqr3pnzpauawngtlom-719609549001.asia-east1.run.app')}`} 
                      alt="QR Code"
                      className="w-32 h-32"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-300 font-medium">扫描上方二维码，在手机浏览器打开</p>
                    <div className="bg-[#0a0a0a] p-2 rounded border border-[#333] text-[10px] font-mono text-gray-500 break-all">
                      https://ais-pre-d5wqvqr3pnzpauawngtlom-719609549001.asia-east1.run.app
                    </div>
                  </div>
                  <div className="w-full pt-4 border-t border-[#333] text-left">
                    <p className="text-xs text-gray-400 font-bold mb-2">💡 如何像 App 一样使用？</p>
                    <ul className="text-[11px] text-gray-500 space-y-1 list-disc list-inside">
                      <li><span className="text-gray-300">iOS:</span> 点击浏览器底部的“分享”图标，选择<span className="text-orange-500">“添加到主屏幕”</span>。</li>
                      <li><span className="text-gray-300">Android:</span> 点击浏览器右上角三个点，选择<span className="text-orange-500">“安装应用”</span>或“添加到主屏幕”。</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                <h4 className="text-sm font-bold text-blue-400 mb-2">减脂期心态建设</h4>
                <p className="text-xs text-blue-200/70 leading-relaxed">
                  不要被每天的体重波动左右情绪。碳水循环会导致身体储水量的巨大差异。
                  关注镜子里的变化、衣服的松紧度以及训练重量的维持。
                  只要严格执行，结果是必然的。
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Nav (Mobile Style) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a]/90 backdrop-blur-lg border-t border-[#222] px-6 py-3 flex justify-around items-center md:hidden">
        <button onClick={() => setActiveTab('today')} className={`flex flex-col items-center gap-1 ${activeTab === 'today' ? 'text-orange-500' : 'text-gray-500'}`}>
          <Clock className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Today</span>
        </button>
        <button onClick={() => setActiveTab('calendar')} className={`flex flex-col items-center gap-1 ${activeTab === 'calendar' ? 'text-orange-500' : 'text-gray-500'}`}>
          <CalendarIcon className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Plan</span>
        </button>
        <button onClick={() => setActiveTab('progress')} className={`flex flex-col items-center gap-1 ${activeTab === 'progress' ? 'text-orange-500' : 'text-gray-500'}`}>
          <TrendingUp className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Stats</span>
        </button>
      </nav>
    </div>
  );
}

