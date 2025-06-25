import React, { useState, useEffect } from 'react';
import { MessageCircle, User, Stethoscope, Clock, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

// 模拟数据
const gameScenarios = [
  {
    id: 1,
    title: "胰腺癌治疗方案咨询",
    description: "你的家人被诊断为胰腺癌，你带着检查报告来咨询治疗方案...",
    reportInfo: [
      "• 检查时间：2025年1月1日",
      "• 检查部位：PET-CT/增强CT",
      "• 胰腺尾部占位",
      "• 穿刺病理 KRAS-Q61V突变"
    ],
    conversation: [
      { 
        speaker: 'patient', 
        text: '医生，这是我家人的胰腺癌检查报告，您帮我看看', 
        delay: 1000 
      },
      { 
        speaker: 'doctor', 
        text: '你这个情况很危险啊，你看，你这个位置，血管包绕严重，不能手术了。', 
        delay: 2000 
      },
      { 
        speaker: 'doctor', 
        text: '不过你可以内科治疗，你家里这个情况，有没有了解过免疫治疗，靶向治疗啊？', 
        delay: 2500 
      },
      { 
        speaker: 'patient', 
        text: '了解过一点，您有办法吗？', 
        delay: 1500 
      },
      { 
        speaker: 'doctor', 
        text: '嗯，（暗自冷笑，啥也不懂），好的，你先按照这个方案治疗', 
        delay: 2000 
      },
      { 
        speaker: 'doctor', 
        text: '化疗：AS，加上靶向药，国内很有名的一个药，叫尼妥珠，专门治疗胰腺癌的', 
        delay: 2500 
      },
      { 
        speaker: 'doctor', 
        text: '嗯，考虑效果再强化一下，你可以加上免疫治疗，要不要考虑一下？', 
        delay: 2000 
      },
      { 
        speaker: 'patient', 
        text: '好的，谢谢医生，这个费用怎么样？', 
        delay: 1500 
      },
      { 
        speaker: 'doctor', 
        text: '这个你看下，有些医保内的，我会尽量帮你争取医保，但是这个治疗方案，主要还是看你们自己选。你考虑考虑，不过还是尽快开始治疗啊，别耽误了。', 
        delay: 3000 
      }
    ],
    question: "面对医生推荐的治疗方案，你应该怎么做？",
    options: [
      "我相信医生会帮助我的，那我就接受这个方案吧",
      "我看不太懂，要不问问家里人和朋友",
      "我去查一下指南和药品说明书，问问病友，顺便去AI查查",
      "天啊，总算还有希望，赶紧上药，明天就化疗，谢谢您救命之恩啊！"
    ],
    correctAnswer: 2,
    explanation: "正确答案是查询指南和药品说明书。这个案例中存在多个严重问题：\n\n🧬 KRAS基因科普：\nKRAS是一个重要的癌基因，正常情况下调控细胞生长。KRAS突变分为：\n• 野生型（Wild-type）：基因正常，未发生突变\n• 突变型：包括G12、G13、Q61等位点突变\n• 本案例中的Q61V突变属于KRAS突变型\n\n⚠️ 尼妥珠单抗的真相：\n• 适应症：主要用于鼻咽癌和头颈部肿瘤\n• 关键限制：仅适用于KRAS野生型患者\n• 临床数据：即使在适应症范围内，PFS（无进展生存期）仅延长约3个月\n• 本案例风险：患者为KRAS突变型，使用尼妥珠单抗缺乏科学依据\n\n🚨 主要问题：\n1. 超适应症用药：胰腺癌不在尼妥珠单抗适应症范围内\n2. 基因型不匹配：KRAS突变型患者使用该药物无效\n3. 缺乏循证依据：没有胰腺癌使用该药的权威临床数据\n\n✅ 正确做法：\n1. 查阅NCCN、CSCO等权威指南\n2. 核实药品说明书和基因检测结果的匹配性\n3. 寻求肿瘤专科医生的第二意见\n4. 了解标准治疗方案和真实获益数据\n\n记住：昂贵不等于有效，权威指南是治疗的金标准！"
  },
  {
    id: 2,
    title: "胰腺癌首诊检查安排",
    description: "你的家人出现腹部疼痛和轻度黄疸，带着其他医院的检查报告来专家门诊咨询...",
    reportInfo: [
      "• 检查时间：2025年1月1日",
      "• CT报告：胰体尾部占位，肝脏2x2cm环形高密度结节",
      "• B超：少量腹水",
      "• CA199：520（超标），CEA：21（超标）",
      "• 胆红素：36（超标）"
    ],
    conversation: [
      { 
        speaker: 'patient', 
        text: '医生，这是我家人的在其它医院做的检查报告，您帮我看看', 
        delay: 1000 
      },
      { 
        speaker: 'doctor', 
        text: '你这个情况，我看一下，片子都带来了哈，我看一下。你这个虽然有转移，但是可以有方案先化疗，看肿瘤情况。', 
        delay: 2500 
      },
      { 
        speaker: 'patient', 
        text: '对，都在这里了，还有其它的血项检测，肿瘤标志物检测', 
        delay: 1500 
      },
      { 
        speaker: 'doctor', 
        text: '好的，我帮你查一下，你这个位置，肝的CA199，CEA，和520都超标，你这是一个比较危险的位置，我查一下，你这个位置，嗯....', 
        delay: 3000 
      },
      { 
        speaker: 'patient', 
        text: '好，那能住院吗', 
        delay: 1000 
      },
      { 
        speaker: 'doctor', 
        text: '现在床位紧张，但是你这个黄疸比较严重，得赶紧入院，肝脏这个要不要考虑介入？', 
        delay: 2500 
      },
      { 
        speaker: 'patient', 
        text: '介入？我不懂啊', 
        delay: 1000 
      },
      { 
        speaker: 'doctor', 
        text: '介入也是一种治疗方式，但是肯定是首先规范治疗，全身治疗为主，先评估', 
        delay: 2000 
      },
      { 
        speaker: 'patient', 
        text: '那您觉得我们接下来怎么办？', 
        delay: 1500 
      },
      { 
        speaker: 'doctor', 
        text: '嗯，现在先安排必要的检查：PET-CT、增强CT、因为仪器偏差，肿瘤标志物，肝功能，血常规这些检测还是要再做一下', 
        delay: 3000 
      },
      { 
        speaker: 'doctor', 
        text: '病理穿刺：这个很重要，需要做下来判断这个病理的性质，分级和分型，风险不大，我们的医生经验很丰富，保障措施也到位', 
        delay: 2500 
      },
      { 
        speaker: 'doctor', 
        text: '上面这些检查后，就可以评估了，但是黄疸不能拖，我尽量安排床位，评估黄疸治疗，可能是要做下手术的，这个如果持续升高，是不能够做后续治疗的，比较危险。', 
        delay: 3500 
      },
      { 
        speaker: 'patient', 
        text: '好的，谢谢医生，我们从外地过来，这里费用也很贵，能不能帮我们照顾下，另外上面这些费用加起来多少钱？', 
        delay: 2000 
      },
      { 
        speaker: 'doctor', 
        text: '（打电话）喂，护士长，这里有一位黄疸患者，需要治疗，但是不能拖，麻烦照顾下看下床位能否照顾下....', 
        delay: 2500 
      },
      { 
        speaker: 'doctor', 
        text: '费用尽量配合你的异地医保政策，你得回头自己问一下12345和当地医保，办好，需要我协助的就找我。', 
        delay: 2000 
      },
      { 
        speaker: 'patient', 
        text: '好的，太感谢了', 
        delay: 1000 
      },
      { 
        speaker: 'doctor', 
        text: '外地都挺不容易的，放心啊，你这个很有机会的，我这里很多病人都治疗有效，后续可以考虑做手术的，别担心，注意这两天的病人状态，这是我微信，有什么情况可以联系我。', 
        delay: 3000 
      }
    ],
    question: "面对医生安排的检查项目，你应该怎么做？",
    options: [
      "这个医生怎么又开了重复的检查，是不是要赚我钱？",
      "医生真好，和老家的专家态度简直天壤之别，应该不会骗我。",
      "这些检查，我回去查一查，尤其是肝转移的处理，是不是和指南一样？",
      "我能不能先检查，再住院啊？那个介入，我朋友说是很必要的！"
    ],
    correctAnswer: 2,
    explanation: "正确答案是查询指南验证检查的必要性。这个案例展现了一个相对正面但需要谨慎的医疗场景：\n\n📋 检查项目分析：\n根据CSCO 2024胰腺癌指南和NCCN 2024指南：\n• 增强CT是首选影像学检查\n• PET-CT用于评估远处转移（合理）\n• 病理确诊是金标准（必要）\n• 肿瘤标志物复查（因仪器差异，合理）\n\n⚠️ 需要注意的问题：\n1. 重复检查的必要性：虽然医生解释了仪器偏差，但患者有权了解具体原因\n2. 费用透明度：医生回避了具体费用问题\n3. 治疗优先级：黄疸处理确实紧急，但介入治疗的时机需要评估\n\n🏥 医生的积极表现：\n• 主动协调床位和检查安排\n• 提供个人联系方式\n• 关心患者的异地就医困难\n• 给予心理安慰和希望\n\n✅ 患者应该做的：\n1. 查阅权威指南，了解标准诊疗流程\n2. 核实检查项目的必要性和时机\n3. 了解肝转移的标准处理方案\n4. 询问费用明细和医保政策\n5. 寻求第二意见（如有疑虑）\n\n💡 关键提醒：\n即使医生态度很好，患者也应该保持理性，通过查阅指南来验证治疗方案的规范性。好的医患关系建立在专业和透明的基础上！"
  }
];

const gameData = {
  title: "Devil Chat - 癌症患者避坑游戏",
  scenarios: gameScenarios
};

type GameState = 'menu' | 'conversation' | 'question' | 'result';

interface Message {
  speaker: 'doctor' | 'patient' | string;
  text: string;
  delay: number;
}

function App() {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [currentScenarioId, setCurrentScenarioId] = useState(1);
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const currentScenario = gameData.scenarios.find(s => s.id === currentScenarioId) || gameData.scenarios[0];

  // 开始对话动画
  useEffect(() => {
    if (gameState === 'conversation' && currentMessageIndex < currentScenario.conversation.length) {
      const timer = setTimeout(() => {
        setIsTyping(true);
        const message = currentScenario.conversation[currentMessageIndex];
        
        // 模拟打字效果
        setTimeout(() => {
          setDisplayedMessages(prev => [...prev, message]);
          setIsTyping(false);
          setCurrentMessageIndex(prev => prev + 1);
        }, 1500);
      }, currentMessageIndex === 0 ? 500 : currentScenario.conversation[currentMessageIndex - 1]?.delay || 2000);

      return () => clearTimeout(timer);
    } else if (currentMessageIndex >= currentScenario.conversation.length && gameState === 'conversation') {
      // 对话结束，显示问题
      setTimeout(() => {
        setGameState('question');
      }, 2000);
    }
  }, [currentMessageIndex, gameState, currentScenario]);

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      setGameState('result');
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setGameState('conversation');
    setDisplayedMessages([]);
    setCurrentMessageIndex(0);
    setSelectedOption(null);
    setShowResult(false);
  };

  const handleScenarioSelect = (scenarioId: number) => {
    setCurrentScenarioId(scenarioId);
    setGameState('conversation');
    setDisplayedMessages([]);
    setCurrentMessageIndex(0);
    setSelectedOption(null);
    setShowResult(false);
  };

  const handleBackToMenu = () => {
    setGameState('menu');
    setDisplayedMessages([]);
    setCurrentMessageIndex(0);
    setSelectedOption(null);
    setShowResult(false);
  };

  const handleNextScenario = () => {
    const nextScenarioId = currentScenarioId < gameData.scenarios.length ? currentScenarioId + 1 : 1;
    handleScenarioSelect(nextScenarioId);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <MessageCircle className="text-red-500" size={24} />
          <h1 className="text-lg font-bold">{gameData.title}</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto bg-gray-800 min-h-screen">
        {/* Menu View */}
        {gameState === 'menu' && (
          <div className="p-4 space-y-6">
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold text-red-400 mb-4">选择游戏场景</h2>
              <p className="text-gray-300 text-sm">每个场景都是真实的医疗陷阱案例</p>
            </div>
            
            <div className="space-y-4">
              {gameData.scenarios.map((scenario) => (
                <button
                  key={scenario.id}
                  onClick={() => handleScenarioSelect(scenario.id)}
                  className="w-full p-4 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-red-700 hover:to-red-600 rounded-lg border border-gray-600 hover:border-red-500 transition-all duration-200 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                      {scenario.id}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">{scenario.title}</h3>
                      <p className="text-sm text-gray-300">{scenario.description}</p>
                    </div>
                    <ArrowRight className="text-gray-400" size={20} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Scenario Info */}
        {gameState !== 'menu' && (
          <div className="p-4 bg-gradient-to-r from-red-900/20 to-orange-900/20 border-b border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={handleBackToMenu}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ← 返回菜单
              </button>
              <span className="text-gray-500">|</span>
              <span className="text-sm text-gray-400">场景 {currentScenario.id}</span>
            </div>
            <h2 className="font-semibold text-red-400 mb-1">{currentScenario.title}</h2>
            <p className="text-sm text-gray-300">{currentScenario.description}</p>
            
            {/* Medical Report Display */}
            <div className="mt-3 p-3 bg-gray-700/50 rounded-lg border border-gray-600">
              <div className="text-xs text-gray-400 mb-2">📋 检查报告摘要</div>
              <div className="text-xs text-gray-300 space-y-1">
                {currentScenario.reportInfo.map((info, index) => (
                  <div key={index}>{info}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Conversation View */}
        {gameState === 'conversation' && (
          <div className="flex-1 p-4 space-y-4">
            {displayedMessages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 animate-fade-in ${
                  message.speaker === 'doctor' ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  message.speaker === 'doctor' 
                    ? 'bg-red-600' 
                    : 'bg-blue-600'
                }`}>
                  {message.speaker === 'doctor' ? (
                    <Stethoscope size={20} />
                  ) : (
                    <User size={20} />
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`max-w-[80%] p-3 rounded-2xl ${
                  message.speaker === 'doctor'
                    ? 'bg-red-900/30 text-red-100 rounded-tl-sm'
                    : 'bg-blue-900/30 text-blue-100 rounded-tr-sm'
                }`}>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                  <Stethoscope size={20} />
                </div>
                <div className="bg-red-900/30 p-3 rounded-2xl rounded-tl-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Progress indicator */}
            <div className="text-center text-gray-500 text-xs">
              对话进行中... ({displayedMessages.length}/{currentScenario.conversation.length})
            </div>
          </div>
        )}

        {/* Question View */}
        {gameState === 'question' && (
          <div className="p-4 space-y-6 animate-fade-in">
            <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 p-4 rounded-lg border border-yellow-800/30">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="text-yellow-400" size={20} />
                <span className="text-yellow-400 font-semibold">思考时间</span>
              </div>
              <p className="text-white font-medium">{currentScenario.question}</p>
            </div>

            <div className="space-y-3">
              {currentScenario.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    selectedOption === index
                      ? 'border-red-500 bg-red-500/20 text-white'
                      : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500 hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedOption === index
                        ? 'border-red-500 bg-red-500'
                        : 'border-gray-500'
                    }`}>
                      {selectedOption === index && <CheckCircle size={16} className="text-white" />}
                    </div>
                    <span className="text-sm leading-relaxed">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className={`w-full p-4 rounded-lg font-semibold transition-all duration-200 ${
                selectedOption !== null
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              {selectedOption !== null ? '确认选择' : '请选择一个选项'}
              <ArrowRight className="inline ml-2" size={16} />
            </button>
          </div>
        )}

        {/* Result View */}
        {gameState === 'result' && (
          <div className="p-4 space-y-6 animate-fade-in">
            {/* Result Header */}
            <div className={`p-4 rounded-lg border-2 ${
              selectedOption === currentScenario.correctAnswer
                ? 'border-green-500 bg-green-900/30'
                : 'border-red-500 bg-red-900/30'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                {selectedOption === currentScenario.correctAnswer ? (
                  <CheckCircle className="text-green-400" size={24} />
                ) : (
                  <XCircle className="text-red-400" size={24} />
                )}
                <span className={`font-bold text-lg ${
                  selectedOption === currentScenario.correctAnswer
                    ? 'text-green-400'
                    : 'text-red-400'
                }`}>
                  {selectedOption === currentScenario.correctAnswer ? '回答正确！' : '回答错误！'}
                </span>
              </div>
              <p className="text-sm text-gray-300">
                你选择了：{currentScenario.options[selectedOption || 0]}
              </p>
              {selectedOption !== currentScenario.correctAnswer && (
                <p className="text-sm text-green-400 mt-2">
                  正确答案：{currentScenario.options[currentScenario.correctAnswer]}
                </p>
              )}
            </div>

            {/* Explanation */}
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-400 mb-3">详细解释</h3>
              <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                {currentScenario.explanation}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleRestart}
                className="w-full p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-200"
              >
                重新开始当前场景
              </button>
              <button
                onClick={handleNextScenario}
                className="w-full p-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all duration-200"
              >
                下一个场景
              </button>
              <button
                onClick={handleBackToMenu}
                className="w-full p-4 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg font-semibold transition-all duration-200"
              >
                返回场景选择
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Custom styles for animations */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;