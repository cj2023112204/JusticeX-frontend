interface Question {
    question: string;
    options: string[];
    correct_option: string;
  }
  
  interface QuizData {
    1: Question[];
    2: Question[];
    3: Question[];
    4: Question[];
  }

const data: QuizData = {
    1:[
    {
        question: "是否為金錢相關？",
        options: ["是","否"],
        correct_option: "是"
    },
    {
        question: "是否有遺棄贓物？",
        options: ["是","否"],
        correct_option: "是"
    },
    {
        question: "犯罪地點為室內？",
        options: ["是","否"],
        correct_option: "是"
    },
    {
        question: "竊盜方法具破壞性？",
        options: ["是","否"],
        correct_option: "是"
    },
    {
        question: "兩人以上(含)犯案？",
        options: ["是","否"],
        correct_option: "是"
    },
    {
        question: "利用交通工具輸送贓物？",
        options: ["是","否"],
        correct_option: "是"
    },
    {
        question: "是否有前科紀錄？",
        options: ["是","否"],
        correct_option: "是"
    },
    {
        question: "竊取之財物為被害人生財工具？",
        options: ["是","否"],
        correct_option: "是"
    },
    ],
2:[
    {
        question: "是否殺人未遂？",
        options: ["是","否"],
        correct_option: "是"
    },
    {
        question: "被害者是否為兒童？",
        options: ["是","否"],
        correct_option: "是"
    },
    {
        question: "是否有親屬關係？",
        options: ["是","否"],
        correct_option: "是"
    },
    {
        question: "加害者是否有精神疾病？",
        options: ["是","否"],
        correct_option: "是"
    },
    {
        question: "兩人以上(含)犯案？",
        options: ["是","否"],
        correct_option: "是"
    },
    {
        question: "利用交通工具輸送贓物？",
        options: ["是","否"],
        correct_option: "是"
    },
    {
        question: "是否有前科紀錄？",
        options: ["是","否"],
        correct_option: "是"
    },
    {
        question: "竊取之財物為被害人生財工具？",
        options: ["是","否"],
        correct_option: "是"
    },
],
3:[
    {
        question: "是否導致受害者受傷？",
        options: ["是","否"],
        correct_option: "是"
    },
    {
        question: "是否兩人以上犯案？",
        options: ["是","否"],
        correct_option: "是"
    },
    {
        question: "是否使用刀械？",
        options: ["是","否"],
        correct_option: "是"
    },
    {
        question: "是否有前科紀錄？",
        options: ["是","否"],
        correct_option: "是"
    },
    {
        question: "有計畫犯罪？",
        options: ["是","否"],
        correct_option: "是"
    },
    {
        question: "被害人人數是否超過兩人？",
        options: ["是","否"],
        correct_option: "是"
    },
    {
        question: "是否提及犯案人因生活困境而強盜？",
        options: ["是","否"],
        correct_option: "是"
    },
    {
        question: "是否毀損物品或建築？",
        options: ["是","否"],
        correct_option: "是"
    },
],
4:[
    {
        question: "是否有駕駛執照？",
        options: ["是","否"],
        correct_option: "是"
    },
    {
        question: "是否搭載其他乘客？",
        options: ["是","否"],
        correct_option: "是"
    },
    {
        question: "是否影響交通安全？",
        options: ["是","否"],
        correct_option: "是"
    },
    {
        question: "是否造成他人財產損害？",
        options: ["是","否"],
        correct_option: "是"
    },
    {
        question: "是否以駕駛車輛為職業？",
        options: ["是","否"],
        correct_option: "是"
    },
    {
        question: "是否肇事逃逸？",
        options: ["是","否"],
        correct_option: "是"
    },
    {
        question: "被撞者是否受有重傷？",
        options: ["是","否"],
        correct_option: "是"
    },
    {
        question: "天氣是否晴朗？",
        options: ["是","否"],
        correct_option: "是"
    },
],
}
export default data;