export type DayType = 'High' | 'Low';

export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  note?: string;
}

export interface Workout {
  title: string;
  duration: string;
  exercises: Exercise[];
  cardio?: string;
}

export interface Meal {
  time: string;
  content: string;
  note?: string;
}

export interface Diet {
  type: DayType;
  calories: string;
  protein: string;
  carb: string;
  fat: string;
  meals: Meal[];
}

export interface DayPlan {
  dayName: string;
  workout: Workout;
  diet: Diet;
}

export const WEEKLY_PLAN: Record<number, DayPlan> = {
  1: {
    dayName: '周一',
    workout: {
      title: '推力日 (胸+肩+三头)',
      duration: '60分力量 + 20分有氧',
      exercises: [
        { name: '器械推胸 或 平板哑铃推胸', sets: '4', reps: '8-12', note: '手腕痛就用器械' },
        { name: '上斜哑铃推胸', sets: '3', reps: '10-12' },
        { name: '坐姿哑铃推举 (肩)', sets: '4', reps: '10-12' },
        { name: '哑铃/绳索侧平举 (肩)', sets: '4', reps: '15' },
        { name: '绳索下压 (三头)', sets: '3', reps: '12-15' },
      ],
      cardio: '20分钟 坡度快走 / 椭圆机 (保持微喘)',
    },
    diet: {
      type: 'High',
      calories: '2400',
      protein: '160g',
      carb: '320g',
      fat: '50g',
      meals: [
        { time: '09:00', content: '2个全蛋 + 1杯脱脂牛奶/无糖豆浆 + 3片全麦吐司 或 1大根香蕉' },
        { time: '12:00', content: '一大碗米饭 + 1个去皮鸭腿 + 1份豆腐/鸡胸肉 + 1-2份绿叶菜' },
        { time: '练前', content: '1片全麦吐司 或 半根香蕉' },
        { time: '练后', content: '1勺蛋白粉 + 另半根香蕉' },
        { time: '18:30', content: '1拳头大小米饭 或 荞麦面 + 100g即食鸡胸肉 或 5-6只虾仁 + 蔬菜' },
      ],
    },
  },
  2: {
    dayName: '周二',
    workout: {
      title: '拉力日 (背+二头)',
      duration: '60分力量 + 20分有氧',
      exercises: [
        { name: '高位下拉 (背)', sets: '4', reps: '8-12' },
        { name: '坐姿划船 (背)', sets: '4', reps: '10-12' },
        { name: '直臂下压 (背)', sets: '3', reps: '15' },
        { name: '哑铃交替弯举 (二头)', sets: '3', reps: '12' },
        { name: '绳索面拉 (三角肌后束)', sets: '3', reps: '15' },
      ],
      cardio: '20分钟 坡度快走 / 椭圆机',
    },
    diet: {
      type: 'High',
      calories: '2400',
      protein: '160g',
      carb: '320g',
      fat: '50g',
      meals: [
        { time: '09:00', content: '2个全蛋 + 1杯脱脂牛奶/无糖豆浆 + 3片全麦吐司 或 1大根香蕉' },
        { time: '12:00', content: '一大碗米饭 + 1个去皮鸭腿 + 1份豆腐/鸡胸肉 + 1-2份绿叶菜' },
        { time: '练前', content: '1片全麦吐司 或 半根香蕉' },
        { time: '练后', content: '1勺蛋白粉 + 另半根香蕉' },
        { time: '18:30', content: '1拳头大小米饭 或 荞麦面 + 100g即食鸡胸肉 或 5-6只虾仁 + 蔬菜' },
      ],
    },
  },
  3: {
    dayName: '周三',
    workout: {
      title: '纯有氧日 / 核心',
      duration: '45分中低强度有氧',
      exercises: [
        { name: '卷腹', sets: '3', reps: '20' },
        { name: '平板支撑', sets: '3', reps: '1分钟' },
      ],
      cardio: '骑行 或 椭圆机 40分钟 (恒定心率)',
    },
    diet: {
      type: 'Low',
      calories: '2000',
      protein: '160g',
      carb: '180g',
      fat: '65g',
      meals: [
        { time: '09:00', content: '2个全蛋 + 1杯脱脂牛奶 + 1包坚果 + 仅半根香蕉' },
        { time: '12:00', content: '半碗米饭 或 1根玉米/红薯 + 1个去皮鸭腿 + 2个蛋白 + 蔬菜' },
        { time: '下午', content: '1勺蛋白粉 (用水冲服)' },
        { time: '18:30', content: '不吃米饭面条。100g老南瓜或几块胡萝卜 + 150g即食鸡胸肉 + 蔬菜' },
      ],
    },
  },
  4: {
    dayName: '周四',
    workout: {
      title: '腿部训练日 (不可逃避)',
      duration: '60分力量',
      exercises: [
        { name: '腿举机 (Leg Press)', sets: '4', reps: '10-12', note: '保护脚踝和腰椎' },
        { name: '器械腿屈伸 (大腿前侧)', sets: '4', reps: '12-15' },
        { name: '器械腿弯举 (大腿后侧)', sets: '4', reps: '12-15' },
        { name: '哑铃高脚杯深蹲', sets: '3', reps: '12' },
      ],
      cardio: '练完腿极度疲劳，今天不做有氧',
    },
    diet: {
      type: 'High',
      calories: '2400',
      protein: '160g',
      carb: '320g',
      fat: '50g',
      meals: [
        { time: '09:00', content: '2个全蛋 + 1杯脱脂牛奶/无糖豆浆 + 3片全麦吐司 或 1大根香蕉' },
        { time: '12:00', content: '一大碗米饭 + 1个去皮鸭腿 + 1份豆腐/鸡胸肉 + 1-2份绿叶菜' },
        { time: '练前', content: '1片全麦吐司 或 半根香蕉' },
        { time: '练后', content: '1勺蛋白粉 + 另半根香蕉' },
        { time: '18:30', content: '1拳头大小米饭 或 荞麦面 + 100g即食鸡胸肉 或 5-6只虾仁 + 蔬菜' },
      ],
    },
  },
  5: {
    dayName: '周五',
    workout: {
      title: '休息日 / 积极恢复',
      duration: '拉伸或散步',
      exercises: [],
      cardio: '散步或彻底休息',
    },
    diet: {
      type: 'Low',
      calories: '2000',
      protein: '160g',
      carb: '180g',
      fat: '65g',
      meals: [
        { time: '09:00', content: '2个全蛋 + 1杯脱脂牛奶 + 1包坚果 + 仅半根香蕉' },
        { time: '12:00', content: '半碗米饭 或 1根玉米/红薯 + 1个去皮鸭腿 + 2个蛋白 + 蔬菜' },
        { time: '下午', content: '1勺蛋白粉 (用水冲服)' },
        { time: '18:30', content: '不吃米饭面条。100g老南瓜或几块胡萝卜 + 150g即食鸡胸肉 + 蔬菜' },
      ],
    },
  },
  6: {
    dayName: '周六',
    workout: {
      title: '羽毛球 / 骑行 30km',
      duration: '60-80分钟',
      exercises: [],
      cardio: '打羽毛球或户外骑行',
    },
    diet: {
      type: 'Low',
      calories: '2000',
      protein: '160g',
      carb: '180g',
      fat: '65g',
      meals: [
        { time: '白天', content: '极低碳水，砍掉主食，纯蛋白质+蔬菜顶住', note: '为晚上饭局留配额' },
        { time: '晚上', content: '社交饭局：正常吃菜和肉，不吃米饭，不喝饮料' },
      ],
    },
  },
  0: {
    dayName: '周日',
    workout: {
      title: '休息日',
      duration: '彻底放松',
      exercises: [],
      cardio: '早睡，准备下一周',
    },
    diet: {
      type: 'Low',
      calories: '2000',
      protein: '160g',
      carb: '180g',
      fat: '65g',
      meals: [
        { time: '09:00', content: '2个全蛋 + 1杯脱脂牛奶 + 1包坚果 + 仅半根香蕉' },
        { time: '12:00', content: '半碗米饭 或 1根玉米/红薯 + 1个去皮鸭腿 + 2个蛋白 + 蔬菜' },
        { time: '下午', content: '1勺蛋白粉 (用水冲服)' },
        { time: '18:30', content: '不吃米饭面条。100g老南瓜或几块胡萝卜 + 150g即食鸡胸肉 + 蔬菜' },
      ],
    },
  },
};
