import { View } from "@tarojs/components";
import { AtButton, AtRadio } from "taro-ui";
import { useEffect, useState } from "react";
import "./index.scss";
import questions from "../../data/questions.json";
import GlobalFooter from "../../components/GlobalFooter";
import Taro from "@tarojs/taro";

/**
 * 答题页面
 */
export default () => {
  // 当前题目序号
  const [current, setCurrent] = useState(1);

  // 当前题目
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);

  // 题目选项
  const questionOptions = currentQuestion.options.map((option) => {
    return {
      label: `${option.key}. ${option.value}`,
      value: option.key,
    };
  });

  // 当前答案
  const [currentAnswer, setCurrentAnswer] = useState("");

  // 回答列表
  const [answerList] = useState<string[]>([]);

  /**
   * 题号发生变化，更新当前题目和当前答案
   */
  useEffect(() => {
    setCurrentQuestion(questions[current - 1]);
    setCurrentAnswer(answerList[current - 1]);
  }, [current]);

  return (
    <View className="doQuestionPage">
      <View className="at-article__h2 title">
        {current}、{currentQuestion.title}
      </View>
      <View className="optionsWrapper">
        <AtRadio
          options={questionOptions}
          value={currentAnswer}
          onClick={(value) => {
            setCurrentAnswer(value);
            answerList[current - 1] = value;
          }}
        />
      </View>
      {current < questions.length && (
        <AtButton
          className="controlBtn"
          type="primary"
          size="normal"
          circle
          onClick={() => {
            setCurrent(current + 1);
          }}
          disabled={!currentAnswer}
        >
          下一题
        </AtButton>
      )}
      {current > 1 && (
        <AtButton
          className="controlBtn"
          type="primary"
          size="normal"
          circle
          onClick={() => {
            setCurrent(current - 1);
          }}
        >
          上一题
        </AtButton>
      )}
      {current === questions.length && (
        <AtButton
          className="controlBtn"
          size="normal"
          circle
          onClick={() => {
            // 传递答案
            Taro.setStorage({ key: "answerList", data: answerList });
            Taro.navigateTo({ url: "/pages/result/index" });
          }}
          disabled={!currentAnswer}
        >
          查看结果
        </AtButton>
      )}
      <GlobalFooter />
    </View>
  );
};
